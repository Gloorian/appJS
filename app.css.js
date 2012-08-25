//v2.0
(function() {
	/**
	*This module provides a new way to add css to a page.
	*@requires DOM
	*@module appJS
	*@submodule CSS
	*@class CSS
	*@static
	**/

	/**
	*@method css
	*@beta
	*@param obj {object} CSS object.
	*@param param {object} Variables object.
	*@example
	*	appJS.css({
			'body a': {
				'background-color': 'red',
				'color': 'blue',
				'[href]': 'http://âpp.com',
				'span': {
					'color': '%colorSpan%'
				}
			}
		}, {
			'colorSpan': 'yellow'
		});
		//body a { background-color: red; color: blue; } body a span { color: yellow; }
	**/
	appJS.css = function(obj, param) {
		var isNotNode = (typeof module === 'undefined' || (typeof window !== 'undefined' && this === window));
		if(typeof obj !== 'object') { throw new TypeError('obj must be an object'); }
		var vendor = [
			'-o-',
			'-webkit-',
			'-moz-',
			'-ms-',
			''
		];
		var func = function(obj, par) {
			var isPar = typeof par !== "undefined",
				wholeString = '';
			for(var i in obj) {
				if(obj.hasOwnProperty(i)) {
					if(i[0] === '[') {
						if(isPar && isNotNode) {
							appJS.dom.queryAll(par).set(i.substring(1, i.length - 1), obj[i]);
						}
					} else if (typeof obj[i] === 'object') {
						if(isPar) {
							wholeString += ' } ';
							if(i[0] === ':') {
								wholeString += par + i + ' { ';
							} else {
								wholeString += par + ' ' + i + ' { ';
							}
							wholeString += func(obj[i], par + ' ' + i);
						} else {
							wholeString += i + ' { ';
							wholeString += func(obj[i], i);
							wholeString += ' } ';
						}
					} else {
						if(i.substring(0, 9) === '--vendor-') {
							var part = i.substring(9, part.length);
							appJS.forEach(vendor, function(item) {
								wholeString += item + part + ': ' + obj[i] + '; ';
							});
						} else {
							wholeString += i + ': ' + obj[i] + '; ';
						}
					}
				}
			}
			if (!isPar) {
				if(typeof param !== 'undefined' && appJS.isObject(param)) {
					var reg = /([\\\/'*+?|()\[\]{}.\^$])/g;
					for(var e in param) {
						if(param.hasOwnProperty(e)) {
							var re = new RegExp('%' + e.replace(reg, '\\$1') + '%', 'g');
							wholeString = wholeString.replace(re, param[e]);
						}
					}
				}
			}
			if(!isPar && isNotNode) {
				if (document.styleSheets.length === 0 || !document.styleSheets[0].insertRule) {
					appJS.dom.create({
						'style': {
							'text': wholeString,
							'children': {}
						}
					}, [appJS.dom.query('head'), 'append']);
				} else {
					var arrayOf = wholeString.split('}');
					appJS.forEach(arrayOf, function(item) {
						if(item !== '') {
							document.styleSheets[0].insertRule(item + '}', document.styleSheets[0].cssRules.length);
						}
					});
				}
			}
			return wholeString;
		};
		var string = func(obj);
		return string;
	};
})();
