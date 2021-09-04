import { DATA_ATTRIBUTE } from '../../constants/project';


/**
 * The data attribute for the src value.
 *
 * @since 3.0.0
 */
export const SRC_DATA_ATTRIBUTE = `${ DATA_ATTRIBUTE }-lazy`;

/**
 * The data attribute for the srcset value.
 *
 * @since 3.0.0
 */
export const SRCSET_DATA_ATTRIBUTE = `${ SRC_DATA_ATTRIBUTE }-srcset`;

/**
 * The selector string for images to load.
 *
 * @since 3.0.0
 */
export const IMAGE_SELECTOR = `[${ SRC_DATA_ATTRIBUTE }], [${ SRCSET_DATA_ATTRIBUTE }]`;
