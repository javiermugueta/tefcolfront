/**
 * 
 */

function Pregunta(id, name, titulo, descripcion, puntos, respuesta) {
    this.id = id;
    this.name = name;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.puntos = puntos;
    this.respuesta = respuesta;
}

function Respuesta(id, titulo, opciones) {
    this.id = id;
    this.titulo = titulo;
    this.opciones = opciones;
}

var token = getCookie('token');

Services.servicio('faqs/Requisitos/full','Token ' + token ,obtenerFAQs,'GET');

function obtenerFAQs(status, result){
	
	var html='';
	
	for (var i = 0; i < result.length; i++) {
		
		var pregunta = new Pregunta();
		var respuesta = new Respuesta();
		var puntos = [];
		var opciones = [];
		var active;
		
		if(i===0){
			active = "active";
		}else{
			active = "no-active";
		}
		
		var bloque = result[i];
		
		pregunta.id=parseInt(i+1);
		respuesta.id=parseInt(i+1);
		pregunta.titulo = bloque.question;
		respuesta.titulo = bloque.answer;
		
		for (var j = 0; j < bloque.aditionalFields.length; j++) {
			
			var campoAdicional = bloque.aditionalFields[j]
			var fieldName = campoAdicional.fieldName;
			var fieldValue = campoAdicional.fieldValue;
			
			if(fieldName === 'NAME'){
				pregunta.name = fieldValue;
			}else if(fieldName === 'DESCRIPCION'){
				pregunta.descripcion = fieldValue;
			}else if(fieldName === 'PUNTO'){
				puntos.push(fieldValue);
			}else if(fieldName === 'OPCION'){
				opciones.push(fieldValue);
			}
		}
		
		
		respuesta.opciones = opciones;
		pregunta.puntos = puntos;
		pregunta.respuesta = respuesta;
		
		var nextAction = 'next-question';
		var prevAction = 'prev-question';
		
		if(i+1 === (result.length)){
			nextAction = 'next-section';
		}
		
		if(i === 0){
			prevAction = 'prev-section';
		}
		
		
		
		html = html + '<div class="row first no-padding-top no-padding-left no-padding-right question-'+ parseInt(i+1) +'" state="'+active+'">'
						+ '<div class="icon link slider-action left cl-blue" action="'+prevAction+'">'
						+ '<i class="fa fa-lg fa-angle-left small"></i>'
						+ '</div>'
						+'<div class="col-xs-12">'
						+ '<h3>'
						+ pregunta.titulo
						+ '</h3>'
						+ '<p>' + pregunta.descripcion + '</p>';	
		
		if(pregunta.puntos.length > 0){
			html = html + '<ul>';
			for (var r = 0; r < pregunta.puntos.length; r++) {
				html = html + '<li>'+ parseInt(r+1) + '. ' + pregunta.puntos[r] + '</li>';
			}
			html = html + '</ul>';
		}
		
		
		html = html + '<p class="question">'
					+ '<label class="form-label">'
					+ respuesta.titulo
					+ '</label>'
					+ '<div class="padding0 col-xs-12 col-sm-6">';
		
		
		if(respuesta.opciones.length > 0){
			
			html = html + '<select class="selectpicker" name="' + pregunta.name + '">'
						+ '<option disabled selected value> -- Seleccione -- </option>';
			
			
			for(var o=0; o<respuesta.opciones.length; o++){
				
				html = html + '<option value="' + + parseInt(o+1) + '">' 
							+ respuesta.opciones[o]
							+'</option>'
			}
			
			html = html + '</select>'
						+ '</div>'
						+ '</p>'
						+ '</div>'
		}
		
			
		html = html +'<div id="siguiente' +parseInt(i+1)+ '" class="icon link slider-action right cl-blue oculto" action="'+nextAction+'">'
	        	    + '<i class="fa fa-lg fa-angle-right small"></i>'
	        	    +'</div>'
	        	    + '</div></div>';
		
   }
	
	$('[name="pregunta1"]').append(html);
	$('[name="seguridad"]').on('change', comprobarSeguridad);
	$('[name="medico"]').on('change', comprobarMedico);
	$('[name="tcredito"]').on('change', comprobarTCredito);
	$('[name="siniestralidad"]').on('change', comprobarSiniestralidad);
	$(".selectpicker").selectpicker("render");
	Contratacion_Controller.init();
	
	
	function comprobarSeguridad(){
		
		var selected = $(this).find("option:selected").val();
		if ($('[name="seguridad"]').val() != null){
			$('#siguiente1').fadeIn("fast");
		}else{
			$('#siguiente1').fadeOut("fast");
		}
	}
	
	
	function comprobarMedico(){
		
		var selected = $(this).find("option:selected").val();
		if ($('[name="medico"]').val() != null){
			$('#siguiente2').fadeIn("fast");
		}else{
			$('#siguiente2').fadeOut("fast");
		}
	}
	
	function comprobarTCredito(){
		
		var selected = $(this).find("option:selected").val();
		if ($('[name="tcredito"]').val() != null){
			$('#siguiente3').fadeIn("fast");
		}else{
			$('#siguiente3').fadeOut("fast");
		}
	}
	
	function comprobarSiniestralidad(){
		
		var selected = $(this).find("option:selected").val();
		if ($('[name="siniestralidad"]').val() != null){
			$('#siguiente4').fadeIn("fast");
		}else{
			$('#siguiente4').fadeOut("fast");
		}
	}
	
}