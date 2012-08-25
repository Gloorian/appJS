//v2.0
/*
 * Préférences plugin pour appJS
 * v0.1
 * Gère les préférences persistantes avec HTML5 localStorage.
 * Plus tard, d’autres moyens de stockages seront proposés.
 *
 * par Arnaud Lefort, <arnaud@lefort.me>
 * pour Âpp.com
 */

/*
 * Usage:
 *    appJS.prefs('name' [, 'value'])
 *    where:
 *        <name>     The unique key identifier property (required)
 *        <value>    The value to write in the property (optionnal)
 */



(function(appJS, window) {
	'use strict';

	/**
	*This module provides a quick access to the localStorage.
	*@module appJS
	*@submodule Prefs
	*@class Prefs
	*@static
	**/

	appJS.config = {};
	/**
	*Boolean of the presence of the localStorage
	*@property isPrefs
	*@type {Boolean}
	*/
	appJS.isPrefs = window.localStorage ? true : false;
	/**
	*Simple access to local storage.
	*@method prefs
	*@param name {string} Key of the storage. Getter if only parameter given.
	*@param { string } [value] Set the value associated to the key given as first parameter.
	*@return {any|false} Returns the value assigned to the key
	**/
	appJS.prefs = function(name, value) {
		if (typeof value !== 'undefined')
		{
			window.localStorage[name] = value;
			/*if (options.flags.json)
			{
				return JSON.parse(window.localStorage[options.name])
			}*/
			return window.localStorage[name];
		}
		if (typeof window.localStorage[name] !== 'undefined')
		{
			/*if (options.flags.json)
			{
				return JSON.parse(window.localStorage[options.name])
			}*/
			return window.localStorage[name];
		}
		return false;
	};
})(appJS, window);
