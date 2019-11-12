$(document).ready(function() {
	CONSTANTES.ready(function(){
		console.log("Carga de tarificadorEvents.js")
		contratar 	= false
		$('.mensajeError').hide();

		if ((getParameterByName("id_presupuesto"))) {
			Services.servicio( 'budget?budgetId='+getParameterByName("id_presupuesto"), token, marcaModeloListener, {'type':'GET'});
			mode = BUDGET_MODE
		} else {
			Services.servicio( 'devices/', token, devicesResponseListener, {'type':'GET'});
			mode = OPEN_MODE
		}
		Services.servicio('options/TYPE_COBERTURA',token,obtenerSelectCoberturas,{'type':'GET'});

		$('#marcaSelect').on('changed.bs.select', function (e) {

	    $('#modeloSelect').empty();
	    var terminalesModelo = {}
	    var marca = $('#marcaSelect').val();
	    terminalesModelo = window.terminales[marca];
	    if(terminalesModelo){
	      var keys = Object.keys(terminalesModelo);
	      for( var i in keys) {
	        var terminalModelo = terminalesModelo[keys[i]];
	        var modelName = terminalModelo.modelName;
	        var modelId = terminalModelo.modelId;
	        var optionSelectModelo = new Option(modelName, modelId);
	        $('#modeloSelect').append(optionSelectModelo);
	      }
	    }

			$('#modeloSelect').selectpicker('val', '');
			$('#sMes').selectpicker('val', '')
			$('#sAnio').selectpicker('val', '')
			$('#coberturasSelect').selectpicker('val', '')

			$('#modeloSelect').prop('disabled', false);
			$('#sMes').prop('disabled', true)
			$('#sAnio').prop('disabled', true)
			$('#coberturasSelect').prop('disabled', true)

  		$('#modeloSelect').selectpicker('refresh');
			$('#sMes').selectpicker('refresh')
			$('#sAnio').selectpicker('refresh')
			$('#coberturasSelect').selectpicker('refresh')

			calcTotal(0)
			$('.btn-solicitar').prop('disabled', true);
			$('.box-contratacion .completar').fadeIn();

	    addClassSelect(this);
	  });

		$('#modeloSelect').on('changed.bs.select', function (e) {

			$('#sMes').selectpicker('val', '')
			$('#sAnio').selectpicker('val', '')
			$('#coberturasSelect').selectpicker('val', '')

			$('#sMes').prop('disabled', false)
			$('#sAnio').prop('disabled', false)
			$('#coberturasSelect').prop('disabled', true)

			$('#sMes').selectpicker('refresh')
			$('#sAnio').selectpicker('refresh')
			$('#coberturasSelect').selectpicker('refresh')

			$(".box-login-1").hide()
			$(".box-login-2").hide()
			calcTotal(0)
			$('.btn-solicitar').prop('disabled', true);
			$('.box-contratacion .completar').fadeIn();
			addClassSelect(this);
		});

		$('#sDia').on('changed.bs.select', function (e) {
			addClassSelect(this);

		});

		$('#sMes').on('changed.bs.select', function (e) {
			addClassSelect(this);
			if($('#sMes').val() != "" && $('#sAnio').val() != "" && $('#coberturasSelect').val()== ""){
				$('#coberturasSelect').selectpicker('val', '')
				$('#coberturasSelect').prop('disabled', false)
				$('#coberturasSelect').selectpicker('refresh')
			}

		});
		$('#sAnio').on('changed.bs.select', function (e) {
			addClassSelect(this);
			if($('#sMes').val() != "" && $('#sAnio').val() != "" && $('#coberturasSelect').val()== ""){
				$('#coberturasSelect').selectpicker('val', '')
				$('#coberturasSelect').prop('disabled', false)
				$('#coberturasSelect').selectpicker('refresh')
			}
		});

		$('#coberturasSelect').on('changed.bs.select', function (e) {
			$(".box-login-1").hide();
			$(".box-login-2").hide();
			$("#btnsolicitar").text("Contratar");
			$(".box-contratacion").show();
			addClassSelect(this);
			if($('#marcaSelect').val()!= "" && $('#modeloSelect').val()!= "" && $('#sMes').val()!= "" && $('#sAnio').val()!= ""
			&& $('#coberturasSelect').val()!= ""){
				tarificacionMovil();
			}
		});

		$(".mod-precio").on('click',function(){

			if(contratar){
				type = $(this).data("type")
				if(type == 'year'){ setYear =12;  calcTotal(); }
				if(type == 'month'){setYear =1; calcTotal(); }
				$('.col-desc-lista li').removeClass("active");
				$(this).parent().addClass("active");
			}

		});

		$("#btnConfirmarTarificacion").click(function (e) {
			$('.loader').show();
			$(this).prop('disabled', true);
			$(this).text("Espere...")
			setTimeout(function(){
				$('.loader').hide();
				$(".box-contratacion").hide();
				$(".box-login-1").show();
				$(".box-login").show();
			}, 1000);
		});


		$("#btnDatosValidacion").click(function (e) {
			phone = $('#movil').val();
			phone = phone.replace(/[^0-9]/g,'');
			if ($('#dni').val() == null || $('#dni').val() == "" || $('#sMes').val()=="" || $('#movil').val() == null || $('#movil').val() == ""){
				e.preventDefault()
				$('#errorTextValidacion').text(" Rellene los campos siguientes")
				$('.mensajeError').show()
				$("#btnConfirmarTarificacion").prop('disabled', false)
				$('.loader').hide()
			} else {
				if (phone.length == 9 && ValidateSpanishID($('#dni').val()).valid){
					e.preventDefault();
					validacionDNI()

				} else {
					e.preventDefault();
					$('#errorTextValidacion').text("Documento identificativo o número de teléfono inválido.");
					$('.mensajeError').show();
					$("#btnConfirmarTarificacion").prop('disabled', false);
				}
			}
		});

		$("#btnConfirmarPIN").click(function (e) {
			if($('#pinBox').val()== null || $('#pinBox').val()== ""){
				e.preventDefault();
				$('.mensajeError').show();
				$('#textoError2').text("Rellene los campos vacíos");
			} else {
				e.preventDefault();
				validacionPin();
			}
		});

		$('.modal-info').click(function(){
			$("#myModalInfoAmpliada").modal()
		});

		$( "#pinBox" ).keyup(function() {
			$('#btnConfirmarPIN').prop('disabled', false)
		});

		/* Gestionamos Terminales */

		lastTerminal = $('#terminal1');

		$('#sTerminales').on('changed.bs.select', function (e) {
			$('#'+e.target.value).slideDown(500).fadeIn({duration: 500, queue: false})
			if(lastTerminal.length)
			lastTerminal.slideUp(500).fadeOut({duration: 500, queue: false})

			lastTerminal = $('#'+e.target.value)

			$("#alertaTerminales").removeClass("alert-warning")
			$("#alertaTerminales").addClass("alert-info")
			$("#alertaTerminales .alertaTerminales-texto").html('<span class="block" data-font-size="120">' + $("#alertaTerminales .alertaTerminales-texto").data("txtalternativo") + '</span>')


		});

		$('input').iCheck({
			checkboxClass: 'icheckbox_square-orange',
			radioClass: 'iradio_square-orange',
		});
		$('input','.row-prima').iCheck('disable')

		if($(".txt-precio").length){
			fitty('.txt-precio', {
				minSize: 15,
				maxSize: 80
			});
		}

	})
});
