
var OPEN_MODE = "OPEN_MODE"
var BUDGET_MODE = "BUDGET_MODE"
var OTHER_MODE = "OTHER_MODE"

var token = "Token BRhWlBPOdGYPnSiykD80CF+lquG+a2m9"

var tiempoEspera = 2000

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

function proccessModalidadContratacion(){
  $('.loader').show();
  $(this).prop('disabled', true);
  $(this).text("Espere...");
  switch (mode){
    case OPEN_MODE:
    case BUDGET_MODE:
      realizarContratacion();
    break;
    case OTHER_MODE:
    $('.terminacion3').show();
    $('#marca3').text(marcaId);
    $('#modelo3').text(terminalId);
    $('#imei3').text($('#imeiC').val());
    break;
    default:
    console.log("No se ha seleccionado ninguna modalidad de contratación.");
  }
  return false;
}

function realizarContratacion(){
  var data= {}
  var in_lopd = false

  if($('#lopdCampo').is(':checked')){
    in_lopd=true
  }
  data["token"] = uDevice.token
  data["imei"] = imei
  data["email"] = email
  data["sendSMS"] = true
  data["in_lopd"] = in_lopd

  if(imei == "" || email == ""){
    $('#textoError').text("Debe completar los campos 'Email' e 'IMEI' correctamente.")
    $('.mensajeError').show()
    $("#btnConfirmarContratacion").prop('disabled', false)
    $("#btnConfirmarContratacion").text('Confirmar')
    $('.loader').hide()
    return;
  }

  if(sessionStorage.getItem('pinCodeValidation') != null && sessionStorage.getItem('pinCodeValidation') == 'true'){
    Services.servicioIPFilter('movistar/contractTemp',token,null,{
      data: data,
      type: "POST",
      contentType: 'application/json',
      success: function(result) {
        if(result.code == 0 || result.code == 250){
          $('.mensajeError').hide();
          if(mode == OPEN_MODE || mode == BUDGET_MODE){
            setTimeout(function(){
              $('.loader').hide()
              $('.nav-tabs li:eq(2) a').tab('show')
              $('#l-cob-box').removeClass('stuck')
              location.href = "confirmacion.html"
            }, tiempoEspera)
          } else {
            $('#textoError').text("No es posible realizar la contratación.")
            $('.mensajeError').show()
            $("#btnConfirmarContratacion").prop('disabled', false)
            $("#btnConfirmarContratacion").text('Confirmar')
            $('.loader').hide()
          }

          sessionStorage.setItem('pinCodeValidation', 'false')

        } else {
          $('#textoError').text(result.msg)
          $('.mensajeError').show()
          $("#btnConfirmarContratacion").prop('disabled', false)
          $("#btnConfirmarContratacion").text('Confirmar')
          $('.loader').hide()
        }
      },error: function(result) {
        if(result.responseJSON != null){
          $('#textoError').text(result.responseJSON.msg)
        } else 	if(result.responseJSON == undefined){
          $('#textoError').text(result.statusText)
        } else {
          $('#textoError').text("Error en la contratación")
        }
        $('.mensajeError').show()
        $("#btnConfirmarContratacion").prop('disabled', false)
        $("#btnConfirmarContratacion").text('Confirmar')
        $('.loader').hide()
      }
    })

  }else{
    $('#textoError').text("No es posible realizar la contratación. No se ha pasado la validación de PIN.")
    $('.mensajeError').show()
    $("#btnConfirmarContratacion").prop('disabled', true)
    $("#btnConfirmarContratacion").text('Confirmar')
    $('.loader').hide()
  }
}

function loadImageTerminal(){

  var brand =  uDevice.brandName.toLowerCase()
  var model = uDevice.modelName.trim()

  var match = model.match(/([1-9][0-9]*)GB/)
  if(match!= null && match[0]!= null && match[0] != undefined)
  var found = match[0]
  model = model.split(found).join('').trim()
  model = model.split('+').join(' plus').trim()

  model = model.split(' ').join('-').toLowerCase()
  var getUrl = window.location;
  var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
  var imageURLTemp = baseUrl+'/images/terminales/'+brand+"/"+model+"/"+brand+"-"+model+"-front.png"
  var http = new XMLHttpRequest();

  http.open('HEAD', imageURLTemp, false)
  http.send()

  if(http.status != 404){
    return imageURLTemp
  }else{
    return '404'
  }
}
