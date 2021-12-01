import { ArrowsComponent } from '../components/Arrows/Arrows';
import { AutoplayComponent } from '../components/Autoplay/Autoplay';
import { ClonesComponent } from '../components/Clones/Clones';
import { ControllerComponent } from '../components/Controller/Controller';
import { CoverComponent } from '../components/Cover/Cover';
import { DirectionComponent } from '../components/Direction/Direction';
import { DragComponent } from '../components/Drag/Drag';
import { ElementsComponent } from '../components/Elements/Elements';
import { KeyboardComponent } from '../components/Keyboard/Keyboard';
import { LayoutComponent } from '../components/Layout/Layout';
import { LazyLoadComponent } from '../components/LazyLoad/LazyLoad';
import { MoveComponent } from '../components/Move/Move';
import { OptionsComponent } from '../components/Options/Options';
import { PaginationComponent } from '../components/Pagination/Pagination';
import { ScrollComponent } from '../components/Scroll/Scroll';
import { SlidesComponent } from '../components/Slides/Slides';
import { SyncComponent } from '../components/Sync/Sync';
import { WheelComponent } from '../components/Wheel/Wheel';
import { BaseComponent, TransitionComponent } from './general';


/**
 * The interface for all components.
 *
 * @since 3.0.0
 */
export interface Components {
  [ key: string ]: BaseComponent;
  Options: OptionsComponent;
  Direction: DirectionComponent;
  Elements: ElementsComponent;
  Slides: SlidesComponent;
  Layout: LayoutComponent;
  Clones: ClonesComponent;
  Move: MoveComponent;
  Controller: ControllerComponent;
  Arrows: ArrowsComponent;
  Autoplay: AutoplayComponent;
  Cover: CoverComponent;
  Scroll: ScrollComponent;
  Drag: DragComponent;
  Keyboard: KeyboardComponent;
  LazyLoad: LazyLoadComponent;
  Pagination: PaginationComponent;
  Sync: SyncComponent;
  Wheel: WheelComponent;
  Transition: TransitionComponent;
}
