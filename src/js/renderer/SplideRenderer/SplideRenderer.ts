import { PATH, SIZE, XML_NAME_SPACE } from '../../components/Arrows/path';
import { Direction, DirectionComponent } from '../../components/Direction/Direction';
import { CLASS_ACTIVE, CLASS_CLONE, CLASS_LIST, CLASS_ROOT, CLASS_SLIDE, CLASS_TRACK } from '../../constants/classes';
import { DEFAULTS } from '../../constants/defaults';
import { TTB } from '../../constants/directions';
import { EVENT_MOUNTED } from '../../constants/events';
import { LOOP, SLIDE } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { Options } from '../../types';
import {
  assert,
  assign,
  camelToKebab,
  child,
  forOwn,
  isObject,
  isString,
  max,
  merge,
  push,
  queryAll,
  remove,
  uniqueId,
  unit,
} from '../../utils';
import { CLASS_RENDERED } from '../constants/classes';
import { RENDERER_DEFAULT_CONFIG } from '../constants/defaults';
import { Style } from '../Style/Style';
import { RendererConfig, SlideContent } from '../types/types';


/**
 * The class to generate static HTML of the slider for the first view.
 *
 * @since 3.0.0
 */
export class SplideRenderer {
  /**
   * Removes a style element and clones.
   *
   * @param splide - A Splide instance.
   */
  static clean( splide: Splide ): void {
    const { on } = EventInterface( splide );
    const { root } = splide;
    const clones = queryAll( root, `.${ CLASS_CLONE }` );

    on( EVENT_MOUNTED, () => {
      remove( child( root, 'style' ) );
    } );

    remove( clones );
  }

  /**
   * Holds slide contents.
   */
  private readonly contents: string[] | SlideContent[];

  /**
   * Stores data of slides.
   */
  private readonly slides: SlideContent[] = [];

  /**
   * The Direction component.
   */
  private readonly Direction: DirectionComponent;

  /**
   * Holds the Style instance.
   */
  private readonly Style: Style;

  /**
   * Holds options.
   */
  private readonly options: Options = {};

  /**
   * Holds options for this instance.
   */
  private readonly config: RendererConfig;

  /**
   * The slider ID.
   */
  private readonly id: string;

  /**
   * An array with options for each breakpoint.
   */
  private readonly breakpoints: [ string, Options ][] = [];

  /**
   * The SplideRenderer constructor.
   *
   * @param contents - An array with slide contents. Each item must be an HTML or a plain text.
   * @param options  - Optional. Slider options.
   * @param config   - Static default options.
   * @param defaults - Default options for the slider. Pass `Splide.defaults` if you are using it.
   */
  constructor( contents: string[] | SlideContent[], options?: Options, config?: RendererConfig, defaults?: Options ) {
    merge( DEFAULTS, defaults || {} );
    merge( merge( this.options, DEFAULTS ), options || {} );

    this.contents  = contents;
    this.config    = assign( {}, RENDERER_DEFAULT_CONFIG, config || {} );
    this.id        = this.config.id || uniqueId( 'splide' );
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
    this.initSlides();
    this.registerRootStyles();
    this.registerTrackStyles();
    this.registerSlideStyles();
    this.registerListStyles();
  }

  /**
   * Initializes slides.
   */
  private initSlides(): void {
    push( this.slides, this.contents.map( ( content, index ) => {
      content = isString( content ) ? { html: content } : content;
      content.styles = content.styles || {};
      content.attrs  = content.attrs || {};

      this.cover( content );

      const classes = `${ this.options.classes.slide } ${ index === 0 ? CLASS_ACTIVE : '' }`;

      assign( content.attrs, {
        class: `${ classes } ${ content.attrs.class || '' }`.trim(),
        style: this.buildStyles( content.styles ),
      } );

      return content;
    } ) );

    if ( this.isLoop() ) {
      this.generateClones( this.slides );
    }
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
    const { Style } = this;
    const selector = `.${ CLASS_LIST }`;

    this.breakpoints.forEach( ( [ width, options ] ) => {
      Style.rule( selector, 'transform', this.buildTranslate( options ), width );

      if ( ! this.cssSlideHeight( options ) ) {
        Style.rule( selector, 'aspect-ratio', this.cssAspectRatio( options ), width );
      }
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
      Style.rule( selector, 'height', this.cssSlideHeight( options ) || '100%', width );
      Style.rule( selector, this.resolve( 'marginRight' ), unit( options.gap ) || '0px', width );
      Style.rule( `${ selector } > img`, 'display', options.cover ? 'none' : 'inline', width );
    } );
  }

  /**
   * Builds multiple `translateX` for the list element.
   *
   * @param options - Options for each breakpoint.
   *
   * @return A string with multiple translate functions.
   */
  private buildTranslate( options: Options ): string {
    const { resolve, orient } = this.Direction;
    const values = [];

    values.push( this.cssOffsetClones( options ) );
    values.push( this.cssOffsetGaps( options ) );

    if ( this.isCenter( options ) ) {
      values.push( this.buildCssValue( orient( -50 ), '%' ) );
      values.push( ...this.cssOffsetCenter( options ) );
    }

    return values
      .filter( Boolean )
      .map( value => `translate${ resolve( 'X' ) }(${ value })` )
      .join( ' ' );
  }

  /**
   * Returns offset for the list element.
   * This does not include gaps because it can not be converted into percent.
   *
   * @param options - Options for each breakpoint.
   *
   * @return The offset.
   */
  private cssOffsetClones( options: Options ): string {
    const { resolve, orient } = this.Direction;
    const cloneCount = this.getCloneCount();

    if ( this.isFixedWidth( options ) ) {
      const { value, unit } = this.parseCssValue( options[ resolve( 'fixedWidth' ) ] );
      return this.buildCssValue( orient( value ) * cloneCount, unit );
    }

    const percent = 100 * cloneCount / options.perPage;
    return `${ orient( percent ) }%`;
  }

  /**
   * Returns offset for centering the active slide.
   *
   * Note:
   * ( 100% + gap ) / perPage - gap
   * 100% / perPage + gap / perPage - gap;
   * 50% / perPage + ( gap / perPage - gap ) / 2;
   *
   * @param options - Options for each breakpoint.
   *
   * @return The offset.
   */
  private cssOffsetCenter( options: Options ): string[] {
    const { resolve, orient } = this.Direction;

    if ( this.isFixedWidth( options ) ) {
      const { value, unit } = this.parseCssValue( options[ resolve( 'fixedWidth' ) ] );
      return [ this.buildCssValue( orient( value / 2 ), unit ) ];
    }

    const values = [];
    const { perPage, gap } = options;

    values.push( `${ orient( 50 / perPage ) }%` );

    if ( gap ) {
      const { value, unit } = this.parseCssValue( gap );
      const gapOffset = ( value / perPage - value ) / 2;
      values.push( this.buildCssValue( orient( gapOffset ), unit ) );
    }

    return values;
  }

  /**
   * Returns offset for gaps.
   *
   * @param options - Options for each breakpoint.
   *
   * @return The offset as `calc()`.
   */
  private cssOffsetGaps( options: Options ): string {
    const cloneCount = this.getCloneCount();

    if ( cloneCount && options.gap ) {
      const { orient } = this.Direction;
      const { value, unit } = this.parseCssValue( options.gap );

      if ( this.isFixedWidth( options ) ) {
        return this.buildCssValue( orient( value * cloneCount ), unit );
      }

      const { perPage } = options;
      const gaps = cloneCount / perPage;
      return this.buildCssValue( orient( gaps * value ), unit );
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
    return padding && unit( padding[ prop ] || ( isObject( padding ) ? 0 : padding ) ) || '0px';
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
      height = `calc(${ height } - ${ this.cssPadding( options, false ) } - ${ this.cssPadding( options, true ) })`;
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
   * Returns the aspectRatio value to simulate the `heightRatio` option.
   *
   * @param options - Options.
   *
   * @return aspectRatio in the CSS format.
   */
  private cssAspectRatio( options: Options ): string {
    const { heightRatio } = options;
    return heightRatio ? `${ 1 / heightRatio }` : '';
  }

  /**
   * Builds the css value by the provided value and unit.
   *
   * @param value - A value.
   * @param unit  - A CSS unit.
   *
   * @return A built value for a CSS value.
   */
  private buildCssValue( value: number, unit: string ): string {
    return `${ value }${ unit }`;
  }

  /**
   * Parses the CSS value into number and unit.
   *
   * @param value - A value to parse.
   *
   * @return An object with value and unit.
   */
  private parseCssValue( value: string | number ): { value: number, unit: string } {
    if ( isString( value ) ) {
      const number = parseFloat( value ) || 0;
      const unit   = value.replace( /\d*(\.\d*)?/, '' ) || 'px';
      return { value: number, unit };
    }

    return { value, unit: 'px' };
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
   * Checks if the slide width is fixed or not.
   *
   * @return `true` if the slide width is fixed, or otherwise `false`.
   */
  private isFixedWidth( options: Options ): boolean {
    return !! options[ this.Direction.resolve( 'fixedWidth' ) ];
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
   * Checks if the active slide should be centered or not.
   *
   * @return `true` if the slide should be centered, or otherwise `false`.
   */
  private isCenter( options: Options ): boolean {
    if( options.focus === 'center' ) {
      if ( this.isLoop() ) {
        return true;
      }

      if ( this.options.type === SLIDE ) {
        return ! this.options.trimSpace;
      }
    }

    return false;
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
      options.drag && `${ CLASS_ROOT }--draggable`,
      options.isNavigation && `${ CLASS_ROOT }--nav`,
      CLASS_ACTIVE,
      ! this.config.hidden && CLASS_RENDERED,
    ].filter( Boolean ).join( ' ' );
  }

  /**
   * Converts provided attributes into a single string.
   *
   * @param attrs - An object with attributes.
   *
   * @return A built string.
   */
  private buildAttrs( attrs: Record<string, string | number | boolean> ): string {
    let attr = '';

    forOwn( attrs, ( value, key ) => {
      attr += value ? ` ${ camelToKebab( key ) }="${ value }"` : '';
    } );

    return attr.trim();
  }

  /**
   * Converts provided styles into a single string.
   *
   * @param styles - An object with styles.
   *
   * @return A built string.
   */
  private buildStyles( styles: Record<string, string | number> ): string {
    let style = '';

    forOwn( styles, ( value, key ) => {
      style += ` ${ camelToKebab( key ) }:${ value };`;
    } );

    return style.trim();
  }

  /**
   * Generates HTML of slides with inserting provided contents.
   *
   * @return The HTML for all slides and clones.
   */
  private renderSlides(): string {
    const { slideTag: tag } = this.config;

    return this.slides.map( content => {
      return `<${ tag } ${ this.buildAttrs( content.attrs ) }>${ content.html || '' }</${ tag }>`;
    } ).join( '' );
  }

  /**
   * Add the `background` style for the cover mode.
   *
   * @param content - A slide content.
   */
  private cover( content: SlideContent ): void {
    const { styles, html = '' } = content;

    if ( this.options.cover && ! this.options.lazyLoad ) {
      const src = html.match( /<img.*?src\s*=\s*(['"])(.+?)\1.*?>/ );

      if ( src && src[ 2 ] ) {
        styles.background = `center/cover no-repeat url('${ src[ 2 ] }')`;
      }
    }
  }

  /**
   * Generates clones.
   *
   * @param contents - An array with SlideContent objects.
   */
  private generateClones( contents: SlideContent[] ): void {
    const { classes } = this.options;
    const count  = this.getCloneCount();
    const slides = contents.slice();

    while ( slides.length < count ) {
      push( slides, slides );
    }

    push( slides.slice( -count ).reverse(), slides.slice( 0, count ) ).forEach( ( content, index ) => {
      const attrs = assign( {}, content.attrs, { class: `${ content.attrs.class } ${ classes.clone }` } );
      const clone = assign( {}, content, { attrs } );
      index < count ? contents.unshift( clone ) : contents.push( clone );
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
   * Generates arrows and the wrapper element.
   *
   * @return The HTML for arrows.
   */
  private renderArrows(): string {
    let html = '';

    html += `<div class="${ this.options.classes.arrows }">`;
    html += this.renderArrow( true );
    html += this.renderArrow( false );
    html += `</div>`;

    return html;
  }

  /**
   * Generates an arrow HTML.
   * Some attributes are temporary, and Splide changes them after mount.
   *
   * @param prev - Options for each breakpoint.
   *
   * @return The HTML for the prev or next arrow.
   */
  private renderArrow( prev: boolean ): string {
    const { classes, i18n } = this.options;
    const attrs = {
      class    : `${ classes.arrow } ${ prev ? classes.prev : classes.next }`,
      type     : 'button',
      ariaLabel: prev ? i18n.prev : i18n.next,
    };

    return `<button ${ this.buildAttrs( attrs ) }>`
      +	`<svg xmlns="${ XML_NAME_SPACE }" viewBox="0 0 ${ SIZE } ${ SIZE }" width="${ SIZE }" height="${ SIZE }">`
      + `<path d="${ this.options.arrowPath || PATH }" />`
      + `</svg>`
      + `</button>`;
  }

  /**
   * Returns the HTML of the slider.
   *
   * @return The generated HTML.
   */
  html(): string {
    const { rootClass, listTag, arrows, beforeTrack, afterTrack, slider, beforeSlider, afterSlider } = this.config;

    let html = '';

    html += `<div id="${ this.id }" class="${ this.buildClasses() } ${ rootClass || '' }">`;
    html += `<style>${ this.Style.build() }</style>`;

    if ( slider ) {
      html += beforeSlider || '';
      html += `<div class="splide__slider">`;
    }

    html += beforeTrack || '';

    if ( arrows ) {
      html += this.renderArrows();
    }

    html += `<div class="splide__track">`;
    html += `<${ listTag } class="splide__list">`;

    html += this.renderSlides();

    html += `</${ listTag }>`;
    html += `</div>`; // .track

    html += afterTrack || '';

    if ( slider ) {
      html += `</div>`;
      html += afterSlider || '';
    }

    html += `</div>`; // .splide

    return html;
  }
}
