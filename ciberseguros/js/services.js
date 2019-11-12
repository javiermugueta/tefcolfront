/**
 * 
 */
function handleReqError(jqXHR, textStatus, errorThrown, errorAction){
	//if(callback && typeof callback === "function") callback(jqXHR.status, jqXHR.responseText);
	var modal = {};
	switch (jqXHR.status){
		case 400:
			if(mostrarError){
				mostrarError([jqXHR.responseText]);
			}
			break;
		case 401:
			deleteCookie("username");
			deleteCookie("token");
			sessionStorage.removeItem("idTarificacion");
			sessionStorage.removeItem("token");
			sessionStorage.removeItem("username");
			sessionStorage.removeItem("rol");
			sessionStorage.removeItem("nCamposAdicionales");
			sessionStorage.removeItem("nCostePresupuesto");
			sessionStorage.removeItem("nPresupuesto");
			sessionStorage.removeItem("policyN");
			sessionStorage.removeItem("solicitudN");
		
			modal.title="Su sesión ha caducado";
			modal.content="Debe volver a autenticarse";
			modal.footerContent = 
				"<a target='_parent' href='/area-privada/login.html?sesion=false'>"+
					"<button class='btn btn-success'><i class='glyphicon glyphicon-log-in'></i> Reconectar</button>"+
				"</a>";
			break;
		case 404:
			modal.title="Recurso no encontrado";
			modal.content="No existen registros para esa búsqueda";
			modal.footerContent = "<button class='btn btn-primary' id='reloadBtn'><i class='glyphicon glyphicon-refresh'></i> Recargar</button>";
			break;
		default:
			modal.title = 'Ha ocurrido un error interno.';
			modal.content = "Vuelva a intentarlo en unos minutos";
			modal.footerContent = "<button class='btn btn-primary' id='reloadBtn'><i class='glyphicon glyphicon-refresh'></i> Recargar</button>";
			break;
	}
	
	modal.init = function(modal){
		$("#reloadBtn").click(function(){
			location.reload();
		});
	}

	if(errorAction) {
		modal.params = {"errorAction" : errorAction};
		if(errorAction.modalname)
			modal.name = errorAction.modalname;

		if(errorAction.title)
			modal.title = errorAction.title;

		if(errorAction.content)
			modal.content = errorAction.content;

		if(errorAction.footerContent)
			modal.footerContent = errorAction.footerContent;

		if(errorAction.eventCloseAction)
			modal.eventCloseAction = errorAction.eventCloseAction;

		if(errorAction.init)
			modal.init = errorAction.init;
	}
	if(jqXHR.status!=400){
		callModalWindow(modal);
	}
}
console.log("Services.js");
var Services = {
		servicio: function (url, token, callback,params,baseURL) {
			var errorAction;
			if (params && params.errorAction) {
				errorAction = params.errorAction;
				delete params.errorAction;
			}
			var peticion = {
				url:  ((baseURL)?baseURL:CONSTANTES.REST.SERVICES) + ((params && params.url)? params.url:url),
				type: 'GET',
				success: function (data, textStatus, jqXHR) {
					if(data!=null){  
						if(callback && typeof callback === "function") callback(jqXHR.status, data);
	    			}else{
	    				if(callback && typeof callback === "function") callback(jqXHR.status, jqXHR.responseText);    
	    			}
				},
				error: function (jqXHR, textStatus, errorThrown){
					handleReqError(jqXHR, textStatus, errorThrown,errorAction);
				},  
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Authorization", decodeURIComponent(token));
	            }
			}; 
			if (typeof params == "object"){
				var keys = Object.keys(params);
				if(params && params.method){
					peticion.method =params.method;
					peticion.type = params.method;
				}
				if(params && params.type){
					peticion.method =params.type;
					peticion.type = params.type;
				}
				
				for (i in keys){
					var key = keys[i];
					if(key!="url")
						peticion[key] = params[key];
					if(key="data"){
						if(typeof peticion[key] == "object")
							peticion[key] = JSON.stringify(peticion[key]);
					}
				}
			}
			$.ajax(peticion);
		},
	servicioIPFilter: function (url, token, callback,params) {
		Services.servicio(url, token, callback,params,CONSTANTES.REST.BUSSERVICES)
	}
}

function getThisHost() {
	return window.location.protocol + "//" + window.location.host;
}