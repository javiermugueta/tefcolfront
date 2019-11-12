
var OPEN_MODE = "OPEN_MODE"
var BUDGET_MODE = "BUDGET_MODE"
var OTHER_MODE = "OTHER_MODE"
var token = "Token BRhWlBPOdGYPnSiykD80CF+lquG+a2m9"

var setYear = 1
var tiempoEspera = 2000
var respuestaDatos

var terminales

var marcaId
var marcaName
var modeloName
var terminalId
var tokenTerminal
var msisdn
var precom
var imei
var in_lopd

var mes
var año
var mode
var contratar
var terminales = {}

console.log("Carga de tarificadorFunctions.js")

function devicesResponseListener (status, response){
  for (var i = 0; i < response.length; i++) {
    var terminal = response[i];
    var brandId = terminal.brandId;
    var brandName= terminal.brandName;
    var modelName = terminal.modelName;
    var modelId = terminal.modelId;
    if(terminal.coModalidad != undefined){
      if(terminales[brandId] == undefined){
        terminales[brandId] = {};
        var optionSelectMarca = new Option(brandName, brandId);
        $('#marcaSelect').append(optionSelectMarca);
      } else {

      }
      if(terminales[brandId][modelId] == undefined){
        terminales[brandId][modelId] = terminal;
      }
    }
  }
  $('.campo').selectpicker('refresh');

}

function marcaModeloListener (status, response){
  var adicionales = response[0].aditionalFields;
  for(var i = 0; i < adicionales.length; i++){
    if (adicionales[i].fieldCode=="T-MO") {
      if(adicionales[i].fieldValue.indexOf("|")> -1){
        marcaName = adicionales[i].fieldValue.split("|")[0];
        modeloName = adicionales[i].fieldValue.split("|")[1];
      } else {
        modeloName = adicionales[i].fieldValue;
      }
    }
    if (adicionales[i].fieldCode =="T-MA") {
      marcaName = adicionales[i].fieldValue;

    }
    if (adicionales[i].fieldCode =="T-ID") {
      terminalId = adicionales[i].fieldValue;
    }
  }
  if(terminalId!="" && modeloName!="" && marcaName!=""){
    $('#modeloSelect').prop("disabled", false);
    $('#sMes').prop("disabled", false);
    $('#sAnio').prop("disabled", false);
    $('#coberturasSelect').prop("disabled", false);
    $('#marcaSelect').append('<option value="marcaId" selected="selected">' + marcaName+'</option>');
    $('#modeloSelect').append('<option value="terminalId" selected="selected">'+ modeloName+'</option>');
    $('.campo').selectpicker('refresh');
  } else {
    Services.servicio( 'devices/', token, obtenerMarcas, {'type':'GET'});
  }
}

function obtenerSelectCoberturas(status, respuesta){
  var listaCoberturas;
  for (var i = 0; i < respuesta.length; i++) {
    listaCoberturas = respuesta[i];
    var typeCode = listaCoberturas.typeCode;
    var estado = listaCoberturas.typeDescription;
    var optionSelect = new Option(estado, typeCode);
    $('#coberturasSelect').append(optionSelect);
  }
  $('.campo').selectpicker('refresh');
}

function disabledBotonLlamar(estado){
  $('.btn-llamar').prop('disabled', estado);
}

function addClassSelect(sel){
  container = $(sel).parent();
  btn = container.find('button.dropdown-toggle');
  btn.addClass("cal-select-active");
}

function showCalculos(initialVal){
  calcTotal(initialVal);
  $(".col-num-presupuesto").slideDown();
  $('[data-type="month"]').parent().addClass("active");
  $('.btn-solicitar').prop('disabled', false);
  $('input','.row-prima').iCheck('enable');
  $('.box-contratacion .completar').fadeOut();
  contratar =  true;
}

function tarificacionMovil(){
  var jsonMM = {};
  var respuesta;
  mes= $('#sMes').val();
  año = $('#sAnio').val();
  var saleDate= año + "-" + mes + "-01";
  jsonMM["saleDate"]=saleDate;
  if(mode == OPEN_MODE){
    jsonMM["brandId"]= $('#marcaSelect').val();
    jsonMM["deviceId"] = $('#modeloSelect').val();
  } else if(mode == BUDGET_MODE){
    jsonMM["deviceId"] = terminalId;
    jsonMM["budgetId"] = budgetId;
  }
  jsonMM["productCode"] = $('#coberturasSelect').val();
  if($('#modeloSelect').val() != "" && $('#modeloSelect').val() != null){
    Services.servicio('policy/rate',token,null,{
      data: jsonMM,
      type: "POST",
      contentType: 'application/json',
      success: function(response) {
        respuesta = response;
        if(response.receiptPrice != null){
          sessionStorage.setItem('receiptPrice', response.receiptPrice.toFixed(2))
          pintarDatosEconomicos(response)
        }
        budgetId= respuesta.budgetId;
        showCalculos(respuesta.receiptPrice);
        $('.mensajeError').hide();
      },
      error: function(response) {
        respuesta = response;
        $('.mensajeError').show();
        $('.loader').hide();
      }
    });
  }
}

function validacionDNI(){
  var jsonDNI= {};
  jsonDNI["documento"]=$('#dni').val();
  msisdn= $('#movil').val();
  jsonDNI["msisdn"]=$('#movil').val();
  jsonDNI["budgetId"]=budgetId;
  mes= $('#sMes').val();
  año = $('#sAnio').val();
  var fechaCompra= "01/"+ mes + "/"+año;
  jsonDNI["fechaCompra"]=fechaCompra;

  if($('#movil').val() != "" && $('#dni').val() != "" && budgetId != null){

    $('#btnDatosValidacion').prop('disabled', true)
    $('.loader').show();

    Services.servicioIPFilter('movistar/uninsured-devices/validateDocument',token,null,{
      data: jsonDNI,
      type: "POST",
      contentType: 'application/json',
      success: function(result) {
        $('.mensajeError').hide();
        respuestaDatos = result.result;
        pintarDatos(respuestaDatos);
        setTimeout(function(){
          $('.loader').hide();
          $(".box-login-1").hide();
          $(".box-login-2").show();
        }, 1000);
        $("#fechaCompraC").text(mes + " / " + año);
      },
      error: function(result) {
        $("#btnDatosValidacion").prop('disabled', false);
        $("#btnDatosValidacion").text('Continuar');
        $("#dni").val('');
        $("#movil").val('');
        $('.loader').hide();
        if(result!=null && result.responseJSON!=null && result.responseJSON.msg!=null){
          $('#errorTextValidacion').text(result.responseJSON.msg);
        } else{
          $('#errorTextValidacion').text("Error en la validación de los datos.");
        }
        $('.mensajeError').show();
      }
    });
  };
}

function validacionPin(){
  var jsonPin = {};
  var respuesta;
  jsonPin["pinCode"] =$('#pinBox').val();
  if($('#dni').val()!=null && $('#dni').val()!=null){
    jsonPin["documento"]=$('#dni').val();
    jsonPin["msisdn"]=$('#movil').val();
  }

  if($('#movil').val() != "" && $('#dni').val() != "" && budgetId != null){

    $('.mensajeError').hide()
    $('.loader').show()


    Services.servicioIPFilter('movistar/uninsured-devices/pinCodeValidation',token,null,{
      data: jsonPin,
      type: "POST",
      contentType: 'application/json',
      success: function(result) {
        sessionStorage.setItem('uDevice', JSON.stringify(result.result))
        sessionStorage.setItem('pinCodeValidation', true)
        sessionStorage.setItem('contractMode', mode)
        setTimeout(function() {
          $('.loader').hide()
          location.href = "datosSeguro.html"
        }, tiempoEspera)
      },
      error: function(result) {
        console.log("Validacion PIN incorrecta.")
        $('#errorText').text(result.responseJSON.msg)
        $('.mensajeError').show()
        $('.loader').hide()
      }
    });
  };
  return null;
};

function calcTotal(initialVal){
  var operacion = initialVal * setYear;
  $('.txt-precio').animateNumber({
    number: operacion,
    numberStep: function(now, tween) {
      // see https://stackoverflow.com/a/14428340
      var formatted = now.toFixed(2) //.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      var decimalprice = formatted.toString();
      initprice = decimalprice.substring(0, decimalprice.indexOf("."));
      decimalprice =decimalprice.substring(decimalprice.indexOf(".")+1, decimalprice.length);
      $(tween.elem).html(initprice + '<span class="sub">,'+decimalprice+'</span>' );
    }

  });
}

function validarImei(){
  var jsonImei= {};
  if(msisdn !=null && precom != null){
    jsonImei["msisdn"]= msisdn;
    jsonImei["precom"]= precom;

    Services.servicioIPFilter('movistar/uninsured-devices/recuperarImei',token,null,{
      data: jsonImei,
      type: "POST",
      contentType: 'application/json',
      success: function(result) {
        if(result != null && result['result']){
          //$('#imeiC').val(result['result'][0]);
          $('#imeiC').val(result['result']);
        }
        $('.mensajeError').hide();
      },
      error: function(result) {
        console.log("No se ha podido validar el Imei!");
        $('.mensajeError').show();
        $(".loader").hide();
      }
    });
  }
}

function pintarDatos(respuesta){

  $("#nombreC").text(respuesta.nombre + " " + respuesta.apellido_1 + " " + respuesta.apellido_2);
  $("#dniC").text(respuesta.num_identificacion);
  $("#direcciónC").text(respuesta.tipo_via + ", "+ respuesta.des_calle + ", " + respuesta.num_calle);
  $("#poblacionC").text(respuesta.nom_poblacion + ", " + respuesta.des_prov + ", " + respuesta.cod_postal);
  $("#movilC").text(respuesta.msisdn);
  $("#emailC").text(respuesta.email);
  $("#fechaValidezC").text(fechaActual());
  $("#fechaFinC").text(unAnioMas());
  $('#nombre3').text(respuesta.nombre);
  $('#apellidos3').text(respuesta.apellido_1 + " " + respuesta.apellido_2);
  $('#dni3').text(respuesta.num_identificacion);
  $('#telefono3').text(respuesta.msisdn);
  $('#email3').text(respuesta.email);
  tokenTerminal= respuesta.token;
}

function pintarDatosEconomicos(respuesta){
  if(respuesta.receiptPrice != null){
    $("#precioPrimaC").text(respuesta.receiptPrice.toFixed(2));
  }
  $('#primaMensual3').text('');
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function fechaActual(){
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var hoy = (day<10 ? '0' : '') + day+ '/' + (month<10 ? '0' : '') + month + '/' + d.getFullYear();
  return hoy
}

function unAnioMas(){
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var hoy = (day<10 ? '0' : '') + day + '/' + (month<10 ? '0' : '') + month + '/' + (d.getFullYear()+1);
  return hoy
}
