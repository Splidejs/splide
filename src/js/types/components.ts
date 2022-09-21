import * as Types from '../components/types';
import { BaseComponent, TransitionComponent } from './general';


/**
 * The interface for all components.
 *
 * @since 3.0.0
 */
export interface Components {
  [ key: string ]: BaseComponent | undefined;
  Media: Types.MediaComponent;
  Direction: Types.DirectionComponent;
  Elements: Types.ElementsComponent;
  Slides: Types.SlidesComponent;
  Layout: Types.LayoutComponent;
  Clones: Types.ClonesComponent;
  Move: Types.MoveComponent;
  Controller: Types.ControllerComponent;
  Arrows: Types.ArrowsComponent;
  Autoplay: Types.AutoplayComponent;
  Cover: Types.CoverComponent;
  Scroll: Types.ScrollComponent;
  Drag: Types.DragComponent;
  Keyboard: Types.KeyboardComponent;
  LazyLoad: Types.LazyLoadComponent;
  Pagination: Types.PaginationComponent;
  Sync: Types.SyncComponent;
  Wheel: Types.WheelComponent;
  Live: Types.LiveComponent;
  Transition: TransitionComponent;
}
