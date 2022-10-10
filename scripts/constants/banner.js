import info from '../../package.json' assert { type: "json" };


export const BANNER = `/*!
 * Splide.js
 * Version  : ${ info.version }
 * License  : ${ info.license }
 * Copyright: ${ new Date().getFullYear() } ${ info.author }
 */`;
