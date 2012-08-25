//v2.0
(function() {
	/**
	*This module provides many functions related to the Array Object
	*@module appJS
	*@submodule Array
	*@class Array
	*@static
	**/

	appJS.array = appJS.array || {};

	/**
	*Alias for compatibility with {{#crossLink "Core/forEach"}}appJS.forEach{{/crossLink}}
	*@method forEach
	**/
	appJS.array.forEach = function(array, cb, bind) {
		appJS.forEach(array, cb, bind);
	};

	/**
	*Clones an array
	*@method clone
	*@return {array} The clone of the array
	*@param array {array} The array to be cloned
	*@example
	*	appJS.array.clone(['sandwich', 'beurre']); //['sandwich', 'beurre']
	**/
	appJS.array.clone = function(array) {
		if(appJS.isArray(array)) {
			var retour = [];
			appJS.array.forEach(array, function(el) {
				retour.push(el);
			});
			return retour;
		} else {
			throw new Error('array must be an Array');
		}
	};
	/**
	*Returns true if the callback returns true for every item
	*@method every
	*@return {boolean} True if the callback returns true for every item, false otherwise
	*@param array {array} Array to be traversed
	*@param cb {function|regexp|any} Function to be called for each item. Can be a regexp or a simple value to compare.
	*	@param cb.value {any} Value of the Element being traversed
	*	@param cb.index {number} Index of the element being traversed
	*	@param cb.array {array} Array being traversed
	*@param [bind] {object} Value of this in the function
	*@example
	*	appJS.array.every(['sandwich', 3], function(item) { return appJS.isNumber(item); }); //false
	*	appJS.array.every(['sandwich', 3], /^\d+$/); //false. Same as above.
	*	appJS.array.every(['sandwich', 'sandstorm'], function(item) { return appJS.isString(item); }); //true
	**/
	appJS.array.every = function(array, cb, bind) {
		var t;
		if(bind) {
			t = bind;
		}
		if(appJS.isArray(array)) {
			var trues = 0;
			var func;
			if(appJS.isFunction(cb)) {
				func = function(item, index, arr) {
					return cb.call(t, item, index, array) === true;
				};
			} else if (appJS.isRegExp(cb)) {
				func = function(item) {
					return cb.test(item);
				};
			} else {
				func = function(item) {
					return cb === item;
				};
			}
			appJS.array.forEach(array, function(item, index, arr) {
				var retour = func(item, index, arr);
				if(retour === true) {
					trues++;
				}
			});
			return (trues === array.length);
		} else {
			throw new Error('array must be an Array');
		}
	};
	/**
	*Returns an array of all the value that return true when called with the cb.
	*@method filter
	*@return {array|null} Array of value that returns true in the callback, null if none corresponds
	*@param array {array} Array to be traversed
	*@param cb {function|any} Function to be called for each item. If not a function, will compare the value.
	*	@param cb.value {any} Value of the Element being traversed
	*	@param cb.index {number} Index of the element being traversed
	*	@param cb.array {array} Array being traversed
	*@param [bind] {object} Value of this in the function
	*@example
	*	appJS.array.filter([3, 'sandwich', null], function(item) { return appJS.isNumber(item); }); //[3]
	*	appJS.array.filter([3, 'sandwich', null], function(item) { return item == null; }); //[null]
	*	appJS.array.filter([3, 'sandwich', null], /^(.[^\d])+$/); //['sandwich', null]
	**/
	appJS.array.filter = function(array, cb, bind) {
		if(appJS.isArray(array)) {
			var retourFunc;
			if(appJS.isFunction(cb)) {
				retourFunc = function(item) {
					return cb(item) === true;
				};
			} else if (appJS.isRegexp(cb)) {
				retourFunc = function(item) {
					return cb.test(item);
				};
			} else {
				retourFunc = function(item) {
					return cb === item;
				};
			}
			var retour = [];
			appJS.array.forEach(array, function(item, index, array) {
				if(func(item, index, array)) {
					retour.push(item);
				}
			});
			return retour || null;
		} else {
			throw new Error('array must be an Array');
		}
	};
	/**
	*Returns the index of the element found in an array.
	*@method indexOf
	*@param array {array} Array where to search
	*@param item {any} What to search in the array. Can be a function with each values of the array as parameter, a regexp or a value that will be compared.
	*@param [from=0] {number} Where to search from. Corresponds to the first index where to search.
	*@return {number} index of the match or -1 if no match.
	*@example
	*	appJS.array.indexOf(['sandwich', 'jambon'], 'sandwich'); //0
	*	appJS.array.indexOf(['sandwich', 'jambon'], 'sandwich', 1); //-1
	*	appJS.array.indexOf(['sandwich', 'jambon'], /j/); //0
	*	appJS.array.indexOf(['sandwich', 'jambon'], function(item) { return appJS.isNumber(item); }); //-1
	**/
	appJS.array.indexOf = function(array, item, from) {
		if(appJS.isArray(array)) {
			var f = 0,
				position = -1;
			if(from) {
				if(appJS.isNumber(from) && from < array.length && from >= 0) {
					f = from;
				} else {
					throw new Error('if from is specified, must be a number between 0 and array.length');
				}
			}
			var retourFunc;
			if(appJS.isFunction(item)) {
				retourFunc = function(el) { return item(el) === true; };
			} else if (appJS.isRegexp(item)) {
				retourFunc = function(el) { return item.test(el) === true; };
			} else {
				retourFunc = function(el) { return item === el; };
			}
			appJS.array.forEach(array, function(el, index, array) {
				if(retourFunc(el) && position === -1 && index >= f) {
					position = index;
				}
			});
			return position;
		} else {
			throw new Error('array must be an Array');
		}
	};
	/**
	*Returns an array with all the indexes of the element matching to the search.
	*@method indexOfAll
	*@param array {array} Array where to search
	*@param item {any} What to search in the array. Can be a function with each values of the array as parameter, a regexp or a value that will be compared.
	*@param [from=0] {number} Where to search from. Corresponds to the first index where to search.
	*@return {array|number} Returns an array made of the indexes of the matches or -1 if no match.
	*@example
	*	appJS.array.indexOfAll(['sandwich', 'jambon', 'sodebo'], /s/); //[0, 2]
	*	appJS.array.indexOfAll(['sandwich', 'jambon'], 'sandwich', 1); //-1
	*	appJS.array.indexOfAll(['sandwich', 'jambon', 'jam'], /j/); //[1, 2]
	*	appJS.array.indexOfAll(['sandwich', 'jambon'], function(item) { return appJS.isString(item) && item.length > 2; }); //[0, 1]
	**/
	appJS.array.indexOfAll = function(array, item, from) {
		if(appJS.isArray(array)) {
			var f = 0,
				position = [];
			if(from) {
				if(appJS.isNumber(from) && from < array.length && from >= 0) {
					f = from;
				} else {
					throw new Error('if from is specified, must be a number between 0 and array.length');
				}
			}
			var retourFunc;
			if(appJS.isFunction(item)) {
				retourFunc = function(el) { return item(el) === true; };
			} else if (appJS.isRegexp(item)) {
				retourFunc = function(el) { return item.test(el) === true; };
			} else {
				retourFunc = function(el) { return item === el; };
			}
			appJS.array.forEach(array, function(el, index, array) {
				if(retourFunc(el) && index >= f) {
					position.push(index);
				}
			});
			return (position.length !== 0) ? position : -1;
		} else {
			throw new Error('array must be an Array');
		}
	};
	/**
	*Creates a new array with the results of calling a provided function on every element in the array.
	*@method map
	*@param array {array} Array where to call the function on.
	*@param cb {function|any} Function to be called for each item. If cb is anything else than a function, the map will look for array[cb].
	*	@param cb.value {any} Value of the Element being traversed
	*	@param cb.index {number} Index of the element being traversed
	*	@param cb.array {array} Array being traversed
	*@param [bind] {object} Value of this in the function
	*@return {array} Array of items
	*@example
	*	appJS.array.map([1, 2, 3], function(item, index) { return item * index; }); //[0, 2, 6]
	**/
	appJS.array.map = function(array, cb, bind) {
		var b = bind ? bind : undefined;
		if(appJS.isArray(array)) {
			var retour = [];
			appJS.array.forEach(array, function(item, index, array) {
				if(appJS.isFunction(cb)) {
					retour.push(cb.call(bind, item, index, array));
				} else {
					if(typeof array[cb] !== 'undefined') {
						retour.push(array[cb]);
					} else {
						retour.push(null);
					}
				}
			});
			return retour;
		} else {
			throw new Error('array is not an Array');
		}
	};
	/**
	*Returns true if at least one element in the array satisfies the provided testing function.
	*@method some
	*@param array {array} Array where to call the function on.
	*@param cb {function} Function to be called for each item.  Can be a regexp or a simple value to compare.
	*	@param cb.value {any} Value of the Element being traversed
	*	@param cb.index {number} Index of the element being traversed
	*	@param cb.array {array} Array being traversed
	*@param [bind] {object} Value of this in the function
	*@return {boolean} True if one item satisfies the function, false otherwise.
	*@example
	*	appJS.array.some(['sandwich', 3, 'beurre'], /\d/); //true
	*	appJS.array.some(['sandwich', 3, 'beurre'], function(item, index) { return typeof item === typeof index; }); //true
	*	appJS.array.some(['sandwich', 3, 'beurre'], function(item) { return appJS.isDate(item); });; //false
	**/
	appJS.array.some = function(array, cb, bind) {
		var b = bind ? bind : undefined;
		if(appJS.isArray(array)) {
			var func;
			if(appJS.isFunction(cb)) {
				func = function(item, index, arr) {
					return cb.call(t, item, index, array) === true;
				};
			} else if (appJS.isRegExp(cb)) {
				func = function(item) {
					return cb.test(item);
				};
			} else {
				func = function(item) {
					return cb === item;
				};
			}
			var retour = 0;
			appJS.array.forEach(array, function(item, index, array) {
				if(func(item, index, array) === true) {
					retour++;
				}
			});
			return (retour > 0) ? true : false;
		} else {
			throw new Error('array is not an Array');
		}
	};
	/**
	*Exclude all the elements of an array that matches the function, regexp or value.
	*@method exclude
	*@param array {array} Array where to call the function on.
	*@param cb {function|regexp|any} Function to be called for each item. or regex or any value.
	*@param cb.item {any} If cb is a function, it takes one parameter.
	*@return {array} Array without the element removed
	*@example
	*	appJS.array.exclude([3, 'sandwich', null], function(item) { return appJS.isNumber(item); }); //['sandwich', null]
	*	appJS.array.exclude([3, 'sandwich', null], function(item) { return item === null; }); //[3, 'sandwich']
	*	appJS.array.exclude([3, 'sandwich', null], /^(.[^\d])+$/); //[3]
	*
	**/
	appJS.array.exclude = function(array, cb) {
		if(appJS.isArray(array)) {
			var retour = [],
				retourFunc;
			if(appJS.isFunction(cb)) {
				retourFunc = function(item) {
					return cb(item) === true;
				};
			} else if (appJS.isRegexp(cb)) {
				retourFunc = function(item) {
					return cb.test(item);
				};
			} else {
				retourFunc = function(item) {
					return cb === item;
				};
			}
			appJS.forEach(array, function(item) {
				if(!retourFunc(item)) {
					retour.push(item);
				}
			});
			return retour;
		} else {
			throw new TypeError('array must be an Array');
		}
	};
	/*
	*Creates an object with key-value pairs based on the array of keywords passed in and the current content of the array.
	*@method associate
	*@param array {array} Its items will be used as values in the object returned
	*@param array2 {array} Its items will be used as keys in the object returned
	*@return {object} New associated object
	*@beta
	*/
	appJS.array.associate = function(array, array2) {
		if(appJS.isArray(array)) {
			if(appJS.isArray(array2)) {
				if(array.length === array2.length) {
					var retour = {};
					for(var i = 0, t = array.length ; i < t ; i++) {
						retour[array2[i]] = array[i];
					}
					return retour;
				} else {
					throw new Error('Both arrays must have the same length');
				}
			} else {
				throw new Error('array2 must be an Array');
			}
		} else {
			throw new Error('array must be an Array');
		}
	};
	/**
	*Tests an array for the presence of an item
	*@method contains
	*@param array {array} Array where to search
	*@param item {any} What to search in the array
	*@return {boolean} True if the array contains the item, otherwise false.
	*@example
	*	appJS.array.contains(['sandwich', 'beurre'], 'sandwich'); //true
	*	appJS.array.contains(['sandwich', 'beurre'], /s/); //true
	**/
	appJS.array.contains = function(array, item) {
		return (appJS.array.indexOf(array, item) === -1) ? false : true;
	};
	/**
	*Appends the content of an array at the end of another one.
	*@method append
	*@param array {array} Array where append
	*@param array2 {array} Array whose content will be appended
	*@return {array} Result of the appending
	*@example
	*	appJS.array.append(['sandwich', 'beurre'], ['jambon', 3]); //['sandwich', 'beurre', 'jambon', 3]
	**/
	appJS.array.append = function(array, array2) {
		if(appJS.isArray(array)) {
			if(appJS.isArray(array2)) {
				appJS.array.forEach(array2, function(item, index, arr) {
					array.push(item);
				});
				return array;
			} else {
				throw new Error('array2 must be an array');
			}
		} else {
			throw new Error('array must be an array');
		}
	};
	/**
	*Returns a random item in an array
	*@method getRand
	*@param array {array} Source
	*@return {any} Random value from the source
	*@example
	*	appJS.array.getRand(['sandwich', 'beurre', 'jambon']); //'sandwich'
	*	appJS.array.getRand(['sandwich', 'beurre', 'jambon']); //'beurre'
	**/
	appJS.array.getRand = function(array) {
		if(appJS.isArray(array)) {
			if(array.length === 0) { return null; }
			var number = Math.floor(Math.random() * array.length);
			return array[number];
		} else {
			throw new Error('array must be an Array');
		}
	};
	/**
	*Adds an item only if it is not already present
	*@method includes
	*@param array {array} The array source
	*@param item {any} The item to add
	*@return {array} Source with, if not present before, the item
	*@example
	*	appJS.array.includes(['sandwich', 'jambon'], 4); //['sandwich', 'jambon']
	*	appJS.array.includes(['sandwich', 'jambon'], 'sandwich'); //['sandwich', 'jambon']
	**/
	appJS.array.includes = function(array, item) {
		if(appJS.isArray(array)) {
			if(!appJS.array.contains(array, item)) {
				array.push(item);
				return array;
			} else {
				return array;
			}
		} else {
			throw new Error('array must be an Array');
		}
	};
	/**
	*Combine two arrays but doesn't allow duplicates
	*@method combine
	*@param array {array} First array to combine
	*@param array2 {array} Second array to combine
	*@return {array} Mix of the two array provided
	*@example
	*	appJS.array.combine(['sandwich', 'jambon'], ['jambon', 3]); //['sandwich', 'jambon', 3]
	**/
	appJS.array.combine = function(array, array2) {
		if(appJS.isArray(array)) {
			if(appJS.isArray(array2)) {
				appJS.array.forEach(array2, function(item, index, arr) {
					if(!appJS.array.contains(array, item)) {
						array.push(item);
					}
				});
				return array;
			} else {
				throw new Error('array2 must be an array');
			}
		} else {
			throw new Error('array must be an array');
		}
	};
	/**
	*Returns the first defined value of an array, or null
	*@method pick
	*@param array {array} Array source where to search
	*@return {any} First defined value
	*@example
	*	appJS.array.pick([null, 3]); //3
	**/
	appJS.array.pick = function(array) {
		if(appJS.isArray(array)) {
			var good;
			appJS.array.forEach(array, function(item) {
				if(typeof item !== 'undefined' && item !== null && typeof good === 'undefined') {
					good = item;
				}
			});
			return typeof good !== 'undefined' ? good : null;
		} else {
			throw new Error('array must be an Array');
		}
	};
	/**
	*Removes undefined or null parts of an array (or all parts that are false if all is set to true)
	*@method compact
	*@param array {Array} Array to apply the function
	*@param all {boolean} If set to true, all falsy part will be removed (false for object that are == true)
	*@return {array|null} Array of value or null if all are removed
	*@example
	*	appJS.array.compact([3, null, 'sandwich', '', undefined]); //[3, 'sandwich', '']
	*	appJS.array.compact([null, undefined]); //null
	*	appJS.array.compact([false, null, 'sandwich', '', undefined], true); //['sandwich']
	**/
	appJS.array.compact = function(array, all) {
		if(!appJS.isArray(array)) { throw new TypeError('array must be an Array'); }
		var a = typeof all !== 'undefined' && all === true ? true : false,
			retour = [],
			func = function(el) {
				if(typeof el !== 'undefined' && el !== null) {
					if(!a) {
						retour.push(el);
					} else if (a && el) {
						retour.push(el);
					}
				}
			};
		appJS.forEach(array, function(item) {
			func(item);
		});
		return retour.length > 0 ? retour : null;
	};
	/**
	*Returns the number of times an item appears
	*@method count
	*@param array {Array} Array to apply the function
	*@param item {any} Pattern to search
	*@return {number} Number of times the pattern is matched
	*@example
	*	appJS.array.count(['sandwich', 'sandstorm'], 'sand'); //0
	*	appJS.array.count(['sandwich', 'sandstorm'], /sand/); //2
	**/
	appJS.array.count = function(array, item) {
		var retour = appJS.array.indexOfAll(array, item);
		return retour === - 1 ? 0 : retour.length;
	};
})();
