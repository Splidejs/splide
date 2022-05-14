/**
 * The power of the friction.
 *
 * @since 3.0.0
 */
export const FRICTION = 5;

/**
 * If the user stops dragging for this duration with keeping the pointer down, updates the base coord and time.
 *
 * @since 3.0.0
 */
export const LOG_INTERVAL = 200;

/**
 * Start events for dragging.
 *
 * @since 3.0.0
 */
export const POINTER_DOWN_EVENTS = 'touchstart mousedown';

/**
 * Update events for dragging.
 *
 * @since 3.0.0
 */
export const POINTER_MOVE_EVENTS = 'touchmove mousemove';

/**
 * End events for dragging.
 * The `click` event is required because the browser sometimes dispatches `drag` events instead of `mouse`.
 *
 * @since 3.0.0
 */
export const POINTER_UP_EVENTS = 'touchend touchcancel mouseup click';
