/**
 * 
 */

function Datos (id, sector, numEmpleados, numClientes, facturacion, 
		moneda, seguridad, medico, tCredito, siniestralidad, 
		nombre, apellidos, numero, telefono, email, direccion, cp, municipio, 
		provincia, pais, razonSocial, iban, extendido){
	
		this.id = id;
	    this.sector = sector;
	    this.numEmpleados = numEmpleados;
	    this.numClientes = numClientes;
	    this.facturacion = facturacion;
	    this.moneda = moneda;
	    this.seguridad = seguridad;
	    this.medico = medico;
	    this.tCredito = tCredito;
	    this.siniestralidad = siniestralidad;
	    this.nombre = nombre;
		this.apellidos = apellidos;
		this.numero = numero;
		this.telefono = telefono;
		this.email = email;
		this.direccion = direccion;
		this.cp = cp;
		this.municipio = municipio;
		this.provincia = provincia;
		this.pais = pais;
		this.razonSocial = razonSocial;
		this.iban = iban;
		this.extendido = extendido;
}


$('#btnFinalizarContratacion').click(function(){
	
	if ($('#chckextendido').is(':checked')) {
		$('.basico').hide();
	}else{
		$('.extendido').hide();
	}
	
	var datos = new Datos (
			"1234",
			$('#selectSector').val(),
			$('#selectNEmpleados').val(),
			$('#selectNClientes').val(),
			$('#selectFacturacion').val(),
			"eur",
			$('#selectSeguridad').val(),
			$('#selectMedico').val(),
			$('#selectTCredito').val(),
			$('#selectSiniestralidad').val(),
			$('#nombreForm').val(),
			$('#apellidosForm').val(),
			$('#numeroDocumentoForm').val(),
			$('#telForm').val(),
			$('#emailForm').val(),
			$('#direccionForm').val(),
			$('#cpForm').val(),
			$('#municipioForm').val(),
			$('#provinciaForm').val(),
			$('#paisForm').val(),
			$('#rSocialForm').val(),
			$('#ibanForm').val(),
			"false"); //recuperar correctamente el valor de tipo de presupuesto (básico o extendido) del Checkbox
	
	$('#numeroPoliza').html(datos.id);
	$('#nombrePoliza').html(datos.nombre);
	$('#apellidosPoliza').html(datos.apellidos);
	$('#rSocialPoliza').html(datos.razonSocial);
	$('#telPoliza').html(datos.telefono);
	$('#numDoc').html(datos.numero);
	$('#emailPoliza').html(datos.email);
	
	if($('[name="tipodocumento"]').val() === "nif" || $('[name="tipodocumento"]').val() === "nie"){
		
		$('.nifData').fadeIn("fast");
		$('.cifData').fadeOut("fast");
		
	}else{
		$('.cifData').fadeIn("fast");
		$('.nifData').fadeOut("fast");
	}
	
});
