/**
 * Martin.Sanjose
 * JS para gestionar el Login y las Cookies de Ciber-Riesgo
 */




if(getCookie("avisado") == null || getCookie("avisado") == ""){
	$('#contenedorCookies').fadeIn("fast");
}

var user = "";
var password = "";
var token = "";

$("#camposUsuario").submit(function(){
	
	user = document.getElementById("userField").value;
	password = document.getElementById("inputPassword").value;
	
	if ($('.errorInicioSesion').css('display') !== 'none') {
	    $('.errorInicioSesion').fadeOut("fast");
	}
	
	var base64 = window.btoa(user+':'+password);
	var parametro = 'Basic ' + base64;
	Services.servicio('authentication/login', token, 
		function (data, textStatus, jqXHR) {
			if(data!=null){  
				if(typeof getToken === "function") getToken(jqXHR.status, data);
			}else{
				if(typeof getToken === "function") getToken(jqXHR.status, jqXHR.responseText);    
			}
		},{
			data : $.param(json),
			type : "GET"
		}
	);
	return false;
});


function getToken (status, result){
	
	if(status === 200){
		$.cookie("username", user);
		token = result.value;
		$.cookie("token", token);
		window.location.replace("inicio.html");
		return true;
	}else{
	    $('.errorInicioSesion').slideDown('slow').delay(1500).slideUp('slow');
		return false;
	}
}


$("#cerrarSesion").click (function() {
	  
	  var href = $('#cerrarSesion').attr('href');
	  $('<form>').attr({action: href, method: 'GET'}).appendTo($('body')).submit();
	  deleteCookie('username');
	  
});			
        	
//Comprobamos la cookie de usuario
if(getCookie("username") != null && getCookie("username") != ""){
	$("#calculaSeguro").text("Buscar Presupuestos");
	$("#calculaSeguro").attr("Title", "Buscar Presupuestos");
	$("#calculaSeguro").attr("href", "recuperar.html"); //TODO cambiar URL
	$("#login").hide();
	$("#nombreUsuario").fadeIn("fast");
	
	var saludoUsuario = '<span class="icon-conectar">&nbsp;</span>'+
	'<span class="txt_col_movistar">'+ getCookie("username") + '</span>';
						
	$("#nombreUsuario").html(saludoUsuario);
	$('#cerrarSesion').fadeIn("fast");
	$('#moquillo-Pyme').fadeOut("fast");
	
	
}else{
	$("#calculaSeguro").text("Calcula tu seguro");
	$("#calculaSeguro").attr("Title", "Calcula tu seguro");
	$("#login").fadeIn("fast");
	$("#nombreUsuario").hide();
	$('#moquillo-Pyme').fadeIn("fast");
	
}









