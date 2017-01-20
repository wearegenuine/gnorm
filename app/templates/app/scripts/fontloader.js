'use strict';

//This particular flavor also includes a tiny Promise shim for cross-browser compatibility
var FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');
var html = document.documentElement;

// Replace these with your project web fonts
var normal = new FontFaceObserver('Roboto');
var bold = new FontFaceObserver('Roboto', {
  'font-weight': 700
});

html.classList.add('fonts-loading');

/* Should reference any and all custom Font Families being used in our so we
 * don't hide any text during the intial page load.
 */

Promise.all([
  normal.load(),
  bold.load()
])
.then(function() {
  html.classList.remove('fonts-loading');
  html.classList.add('fonts-loaded');
  sessionStorage.fontsLoaded = true;

// Timeout fallback if something fails with the promises.
}, function() {
  html.classList.remove('fonts-loading');
  html.classList.add('fonts-failed');
});
