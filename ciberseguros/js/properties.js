function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var CONSTANTES = {};
CONSTANTES.loaded = false;
CONSTANTES.callbackQueue = [];
CONSTANTES.ready = function(func){
	if(CONSTANTES.loaded == false){
		CONSTANTES.callbackQueue.push(func)
	} else {
		func();
	}
}

CONSTANTES.fireEvent = function(){
	CONSTANTES.loaded = true;
	for (var i = 0; i < CONSTANTES.callbackQueue.length; i++) {
		CONSTANTES.callbackQueue[i]();
		// CONSTANTES.callbackQueue.splice(i, 1);
	}
}

document.addEventListener("prop-loaded-handler", function(e) {
	CONSTANTES.fireEvent();
});
function loadProperties(properties) {
	try{
		var keys  = Object.keys(properties);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			CONSTANTES[key] = properties[key];
		}
		//CONSTANTES = properties;
		CONSTANTES.REST.SERVICES = CONSTANTES.PATHS.BASEURL+CONSTANTES.REST.SERVICES;
		CONSTANTES.REST.BUSSERVICES = CONSTANTES.PATHS.BASEURLBUS+CONSTANTES.REST.BUSSERVICES;
		if(CONSTANTES && CONSTANTES.ENVIRONMENT && CONSTANTES.ENVIRONMENT != "TMP-DES" && CONSTANTES.ENVIRONMENT != "loc"){
			CONSTANTES.REST.PAYMENT = CONSTANTES.REST.SERVICES+CONSTANTES.REST.PAYMENT; 
		} else {
			CONSTANTES.REST.PAYMENT = CONSTANTES.PATHS.BASEURL+CONSTANTES.REST.PAYMENT;
		}

	} catch(e){
		console.log("Ha ocurrido un error al obtener las properties");
	}
	var event = new CustomEvent("prop-loaded-handler", {detail:null});
	document.dispatchEvent(event);
}

$.get((CONSTANTES.FORCE_DES && (location.href.match("localhost") || location.href.match("127.0.0.1")) ?"http://desa.telefonicainsurance.com":"")+"/servlet/PropInitializerServlet")
	.done(loadProperties)
	.fail(
	function(error) {
		console.log("Ha ocurrido un error al obtener las properties. Se reintenta desde des:");
		$.get("https://desa.telefonicainsurance.com/servlet/PropInitializerServlet")
			.done(loadProperties)
			.fail(
			function(error) {
				console.log("Ha ocurrido un error al obtener las properties. Se reintenta desde des:");
			}
		);
	}
);
var propInterval = setInterval(propWatcher,1000);

function propWatcher(){
	if(CONSTANTES && CONSTANTES.PATHS){
		if(!CONSTANTES.loaded){
			var event = new CustomEvent("prop-loaded-handler", {detail:null});
			document.dispatchEvent(event);
		}
		clearInterval(propInterval);
	}
}