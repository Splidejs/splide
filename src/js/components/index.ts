import { ComponentConstructor } from '../types';

import { Breakpoints } from './Breakpoints/Breakpoints';
import { Direction } from './Direction/Direction';
import { Elements } from './Elements/Elements';
import { Slides } from './Slides/Slides';
import { Layout } from './Layout/Layout';
import { Clones } from './Clones/Clones';
import { Move } from './Move/Move';
import { Controller } from './Controller/Controller';
import { Arrows } from './Arrows/Arrows';
import { Autoplay } from './Autoplay/Autoplay';
import { Scroll } from './Scroll/Scroll';
import { Drag } from './Drag/Drag';
import { Keyboard } from './Keyboard/Keyboard';
import { LazyLoad } from './LazyLoad/LazyLoad';
import { Pagination } from './Pagination/Pagination';
import { Sync } from './Sync/Sync';
import { Wheel } from './Wheel/Wheel';
import { Live } from './Live/Live';

export { Breakpoints } from './Breakpoints/Breakpoints';
export { Direction }   from './Direction/Direction';
export { Elements }    from './Elements/Elements';
export { Slides }      from './Slides/Slides';
export { Layout }      from './Layout/Layout';
export { Clones }      from './Clones/Clones';
export { Move }        from './Move/Move';
export { Controller }  from './Controller/Controller';
export { Arrows }      from './Arrows/Arrows';
export { Autoplay }    from './Autoplay/Autoplay';
export { Scroll }      from './Scroll/Scroll';
export { Drag }        from './Drag/Drag';
export { Keyboard }    from './Keyboard/Keyboard';
export { LazyLoad }    from './LazyLoad/LazyLoad';
export { Pagination }  from './Pagination/Pagination';
export { Sync }        from './Sync/Sync';
export { Wheel }       from './Wheel/Wheel';
export { Live }        from './Live/Live';


/**
 * The collection of core component constructors.
 *
 * @since 5.0.0
 */
export const COMPONENTS: Record<string, ComponentConstructor> = {
  Breakpoints,
  Direction,
  Elements,
  Slides,
  Layout,
  Clones,
  Move,
  Controller,
  Arrows,
  Autoplay,
  Scroll,
  Drag,
  Keyboard,
  LazyLoad,
  Pagination,
  Sync,
  Wheel,
  Live,
};