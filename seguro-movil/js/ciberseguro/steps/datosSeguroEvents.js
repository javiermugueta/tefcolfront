
var uDevice =""
var mode = ""
var imei = ""
var email = ""

$(document).ready(function() {
  CONSTANTES.ready(function(){
    console.log("Carga de datosSeguroFunctions.js")
    $('.mensajeError').hide();

    if(sessionStorage.getItem('contractMode') != null && sessionStorage.getItem('contractMode') != ''){
      mode = sessionStorage.getItem('contractMode')
    }else{
      mode = 'OPEN_MODE'
    }

    uDevice = JSON.parse(sessionStorage.getItem('uDevice'));

    var fVentaTerminalDate = new Date(uDevice.feVentaTerminal)
    var monthVT = fVentaTerminalDate.getMonth()+1
    if (monthVT.length < 2)
    monthVT = '0' + monthVT;
    var yearVT = fVentaTerminalDate.getFullYear()

    $("#nombreC").text(uDevice.nombre + " " + uDevice.apellido_1 + " " + uDevice.apellido_2);
    $("#dniC").text(uDevice.num_identificacion);
    $("#direcciónC").text(uDevice.tipo_via + ", "+ uDevice.des_calle + ", " + uDevice.num_calle);
    $("#poblacionC").text(uDevice.nom_poblacion + ", " + uDevice.des_prov + ", " + uDevice.cod_postal);
    $("#movilC").text(uDevice.msisdn);
    $("#emailC").text(uDevice.email);
    $("#fechaCompraC").text("01/"+monthVT+"/"+yearVT);
    $("#fechaValidezC").text(fechaActual());
    $("#fechaFinC").text(unAnioMas());
    $('#nombre3').text(uDevice.nombre);
    $('#apellidos3').text(uDevice.apellido_1 + " " + uDevice.apellido_2);
    $('#dni3').text(uDevice.num_identificacion);
    $('#telefono3').text(uDevice.msisdn);
    $('#email3').text(uDevice.email);
    $("#marcaC").text(uDevice.brandName)
    $("#modeloC").text(uDevice.modelName)
    $("#precioFranquiciaC").text(uDevice.franquicia)
    if(sessionStorage.getItem('receiptPrice') != null && sessionStorage.getItem('receiptPrice') != ''){
      $("#precioPrimaC").text(sessionStorage.getItem('receiptPrice'));
    }

    var imageTerminalLink = loadImageTerminal()

    if(imageTerminalLink != '404'){
      $("#terminalImage").attr("src", imageTerminalLink);
    }

    $(".email-asegurado").click(function(){
      $("#email-tomador").show();
      $(this).hide();
    });
    $("#btnCancelarEmail").click(function(){
      $("#email-tomador").hide();
      $(".email-asegurado").show();
      return false;
    });
    $("#btnCambiarEmail").click(function(){
      $(".email-html").html( $("#input-email-tomador").val() );
      $("#email-tomador").hide();
      $(".email-asegurado").show();
      return false;
    });
    $('.que-es-IMEI').click(function(){
      $("#myModalIMEI").modal();
    });

    $("#btnConfirmarContratacion").click(function (e) {
      if($('#aceptaInfo').prop("checked") == true){
        $('.mensajeError').hide();
        imei = $("#imeiC").val()
        email = $("#emailC").text()
        proccessModalidadContratacion()
      }  else {
        $('#textoError3').text('Debe aceptar los términos y condiciones de la póliza')
        $('.mensajeError').show()
        $("#btnConfirmarContratacion").prop('disabled', false)
        $("#btnConfirmarContratacion").text('Confirmar')
      }
      e.preventDefault();
    });

    $('input').iCheck({
       checkboxClass: 'icheckbox_square-orange',
       radioClass: 'iradio_square-orange',
     });

    $('input','.row-prima').iCheck('disable')

    $('input[name="acepta_cesion"]').on('ifChecked', function(event){
        $('.btn-cesion').prop('disabled', false)
    });

    $('input[name="acepta_cesion"]').on('ifUnchecked', function(event){
    console.log("en el ready con name");
     $('.btn-cesion').prop('disabled', true)
    });

    $('input[name="aceptaInfo"]').on('ifChecked', function(event){
      $('#btnConfirmarContratacion').prop('disabled', false)
      $('#textoError1').text("")
      $('.mensajeError').hide()
    });

    $('input[name="aceptaInfo"]').on('ifUnchecked', function(event){
      $('#btnConfirmarContratacion').prop('disabled', true)
    });

  })
});
