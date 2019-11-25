/**
 * Export components.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Options     from './options';
import Elements    from './elements';
import Controller  from './controller';
import Slides      from './slides';
import Track       from './track';
import Clones      from './clones';
import Layout      from './layout';
import Drag        from './drag';
import Click       from './click';
import Autoplay    from './autoplay';
import Cover       from './cover';
import Arrows      from './arrows';
import Pagination  from './pagination';
import LazyLoad    from './lazyload';
import Keyboard    from './keyboard';
import A11y        from './a11y';
import Sync        from './sync';
import Breakpoints from './breakpoints';

export const COMPLETE = {
	Options,
	Elements,
	Controller,
	Slides,
	Track,
	Clones,
	Layout,
	Drag,
	Click,
	Autoplay,
	Cover,
	Arrows,
	Pagination,
	LazyLoad,
	Keyboard,
	Sync,
	A11y,
	Breakpoints,
};

export const LIGHT = {
	Options,
	Elements,
	Controller,
	Slides,
	Track,
	Clones,
	Layout,
	Drag,
	Autoplay,
	Arrows,
	Pagination,
	A11y,
};