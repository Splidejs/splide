import { Direction, DirectionComponent } from '../../components/Direction/Direction';
import {
  CLASS_ACTIVE,
  CLASS_CLONE,
  CLASS_INITIALIZED,
  CLASS_LIST,
  CLASS_ROOT,
  CLASS_SLIDE,
  CLASS_TRACK,
} from '../../constants/classes';
import { DEFAULTS } from '../../constants/defaults';
import { TTB } from '../../constants/directions';
import { EVENT_MOUNTED } from '../../constants/events';
import { LOOP } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { Options } from '../../types';
import {
  assert,
  camelToKebab,
  child,
  forOwn,
  isObject,
  max,
  merge,
  push,
  queryAll,
  remove,
  uniqueId,
  unit,
} from '../../utils';
import { Style } from '../Style/Style';


/**
 * The class to generate static HTML of the slider for the first view.
 *
 * @since 3.0.0
 */
export class SplideRenderer {
  /**
   * Holds slide contents.
   */
  private contents: string[];

  /**
   * The Direction component.
   */
  private Direction: DirectionComponent;

  /**
   * Holds the Style instance.
   */
  private Style: Style;

  /**
   * Holds options.
   */
  private readonly options: Options = {};

  /**
   * The slider ID.
   */
  private readonly id: string;

  /**
   * An array with slide HTML strings.
   */
  private slides: string[];

  /**
   * An array with options for each breakpoint.
   */
  private breakpoints: [ string, Options ][] = [];

  /**
   * The SplideRenderer constructor.
   *
   * @param contents - An array with slide contents. Each item must be an HTML or a plain text.
   * @param options  - Optional. Options.
   * @param id       - Optional. An ID of the slider.
   * @param defaults - Static default options.
   */
  constructor( contents: string[], options?: Options, id?: string, defaults: Options = {} ) {
    merge( DEFAULTS, defaults );
    merge( merge( this.options, DEFAULTS ), options || {} );

    this.id        = id || uniqueId( 'splide' );
    this.contents  = contents;
    this.Style     = new Style( this.id, this.options );
    this.Direction = Direction( null, null, this.options );

    assert( this.contents.length, 'Provide at least 1 content.' );

    this.init();
  }

  /**
   * Initializes the instance.
   */
  private init(): void {
    this.parseBreakpoints();
    this.generateSlides();
    this.registerRootStyles();
    this.registerTrackStyles();
    this.registerSlideStyles();
    this.registerListStyles();
  }

  /**
   * Generates HTML of slides with inserting provided contents.
   */
  private generateSlides(): void {
    this.slides = this.contents.map( ( content, index ) => {
      return `<li class="${ this.options.classes.slide } ${ index === 0 ? CLASS_ACTIVE : '' }">${ content }</li>`;
    } );

    if ( this.isLoop() ) {
      this.generateClones();
    }
  }

  /**
   * Generates clones.
   */
  private generateClones(): void {
    const { classes } = this.options;
    const count    = this.getCloneCount();
    const contents = this.contents.slice();

    while ( contents.length < count ) {
      push( contents, contents );
    }

    push( contents.slice( -count ).reverse(), contents.slice( 0, count ) ).forEach( ( content, index ) => {
      const html = `<li class="${ classes.slide } ${ classes.clone }">${ content }</li>`;
      index < count ? this.slides.unshift( html ) : this.slides.push( html );
    } );
  }

  /**
   * Returns the number of clones to generate.
   *
   * @return A number of clones.
   */
  private getCloneCount(): number {
    if ( this.isLoop() ) {
      const { options } = this;

      if ( options.clones ) {
        return options.clones;
      }

      const perPage = max( ...this.breakpoints.map( ( [ , options ] ) => options.perPage ) );
      return perPage * ( ( options.flickMaxPages || 1 ) + 1 );
    }

    return 0;
  }

  /**
   * Registers styles for the root element.
   */
  private registerRootStyles(): void {
    this.breakpoints.forEach( ( [ width, options ] ) => {
      this.Style.rule( ' ', 'max-width', unit( options.width ), width );
    } );
  }

  /**
   * Registers styles for the track element.
   */
  private registerTrackStyles(): void {
    const { Style } = this;
    const selector = `.${ CLASS_TRACK }`;

    this.breakpoints.forEach( ( [ width, options ] ) => {
      Style.rule( selector, this.resolve( 'paddingLeft' ), this.cssPadding( options, false ), width );
      Style.rule( selector, this.resolve( 'paddingRight' ), this.cssPadding( options, true ), width );
      Style.rule( selector, 'height', this.cssTrackHeight( options ), width );
    } );
  }

  /**
   * Registers styles for the list element.
   */
  private registerListStyles(): void {
    const { Style, Direction } = this;
    const selector = `.${ CLASS_LIST }`;

    this.breakpoints.forEach( ( [ width, options ] ) => {
      const percent = this.calcOffsetPercent( options );
      Style.rule( selector, 'transform', `translate${ Direction.resolve( 'X' ) }(${ percent }%)`, width );
      Style.rule( selector, this.resolve( 'left' ), this.cssOffsetLeft( options ), width );
    } );
  }

  /**
   * Registers styles for slides and clones.
   */
  private registerSlideStyles(): void {
    const { Style } = this;
    const selector = `.${ CLASS_SLIDE }`;

    this.breakpoints.forEach( ( [ width, options ] ) => {
      Style.rule( selector, 'width', this.cssSlideWidth( options ), width );
      Style.rule( selector, 'height', this.cssSlideHeight( options ), width );
      Style.rule( selector, this.resolve( 'marginRight' ), unit( options.gap ) || '0px', width );
    } );
  }

  /**
   * Returns percentage of the offset for the list element.
   * This does not include gaps because it can not be converted into percent.
   *
   * @return The offset as percent.
   */
  private calcOffsetPercent( options: Options ): number {
    const slidePercent = 100 / options.perPage;
    let percent = slidePercent * this.getCloneCount();

    if ( options.focus === 'center' ) {
      if ( this.isLoop() || ! this.options.trimSpace ) {
        percent -= 50 - slidePercent / 2;
      }
    }

    return this.Direction.orient( percent );
  }

  /**
   * Returns the value of the left offset for the list element.
   *
   * @return The offset as `calc()`.
   */
  private cssOffsetLeft( options: Options ): string {
    if ( this.isLoop() && options.gap ) {
      const { perPage } = options;
      const cssGap     = unit( options.gap ) || '0px';
      const baseOffset = `-${ cssGap } * ${ this.getCloneCount() / perPage }`;

      if ( options.focus === 'center' && perPage > 1 ) {
        return `calc( ${ baseOffset } + ${ cssGap } / 4)`;
      } else {
        return `calc(${ baseOffset })`;
      }
    }

    return '';
  }

  /**
   * Resolves the prop for the current direction and converts it into the Kebab case.
   *
   * @param prop - A property name to resolve.
   *
   * @return A resolved property name in the Kebab case.
   */
  private resolve( prop: string ): string {
    return camelToKebab( this.Direction.resolve( prop ) );
  }

  /**
   * Returns padding in the CSS format.
   *
   * @param options - Options.
   * @param right   - Determines whether to get padding right or left.
   *
   * @return Padding in the CSS format.
   */
  private cssPadding( options: Options, right: boolean ): string {
    const { padding } = options;
    const prop = this.Direction.resolve( right ? 'right' : 'left', true );
    return padding ? unit( padding[ prop ] || ( isObject( padding ) ? '0' : padding ) ) : '0';
  }

  /**
   * Returns height of the track element in the CSS format.
   *
   * @param options - Options.
   *
   * @return Height in the CSS format.
   */
  private cssTrackHeight( options: Options ): string {
    let height = '';

    if ( this.isVertical() ) {
      height = this.cssHeight( options );
      assert( height, '"height" is missing.' );

      const paddingTop    = this.cssPadding( options, false );
      const paddingBottom = this.cssPadding( options, true );

      if ( paddingTop || paddingBottom ) {
        height = `calc(${ height }`;
        height += `${ paddingTop ? ` - ${ paddingTop }` : '' }${ paddingBottom ? ` - ${ paddingBottom }` : '' })`;
      }
    }

    return height;
  }

  /**
   * Returns height provided though options in the CSS format.
   *
   * @param options - Options.
   *
   * @return Height in the CSS format.
   */
  private cssHeight( options: Options ): string {
    return unit( options.height );
  }

  /**
   * Returns width of each slide in the CSS format.
   *
   * @param options - Options.
   *
   * @return Width in the CSS format.
   */
  private cssSlideWidth( options: Options ): string {
    return options.autoWidth
      ? ''
      : unit( options.fixedWidth ) || ( this.isVertical() ? '' : this.cssSlideSize( options ) );
  }

  /**
   * Returns height of each slide in the CSS format.
   *
   * @param options - Options.
   *
   * @return Height in the CSS format.
   */
  private cssSlideHeight( options: Options ): string {
    return unit( options.fixedHeight )
      || ( this.isVertical()
        ? ( options.autoHeight ? '' : this.cssSlideSize( options ) )
        : this.cssHeight( options )
      );
  }

  /**
   * Returns width or height of each slide in the CSS format, considering the current direction.
   *
   * @param options - Options.
   *
   * @return Width or height in the CSS format.
   */
  private cssSlideSize( options: Options ): string {
    const gap = unit( options.gap );
    return `calc((100%${ gap && ` + ${ gap }` })/${ options.perPage || 1 }${ gap && ` - ${ gap }` })`;
  }

  /**
   * Parses breakpoints and generate options for each breakpoint.
   */
  private parseBreakpoints(): void {
    const { breakpoints } = this.options;

    this.breakpoints.push( [ 'default', this.options ] );

    if ( breakpoints ) {
      forOwn( breakpoints, ( options, width ) => {
        this.breakpoints.push( [ width, merge( merge( {}, this.options ), options ) ] );
      } );
    }
  }

  /**
   * Checks if the slider type is loop or not.
   *
   * @return `true` if the slider type is loop, or otherwise `false`.
   */
  private isLoop(): boolean {
    return this.options.type === LOOP;
  }

  /**
   * Checks if the direction is TTB or not.
   *
   * @return `true` if the direction is TTB, or otherwise `false`.
   */
  private isVertical(): boolean {
    return this.options.direction === TTB;
  }

  /**
   * Builds classes of the root element.
   *
   * @return Classes for the root element as a single string.
   */
  private buildClasses(): string {
    const { options } = this;

    return [
      CLASS_ROOT,
      `${ CLASS_ROOT }--${ options.type }`,
      `${ CLASS_ROOT }--${ options.direction }`,
      CLASS_ACTIVE,
      CLASS_INITIALIZED, // todo
    ].filter( Boolean ).join( ' ' );
  }

  /**
   * Returns the HTML of the slider.
   *
   * @return The generated HTML.
   */
  html(): string {
    let html = '';

    html += `<div id="${ this.id }" class="${ this.buildClasses() }">`;
    html += `<style>${ this.Style.build() }</style>`;
    html += `<div class="splide__track">`;
    html += `<ul class="splide__list">`;

    html += this.slides.join( '' );

    html += `</ul>`;
    html += `</div>`;
    html += `</div>`;

    return html;
  }

  /**
   * Removes a style element and clones.
   *
   * @param splide - A Splide instance.
   */
  clean( splide: Splide ): void {
    const { on } = EventInterface( splide );
    const { root } = splide;
    const clones = queryAll( root, `.${ CLASS_CLONE }` );

    on( EVENT_MOUNTED, () => {
      remove( child( root, 'style' ) );
    } );

    remove( clones );
  }
}
