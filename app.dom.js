//v2.0
(function() {
	/**
	*This module provides many functions to manipulate the DOM.
	*@module appJS
	*@submodule Dom
	*@class Dom
	*@static
	**/
	appJS.dom = appJS.dom || {};
	/**
	*Gets the first element in the DOM corresponding to a css selector
	*@method query
	*@param CSSSelector {string} CSS Selector used to find the node
	*@param [HTMLelement] {HTMLElement|appJS.dom.Element} If specified, research will be on this node. Otherwise, it will be done over the whole document
	*@return {appJS.dom.Element|null} Returns the element or null if not found
	*@chainable
	*@example
	*	<html><!-- No head, it's a short example -->
	*		<body><div><a href="link">A big Link></a></div></body>
	*	</html>
	*	appJS.dom.query('a[href="link"]'); //An instance of appJS.dom.Element corresponding
	**/
	appJS.dom.query = function(string, HTMLelement) {
		if (appJS.isString(string)) {
			var element;
			if (HTMLelement) {
				if (HTMLelement instanceof appJS.dom.Element) {
					element = HTMLelement.query(string);
				} else if (HTMLelement.nodeType && HTMLelement.nodeType === 1) {
					element = HTMLelement.querySelector(string);
				} else {
					throw new Error('HTMLelement must be HTMLElement or AppJs Element');
				}
			} else {
				element = document.querySelector(string);
			}
			if (element === null) {
				return null;
			}
			return new appJS.dom.Element(element);
		} else {
			throw new Error('First parameter of query must be a string !');
		}
	};
	/**
	*Same as query, but gets all the results into an appJS.dom.Elements
	*@method queryAll

	*@chainable
	*@param CSSSelector {string} CSS Selector used to find the node
	*@param [HTMLelement] {HTMLElement|appJS.dom.Element} If specified, research will be on this node. Otherwise, it will be done over the whole document
	*@return {appJS.dom.Elements|null} All the elements or null if not found
	**/
	appJS.dom.queryAll = function(string, HTMLelement) {
		if (appJS.isString(string)) {
			var elements;
			if (HTMLelement) {
				if (HTMLelement instanceof appJS.dom.Element) {
					elements = HTMLelement.queryAll(string);
				} else if (HTMLelement.nodeType && HTMLelement.nodeType === 1) {
					elements = HTMLelement.querySelectorAll(string);
				} else {
					throw new Error('HTMLelement must be HTMLElement or AppJs Element');
				}
			} else {
				elements = document.querySelectorAll(string);
			}
			if (elements === null) {
				return null;
			}
			return new appJS.dom.Elements(elements);
		} else {
			throw new Error('First parameter of query must be a string !');
		}
	};
	/**
	*Gets an element from its id. Same as appJS.dom.query('#id');
	*@method byId

	*@chainable
	*@param id {string} Id to be looked for
	*@return {appJS.dom.Element|null} The element with the id matching or null if not found
	**/
	appJS.dom.byId = function(id) {
		return appJS.dom.query('#' + id);
	};
	/**
	*Gets an element from its id. Same as appJS.dom.query('#id'); Alias for app.dom.byId for compatibility.
	*@method getById

	*@chainable
	*@param id {string} Id to be looked for
	*@return {appJS.dom.Element|null} The element with the id matching or null if not found
	**/
	appJS.dom.getById = function(id) {
		return appJS.dom.byId(id);
	};
	/**
	*Gets an element from its class. Same as appJS.dom.query('.class');
	*@method byClass

	*@chainable
	*@param classname {string} class to be looked for
	*@param bool {boolean} Returns all the elements or just one
	*@return {appJS.dom.Element|appJS.dom.Elements|null} The element(s) with the class matching or null if not found
	**/
	appJS.dom.byClass = function(classname, bool) {
		var meth = bool ? 'queryAll' : 'query';
		return appJS.dom[meth]('.' + classname);
	};
	/**
	*Gets an element from its class. Same as appJS.dom.query('.class'); Compatibility with byClass
	*@method getByClass

	*@chainable
	*@param classname {string} class to be looked for
	*@param bool {boolean} Returns all the elements or just one
	*@return {appJS.dom.Element|appJS.dom.Elements|null} The element(s) with the class matching or null if not found
	**/
	appJS.dom.getByClass = function(classname, bool) {
		return appJS.dom.byClass(classname, bool);
	};
	/**
	*Gets elements from their class. Same as appJS.dom.queryAll('.class');
	*@method byClassAll

	*@chainable
	*@param className {string} class to be looked for
	*@return {appJS.dom.Elements|null} Elements with the class matching or null if not found
	**/
	appJS.dom.byClassAll = function(className) {
		return appJS.dom.byClass('.' + className, true);
	};
	/**
	*Gets elements from their class. Same as appJS.dom.queryAll('.class'); Compatibility with byClassAll
	*@method getByClassAll

	*@chainable
	*@param className {string} class to be looked for
	*@return {appJS.dom.Elements|null} Elements with the class matching or null if not found
	**/
	appJS.dom.getByClassAll = function(classname) {
		return appJS.dom.byClassAll(classname);
	};
	/**
	*Creates a node or nodes with a special syntax. See the example.
	*@method create

	*@param options {string|object} If string, will create an empty element. The string will be the tag name.
	*If it is only an element with some text, give an object like this:
		{
			"a": "hehe"
		}
	*If there are many elements unrelated, give this
		{
			"span": {
				//stuff },
				"a": {
					//stuff
				}
			}
		}
	*If element has children, give this
		{
			"div":
				{
				"a": {
				//stuff
				},
				"p": {
				//stuff
				}
			}
		}
	*If element has attributes, give this (always a children property, even if he doesn't have any)
		{
			"a": {
				"href: "link",
				"id": "sandwich",
				"children": {}
			}
		}
	*Text elements are done with #text tag: don't try to use any attributes, it won't work
		{
			"#text": "sandwich"
		}
	*You can also give a number as property when there are numerous tags (tagname is required)
		{
			0: {
				tagname: 'a',
				href: 'link',
				children: {}
			},
			1: {
				tagname: '#text',
				text: 'sandwich'
			}
		}
	*(for the text element, use a `text` property and don't add any children property)
	*@param [parents] {array} Can be two types of array: [parent, 'append'] or [parent, 'insertBefore', which]. Here, parent and which are HTMLElement or appJS.dom.Element instance.
	*@return {appJS.dom.Element|appJS.dom.Elements} The element(s) created
	*@example
	*	appJS.dom.create({
	*		div: {
	*			p: {
	*				id: "sandwich",
	*				children: {
	*					a: {
	*						href: "link",
	*						text: "Link",
	*						children: {}
	*					}
	*				}
	*			}
	*		}
	*	}, [appJS.dom.body, 'append']);
	*	//Will give
	*	<body>
	*		<div>
	*			<p id="sandwich">
	*				<a href="link">Link</a>
	*			</p>
	*		</div>
	*	</body>
	*/
	appJS.dom.create = function(options, parents) {
		if (options) {
			var retour = [];
			if (appJS.isString(options) && options !== '#text') {
				retour[0] = new appJS.dom.Element(document.createElement(options));
			} else if (appJS.isObject(options)) {
				for (var i in options) {
					if (options.hasOwnProperty(i)) {
						var element;
						if (!isNaN(parseInt(i, 10))) {
							if (options[i].tagname === '#text') {
								element = new appJS.dom.NodeText(document.createTextNode(options[i].text));
							} else {
								element = new appJS.dom.Element(document.createElement(options[i].tagname));
							}
						} else {
							if (i === '#text' && typeof options[i] === 'string') {
								element = new appJS.dom.NodeText(document.createTextNode(options[i]));
							} else {
								element = new appJS.dom.Element(document.createElement(i));
							}
						}
						if (typeof options[i] === 'string') {
							if (i !== '#text') {
								element.set('text', options[i]);
							}
						} else if (typeof options[i] === 'object') {
							var e, options_tmp;
							if (options[i].children) {
								for (var a in options[i]) {
									if (options[i].hasOwnProperty(a)) {
										if (a !== 'tagname') {
											if (a !== 'children') {
												element.set(a, options[i][a]);
											} else {
												for (e in options[i].children) {
													if (options[i].children.hasOwnProperty(e)) {
														options_tmp = {};
														options_tmp[e] = options[i].children[e];
														appJS.dom.create(options_tmp, [element, 'append']);
													}
												}
											}
										}
									}
								}
							} else if (options[i].tagname && options[i].tagname === '#text') {
								element.nodeValue = options[i].text;
							} else {
								for (e in options[i]) {
									if (options[i].hasOwnProperty(e)) {
										if (e !== 'tagname') {
											options_tmp = {};
											options_tmp[e] = options[i][e];
											appJS.dom.create(options_tmp, [element, 'append']);
										}
									}
								}
							}
						}
						retour.push(element);
					}
				}
			}
			if (parents) {
				if (appJS.isArray(parents)) {
					if (parents[0] instanceof appJS.dom.Element) {
						if (parents[1] === 'append') {
							appJS.forEach(retour, function(value, index, array) {
								parents[0].append(array[index]);
							});
						} else if (parents[1] === 'insertBefore') {
							if (parents[2]) {
								appJS.forEach(retour, function(value, index, array) {
									parents[0].insertBefore(array[index], parents[2]);
								});
							} else {
								throw new Error('parents[2] must be specified with insertBefore');
							}
						}
					} else if (parents[0].nodeType && parents[0].nodeType === 1) {
						parents[0] = new appJS.dom.Element(parents[0]);
						if (parents[1] === 'append') {
							appJS.forEach(retour, function(value, index, array) {
								parents[0].append(array[index]);
							});
						} else if (parents[1] === 'insertBefore') {
							if (parents[2]) {
								appJS.forEach(retour, function(value, index, array) {
									parents[0].insertBefore(array[index], parents[2]);
								});
							} else {
								throw new Error('parents[2] must be specified with insertBefore');
							}
						}
					} else {
						throw new Error('Parent must be an HTMLElement or an appJS.dom.Element instance');
					}
				} else {
					throw new Error('parents must be array');
				}
			}
			if (retour.length === 1) {
				return retour[0];
			} else if (retour.length === 0) {
				return null;
			} else {
				return new appJS.dom.Elements(retour);
			}
		} else {
			throw new Error('Options must be specified');
		}
	};
	/**
	* Creates appJS.dom.Element from html string
	* @method  fromHTML
	* @param { string } html html string
	* @final
	* @return {appJS.dom.Element|appJS.dom.Elements} Elements created from html
	**/
	appJS.dom.fromHTML = function(html) {
		if(appJS.isString(html) && html !== '') {
			var div = appJS.dom.create({
				'div': {
					'html': html,
					'children': {}
				}
			});
			var childs = div.getChild();
			if(childs.array.length > 1) {
				return childs;
			} else {
				return childs.item(0);
			}
		} else {
			throw new TypeError('html must be a string');
		}
	};
	/**
	*Adds an event listener on an Element
	*@method addEvent

	*@param element {HTMLElement|appJS.dom.NodeText} The element on which you want to add the event listener
	*@param event {string} The event to listen
	*@param [boil=false] {boolean} Corresponds to the third parameter of HTMLElement.addEventListener
	*@param callback {callback} Function called every time the event is fired
	*@param callback.e {object} Object, same as parameter of the callback of HTMLElement.addEventlistener with other methods
	*@param callback.e.stop {function} Stops the default handling of the event (stop submiting a form for example)
	*@async
	**/
	appJS.dom.addEvent = function(element, event, boil, callback) {
		if (appJS.isFunction(boil)) {
			callback = boil;
			boil = false;
		}
		var boil_var = boil ? true : false;
		if (element.nodeType) {
			appJS.dom.addEvent(new appJS.dom.Element(element), event, boil, callback);
		} else if (element instanceof appJS.dom.Element) {
			if (element.element.addEventListener) {
				element.element.addEventListener(event, function(e) {
					e.stop = function() {
						this.preventDefault();
					};
					callback.call(element, e);
				}, boil_var);
			} else if (element.element.attachEvent) {
				element.element.attachEvent('on' + event, function() {
					var e = window.event;
					e.stop = function() {
						this.returnValue = false;
					};
					callback.call(element, e);
				});
			}
		}
	};
	/**
	*Removes an event. Needs the same callback that had been given has a parameter when adding the event listener
	*@method removeEvent

	*@param element {HTMLElement} The element on which you want to add the event listener
	*@param event {string} The event to listen
	*@param [boil=false] {boolean} Corresponds to the third parameter of HTMLElement.addEventListener
	*@param callback {callback} Function called every time the event is fired
	*@param callback.e {object} Object, same as parameter of the callback of HTMLElement.addEventlistener with other methods
	*@param callback.e.stop {function} Stops the default handling of the event (stop submiting a form for example)
	*@async
	**/
	appJS.dom.removeEvent = function(element, event, boil, callback) {
		if (appJS.appJS.isFunction(boil)) {
			callback = boil;
			boil = false;
		}
		var boil_var = boil ? true : false;
		if (element.nodeType) {
			appJS.dom.addEvent(new appJS.dom.Element(element), event, boil, callback);
		} else if (element instanceof appJS.dom.Element) {
			if (element.element.removeEventListener) {
				element.element.removeEventListener(event, function(e) {
					e.stop = function() {
						this.preventDefault();
					};
					callback.call(element, e);
				}, boil_var);
			} else if (element.element.detachEvent) {
				element.element.detachEvent('on' + event, function() {
					var e = window.event;
					e.stop = function() {
						this.returnValue = false;
					};
					callback.call(element, e);
				});
			}
		}
	};
	/**
	* @method fire
	* @param  {HTMLElement|appJS.dom.Element|appJS.dom.NodeText} element Element on which the event will be triggered
	* @param  {string} event   The event to trigger
	* @param  {object} [options] The options to add to the event and accessible by e.options.
	*/
	appJS.dom.fire = function(element, event, options) {
		if (element.nodeType) {
			if (appJS.isString(event)) {
				var onevent = 'on' + event;
				if (typeof element[onevent] === 'function') {
					element[onevent]();
				} else if (typeof element[event] === 'function') {
					element[event]();
				} else {
					var eventMade;
					if (document.createEvent) {
						eventMade = document.createEvent('HTMLEvents');
						eventMade.initEvent(event, true, true);
					} else {
						eventMade = document.createEventObject();
						eventMade.eventType = event;
					}
					eventMade.options = options || {};
					if (document.createEvent) {
						return element.dispatchEvent(eventMade);
					} else {
						return element.fireEvent('on' + eventType, event);
					}
				}
			} else {
				throw new Error('event must be a string');
			}
		} else if (element instanceof appJS.dom.Element) {
			return appJS.dom.fire(element.element, event, options);
		} else if (element instanceof appJS.dom.NodeText) {
			return appJS.dom.fire(element.nodeText, event, options);
		} else {
			throw new Error('element must be an HTMLElement, an appJS.dom.Element or an appJS.dom.NodeText instance');
		}
	};
	/**
	*Convert an HTMLElement to an appJS.dom.Element or the contrary
	*@method convert
	*@param element {HTMLElement|appJS.dom.Element} The element converted
	*@return {HTMLElement|appJS.dom.Element} The result of the conversion
	**/
	appJS.dom.convert = function(element) {
		if (element instanceof appJS.dom.Element) {
			return element.element;
		} else if (element.nodeType && element.nodeType === 1) {
			return new appJS.dom.Element(element);
		} else {
			throw new Error('element must be an HTMLElement or an appJS.dom.Element instance');
		}
	};
	/**
	*Element class, wraps HTMLElement to add methods and properties
	*@class Dom Element

	*@requires Core
	*@requires Dom
	*@constructor
	*@param element {HTMLElement} The HTMLElement to be wrapped in the class

	**/
	appJS.dom.Element = function(element) {
		/**
		*`this`  acessible form all the methods
		*@property this_
		*@private
		*@type appJS.dom.Element

		**/
		var this_ = this;
		/**
		*Element stored into a property
		*@property element
		*@public
		*@type HTMLElement

		**/
		this.element = null;
		if (element.nodeType && element.nodeType === 1) {
			this.element = element;
		} else {
			throw new Error('element must be an HTMLElement');
		}
		/**
		*Name of the tag
		*@property tagName
		*@public
		*@type String

		**/
		this.tagName = this.element.tagName.toLowerCase();
		/**
		*Object of attributes of the Element, for those who prefer to access to attributes via element.attributes.attribute
		*@property attributes
		*@public
		*@type Object

		**/
		this.attributes = this.element.attributes;
		/**
		*Object of styles of the Element, for those who prefer to access to the style via element.style.property
		*@property style
		*@public
		*@type Object

		**/
		this.style = this.element.style;
		/**
		*Does an appJS.dom.query from the element: same as appJS.dom.query(string, element); where the element is here this.element
		*@method query
		*@param string {string} CSS Selector to search with.
		*@return {appJS.dom.Element} The element matching the CSS selector

		*@chainable
		**/
		this.query = function(string) {
			return appJS.dom.query(string, this_.element);
		};
		/**
		*Does an appJS.dom.queryAll from the element: same as appJS.dom.query(string, element); where the element is here this.element
		*@method queryAll
		*@param string {string} CSS Selector to search with.
		*@return {appJS.dom.Elements} The elements matching the CSS selector

		*@chainable
		**/
		this.queryAll = function(string) {
			return appJS.dom.queryAll(string, this_.element);
		};
		/**
		*Does an appJS.dom.query from the element: same as appJS.dom.query('#string', element); where the element is here this.element. Alias for byId for compatiblity.
		*@method getByyId
		*@param id {string} Id to search with.
		*@return {appJS.dom.Element} The element matching the id

		*@chainable
		**/
		this.getById = function(id) {
			return this_.byId(id);
		};
		/**
		*Does an appJS.dom.query from the element: same as appJS.dom.query('#string', element); where the element is here this.element
		*@method byId
		*@param id {string} Id to search with.
		*@return {appJS.dom.Element} The element matching the id

		*@chainable
		**/
		this.byId = function(id) {
			return this_.query('#' + id);
		};

		/**
		*Does an appJS.dom.query from the element: same as appJS.dom.query('.string', element); where the element is here this.element
		*@method byClass

		*@chainable
		*@param classname {string} class to be looked for
		*@param bool {boolean} Returns all the elements or just one
		*@return {appJS.dom.Element|appJS.dom.Elements|null} The element(s) with the class matching or null if not found
		**/
		this.byClass = function(classname, bool) {
			var meth = bool ? 'queryAll' : 'query';
			return this_[meth]('.' + classname, this_.element);
		};
		/**
		*Does an appJS.dom.query from the element: same as appJS.dom.query('.string', element); where the element is here this.element Compatibility with byClass
		*@method getByClass

		*@chainable
		*@param classname {string} class to be looked for
		*@param bool {boolean} Returns all the elements or just one
		*@return {appJS.dom.Element|appJS.dom.Elements|null} The element(s) with the class matching or null if not found
		**/
		this.getByClass = function(classname, bool) {
			return this_.byClass(classname, bool);
		};
		/**
		*Does an appJS.dom.queryAll from the element: same as appJS.dom.queryAll('.string', element); where the element is here this.element
		*@method byClassAll

		*@chainable
		*@param className {string} class to be looked for
		*@return {appJS.dom.Elements|null} Elements with the class matching or null if not found
		**/
		this.byClassAll = function(className) {
			return this_.byClass('.' + className, true);
		};
		/**
		*Does an appJS.dom.queryAll from the element: same as appJS.dom.queryAll('.string', element); where the element is here this.element Compatibility with byClassAll
		*@method getByClassAll

		*@chainable
		*@param className {string} class to be looked for
		*@return {appJS.dom.Elements|null} Elements with the class matching or null if not found
		**/
		this.getByClassAll = function(classname) {
			return this_.byClassAll(classname);
		};
		/**
		*Empty the element
		*@method empty

		*@example
		*	<div id="sandwich"><span>hehe</span></div>
		*	appJS.dom.getById('sandwich').empty();
		*	<div id="sandwich"></div>
		**/
		this.empty = function() {
			this_.element.innerHTML = '';
		};
		/**
		*Gets appJS.dom.Element.element
		*@method getDOMElement

		*@return {appJS.dom.Element} The property element
		**/
		this.getDOMElement = function() {
			return this_.element;
		};
		/**
		*Destroy the Element
		*@method destroy

		**/
		this.destroy = function() {
			this_.element.parentNode.removeChild(this_.element);
		};
		/**
		*@method parent
		*@return {appJS.dom.Element} Parent of the Element

		**/
		this.parent = function() {
			return new appJS.dom.Element(this.element.parentNode);
		};
		/**
		*Gets any child of the Element but only elements. It uses appJS.dom.Element.element.childNodes.
		*@method getChild

		*@chainable
		*@param [option] {number} Option is the number where the child is.
		*@return {appJS.dom.Element|appJS.dom.Elements} The nth child HTMLElement as an appJS.dom.Element or all the elements if option not specified;
		**/
		this.getChild = function(option) {
			if (this_.element.hasChildNodes()) {
				var index = 0,
					t,
					i,
					retour;
				if (appJS.isNumber(option)) {
					retour = null;
					for(i = 0, t = this_.element.childNodes.length ; i < t ; i++) {
						if(this_.element.childNodes[i].nodeType === 1) {
							if(index === option) {
								retour = new appJS.dom.Element(this_.element.childNodes[i]);
								break;
							}
							index++;
						}
					}
					return retour;
				} else if (typeof option === 'undefined') {
					retour = [];
					for(i = 0, t = this_.element.childNodes.length ; i < t ; i++) {
						if(this_.element.childNodes[i].nodeType === 1) {
							retour.push(new appJS.dom.Element(this_.element.childNodes[i]));
						}
					}
					return new appJS.dom.Elements(retour);
				} else {
					throw new Error('Option must be a number');
				}
			}
		};
		/**
		*Gets any text child of the Element. It uses appJS.dom.Element.element.childNodes.
		*@method getChild

		*@chainable
		*@param [option] {number} Option is the numeber where the child is.
		*@return {appJS.dom.NodeText} The nth child nodetext  or all the text elements if option not specified.
		**/
		this.getTextChild = function(option) {
			if (this_.element.hasChildNodes()) {
				var index = 0,
					t,
					i,
					retour;
				if (appJS.isNumber(option)) {
					retour = null;
					for(i = 0, t = this_.element.childNodes.length ; i < t ; i++) {
						if(this_.element.childNodes[i].nodeType === 3) {
							index++;
						}
						if(index === option) {
							retour = new appJS.dom.NodeText(this_.element.childNodes[i]);
							break;
						}
					}
					return retour;
				} else if (typeof option === 'undefined') {
					retour = [];
					for(i = 0, t = this_.element.childNodes.length ; i < t ; i++) {
						if(this_.element.childNodes[i].nodeType === 1) {
							retour.push(new appJS.dom.NodeText(this_.element.childNodes[i]));
						}
					}
					return retour.length >= 0 ? new appJS.dom.Elements(retour) : null;
				} else {
					throw new Error('Option must be a number');
				}
			}
		};
		/**
		*Gets the the structure of the tag. Same as HTMLElement.outerHTML.
		*@method tagComplete

		*@return {string} The structure of the tag. Ideal to use with innerHTML in some cases
		*@example
		*	<span id="sandwich"></span>
		*	console.log(appJS.dom.getById('sandwich').tagComplete()); //'<span id="sandwich"></span>'
		**/
		this.tagComplete = function() {
			return this_.element.outerHTML;
		};
		/**
		*Adds an event to the element. Same as appJS.dom.addEvent(element, event, boil, callback); where element is appJS.dom.Element.element
		*@method addEvent

		*@param event {string} Name of the event. Form: 'click', not 'onclick'
		*@param [boil=false] {boolean} Corresponds to the third parameter of HTMLElement.addEventListener. False is default.
		*@param callack {callback} Callback to call when event is fired.
		*@param callback.e {object} Event object, same as in addEventListener, but with new methods. See appJS.dom.addEvent for further information;
		*@async
		**/
		this.addEvent = function(event, boil, callback) {
			if (appJS.isFunction(boil)) {
				callback = boil;
				boil = false;
			}
			appJS.dom.addEvent(this_.element, event, boil, callback);
		};
		/**
		*Remove an event. Needs the same function that had be used to add the event;
		*@method removeEvent

		*@param event {string} Name of the event. Form: 'click', not 'onclick'
		*@param [boil=false] {boolean} Corresponds to the third parameter of HTMLElement.addEventListener. False is default.
		*@param callack {callback} Callback to call when event is fired.
		*@param callback.e {object} Event object, same as in addEventListener, but with new methods. See appJS.dom.addEvent for further information;
		*@async
		**/
		this.removeEvent = function(event, boil, callback) {
			if (appJS.isFunction(boil)) {
				callback = boil;
				boil = false;
			}
			appJS.dom.removeEvent(this_.element, event, boil, callback);
		};
		/**
		*Shortcut for appJS.dom.fire
		*@method fire
		*@param  {string} event     Event to trigger
		*@param  {object} [options] Options accessible by e.options
		*/
		this.fire = function(event, options) {
			return appJS.dom.fire(this_.element, event, options);
		};
		/**
		*Sets attributes, style, and others
		*@method set

		*@param option {string|object} The name of the attribute. Can be text to set the text, style to set a style, styles to set styles, html to set the innerHTML and events to set multiple events at once.
		*If option is an object, method will call itself for every properties. For events, it will call addEvent. For others, it will look into properties.
		*@param value {any} The value to set to every attributes. For styles, must be an object of property: value, for events, must be either an array [event, boil, callback] or an object of {event: [boil, callback]}
		*For events, can also be an object of event: callback and boil will be false. Look appJS.dom.Element.addEvent for further information. If you have multiple function for the same events, you can give an object of {event: [[boil, callback], [boil, callback]]}
		**/
		this.set = function(option, value) {
			var set = {
				text: function(value) {
					if (this_.element.innerText !== undefined) {
						this_.element.innerText = value;
					} else {
						this_.element.textContent = value;
					}
				},
				style: function(value) {
					if (appJS.isArray(value)) {
						this_.element.style[value[0]] = value[1];
					} else {
						throw new Error('When setting style, value must be an array [property, value]');
					}
				},
				styles: function(value) {
					if (typeof value === 'object') {
						for (var property in value) {
							if (value.hasOwnProperty(property)) {
								this_.element.style[property] = value[property];
							}
						}
					} else {
						throw new Error('When setting styles, value must be an object with {property: value}');
					}
				},
				html: function(value) {
					this_.element.innerHTML = value;
				},
				events: function(value) {
					if (appJS.isArray(value)) {
						if (typeof value[0] === 'string' && typeof value[1] === 'boolean' && typeof value[2] === 'function') {
							this_.addEvent(value[0], value[1], value[2]);
						} else {
							throw new Error('options must be an array: [string, boolean, function]');
						}
					} else if (typeof value === 'object') {
						for (var e in value) {
							if (value.hasOwnProperty(e)) {
								if (appJS.isArray(value[e])) {
									if (appJS.isArray(value[e][0])) {
										appJS.forEach(value[e], function(el) {
											var object = {};
											object[e] = el;
											this_.set('events', object);
										});
									} else {
										this_.addEvent(e, value[e][0], value[e][1]);
									}
								} else if (typeof value[e] === 'function') {
									this_.addEvent(e, false, value[e]);
								} else {
									throw new Error('value[e] must be an array or a function');
								}
							}
						}
					}
				}
			};
			var defaut = function(option, value) {
				if(value === false) {
					this_.element.removeAttribute(option);
				} else {
					if (this_.element.hasOwnProperty(option)) {
						this_.element[option] = value;
					} else {
						this_.element.setAttribute(option, value);
					}
				}
			};
			if (appJS.isString(option)) {
				if (set.hasOwnProperty(option)) {
					return set[option](value);
				} else {
					return defaut(option, value);
				}
			} else if (typeof option === 'object') {
				for (var i in option) {
					if (option.hasOwnProperty(i)) {
						return this_.element.set(i, option[i]);
					}
				}
			} else {
				throw new Error('Option must be a string or an object');
			}
		};
		/**
		*Shortcut for appJS.dom.Element.set('style', [property, value]);
		*@method setStyle
		*@param property {string} Property of the style
		*@param value {string} Value of the property

		**/
		this.setStyle = function(property, value) {
			this_.set('style', [property, value]);
		};
		/**
		*Shortcut for appJS.dom.Element.set('styles', {
			property: value,
			property: value
		});
		*@method setStyles
		*@param style {object} Same as the second parameter of appJS.dom.Element.set('styles', values); Type of {property: value}

		**/
		this.setStyles = function(styles) {
			this_.set('styles', styles);
		};
		/**
		*Appends an element by doing an appendChild
		*@method append
		*@param element {HTMLElement|appJS.dom.Element|Elements} Element to append. If it is an appJS.dom.Elements, all elements will be appened.

		**/
		this.append = function(element) {
			if (element.nodeType && element.nodeType === 1) {
				this_.element.appendChild(element);
			} else if (element instanceof appJS.dom.Element) {
				this_.element.appendChild(element.element);
			} else if (element instanceof appJS.dom.Elements) {
				appJS.forEach(element.array, function(value, index, array) {
					this_.append(value);
				});
			} else if (element instanceof appJS.dom.NodeText) {
				this_.element.appendChild(element.nodeText);
			} else {
				throw new Error('element must be an HTMLElement, an appJS Elements, an appJS NodeText or a AppJS Element. It can also be an array of one of both above.');
			}
		};
		/**
		*Gets any attribute or style.
		*@method get

		*@param option {string} The name of the property. Can be text for the text, styles for styles, style for a style and html for innerHTML. For others, use the regular name
		*@param [cssvalues] {string|array} Required only when option is style or styles. For style, it corresponds to the name of the property and to styles, it is an array of properties.
		*@return {any} The content of the propertie(s) of attribute(s)
		**/
		this.get = function(option, cssvalues) {
			var get = {
				text: function() {
					return this_.element.textContent || this_.element.innerText || '';
				},
				styles: function(cssvalues) {
					if (appJS.isArray(cssvalues)) {
						var object;
						for (var i in cssvalues) {
							if (cssvalues.hasOwnProperty(i)) {
								if (this_.element.style.hasOwnProperty(i)) {
									object.push(this_.element.style[i]);
								} else {
									return null;
								}
							}
						}
						return object;
					} else {
						throw new Error('cssvalues must be an array of properties');
					}
				},
				style: function(cssvalues) {
					if (appJS.isString(cssvalues)) {
						if (this_.element.style.hasOwnProperty(cssvalues)) {
							return this_.element.style[cssvalues];
						} else {
							return null;
						}
					} else {
						throw new Error('When getting style, cssvalues must be a string');
					}
				},
				html: function() {
					return this_.element.innerHTML;
				}
			};
			var defaut = function(option) {
				if (typeof this_.element[option] !== 'undefined') {
					return this_.element[option];
				} else {
					return this_.element.getAttribute(option);
				}
			};
			if (get.hasOwnProperty(option)) {
				return get[option](cssvalues);
			} else {
				return defaut(option);
			}
		};
		/**
		*Shortcut for appJS.dom.Element.get('style', style);
		*@method getStyle

		*@param style {string} Name of the property
		*@return {string} Content of the property
		**/
		this.getStyle = function(style) {
			return this.get('style', style);
		};
		/**
		*Shortcut for appJS.dom.Element.get('styles', styles);
		*@method getStyles

		*@param styles {array} Array of properties
		*@return {array} Array of the content of the properties
		**/
		this.getStyles = function(styles) {
			return this.get('styles', styles);
		};
		this.getCompStyles = function(cssvalues) {
			if (appJS.isArray(cssvalues)) {
				var object;
				for (var i in cssvalues) {
					if (cssvalues.hasOwnProperty(i)) {
						if (getComputedStyle) {
							if (getComputedStyle(this_.element, null)[i]) {
								object.push(getComputedStyle(this_.element, null)[i]);
							} else {
								object.push(null);
							}
						} else if (this_.element.currenStyle) {
							if (this_.element.currentStyle[i]) {
								object.push(this_.element.currentStyle[i]);
							} else {
								object.push(null);
							}
						}
					}
				}
				return object;
			} else {
				throw new Error('cssvalues must be an array of values');
			}
		};
		this.getCompStyle = function(cssvalues) {
			if (appJS.isString(cssvalues)) {
				if (getComputedStyle) {
					if (getComputedStyle(this_.element, null)[cssvalues]) {
						return getComputedStyle(this_.element, null)[cssvalues];
					} else {
						return null;
					}
				} else if (this_.element.currentStyle) {
					if (this_.element.currentStyle[cssvalues]) {
						return this_.element.currentStyle[cssvalues];
					} else {
						return null;
					}
				}
			} else {
				throw new Error('When getting style, cssvalues must be a string');
			}
		};
		/**
		*Inserts an element before an other as a child of the current element.
		*@method insertBefore

		*@param who {HTMLElement|appJS.dom.Element} The element inserted.
		*@param which [HTMLElement|appJS.dom.Element] The element inserted is inserted before it.
		**/
		this.insertBefore = function(who, which) {
			if (who instanceof appJS.dom.Element) {
				who = who.element;
			} else if (who.nodeType && who.nodeType === 1) {
				who = who;
			} else {
				throw new Error('Who parts must be an HTMLElement or an AppJs Element');
			}

			if (which instanceof appJS.dom.Element) {
				which = which.element;
			} else if (which.nodeType && which.nodeType === 1) {
				whichIs = which;
			} else if (appJS.isString(which)) {
				which = appJS.query(string).element;
			} else {
				throw new Error('which parts must be an array, an HTMLElement or an AppJs Element');
			}

			return this_.element.insertBefore(who, which);
		};
		/**
		*Shortcut for appJS.dom.create(options, [appJS.dom.Element.element, 'append']). See appJS.dom.create for further information.
		*@method create

		*@param options {string|object} See appJS.dom.create for a complete explanation of this parameter.
		*@return {appJS.dom.Element|appJS.dom.Elements} The element(s) created
		*@chainable
		**/
		this.create = function(options) {
			return appJS.dom.create(options, [this_.element, 'append']);
		};
	};
	/**
	*Elements class, wraps appJS.dom.Element to add methods and properties
	*@class Dom Elements
	*@requires Core
	*@requires Dom
	*@constructor
	*@param array {array} Array of HTMLElement, NodeText or appJS.dom.Element
	*@return {array} The array given as a parameter and stored as a property. This array only contains appJS.dom.Element instances.
	**/
	appJS.dom.Elements = function(array) {
		if (appJS.isArray(array) || Object.prototype.toString.call(array) === '[object NodeList]') {
			/**
			*Where array is stored
			*@property array
			*@type array
			*@public

			**/
			this.array = [];
			/**
			*This accessible for every methods
			*@property this_
			*@type appJS.dom.Elements
			*@private

			**/
			var this_ = this;
			//this fills this.array by converting every HTMLElement
			appJS.forEach(array, function(value, index, array) {
				if(index !== 'length') {
					if (value instanceof appJS.dom.Element) {
						this_.array.push(value);
					} else if (value.nodeType && [1, 3].indexOf(value.nodeType) !== -1) {
						if (value.nodeType === 3) {
							this_.array.push(new appJS.dom.NodeText(value));
						} else {
							this_.array.push(new appJS.dom.Element(value));
						}
					} else {
						throw new Error('Array parts must be HTMLElement, NodeText or AppJS Element');
					}
				}
			});
			this.item = function(number) {
				if(appJS.isNumber(number)) {
					if(number < this.array.length - 1 && number > 0) {
						return this.array[number];
					} else {
						throw new Error('number must be between 0 and the array.length - 1');
					}
				} else {
					throw new TypeError('number must be a number');
				}
			};
			/**
			*Does appJS.dom.Element.query to every element of appJS.dom.Elements
			*@method query
			*@param string {string} CSS Selector to search with.
			*@return {appJS.dom.Element} The element matching the CSS selector

			*@chainable
			**/
			this.query = function(string) {
				var retour = [];
				appJS.forEach(this_.array, function(value, index, array) {
					retour.push(value.query(string));
				});
				return retour;
			};
			/**
			*Does appJS.dom.Element.queryAll to every element of appJS.dom.Elements
			*@method queryAll
			*@param string {string} CSS Selector to search with.
			*@return {appJS.dom.Elements} The elements matching the CSS selector

			*@chainable
			**/
			this.queryAll = function(string) {
				var retour = [];
				appJS.forEach(this_.array, function(value, index, array) {
					retour.push(value.queryAll(string));
				});
				return retour;
			};
			/**
			*Empty every appJS.dom.Element
			*@method empty

			**/
			this.empty = function() {
				appJS.forEach(this_.array, function(value, index, array) {
					value.empty();
				});
			};
			/**
			*Adds event to every appJS.dom.Element
			*@method addEvent

			*@param event {string} Name of the event. Form: 'click', not 'onclick'
			*@param [boil=false] {boolean} Corresponds to the third parameter of HTMLElement.addEventListener. False is default.
			*@param callack {callback} Callback to call when event is fired.
			*@param callback.e {object} Event object, same as in addEventListener, but with new methods. See appJS.dom.addEvent for further information;
			*@async
			**/
			this.addEvent = function(event, boil, callback) {
				appJS.forEach(this_.array, function(value, index, array) {
					value.addEvent(event, boil, callback);
				});
			};
			/**
			*Remove an event for every appJS.dom.Element
			*@method removeEvent

			*@param event {string} Name of the event. Form: 'click', not 'onclick'
			*@param [boil=false] {boolean} Corresponds to the third parameter of HTMLElement.addEventListener. False is default.
			*@param callack {callback} Callback to call when event is fired.
			*@param callback.e {object} Event object, same as in addEventListener, but with new methods. See appJS.dom.addEvent for further information;
			*@async
			**/
			this.removeEvent = function(event, boil, callback) {
				appJS.forEach(this_.array, function(value, index, array) {
					value.removeEvent(event, boil, callback);
				});
			};
			/**
			*Sets attributes, style, and others for every appJS.dom.Element
			*@method set

			*@param option {string|object} The name of the attribute. Can be text to set the text, style to set a style, styles to set styles, html to set the innerHTML and events to set multiple events at once.
			*If option is an object, method will call itself for every properties. For events, it will call addEvent. For others, it will look into properties.
			*@param value {any} The value to set to every attributes. For styles, must be an object of property: value, for events, must be either an array [event, boil, callback] or an object of {event: [boil, callback]}
			*For events, can also be an object of event: callback and boil will be false. Look appJS.dom.Element.addEvent for further information. If you have multiple function for the same events, you can give an object of {event: [[boil, callback], [boil, callback]]}
			**/
			this.set = function(option, value) {
				appJS.forEach(this_.array, function(el, index, array) {
					el.set(option, value);
				});
			};
			/**
			*Shortcut for appJS.dom.Element.set('style', [property, value]); for every appJS.dom.Element
			*@method setStyle
			*@param property {string} Property of the style
			*@param value {string} Value of the property

			**/
			this.setStyle = function(property, value) {
				appJS.forEach(this_.array, function(el, index, array) {
					el.setStyle(property, value);
				});
			};
			/**
			*Shortcut for appJS.dom.Element.set('styles', {
				property: value,
				property: value
			}); for every appJS.dom.Element
			*@method setStyles
			*@param style {object} Same as the second parameter of appJS.dom.Element.set('styles', values); Type of {property: value}

			**/
			this.setStyles = function(styles) {
				appJS.forEach(this_.array, function(value, index, array) {
					value.setStyles(styles);
				});
			};
			/**
			*Appends an element by doing an appendChild for every appJS.dom.Element
			*@method append
			*@param element {HTMLElement|appJS.dom.Element|Elements} Element to append. If it is an appJS.dom.Elements, all elements will be appened.

			**/
			this.append = function(element) {
				appJS.forEach(this_.array, function(value, index, array) {
					value.append(element);
				});
			};
		} else {
			throw new Error('Array must be an array');
		}
	};
	/**
	*@class Dom NodeText
	*@requires Core
	*@requires Dom
	*@constructor
	*@param nodeText {Text} a nodeText
	**/
	appJS.dom.NodeText = function(nodeText) {
		var this_ = this;
		/**
		*@property nodeText
		*@type Text
		*@public

		**/
		this.nodeText = (nodeText.nodeType && nodeText.nodeType === 3) ? nodeText : null;
		this.nodeValue = this.nodeText.nodeValue ? this.nodeText.nodeValue : '';
		/**
		*Destroy the Element
		*@method destroy

		**/
		this.destroy = function() {
			var element = this_.element;
			element.parentNode.removeChild(element);
		};
		/**
		*@property parent
		*@type appJS.dom.Element
		*@public

		**/
		this.parent = null;
		if (this.parentNode && !this.parentNode.doctype) {
			this.parent = new appJS.dom.Element(this.element.parentNode);
		}
		/**
		*Adds an event to the element. Same as appJS.dom.addEvent(element, event, boil, callback); where element is appJS.dom.Element.element
		*@method addEvent

		*@param event {string} Name of the event. Form: 'click', not 'onclick'
		*@param [boil=false] {boolean} Corresponds to the third parameter of HTMLElement.addEventListener. False is default.
		*@param callack {callback} Callback to call when event is fired.
		*@param callback.e {object} Event object, same as in addEventListener, but with new methods. See appJS.dom.addEvent for further information;
		*@async
		**/
		this.addEvent = function(event, boil, callback) {
			if (appJS.isFunction(boil)) {
				callback = boil;
				boil = false;
			}
			appJS.dom.addEvent(this_.element, event, boil, callback);
		};
		/**
		*Remove an event. Needs the same function that had be used to add the event;
		*@method removeEvent

		*@param event {string} Name of the event. Form: 'click', not 'onclick'
		*@param [boil=false] {boolean} Corresponds to the third parameter of HTMLElement.addEventListener. False is default.
		*@param callack {callback} Callback to call when event is fired.
		*@param callback.e {object} Event object, same as in addEventListener, but with new methods. See appJS.dom.addEvent for further information;
		*@async
		**/
		this.removeEvent = function(event, boil, callback) {
			if (appJS.isFunction(boil)) {
				callback = boil;
				boil = false;
			}
			appJS.dom.removeEvent(this_.element, event, boil, callback);
		};
	};
	/**
	*Shortcut for appJS.dom.query('body'). Can be useful.
	*@for Dom
	*@property body
	*@type appJS.dom.Element
	*@public

	**/
	appJS.dom.body = new appJS.dom.Element(document.body);
})();
