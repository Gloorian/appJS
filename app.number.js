//v2.0
(function() {
	/**
	*This module provides many functions to handle numbers easier than before.
	*@module appJS
	*@submodule Number
	*@class Number
	*@static
	**/

	appJS.number = appJS.number || {};

	/**
	*Returns the provided parameter into a number or null if not a number. Part of Number object.
	*@method from
	*@param number {any} Number provided.
	*@return {number|null} Number from the param, null if not a number.
	**/
	appJS.number.from = function(number) {
		if(isNaN(parseInt(number, 10))) {
			return null;
		} else {
			return parseInt(number, 10);
		}
	};


	/**
	*Returns a random number between min and max. Part of Number object.
	*@method random
	*@param min {any} Minimum. If not passed, then result will be either 0 or 1.
	*@param max {any} Maximum. If not passed, then minimum will be 0 and maximum will be minimum.
	*@return {number} Random number between min and max.
	*@beta
	**/
	appJS.number.random = function(min, max) {
		if(typeof min === 'undefined' || !appJS.isNumber(min)) {
			min = 0;
			max = 1;
		} else if (typeof max === 'undefined' || !appJS.isNumber(max)) {
			max = min;
			min = 0;
		}
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
	/**
	*Limits a number with two other numbers. Part of Number prototype object.
	*@method limit
	*@param number {any} Number to limit. If not a number, appJS.number.from will be used.
	*@param min {any} Minimum of the limit. If not a number, appJS.number.from will be used.
	*@param max {any} Maximum of the limit. If not a number, appJS.number.from will be used.
	*@return {number} If number > max, returns max. If number < min, returns min. Otherwise, returns number.
	**/
	appJS.number.limit = function(number, min, max) {
		if(appJS.isNumber(min) && appJS.isNumber(max) && appJS.isNumber(number)) {
			if(number > max) {
				return max;
			} else if (number < min) {
				return min;
			} else {
				return number;
			}
		} else {
			number = appJS.number.from(number);
			min = appJS.number.from(min);
			max = appJS.number.from(max);
			if(max === null || min === null) {
				throw new Error('min, number and max must be numbers');
			} else {
				return appJS.number.limit(number, min, max);
			}
		}
	};

	/**
	*Calls a function x times where x is number. Also present in Number Prototype.
	*@method times
	*@param number {number} Number of times the function has to be called.
	*@param cb {function} Function to call. The only parameter is the iteration.
	*@param [bind] {object} Value of this into the function.
	*@return
	**/
	appJS.number.times = function(number, cb, bind) {
		for(var i = 0 ; i < number ; i++) {
			cb.call(bind, i);
		}
	};
	/**
	*Returns an int with from the parameter provided. Part of the Number object.
	*@method toInt
	*@param number {any} Number to convert
	*@param [base=10] {number} Base on which to convert
	*@return {number} Result of the conversion
	*@beta
	**/
	appJS.number.toInt = function(number, base) {
		if(!base || !appJS.isNumber(base)) {
			base = 10;
		}
		var result = parseInt(number, base);
		if(isNaN(result)) {
			return null;
		} else {
			return result;
		}
	};
	/**
	*Returns an array containing numbers from num down to limit.
	*@method downto
	*@param num {number} Number to start with.
	*@param [limit] {number} Limit to stop. If not defined, not a number, or greater or equal than num, the function will return an empty array.
	*@param [fn] {function} Function to apply to every number. Accept one parameter, the current number.
	*@param [step=1] {number} The step between each numbers.
	*@return {array} Array of values or empty
	**/
	appJS.number.downto = function(num, limit, fn, step) {
		var retour = [];
		if(typeof step === 'undefined' || !appJS.isNumber(step)) {
			step = 1;
		}
		if(typeof num === 'undefined' || !appJS.isNumber(num)) {
			throw new TypeError('num must be a number and defined');
		}
		if(typeof limit === 'undefined' || !appJS.isNumber(limit) || num <= limit) {
			return retour;
		}
		if(typeof fn === 'undefined' || !appJS.isFunction(fn)) {
			fn = function(n) {};
		}
		for(var i = num ; i > limit ; i--) {
			retour.push(i);
			fn(i);
		}
		return retour;
	};
	/**
	*Returns true if number is even
	*@method isEven
	*@param number {number} number to test
	*@return {boolean} true if number is even, false otherwise
	**/
	appJS.number.isEven = function(number) {
		if(typeof number === 'undefined' || !appJS.isNumber(number)) {
			throw new TypeError('number must be a number and defined');
		}
		return number % 2 === 0;
	};
	/**
	*Returns true if number is an integer
	*@method isInteger
	*@param number {number} number to test
	*@return {boolean} true if number is an integer, false otherwise
	**/
	appJS.number.isInteger= function(number) {
		if(typeof number === 'undefined' || !appJS.isNumber(number)) {
			throw new TypeError('number must be a number and defined');
		}
		return number % 1 === 0;
	};
	/**
	*Returns true if number is a multiple of other
	*@method isMultiple
	*@param number {number} number to test
	*@param other {number} multiple to test
	*@return {boolean} true if number is a multiple of other, false otherwise
	**/
	appJS.number.isMultiple = function(number, other) {
		if(typeof number === 'undefined' || typeof other === 'undefined' || !appJS.isNumber(number) || !appJS.isNumber(other)) {
			return false;
		}
		return number % other === 0;
	};
	/**
	*Adds appJS.number methods to native object Number. Warning: This can be a problem if you have multiple frameworks or if you change native objects.
	*@method allowNative
	*@beta
	**/
	appJS.number.allowNative = function() {
		var methods = [
			[
				'abs',
				'acos',
				'asin',
				'ceil',
				'cos',
				'exp',
				'floor',
				'log',
				'sin',
				'sqrt',
				'tan'
			],
			[
				'atan2',
				'pow'
			]
		];
		methods[0].forEach(function(item) {
			if(!Number.prototype[item]) {
				Number.prototype[item] = function() {
					return Math[item](this);
				};
			}
		});
		methods[1].forEach(function(item) {
			if(!Number.prototype[item]) {
				Number.prototype[item] = function(num) {
					return Math[item](this, num);
				};
			}
		});

		if(!Number.from) {
			Number.from = function(number) {
				return appJS.number.from(number);
			};
		}

		if(!Number.random) {
			Number.random = function(min, max) {
				return appJS.number.random(min, max);
			};
		}
		if(!Number.prototype.limit) {
			Number.prototype.limit = function(min, max) {
				return appJS.number.limit(this, min, max);
			};
		}
		if(!Number.prototype.times) {
			Number.prototype.times = function(cb, bind) {
				return appJS.number.times(this, cb, bind);
			};
		}
		if(!Number.toInt) {
			Number.toInt = function(number, base) {
				if(base) {
					return appJS.number.toInt(number, base);
				} else {
					return appJS.number.toInt(number);
				}
			};
		}
	};

})();
