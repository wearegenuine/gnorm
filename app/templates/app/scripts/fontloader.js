'use strict';


//This particular flavor also includes a tiny Promise shim for cross-browser compatibility
var FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');


var sansRegular = new FontFaceObserver('Roboto', {
  weight: 400
});
var sansBold = new FontFaceObserver('Roboto', {
  weight: 700
});


/* Should reference any and all custom Font Families being used in our so we
 * don't hide any text during the intial page load.
 */

Promise.all([
  sansRegular.check(),
  sansBold.check()
]).then(function() {

  document.documentElement.className += ' ' + 'fonts-loaded';

//Timeout fallback if something fails with the promises.
}, function() {

  document.documentElement.className += ' ' + 'fonts-loaded';

});
