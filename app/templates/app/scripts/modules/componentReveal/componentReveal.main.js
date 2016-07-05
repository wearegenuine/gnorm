'use strict';

var $ = require('jquery');

module.exports = class ComponentReveal{
  constructor($el){
		var host = window.location.host;
		var hostCheck = function(urlTarget, hostToCheck){
			var innerHost = hostToCheck.match(urlTarget);
			if(innerHost !== null){
				return true;
			}
		};
		if(hostCheck('localhost', host) || hostCheck('phpstage', host)){
			var search = window.location.search;
			if(search !== ''){
				search = search.split('?r=');
				var revealTarget = $('' + search[1] + '');
				if(revealTarget.length > 0){
					var overlay = $('<div></div>', {
						'class':'reveal-overlay'
					}).appendTo('body');
					$('body').addClass('reveal-adjust');
					revealTarget.addClass('reveal');
				}
			}
		}
  }
};
