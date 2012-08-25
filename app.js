//v2.0
(function() {

	/**
	*@module appJS
	*@main appJS
	*@class Core
	*@static
	**/
	var appJS = {};
	if(typeof window !== 'undefined') {
		window.appJS = appJS;
	} else {
		module.exports = appJS;
	}
	/**
	*Tells wether the object given as a parameter has keys or not
	*@method isEmptyObject
	*@return {boolean} true if object is empty or not object, false otherwise
	*@param object {object} Object to be tested
	*@example
	*	appJS.isEmptyObject({}); //true
	*	appJS.isArray({'key': 'value'}); //false
	**/
	appJS.isEmptyObject = function(object) {
		return Object.keys(object).length === 0 || typeof object !== 'object';
	};
	/**
	*Loops over an array or an object executing the callback passed as parameter to each elements.
	*@method forEach
	*@param object {array|object} The array or object to iterate through.
	*@param cb {function} The function to be called with three parameters. Return false to stop the loop.
	*	@param cb.value {any} The value of the element being traversed.
	*	@param cb.index {number|string} The index of the element being traversed.
	*	@param cb.array {array|object} The array or object being traversed.
	*@param [bind] {object} Object to used as “this” while traversing.
	*@example
	*	appJS.forEach(['sandwich', 'tarte', 'glace'], function(element, index, array) {
	*		alert(element + ' corresponds to ' + index);
	*	});
	*	//returns "sandwich corresponds to 0", "tarte corresponds to 1", "glace corresponds to 2"
	**/
	appJS.forEach = function(object, cb, bind ) {
		var T = bind ? bind : undefined,
			retour = true;
		if(object === null || typeof object === 'undefined') {
			throw new TypeError('object must be defined and not null');
		}
		if(typeof cb !== 'function') {
			throw new TypeError('cb must be a function and defined');
		}
		var keys = Object.keys(object),
			k = 0,
			len = keys.length >>> 0;
		while(k < len) {
			var kValue,
				key = k.toString() === keys[k] ? k : keys[k];
			kValue = object[key];
			retour = cb.call(T, kValue, key, object);
			if(retour === false) {
				break;
			}
			k++;
		}
	};
	/**
	*Tells wether a object is from a class or not
	*@method isClass
	*@return {boolean} true if obj corresponds to the class.
	*@param obj {any} Object to test
	*@param str {string} Name of the class
	*@example
	*	var body = document.body;
	*	appJS.isClass(body, 'HtmlBodyElement'); //true
	*	appJS.isClass(body, 'String'); //false
	**/
	appJS.isClass = function(obj, str) {
		return Object.prototype.toString.call(obj) === '[object ' + str + ']';
	};
	var change = [
		'Array',
		'Boolean',
		'Date',
		'Function',
		'Number',
		'String',
		'RegExp'
	];
	var buildFunction = function(num) {
		return function(obj) {
			return appJS.isClass(obj, num);
		};
	};

	/**
	*Tells wether the parameter given is an array or not.
	*@method isArray
	*@return {boolean} true if object is an array, false otherwise.
	*@param object {any} Object to be tested
	*@example
	*	appJS.isArray(['hoho', 'hehe']); //true
	*	appJS.isArray(3); //false
	**/
	appJS.isArray = buildFunction(change[0]);
	/**
	*Tells wether the parameter given is a boolean or not.
	*@method isBoolean
	*@return {boolean} true if object is a boolean, false otherwise.
	*@param object {any} Object to be tested
	*@example
	*	appJS.isBoolean(true); //true
	*	appJS.isBoolean(3); //false
	**/
	appJS.isBoolean = buildFunction(change[1]);
	/**
	*Tells wether the parameter given is a date or not
	*@method isDate
	*@return {boolean} true if object is a date, false otherwise
	*@param object {any} Object to be tested
	*@example
	*	appJS.isDate(new Date()); //true
	*	appJS.isDate(3); //false
	**/
	appJS.isDate = buildFunction(change[2]);
	/**
	*Tells wether the parameter given is a function or not
	*@method isFunction
	*@return {boolean} true if object is a function, false otherwise
	*@param object {any} Object to be tested
	*@example
	*	appJS.isFunction(function() { console.log('this is a function') ; }); //true
	*	appJS.isFunction(3); //false
	**/
	appJS.isFunction = buildFunction(change[3]);
	/**
	*Tells wether the parameter given is a number or not
	*@method isNumber
	*@return {boolean} true if object is a number, false otherwise
	*@param object {any} Object to be tested
	*@example
	*	appJS.isNumber(['hoho', 'hehe']); //false
	*	appJS.isNumber('3'); //false
	*	appJS.isNumber(3); //true
	**/
	appJS.isNumber = buildFunction(change[4]);
	/**
	*Tells wether the parameter given is a string or not
	*@method isString
	*@return {boolean} true if object is a string, false otherwise
	*@param object {any} Object to be tested
	*@example
	*	appJS.isString('3'); //true
	*	appJS.isNumber(3); //false
	**/
	appJS.isString = buildFunction(change[5]);
	/**
	*Tells wether the parameter given is a regexp or not
	*@method isRegexp
	*@return {boolean} true if object is a regexp, false otherwise
	*@param object {any} Object to be tested
	*@example
	*	appJS.isRegexp(/\w/); //true
	*	appJS.isNumber(3); //false
	**/
	appJS.isRegexp = buildFunction(change[6]);
	/**
	*Tells wether the parameter given is an object or not
	*@method isObject
	*@return {boolean} true if object is an object, false otherwise
	*@param object {any} Object to be tested
	**/
	appJS.isObject = function(obj) {
		return obj && typeof obj === 'object';
	};

})();



