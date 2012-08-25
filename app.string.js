//v2.0
(function() {
	/**
	*This module provides many functions to deal with strings.
	*@module appJS
	*@submodule String
	*@class String
	*@static
	**/
	appJS.string = appJS.string || {};
	/**
	*Adds str at the index position. Negative values for index will go backwards from length.
	*@method insert
	*@param str {string} String
	*@param added {string} String to add to str
	*@param [index=str.length] {number} Index where to add str.
	*@return {string} Final string
	**/
	appJS.string.add = function(str, added, index) {
		if(appJS.isString(str) && appJS.isString(added)) {
			var ind = appJS.isNumber(index) ? index : str.length;
			if(ind === str.length) {
				return str + added;
			} else if (ind === 0) {
				return added + str;
			} else {
				var before, after;
				if(ind > 0) {
					before = str.substring(0, ind);
					after = str.substring(ind, str.length);
					return before + added + after;
				} else {
					before = str.substring(0, str.length + ind);
					after = str.subtring(str.length + ind, str.length);
					return before + added + after;
				}
			}
		} else {
			throw new TypeError('str and added must be a string and defined !');
		}
	};
	/**
	*Alias {name} in string with parameters
	*@method alias
	*@param str {string} String to apply
	*@param assign {array|object} Array of values or object with key/values to assign
	*@return {string} Final string
	*@example
	*	appJS.string.alias('This is a {0} {1}', ['super', 'example']);
	*	appJS.string.alias('This is a {sup} {inc}', {sup: 'super', inc: 'example'});
	**/
	appJS.string.alias = function(str, obj) {
		if(appJS.isString(str)) {
			if(appJS.isArray(obj) || typeof obj === 'object') {
				var finalStr = obj;
				appJS.forEach(obj, function(item, key) {
					finalStr = str.replace('{' + key + '}', item);
				});
				return finalStr;
			} else {
				throw new TypeError('obj must be an array or an object');
			}
		} else {
			throw new TypeError('str must be a string and defined !');
		}
	};
	/**
	*Give the characters at a given index
	*@method at
	*@param str {string} String to apply
	*@param index {number|array} Index or array of indexes
	*@return {string|array} Character or array of characters corresponding
	**/
	appJS.string.at = function(str, index) {
		if(appJS.isString(str)) {
			if(appJS.isNumber(index)) {
				if(index >= 0) {
					return str.length > index ? str[index] : str[index % str.length];
				} else {
					return str.length > Math.abs(index) ? str[str.length + index] : str[str.length + (index % str.length)];
				}
			} else if (appJS.isArray(index)) {
				var retour = [];
				appJS.forEach(index, function(item) {
					retour.push(appJS.string.at(str, item));
				});
				return retour;
			} else {
				throw new TypeError('index must be a number or an array of numbers !');
			}
		} else {
			throw new TypeError('str must be a string and defined !');
		}
	};
	/**
	*Camelize where there are hyphen and underscores (and the first letter depending on the parameter)
	*@method camelize
	*@param string {string} String to camelize
	*@param [maj=false] {boolean} Camelize the first letter too
	*@return {string} String camelized
	**/
	appJS.string.camelize = function(string, maj) {
		if(typeof maj === 'undefined' || maj !== true) { maj = false; }
		if(!appJS.isString(string)) { throw new TypeError('string must be a string'); }
		var finalStr = string;
		if(maj) {
			finalStr = finalStr[0].toUpperCase() + finalStr.substring(1, finalStr.length);
		}
		var getPos = function(str, letter) {
			var pos = str.indexOf(letter),
				tmp_str = str;
			while (pos !== -1) {
				tmp_str = tmp_str.substring(0, pos) + tmp_str[pos + 1].toUpperCase() +tmp_str.substring(pos + 1, tmp_str.length);
				pos = str.indexOf(letter);
			}
			return tmp_str;
		};
		appJS.array.forEach(['_', '-'], function(item) {
			finalStr = getPost(finalStr, item);
		});
		return finalStr;
	};
	/**
	*Capitalize the first letter (or all if the parameter is set to true)
	*@method capitalize
	*@param str {string} String to capitalize
	*@param [maj=false] {boolean} Capitalize all the letters
	*@return {string} String capitalized
	**/
	appJS.string.capitalize = function(str, maj) {
		if(typeof maj === 'undefined' || maj !== true) { maj = false; }
		if(!appJS.isString(str)) { throw new TypeError('str must be a string'); }
		if(maj) {
			return str[0].toUpperCase() + str.substring(1, str.length);
		} else {
			return str.toUpperCase();
		}
	};
	/**
	*Apply the callback to each line of the string
	*@method lines
	*@param str {string} String
	*@param [cb] {callback} Callback to apply.
	*@param cb.line {string} Line passed to the callback
	*@return {array} Array of lines
	**/
	appJS.string.lines = function(str, cb) {
		if(!appJS.isString(str)) { throw new TypeError('str must be a string !'); }
		var lines = str.split('\n');
		if(appJS.isFunction(cb)) {
			appJS.array.forEach(lines, function(item) {
				cb(lines);
			});
		}
		return lines;
	};
	/**
	*Remove any part of the string that matches the argument
	*@method remove
	*@param str {string} String
	*@param [cb] {regexp|string} Can be a callback, a regex or a string.
	*@return {string} String without the removed part
	**/
	appJS.string.remove = function(str, cb) {
		if(!appJS.isString(str)) { throw new TypeError('str must be a string !'); }
		return str.replace(cb, '');
	};
	/**
	*Reverse any string
	*@method reverse
	*@param str {string} String to reverse
	*@return {string} String reversed
	**/
	appJS.string.reverse = function(str) {
		if(!appJS.isString(str)) { throw new TypeError('str must be a string !'); }
		return str.split('').reverse().join('');
	};
	/**
	*Converts a string to a number. If there is a point, conversion will be to Floats
	*@method toNumber
	*@param str {string} String to convert
	*@param base {Number} Base to convert it
	*@return {Number|Float|isNaN} Number from the conversion
	**/
	appJS.string.toNumber = function(str, base) {
		if(!appJS.isString(str)) { throw new TypeError('str must be a string !'); }
		var string = str.replace(/,/g, '');
		return str.match(/\./) ? parseFloat(str) : parseInt(str, base || 10);
	};
	/**
	*Escapes a string from all html characters in order to prevent XSS issues.
	*@method escapeHTML
	*@param str {string} String to escape
	*@return {String} String escaped
	**/
	appJS.string.escapeHTML = function(str) {
		if(!appJS.isString(str)) { throw new TypeError('str must be a string !'); }
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	};
	/**
	*Escapes a string from all regexp special characters
	*@method escapeRegExp
	*@param str {string} String to escape
	*@return {String} String escaped
	**/
	appJS.string.escapeRegExp = function(str) {
		if(!appJS.isString(str)) { throw new TypeError('str must be a string !'); }
		var reg = /([\\\/'*+?|()\[\]{}.\^$])/g;
		return str.replace(reg, '\\$1');
	};
	/**
	*Escapes character in a string to make a valid url
	*@method escapeURL
	*@param str {string} String to escape
	*@param [all=false] {boolean} If all is true, it will also escape valid URL characters for use as a URL parameter.
	*@return {String} String escaped
	**/
	appJS.string.escapeURL = function(str, all) {
		if(!appJS.isString(str)) { throw new TypeError('str must be a string !'); }
		if(typeof all === 'undefined' || all !== true) { all = false; }
		return all ? encodeURIComponent(str) : encodeURI(str);
	};
	/**
	*Restores escaped HTML characters
	*@method unescapeHTML
	*@param str {string} String to unescape
	*@return {String} String unescaped
	**/
	appJS.string.unescapeHTML = function(str) {
		if(!appJS.isString(str)) { throw new TypeError('str must be a string !'); }
		return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
	};
	/**
	*Restores escaped characters in an URL escaped string
	*@method unescapeURL
	*@param str {string} String to escape
	*@param [all=false] {boolean} If set to true, only non-valid URL characters will be unescaped
	*@return {String} String escaped
	**/
	appJS.string.unescapeURL = function(str, all) {
		if(!appJS.isString(str)) { throw new TypeError('str must be a string !'); }
		if(typeof all === 'undefined' || all !== true) { all = false; }
		return all ? decodeURI(str) : decodeURIComponent(str);
	};
})();
