//v2.0
(function(appJS, window) {

	"use strict";
	/**
	*This modules provides internationalization into your projects.
	*@module appJS
	*@submodule Translate
	*@class Translate
	*@static
	**/
	appJS.translate = appJS.translate || {};


	/**
	*Object of settings for the module.
	*@property settings
	*@public
	*@type Object
	**/
	appJS.translate.settings = {};
	var sett = appJS.translate.settings;
	var lang;
	if(window.navigator.browserLanguage) {
		lang = window.navigator.browserLanguage;
	} else {
		lang = window.navigator.language;
	}
	/**
	*Current language of the user.
	*@property settings.current
	*@public
	*@type String
	**/
	sett.current = lang;
	/**
	*Object of equivalents to replace in the code.
	*@property settings.dico
	*@public
	*@type Object
	**/
	sett.dico = null;

	/**
	*Method to configure the module.
	*@method set
	*@public
	*@param settings {Object} Object of basic settings
	*@param {Number} [default=0] Index of the default dico.
	*@param {String} [default=Navigator.language] Current language of the user. If not specified, is automatically taken from the browser settings.
	*@param {Object} dicos Object of equivalents to replace in the code.
	*@example
	*	appJS.translate.set({
	*		'default': 'fr'
	*	}, {
	*		'fr': {
	*			'h1': 'Salut',
	*			'p': {
	*				'a': 'lien'
	*			}
	*		},
	*		'en': {
	*			'h1': 'Hi',
	*			'p': {
	*				'a': 'link'
	*			}
	*		}
	*	});
	**/

	appJS.translate.set = function(settings, dicos) {
		if(typeof dicos === 'object') {
			if(typeof settings === 'object') {
				if(settings.hasOwnProperty('default')) {
					sett['default'] = settings['default'];
				} else {
					sett['default'] = 'en';
				}


				if(settings.hasOwnProperty('current')) {
					sett.current = settings.current;
				}
				for(var i in dicos) {
					if(dicos.hasOwnProperty(i)) {
						if(sett.current.indexOf(i) !== -1) {
							sett.dico = dicos[i];
						}
					}
				}
				if(sett.dico === null) {
					sett.dico = dicos.sett['default'];
				}
			} else {
				throw new TypeError('settings must be an object');
			}
		} else {
			throw new TypeError('dicos must be an object');
		}
	};

	/**
	*Returns the string that corresponds to the path.
	*@method replace
	*@public
	*@param {string} path Path to the variable from the top of the dico (Name of the dico). Use the dots to separate the levels.
	*@param {array} subs Variables to replace the "%" in the order into the string. Use "%%" to inset an "%" and not a variable.
	*@example
	* appJS.translate.replace('p.a')
	**/
	appJS.translate.replace = function(path, subs) {
		var paths = path.split('.');
		var value = sett.dico;
		appJS.forEach(paths, function(item) {
			if(value.hasOwnProperty(item)) {
				value = value[item];
			} else {
				throw new Error('Wrong path. ' + value + ' does not have any ' + item + ' property');
			}
		});
		if(value.indexOf('%') !== -1) {
			if(typeof subs !== 'undefined' && appJS.isArray(subs)) {
				subs.forEach(function(item) {
					value = value.replace(/([^%])%/, "$1" + item);
				});
				value = value.replace(/%%/g, "%");
			} else {
				throw new TypeError('subs must be an array');
			}
		}
		return value;
	};

})(appJS, window);
