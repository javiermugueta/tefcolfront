
function guardarCookie(name, valor){
	$.cookie(name, valor);
}
	

//Funcion para obtener cualquier cookie
function getCookie(name) {
	return $.cookie(name);
} 
	
function deleteCookie (name) {
	    $.removeCookie(name);
};
	
	//Funcion para ocultar el Aviso de Cookies en la vista de inicio
function cerrarAvisoCookies(){
	$('#contenedorCookies').css('display','none');
	$.cookie("avisado", "yes", { expires : 10 });
}
	
	
	