/**
 * 
 */


function Presupuesto(id, sector, numEmpleados, numClientes, facturacion, moneda, seguridad, medico, tCredito, siniestralidad,extendido) {
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
    this.extendido = extendido;
}


function Cliente (nombre, apellidos, nif, telefono, email, direccion, cp, municipio, provincia, pais, razonSocial, iban){
	this.nombre = nombre;
	this.apellidos = apellidos;
	this.nif = nif;
	this.telefono = telefono;
	this.email = email;
	this.direccion = direccion;
	this.cp = cp;
	this.municipio = municipio;
	this.provincia = provincia;
	this.pais = pais;
	this.razonSocial = razonSocial;
	this.iban = iban;
}


var misPresupuestos, i, x = "", requisitos="",datosPresupuesto="", datos1="",datos2="",datos3="",datos4="";

var nombre = "", apellidos = "", nif = "", telefono = "", email = "", direccion="", cp="",municipio = "",
	provincia ="", pais = "", rsocial ="", iban="";

var presupuesto;
var cliente;
var nifSeleccionado;

var presupuestos = new Array();
var clientes = new Array();



misPresupuestos = {
  "presupuestos": [
    {
      "datosCliente": {
        "nif": "50779119H",
        "nombre": "Martin",
        "apellidos": "San Jose",
        "telefono": "111111111",
        "email": "martin@sanjose.com",
        "direccion": "calle Buenavista",
        "cp": "11111",
        "municipio": "Aluche",
        "provincia": "Madrid",
        "pais": "España",
        "razonSocial": "Telefonica1",
        "iban": "E200 11111-1111-111-11111-11"
      },
      "datosPresupuesto": {
        "id": "1",
        "sector": "SA",
        "numEmpleados": "1",
        "numClientes": "1",
        "facturacion": "1",
        "moneda": "eur",
        "seguridad": "Sí",
        "medico": "si",
        "tCredito": "si",
        "siniestralidad": "si",
        "extendido":true
      }
    },
    {
      "datosCliente": {
        "nif": "29120888J",
        "nombre": "Isidoro",
        "apellidos": "Perez Martinez",
        "telefono": "222222222",
        "email": "martin@sanjose.com",
        "direccion": "calle Mediavista",
        "cp": "22222",
        "municipio": "Carabanchel",
        "provincia": "Madrid",
        "pais": "España",
        "razonSocial": "Telefonica2",
        "iban": "E200 22222-2222-222-22222-22"
      },
      "datosPresupuesto": {
        "id": "2",
        "sector": "TC",
        "numEmpleados": "2",
        "numClientes": "2",
        "facturacion": "2",
        "moneda": "eur",
        "seguridad": "No",
        "medico": "no",
        "tCredito": "no",
        "siniestralidad": "no procede",
        "extendido":false
      }
    },
    {
      "datosCliente": {
        "nif": "29120888J",
        "nombre": "Jose Antonio",
        "apellidos": "Blanco",
        "telefono": "333333333",
        "email": "jose@blanco.com",
        "direccion": "calle Malavista",
        "cp": "33333",
        "municipio": "Parla",
        "provincia": "Madrid",
        "pais": "España",
        "razonSocial": "Telefonica3",
        "iban": "E200 33333-3333-333-33333-33"
      },
      "datosPresupuesto": {
        "id": "3",
        "sector": "HT",
        "numEmpleados": "3",
        "numClientes": "3",
        "facturacion": "3",
        "moneda": "eur",
        "seguridad": "Sí",
        "medico": "no",
        "tCredito": "si",
        "siniestralidad": "no",
        "extendido":true
      }
    }
  ]
}

//Para obtener los datos personales del cliente de cada presupuesto
function obtenerDatosCliente(){
	
	for (var i=0; i<clientes.length; i++){
		
		if(clientes[i].nif === nifSeleccionado){
			
			nombre = clientes[i].nombre;
			apellidos = clientes[i].apellidos;
			nif = clientes[i].nif;
			telefono = clientes[i].telefono;
			email = clientes[i].email;
			direccion = clientes[i].direccion;
			cp = clientes[i].cp;
			municipio = clientes[i].municipio;
			provincia = clientes[i].provincia;
			pais = clientes[i].pais;
			razonSocial = clientes[i].razonSocial;
			iban = clientes[i].iban;
			break;
		}
	}
}

//Si elige búsqueda por Número de Presupuesto
$('input[id=radio1]').click(function(){
	$('#nPresupuesto').attr("placeholder", "Escribe el número de presupuesto");
});

//Si elige búsqueda por NIF
$('input[id=radio2]').click(function(){
	$('#nPresupuesto').attr("placeholder", "Escribe un NIF, CIF o NIE");
});

//Cuando el usuario le da al botón buscar
$('#recuperaForm').submit(function(){
	if(!$("#datos-presupuesto").hasClass("hidden")){
		$("#datos-presupuesto").addClass("hidden");
	}
	var txtBusqueda = $('#nPresupuesto').val();
	//Si el campo está vacío, se notifica y se pone focus en el campo
	if(txtBusqueda === null || txtBusqueda === ""){
		alert("Debe escribir algo en el campo de Búsqueda");
		$("#nPresupuesto").focus();
	}else{
		if($('input[id=radio1]:checked').val() === '1'){ //Si está buscando por número
			buscarPorNumero(txtBusqueda);
		}else{
			buscarPorNIF(txtBusqueda) //Si está buscando por NIF
		}
	}
	return false;
});

//Obtener Presupuestos por Número
function buscarPorNumero(txtBusqueda){
	
	var presupuestosNumero = "";
	
	for (i in misPresupuestos.presupuestos) {
		if(misPresupuestos.presupuestos[i].datosPresupuesto.id.includes(txtBusqueda)){
			
			presupuesto = new Presupuesto (	misPresupuestos.presupuestos[i].datosPresupuesto.id,
					misPresupuestos.presupuestos[i].datosPresupuesto.sector,
					misPresupuestos.presupuestos[i].datosPresupuesto.numEmpleados,
					misPresupuestos.presupuestos[i].datosPresupuesto.numClientes,
					misPresupuestos.presupuestos[i].datosPresupuesto.facturacion,
					misPresupuestos.presupuestos[i].datosPresupuesto.moneda,
					misPresupuestos.presupuestos[i].datosPresupuesto.seguridad,
					misPresupuestos.presupuestos[i].datosPresupuesto.medico,
					misPresupuestos.presupuestos[i].datosPresupuesto.tCredito,
					misPresupuestos.presupuestos[i].datosPresupuesto.siniestralidad,
					misPresupuestos.presupuestos[i].datosPresupuesto.extendido);


			cliente = new Cliente(	misPresupuestos.presupuestos[i].datosCliente.nombre,
						misPresupuestos.presupuestos[i].datosCliente.apellidos,
						misPresupuestos.presupuestos[i].datosCliente.nif,
						misPresupuestos.presupuestos[i].datosCliente.telefono,
						misPresupuestos.presupuestos[i].datosCliente.email,
						misPresupuestos.presupuestos[i].datosCliente.direccion,
						misPresupuestos.presupuestos[i].datosCliente.cp,
						misPresupuestos.presupuestos[i].datosCliente.municipio,
						misPresupuestos.presupuestos[i].datosCliente.provincia,
						misPresupuestos.presupuestos[i].datosCliente.pais,
						misPresupuestos.presupuestos[i].datosCliente.razonSocial,
						misPresupuestos.presupuestos[i].datosCliente.iban);


			presupuestos.push(presupuesto);
			clientes.push(cliente);
			
			x = '<tr class="tupla">'
					+'<td id="idPre" class="columnaResultados txt_normal">'
					+ presupuesto.id
					+ '</td>'
					+'<td id="nifPre" class="columnaResultados txt_normal">'
					+ cliente.nif
					+ '</td>'
					+'<td id="sectorPre" class="columnaResultados txt_normal">'
					+ presupuesto.sector
					+ '</td>'
					+'<td id="numEmpleadosPre" class="columnaResultados txt_normal">'
					+ presupuesto.numEmpleados
					+ '</td>'
					+'<td id="numClientesPre" class="columnaResultados txt_normal">'
					+ presupuesto.numClientes
					+ '</td>'
					+'<td id="facturacionPre" class="columnaResultados txt_normal">'
					+ presupuesto.facturacion
					+ '</td>'
					+'<td id="seguridadPre" class="columnaResultados txt_normal">'
					+ presupuesto.seguridad
					+ '</td>'
					+'<td id="medicoPre" class="columnaResultados txt_normal">'
					+ presupuesto.medico
					+ '</td>'
					+'<td id="tcreditoPre" class="columnaResultados txt_normal">'
					+ presupuesto.tCredito
					+ '</td>'
					+'<td id="siniestralidadPre" class="columnaResultados txt_normal">'
					+ presupuesto.siniestralidad
					+ '</td>'
				+'</tr>'
				
			presupuestosNumero = presupuestosNumero + x;
			
		}
		
	}
	
	if(presupuestosNumero.length <= 0){
		sinResultados();
	}else{
		$('#noResultados').fadeOut("fast");
		$("#tablaResultados td").remove();
		ocultarDetallePresupuesto();
		$('#tablaResultados > tbody:last-child').append(presupuestosNumero);
		$("#resultados").fadeIn("fast");
		$('.tupla').click (mostrarDetalle);
	}
	
	scrollTabla();
}

//Obtener presupuestos por NIF
function buscarPorNIF(txtBusqueda){
	
	var presupuestosNIF = "";
	
	for (i in misPresupuestos.presupuestos) {
		if(misPresupuestos.presupuestos[i].datosCliente.nif.includes(txtBusqueda)){
			
			presupuesto = new Presupuesto (	misPresupuestos.presupuestos[i].datosPresupuesto.id,
					misPresupuestos.presupuestos[i].datosPresupuesto.sector,
					misPresupuestos.presupuestos[i].datosPresupuesto.numEmpleados,
					misPresupuestos.presupuestos[i].datosPresupuesto.numClientes,
					misPresupuestos.presupuestos[i].datosPresupuesto.facturacion,
					misPresupuestos.presupuestos[i].datosPresupuesto.moneda,
					misPresupuestos.presupuestos[i].datosPresupuesto.seguridad,
					misPresupuestos.presupuestos[i].datosPresupuesto.medico,
					misPresupuestos.presupuestos[i].datosPresupuesto.tCredito,
					misPresupuestos.presupuestos[i].datosPresupuesto.siniestralidad,
					misPresupuestos.presupuestos[i].datosPresupuesto.extendido);


			cliente = new Cliente(	misPresupuestos.presupuestos[i].datosCliente.nombre,
						misPresupuestos.presupuestos[i].datosCliente.apellidos,
						misPresupuestos.presupuestos[i].datosCliente.nif,
						misPresupuestos.presupuestos[i].datosCliente.telefono,
						misPresupuestos.presupuestos[i].datosCliente.email,
						misPresupuestos.presupuestos[i].datosCliente.direccion,
						misPresupuestos.presupuestos[i].datosCliente.cp,
						misPresupuestos.presupuestos[i].datosCliente.municipio,
						misPresupuestos.presupuestos[i].datosCliente.provincia,
						misPresupuestos.presupuestos[i].datosCliente.pais,
						misPresupuestos.presupuestos[i].datosCliente.razonSocial,
						misPresupuestos.presupuestos[i].datosCliente.iban);


			presupuestos.push(presupuesto);
			clientes.push(cliente);
			
			x = '<tr class="tupla">'
					+'<td id="idPre" class="columnaResultados txt_normal">'
					+ presupuesto.id
					+ '</td>'
					+'<td id="nifPre" class="columnaResultados txt_normal">'
					+ cliente.nif
					+ '</td>'
					+'<td id="sectorPre" class="columnaResultados txt_normal">'
					+ presupuesto.sector
					+ '</td>'
					+'<td id="numEmpleadosPre" class="columnaResultados txt_normal">'
					+ presupuesto.numEmpleados
					+ '</td>'
					+'<td id="numClientesPre" class="columnaResultados txt_normal">'
					+ presupuesto.numClientes
					+ '</td>'
					+'<td id="facturacionPre" class="columnaResultados txt_normal">'
					+ presupuesto.facturacion
					+ '</td>'
					+'<td id="seguridadPre" class="columnaResultados txt_normal">'
					+ presupuesto.seguridad
					+ '</td>'
					+'<td id="medicoPre" class="columnaResultados txt_normal">'
					+ presupuesto.medico
					+ '</td>'
					+'<td id="tcreditoPre" class="columnaResultados txt_normal">'
					+ presupuesto.tCredito
					+ '</td>'
					+'<td id="siniestralidadPre" class="columnaResultados txt_normal">'
					+ presupuesto.siniestralidad
					+ '</td>'
				+'</tr>'
			
				presupuestosNIF = presupuestosNIF + x;
			
		}
		
	}
	
	//Si no hay presupuestos, notificamos
	if(presupuestosNIF.length <= 0){
		sinResultados();
	}else{ //Si hay presupuestos mostramos la tabla con los nuevos elementos
		$('#noResultados').fadeOut("fast");
		$("#tablaResultados td").remove();
		ocultarDetallePresupuesto();
		$('#tablaResultados > tbody:last-child').append(presupuestosNIF);
		$("#resultados").fadeIn("fast");
		$('.tupla').click (mostrarDetalle);
	}
	
	scrollTabla();
	
}

//Para mostrar los detalles del presupuesto y del cliente
function mostrarDetalle() {
	if($(".rowSelected").get(0)!=undefined)
		$($(".rowSelected").get(0)).removeClass("rowSelected");
    $(this).addClass("rowSelected");
    $("#datos-presupuesto").removeClass("hidden")
	datosPresupuesto = 	'<span><b>Sector:</b> ' + $(this).find("#sectorPre").html() + '</span></br>'
	    				+'<span><b>Nº Empleados:</b> ' + $(this).find("#numEmpleadosPre").html() + '</span></br>'
	    				+'<span><b>Nº Clientes:</b> ' + $(this).find("#numClientesPre").html() + '</span></br>'
	    				+'<span><b>Facturación:</b> ' + $(this).find("#facturacionPre").html() + '</span></br>';
	    
	requisitos = 		'<span><b>Seguridad:</b> ' + $(this).find("#seguridadPre").html() + '</span></br>'
	    				+'<span><b>Médicos:</b> ' + $(this).find("#medicoPre").html() + '</span></br>'
	    				+'<span><b>Tarjeta de Crédito:</b> ' + $(this).find("#tcreditoPre").html() + '</span></br>'
	    				+'<span><b>Requisitos Siniestralidad:</b> ' + $(this).find("#siniestralidadPre").html() + '</span>';
	
	
	nifSeleccionado = $(this).find('#nifPre').html();
	
	
	obtenerDatosCliente();
	    
	    
	datos1 =	'<span><b>Nombre:</b> ' + nombre + '</span></br>'
				+'<span><b>Apellidos:</b> ' + apellidos + '</span></br>'
				+'<span><b>NIF:</b> ' + nif + '</span></br>';
	
	datos2 =	'<span><b>Teléfono:</b> ' + telefono + '</span></br>'
				+'<span><b>E-Mail:</b> ' + email + '</span></br>'
				+'<span><b>Dirección: </b> ' + direccion + '</span></br>';
	
	datos3 =	'<span><b>Código Postal:</b> ' + cp + '</span></br>'
				+'<span><b>Municipio:</b> ' + municipio + '</span></br>'
				+'<span><b>Provincia:</b> ' + provincia + '</span></br>';
	
	datos4 =	'<span><b>País:</b> ' + pais + '</span></br>'
				+'<span><b>Razón Social:</b> ' + razonSocial + '</span></br>'
				+'<span><b>Cuenta IBAN:</b> ' + iban + '</span></br>';
	    
	    
	$("#numeroPresupuesto").html(' - '+ $(this).find("#idPre").html());    
    $("#dpPresupuesto").html(datosPresupuesto);
    $("#requisitos").html(requisitos);
    $("#datos1").html(datos1);
    $("#datos2").html(datos2);
    $("#datos3").html(datos3);
    $("#datos4").html(datos4);
    
    mostrarDetallePresupuesto();
    
    scrollToData();
    
}


function ocultarDetallePresupuesto(){
	$("#detallePresupuesto").fadeOut("fast");
    $("#detalleRequisitos").fadeOut("fast");
    $("#detalleCliente").fadeOut("fast");
}


function mostrarDetallePresupuesto(){
	$("#detallePresupuesto").fadeIn("fast");
    $("#detalleRequisitos").fadeIn("fast");
    $("#detalleCliente").fadeIn("fast");
}

function sinResultados(){
	$('#noResultados').fadeIn("fast");
	$("#resultados").fadeOut("fast");
	ocultarDetallePresupuesto();
}


$('#btnRecuperarPresupuesto').click(function () {
	
	var w = window.open("contratar.html");
	w.presupuesto = presupuesto;
	w.cliente = cliente;
	
});

function scrollToData(){
  $('#myModalInicial .modal-body').animate({ 
	  scrollTop: $('#datos-presupuesto').offset().top
	  }, 1000);
}

function scrollTabla(){
	  $('#myModalInicial .modal-body').animate({
	      scrollTop: $("#tablaResultados").offset().top
	  }, 1000);
}


