//v2.0
(function() {
	/**
	*This module provides a simple way to create classes and make them inherit between each other.
	*@module appJS
	*@submodule Class
	*@class Class
	*@static
	**/
	appJS['class'] = appJS['class'] || {};

	/**
	*Simplifies the class creation in javascript
	*@method class
	*@param properties {object} Object of properties to apply to the class
	*@param [properties.extends] {class} A class to extend.
	*@param [properties.inherit] {class} A class to inherit properties.
	*@param [properties.initialize] {function} The constructor to add to the class.
	*@return {class} Returns a class
	*@beta
	*@chainable
	**/
	appJS['class'] = function(properties) {
		if(typeof properties === 'object') {
			var newClass = function() {};
			var values = {
				'extends': function(classToExtend) {
					if(classToExtend.prototype) {
						newClass.prototype = Object.create ? Object.create(classToExtend.prototype) : new classToExtend();
					} else {
						throw new Error('classToExtend must be a Class');
					}
				},
				inherit: function(classToInherit) {
					for(var o in classToInherit) {
						if(classToInherit.hasOwnProperty(o)) {
							newClass.prototype[o] = classToInherit.prototype[o];
						}
					}
				},
				initialize: function(cons) {
					if(appJS.isFunction(cons)) {
						newClass.prototype.constructor = cons;
					} else {
						throw new Error('Constructor must be a function');
					}
				}
			};
			for(var i in properties) {
				if(properties.hasOwnProperty(i)) {
					if(values.hasOwnProperty(i)) {
						values[i](properties[i]);
					} else {
						newClass.prototype[i] = properties[i];
					}
					newClass.prototype.add = function(obj) {
						if(typeof obj === 'object') {
							for(var e in obj) {
								if(obj.hasOwnProperty(e)) {
									this[e] = obj[e];
								}
							}
						}
					};
				}
			}
			return newClass;
		} else {
			throw new Error('properties must be an Object');
		}
	};
})();
