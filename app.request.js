//v2.0
/*
 * Request plugin pour appJS
 * v0.1
 * Permet de lancer des requêtes asynchrones, via XMLHTTPrequest
 * (peut-être aussi avec autre chose dans le futur, webSockets ?)
 *
 * par Arnaud Lefort, <arnaud@lefort.me>
 * pour Âpp.com
 */

/*
 * Usage:
 *    appJS.request({uri, method, data, done, async, headers})
 *    where:
 *        <uri>     (string) Destination uri
 *        <method>  (string)
 *        <data>    (object|string) Request body
 *        <done>    (function) Called when the request is completed successfully
 *        <async>   (boolean)
 *        <headers> (object) overwrite the request headers
 * Todo:
 *    À ajouter:
 *        <encoding>
 *        <timeout>
 *        <user>
 *        <password>
 * Valeur de retour:
 *    Actuellement le retour de la fonction est l’objet XMLHTTPRequest. Dans le
 *    futur, cet objet sera remplacé par un ~« appJSrequestResult »~ (le nom
 *    n’est pas définitif).
 */

(function(appJS, window) {
	"use strict";
	/**
	*This module provides an easy way to handle xhr request.
	*@module appJS
	*@class Request
	**/

	/**
	*@method request
	*@param options {object} Options for the request
	*	@param [options.uri=current location] {string} URL for the request
	*	@param [options.method="GET"] {string} Method of the request the request
	*	@param [options.data] {object} Data to send
	*	@param [options.done] {callback} Function to call when the response comes
	*		@param [options.done.request] {object} Request object
	*	@param [async=true] {boolean} Does the request have to async or not ?
	*	@param [headers] {object} Headers, if necessary
	**/
	appJS.request = function(options) {
		var values = {
			'uri': window.location.href,
			'method': 'GET',
			'data': null,
			'done': null,
			'async': true,
			'headers': null
		};
		var value;
		var body;
		for (value in values)
		{
			if (options[value])
			{
				values[value] = options[value];
			}
		}

		// Création de la requête, dans le futur on pourrait imaginer que la
		// requête ne soit plus une XHR mais une webSocket par exemple.
		var request = window.XMLHttpRequest ? window.XMLHttpRequest() :
						window.ActiveXObject("Microsoft.XMLHTTP");

		if (values.data !== null)
		{
			if(values.method.toLowerCase() === 'get') {
				values.uri += '?';
				for(var data in values.data) {
					values.uri += data + '=' + encodeURIComponent(values.data[data]) + '&';
				}
				values.uri = values.uri.substr(0, values.uri.length -1);

			} else if(values.method.toLowerCase() === 'post') {
				if (window.FormData) {
					body = new window.FormData();
					for (value in values.data)
					{
						body.append(value, values.data[value]);
					}
				} else {
					throw "appJS request plugin require FormData.";
				}
			}

		}

		if (values.headers)
		{
			if (request.setRequestHeader)
			{
				for (value in values.headers)
				{
					request.setRequestHeader(value, values[value]);
				}
			}
			else
			{
				throw "appJS request plugin require setRequestHeader.";
			}
		}

		request.open(values.method, values.uri, values.async);

		if (values.done)
		{
			request.onreadystatechange = function() {
				if (request.readyState === request.DONE)
				{
					values.done(request);
				}
			};
		}

		request.send(body);
	};
})(appJS, window);
