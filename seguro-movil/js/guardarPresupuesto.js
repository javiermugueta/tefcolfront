/**
 * 
 */

$( "#myModalSave" ).submit(function( event ) {
  
  //llamar al servicio de guardar presupuesto
  
  guardarCookie("idPresupuesto", "id de la cookie");
  
  alert(getCookie("idPresupuesto"));
  
});