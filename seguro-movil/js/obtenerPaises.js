/**
 * 
 */


Services.servicio('location/countries','FPDGDHUeRYzLosPkVoZvmnSnNjHBpz1G',obtenerPaises,'GET');



function obtenerPaises(status, result){
	
	if(status === 200){
		
		if(result.length >= 1){
			
			var opciones ='';
			
			for (var i = 0; i < result.length; i++) {
				
				var idPais = result[i].id;
				var nombrePais = result[i].typeDescription;
				var option = '<option value="'+idPais+'">'+nombrePais+'</option>';
				opciones = opciones + option;
			}
			$('[name = "selectPais"]').append(opciones);
			$('[name = "selectPais"]').selectpicker('refresh')
		}
	}/*else{
		alert("Ha ocurrido un error");
	}*/
}
