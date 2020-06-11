/**
 * Export components.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Options     from './options';
import Elements    from './elements';
import Controller  from './controller';
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
	Breakpoints,
	Controller,
	Elements,
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
};

export const LIGHT = {
	Options,
	Controller,
	Elements,
	Track,
	Clones,
	Layout,
	Drag,
	Click,
	Arrows,
	Pagination,
	A11y,
};