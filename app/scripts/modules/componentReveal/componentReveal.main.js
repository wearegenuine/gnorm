'use strict'

const $ = require('jquery')

module.exports = class ComponentReveal{
  constructor($el){
		const host = window.location.host
		const hostCheck = function(urlTarget, hostToCheck){
			const innerHost = hostToCheck.match(urlTarget)
			if(innerHost !== null){
				return true
			}
		}
		if(hostCheck('localhost', host) || hostCheck('phpstage', host)){
			let search = window.location.search
			if(search !== ''){
				search = search.split('?r=')
				const revealTarget = $('' + search[1] + '')
				if(revealTarget.length > 0){
					const overlay = $('<div></div>', {
						'class':'reveal-overlay'
					}).appendTo('body')
					$('body').addClass('reveal-adjust')
					revealTarget.addClass('reveal')
				}
			}
		}
  }
}
