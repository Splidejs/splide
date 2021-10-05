const info = require( '../../package.json' );

module.exports = `/*!
 * Splide.js
 * Version  : ${ info.version }
 * License  : ${ info.license }
 * Copyright: ${ new Date().getFullYear() } ${ info.author }
 */`;
