var ModalWindowHandler = {
	ActiveModals : {},
	isOpen : false,
	getModalNames:function(){
		return Object.keys(ModalWindowHandler.ActiveModals);
	},
	getActive:function(){
		var active = undefined;
		var modals = this.getModalNames();
		if(modals.length == 1){
			active = this.ActiveModals[modals[0]];
		} else {
			for(var i = 0;i<modals.length;i++){
				var modal = this.ActiveModals[modals[i]];
				if(modal && modal.active){
					active = modal;
				}
			}
		}
		if(active == undefined){
			console.log("Ha ocurrido un error al recuperar la ventana modal");
			console.log(active);
			console.log(ModalWindowHandler);
		}
		return active;
	},
	close : function(closeParams, modal){
		if(modal == undefined)
			modal = ModalWindowHandler.getActive();
		if (modal) {
			if(closeParams)
				modal.closeParams = closeParams;
			if(modal.eventCloseAction || modal.caller){
				if(window.name && window.name == modal.caller || (window.name ==""  && modal.caller == undefined)){
					modal.eventCloseAction(modal.closeParams);
				} else {
					var iframe = $("[name="+modal.caller+"]")[0];
					if(iframe){
						iframe.contentWindow.postMessage({eventName:"modal-window-onclose-handler", params:JSON.stringify(modal)}, "*");	
					}
				}
				if (modal.name && ModalWindowHandler.ActiveModals[modal.name]){
					delete ModalWindowHandler.ActiveModals[modal.name];
				}
			}
			var $target = $('#modalWindowCall');
			if($target == undefined){
				$target = $('.modal[name='+modal.name+']');
			}
			if($target == undefined)
				$target = $('#customModalWindowCall');
			if ($target && modal.parentmodal == undefined)
				$target.modal('toggle');
		}
		ModalWindowHandler.isOpen = false;
	}
}

function callModalWindow(modal){
	var modalname = "modalWindowCall";
	if(modal  == undefined)
		throw Error("Faltan valores");
	
	
	if(typeof modal =="string")
		modal= JSON.parse(modal);
	if(modal.preload){
		modal.preload(modal);
	}
	// Sólo se registra la modal si se require hacer algo en el evento onclose.
	if(modal.eventCloseAction || modal.caller){
		if(modal.name){
			ModalWindowHandler.ActiveModals[modal.name] = modal;
		} else {
			throw new Error ("Debe introducir un name para identificar la ventana modal");
		}
	}
	
	if(modal.params && modal.params.functions){
		var functions = [];
		for(func in modal.params.functions) {
			if(typeof func == "object")
				if (window[func.name] == undefined)
					window[func.name] = new Function("return " + func)();
			else if (typeof func == "function")
				functions.push({type: typeof func,name:func.name,value:func+""})
		}
		modal.params.functions = functions;
	} 
	if (modal.params){
		var keys = Object.keys(modal.params);
		for(key in keys){
			var prop = keys[key];
			if (prop != "functions"){
				if (window[prop] == undefined)
					window[prop] = modal.params[prop];
			}
		}
	}

	if(modal.init != null && typeof modal.init =="string"){
		modal.init = new Function("return " + modal.init)();
	}
	if(window.name != undefined && window.name != ""){
		modal.init = modal.init+"".replace(/'/g,"\\'").replace(/"/g,"\\\"").replace(/\n/g,"").replace(/\t/g,"");
		// Sólo se define el caller si se require hacer algo en el evento onclose.
		if(modal.eventCloseAction)
			modal.caller = window.name;
		parent.postMessage({eventName:"modal-window-handler", params:JSON.stringify(modal)}, "*");
	} else {
		if($("#modalWindowCall") == undefined)
			loadModal();
		if(modal.template){
			modalname = "customModalWindowCall";
			$('#'+modalname).html(modal.template);
		} else {
			if(modal.title)
				$('#modalWindowLabel').html(modal.title);
			else
				$('#modalWindowLabel').hide();

			if(modal.content)
				$('#modalWindowCall .modal-body .content').html(modal.content);
			else
				$('#modalWindowCall .modal-body .content').hide();
			if(modal.footerContent)
				$('#modalWindowCall .modal-footer').html(modal.footerContent);
			else
				$('#modalWindowCall .modal-footer').hide();
		}
		
		if(modal.init){
			modal.init(modal);
		}
		$(".modal").on("hidden.bs.modal", function () {
			if(ModalWindowHandler.isOpen)
				ModalWindowHandler.close();
		});
		if(!ModalWindowHandler.isOpen) {
			$("#"+modalname).modal('toggle');
			ModalWindowHandler.isOpen = true;
		}
	}
}

function modalWindowEventHandler(event){
	callModalWindow(event.data.params)
}
function modalOnCloseEventHandler(event){
	var parentmodal = JSON.parse(event.data.params);
	if(parentmodal){
		if(parentmodal.name){
			var modal = ModalWindowHandler.ActiveModals[parentmodal.name];
			if(modal){
				modal.parentmodal = parentmodal;
				ModalWindowHandler.close(parentmodal.closeParams,modal);
			} else {
				throw new Error("No se ha encontrado la modal requerida");
			}
		}
	} else {
		throw new Error("No se han recibido los parametros necesarios para ejecutar el onclose de la modal");
	}
}
MessageEventsHandler.push('modal-window-handler',modalWindowEventHandler);
MessageEventsHandler.push('modal-window-onclose-handler',modalOnCloseEventHandler);
function loadModal(){
	var modalBody = 
		"<div class='modal fade' id='modalWindowCall' tabindex='-1' role='dialog' aria-labelledby='modalWindowLabel' aria-hidden='true'>" +
			"<div class='vertical-alignment-helper'>" +
				"<div class='modal-dialog vertical-align-center'>" +
					"<div class='modal-content'>" +
						"<div class='modal-header'>" +
							"<button type='button' class='close' data-dismiss='modal'>" +
								"<span aria-hidden='true'><i class='glyphicon glyphicon-remove'></i></span><span class='sr-only'></span>" +
							"</button>" +
							"<h2 class='modal-title' id='modalWindowLabel'></h2>" +
						"</div>" +
						"<div class='modal-body'>" +
							"<div class='row'>" +
								"<div class='col-xs-12 content'>" +
									"<h4></h4>" +
								"</div>" +
							"</div>" +
						"</div>" +
						"<div class='modal-footer'>" +
						"</div>" +
					"</div>" +
				"</div>" +
			"</div>" +
		"</div>";
	if($("#modalWindowCall").html() == undefined){ 
		$("main").append(modalBody);
	} else {
		$("#modalWindowCall").html(modalBody)
	}
	loadCustomModal();
}

function loadCustomModal(){
	var modalBody = 
		"<div class='modal fade' id='customModalWindowCall' tabindex='-1' role='dialog' aria-labelledby='modalWindowLabel' aria-hidden='true'>" +
			"<div class='vertical-alignment-helper'>" +
				"<div class='modal-dialog vertical-align-center'>" +
					"<div class='modal-content'>" +
						"<div class='modal-header'>" +
							"<button type='button' class='close' data-dismiss='modal'>" +
								"<span aria-hidden='true'><i class='glyphicon glyphicon-remove'></i></span><span class='sr-only'></span>" +
							"</button>" +
							"<h2 class='modal-title' id='modalWindowLabel'></h2>" +
						"</div>" +
						"<div class='modal-body'>" +
							"<div class='row'>" +
								"<div class='col-xs-12 content'>" +
									"<h4></h4>" +
								"</div>" +
							"</div>" +
						"</div>" +
						"<div class='modal-footer'>" +
						"</div>" +
					"</div>" +
				"</div>" +
			"</div>" +
		"</div>";
	if($("#customModalWindowCall").html() == undefined){ 
		$("main").append(modalBody);
	} else {
		$("#customModalWindowCall").html(modalBody);
	}
}

$('main').ready(function(){
	loadModal();
});