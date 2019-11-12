console.log("readyFunction.js");
$(document).ready(function() { 
	CONSTANTES.ready(function(){
		$.getScript("js/ciberseguro/fitty.min.js");
		 /* -------------- INICIO SCRIPT SIMULACIÓN --------------- */

        var contratar = false;
        var initialVal =  0;
        var lucro = 150
        var respon = 115
        var setLucro = 0;
        var setResp = 0;
        var setYear = 1;
        var tiempoEspera = 2000;
        var boxPersonal = false;
        var decimal_places = 2;
        var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
        var budgetId;
        var token;
        var respuestaDatos;
        var marcaId;
        var terminalId = "";
        var marcaName = "";
        var modeloName = "";
        var terminales = {};
        var tokenTerminal;
        var in_lopd = false;
        var mes;
        var año;
        var idPresupuesto;
        var terminacion;
        var msisdn;
        var precom;
        var imei;
        var sendSMS = false;
        
        if ((getParameterByName("area-privada")) == "true") {
			token = "Token " + sessionStorage.getItem("token"); 
		} else {
			token = "Token BRhWlBPOdGYPnSiykD80CF+lquG+a2m9";   	    
		}
        
        $('.nav-tabs li:eq(0) a').prop('disabled', true);
        $('.nav-tabs li:eq(1) a').prop('disabled', true);
        $('.nav-tabs li:eq(2) a').prop('disabled', true);
        
        if ((getParameterByName("id_presupuesto"))) {
        	budgetId = getParameterByName("id_presupuesto");
        	terminacion=2; 
        	Services.servicio( 'budget?budgetId='+budgetId, token, marcaModelo, {'type':'GET'}); 
        	
        } else {
        	terminacion=1;  
            Services.servicio( 'devices/', token, obtenerMarcas, {'type':'GET'});            
        }
        
        function marcaModelo(status, response){
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
//    			$('.bordeFecha').css({"border-color":"#00a9e0", "border-width":"initial"})
    			$('#modeloSelect').prop("disabled", false);
    			$('#sMes').prop("disabled", false);
    			$('#sAnio').prop("disabled", false);
    			$('#coberturasSelect').prop("disabled", false);
    			$('#marcaSelect').append('<option value="marcaId" selected="selected">' + marcaName+'</option>');
    			$('#modeloSelect').append('<option value="terminalId" selected="selected">'+ modeloName+'</option>');             		  
        		$('.campo').selectpicker('refresh');
        		//tarificacionMovil(); 
        		
    		} else {
    			Services.servicio( 'devices/', token, obtenerMarcas, {'type':'GET'});                    
    		}
    	}
        
        Services.servicio('options/TYPE_COBERTURA',token,obtenerSelectCoberturas,{'type':'GET'});
        
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
        


        
        function obtenerMarcas(status, response){	     
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
        
        
        $('.mensajeError').hide();
        $('#terminacion1').hide();
        $('.terminacion2').hide();
        $('.terminacion3').hide();
        
        
        if(terminacion==1){
            $('#marcaSelect').on('changed.bs.select', function (e) {
                
                if( $('#marcaSelect').val() == "4" || $('#modeloSelect').val() == "+20" || $('#sCiberataque').val() == "2" ) boxPersonal = true;                    

                if(boxPersonal){
                    $(".box-contratacion").hide();
                    $(".box-contratacion-personal").show();
                    $('input', '.box-precio').iCheck('enable'); 
                    $('#modeloSelect').prop('disabled', true);
                    $('#modeloSelect').selectpicker('refresh');  
                    disabledBotonLlamar(false);
                    boxPersonal = false;                 
                }else{
                    $(".box-contratacion").show();
                    $(".box-contratacion-personal").hide();
                    $('#modeloSelect').prop('disabled', false);
                    $('#modeloSelect').selectpicker('refresh');
                    disabledBotonLlamar(true);
                }
                
                $('#modeloSelect').empty();
        		var terminalesModelo = {}
        		var marca = $('#marcaSelect').val();
        		terminalesModelo = terminales[marca];		
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
                $('#modeloSelect').selectpicker('refresh');
                $('#sSuma').selectpicker('val', '');
                $('#sSuma').prop('disabled', true);
                $('#sSuma').selectpicker('refresh'); 
                $('#sCiberataque').selectpicker('val', '');
                $('#sCiberataque').prop('disabled', true);
                $('#sCiberataque').selectpicker('refresh');
                $("#ciberTipos").hide();    
                addClassSelect(this);
            });
		}        

        
        $('#modeloSelect').on('changed.bs.select', function (e) { 
                $('#sDia').selectpicker('val', '');
                $('#sDia').prop('disabled', false);
                $('#sDia').selectpicker('refresh');
                $('#sMes').selectpicker('val', '');
                $('#sMes').prop('disabled', false);
                $('#sMes').selectpicker('refresh');
                $('#sAnio').selectpicker('val', '');
                $('#sAnio').prop('disabled', false);
                $('#sAnio').selectpicker('refresh'); 
                $('#coberturasSelect').selectpicker('val', '');
                $('#coberturasSelect').prop('disabled', false);
                $('#coberturasSelect').selectpicker('refresh');
                $(".box-login-1").hide();
                $(".box-login-2").hide();
                $("#btnsolicitar").text("Contratar");
            	$(".box-contratacion").show();     
            addClassSelect(this);
        });
    	
        $('#sSuma').on('changed.bs.select', function (e) {         	
            $('#sCiberataque').prop('disabled', false);
            $('#sCiberataque').selectpicker('refresh');
            addClassSelect(this);
        });            
        

        $('#sDia').on('changed.bs.select', function (e) {     
            addClassSelect(this);           

        });

        $('#sMes').on('changed.bs.select', function (e) {     
            addClassSelect(this);           

        });
        $('#sAnio').on('changed.bs.select', function (e) {     
            addClassSelect(this);             
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
        
          

        $('#sCiberataque').on('changed.bs.select', function (e) {                
             addClassSelect(this);  
             //showCalculos();  

             if( $('#marcaSelect').val() == "4" || $('#modeloSelect').val() == "+20" || $('#sCiberataque').val() == "2" ) boxPersonal = true;

                if( boxPersonal){
                    $(".box-contratacion").hide();
                    $(".box-contratacion-personal").show();
                    $('input', '.box-precio').iCheck('enable'); 
                    $("#ciberTipos").show();
                    disabledBotonLlamar(false);
                    boxPersonal = false;  
                }else{
                    $(".box-contratacion").show();
                    $(".box-contratacion-personal").hide();
                    $("#ciberTipos").hide();
                    disabledBotonLlamar(true);
                }  
                $("#ciberTipos").show();
                if( $(this).val() == "0" ){ $("#ciberTipos").hide(); }     
        });
        
        
        $('#sCiberataqueTipo').on('changed.bs.select', function (e) {                
            addClassSelect(this);

        });


        $(".mod-precio").on('click',function(){

            if(contratar){
                type = $(this).data("type")
                console.log(initialVal)
                if(type == 'year'){ setYear =12;  calcTotal(); }
                if(type == 'month'){setYear =1; calcTotal(); }
                $('.col-desc-lista li').removeClass("active");
                $(this).parent().addClass("active");
            }

        });
        
        $("#btnsolicitar").click(function (e) {
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
        

        $("#btncontinuar1").click(function (e) {
    	phone = $('#movil').val();
        phone = phone.replace(/[^0-9]/g,'');         
        if ($('#dni').val() == null || $('#dni').val() == "" || $('#sMes').val()=="" || $('#movil').val() == null || $('#movil').val() == ""){
			e.preventDefault();
    		$('#textoError1').text(" Rellene los campos siguientes");
			$('.mensajeError').show();     
			$("#btncontinuar1").prop('disabled', false);
			$("#btncontinuar1").text('Continuar');
			$('.loader').hide();
    	} else {
			if (phone.length == 9 && ValidateSpanishID($('#dni').val()).valid){
				e.preventDefault();
            	$('.loader').show();
                $(this).prop('disabled', true);
                $(this).text("Espere...");
                validacionDNI();					
        			            		
        	} else {	
        		e.preventDefault();
        		$('#textoError1').text("Documento identificativo o número de teléfono inválido.");
				$('.mensajeError').show();     
				$("#btncontinuar1").prop('disabled', false);
				$("#btncontinuar1").text('Continuar');	
        	}    
    	}		            	                
        });
        
             
        
        $("#btnconfirmar").click(function (e) {  
             if($('#aceptaInfo').prop("checked") == true){
            	 $('.mensajeError').hide();
            	 if($("#imeiC").val()!= null){
	            		imei = $("#imeiC").val();                		
	            		terminaciones();
	                } else if(imei!=""){   
	                	terminaciones();
	                } else{                	
	                	console.log("Error en la validación del imei");
	                	imei="";
	                }  	            	 
             }  else {
            	 $('#textoError3').text('Debe aceptar los términos y condiciones de la póliza');
					$('.mensajeError').show();
					$("#btnconfirmar").prop('disabled', false);
					$("#btnconfirmar").text('Confirmar');
             }
            	
        	e.preventDefault();
        });


        $("#btncontinuar2").click(function (e) {
        	if($('#pinBox').val()== null || $('#pinBox').val()== ""){
        		e.preventDefault();
        		$('.mensajeError').show();
				$('#textoError2').text("Rellene los campos vacíos");
        	} else {
        		e.preventDefault();
            	validacionPin(); 
        	}            	           	            
        });
        
        

        //Teminaciones, hay 3 tipos y tenemos que seleccionar una en funcion de las condiciones

        // Abrimos modales
        $('.modal-info').click(function(){
            $("#myModalInfoAmpliada").modal();
        }); 
        $('.que-es-IMEI').click(function(){
            $("#myModalIMEI").modal();
        });            

        // Incluir lucro cesante
        $('input[name="inlineRadioOptionsLucro"]').on('ifChecked', function(event){
            if(this.value == "si"){       
                $('.txt-precio').animateNumber({ number: (initialVal * setYear) + lucro + setResp });
                setLucro = lucro;
            }else{    
                $('.txt-precio').animateNumber({ number: (initialVal * setYear) + setResp });
                setLucro = 0;
            }
        });

        // Incluir Responsabilidad Civil
        $('input[name="inlineRadioOptionsResp"]').on('ifChecked', function(event){
            if(this.value == "si"){       
                $('.txt-precio').animateNumber({ number: (initialVal * setYear) + setLucro + respon });
                setResp = respon;
            }else{    
                $('.txt-precio').animateNumber({ number: (initialVal * setYear) + setLucro });
                setResp = 0;
            }
        });     
        
        
        $( "#pinBox" ).keyup(function() {
        	$('#btncontinuar2').prop('disabled', false);            	
        });

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
		
        /* Gestionamos Terminales */

        lastTerminal = $('#terminal1');

        $('#sTerminales').on('changed.bs.select', function (e) {                
            $('#'+e.target.value).slideDown(500).fadeIn({duration: 500, queue: false});
            if(lastTerminal.length)
                lastTerminal.slideUp(500).fadeOut({duration: 500, queue: false});

            lastTerminal = $('#'+e.target.value);

            $("#alertaTerminales").removeClass("alert-warning");
            $("#alertaTerminales").addClass("alert-info");
            $("#alertaTerminales .alertaTerminales-texto").html('<span class="block" data-font-size="120">' + $("#alertaTerminales .alertaTerminales-texto").data("txtalternativo") + '</span>');

            
        });


         $('input').iCheck({
            checkboxClass: 'icheckbox_square-orange',
            radioClass: 'iradio_square-orange',
          });
         $('input','.row-prima').iCheck('disable');

         $('input[name="acepta_cesion"]').on('ifChecked', function(event){
 			console.log("en el ready con name");
             $('.btn-cesion').prop('disabled', false);             
 	    });
 	    
 	    $('input[name="acepta_cesion"]').on('ifUnchecked', function(event){ 
 	    	console.log("en el ready con name");
 	        $('.btn-cesion').prop('disabled', true);
 	    });
 	    
 	    $('input[name="aceptaInfo"]').on('ifChecked', function(event){  
 	    	console.log("en el ready con name");
 	        $('#btnconfirmar').prop('disabled', false);
 	        $('#textoError1').text("");
 			$('.mensajeError').hide();                  
 	    });
 	    
 	    $('input[name="aceptaInfo"]').on('ifUnchecked', function(event){   
 	    	console.log("en el ready con name");
 	        $('#btnconfirmar').prop('disabled', true);
 	    });
 	    
        if($(".txt-precio").length){
            fitty('.txt-precio', {
              minSize: 15,
              maxSize: 80
            });
        }
        //FUNCIONES
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
        	if(terminacion==1){
        		jsonMM["brandId"]= $('#marcaSelect').val();
        		jsonMM["deviceId"] = $('#modeloSelect').val();           		
        	} else if(terminacion==2){
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
       					pintarDatosEconomicos(respuesta);
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
        	//jsonDNI["modalidad"]=$('#coberturasSelect').val();  
        	if($('#movil').val() != "" && $('#dni').val() != "" && budgetId != null){
            	Services.servicioIPFilter('movistar/uninsured-devices/validateDocument',token,null,{
					data: jsonDNI,
					type: "POST",
					contentType: 'application/json',
					success: function(result) {
						$('.mensajeError').hide();
						respuestaDatos = result.result;							
						pintarDatos(respuestaDatos);							
						//console.log("La validación se ha realizado correctamente");							
		                setTimeout(function(){
		                  $('.loader').hide();
		                  $(".box-login-1").hide();
		                  $(".box-login-2").show();
		                }, 1000);
		                $("#fechaCompraC").text(mes + " / " + año);
					},
					error: function(result) {
						$("#btncontinuar1").prop('disabled', false);
						$("#btncontinuar1").text('Continuar');
						$("#dni").val('');
						$("#movil").val('');
						$('.loader').hide();							
						if(result!=null && result.responseJSON!=null && result.responseJSON.msg!=null){
							$('#textoError1').text(result.responseJSON.msg);
						} else{
							$('#textoError1').text("Error en la validación de los datos");
						}						
						$('.mensajeError').show();
					}
            	});
        	};
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
        
        function terminaciones(){
        	$('.loader').show();                
            $(this).prop('disabled', true);
            $(this).text("Espere...");  
            switch (terminacion){
        	case 1: 
        		if(imei != null){            			
            		end();
        		}	            		
        		break;
        	case 2:
        		if(imei != null){            			
            		end();
        		}
        		break;
        	case 3:
        		$('.terminacion3').show();
        		$('#marca3').text(marcaId);
                $('#modelo3').text(terminalId);
                $('#imei3').text($('#imeiC').val());
                break;
        	default:
        		console.log("No se ha seleccionado ninguna terminación");                
            }      
            return false;
        }
        
        
        function end(){            	
        	var jsonEnd1= {};
        	email = $("#emailC").text();    
        	sendSMS = true;
        	jsonEnd1["token"]= tokenTerminal;
        	if($('#lopdCampo').is(':checked')){
        		in_lopd=true;
        	}
        	jsonEnd1["email"]= email;    
        	jsonEnd1["imei"]= imei;          	
        	jsonEnd1["in_lopd"]= in_lopd;            	     
        	jsonEnd1["sendSMS"]= sendSMS;  
        	if(tokenTerminal!= null){
        		Services.servicioIPFilter('movistar/contractTemp',token,null,{
					data: jsonEnd1,
					type: "POST",
					contentType: 'application/json',
					success: function(result) {
						if(result.code == 0 || result.code == 250){
							$('.mensajeError').hide(); 
							if(terminacion==1){
								$('#terminacion1').show();
								setTimeout(function(){     
				                    $('.loader').hide();               
				                    $('.nav-tabs li:eq(2) a').tab('show');
				                    $('#l-cob-box').removeClass('stuck');
				                    //reCalcVtop();
				                    $('html,body').animate({scrollTop:($('#step3').offset().top+(-80))},1000,function(){});     
				                }, tiempoEspera);	
							} else if(terminacion==2){
								$('.terminacion2').show();
			            		setTimeout(function(){     
				                    $('.loader').hide();               
				                    $('.nav-tabs li:eq(2) a').tab('show');
				                    $('#l-cob-box').removeClass('stuck');
				                    //reCalcVtop();
				                    $('html,body').animate({scrollTop:($('#step3').offset().top+(-80))},1000,function(){});     
				                }, tiempoEspera);	
							}								
						} else {
							$('#textoError3').text(result.msg);
							$('.mensajeError').show();
							$("#btnconfirmar").prop('disabled', false);
							$("#btnconfirmar").text('Confirmar');
							$('.loader').hide();	
						}								
												
					},
					error: function(result) {	
						if(result.responseJSON != null){
							$('#textoError3').text(result.responseJSON.msg);
						} else 	if(result.responseJSON == undefined){
							$('#textoError3').text(result.statusText);
						} else {
							$('#textoError3').text("Error en la contratación");
						}					
						$('.mensajeError').show();
						$("#btnconfirmar").prop('disabled', false);
						$("#btnconfirmar").text('Confirmar');
						$('.loader').hide();	
						console.log("Error en la contratación");
					}
            	});            		
        	}            	
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
            	Services.servicioIPFilter('movistar/uninsured-devices/pinCodeValidation',token,null,{
					data: jsonPin,
					type: "POST",
					contentType: 'application/json',
					success: function(result) {
						$('.mensajeError').hide();
						var marcaNameC = result.result.brandName;
						var modeloNameC = result.result.modelName;
						precom = result.result.device.codPrecom;
						validarImei();
						$("#marcaC").text(marcaNameC);
		            	$("#modeloC").text(modeloNameC);
		            	$("#precioFranquiciaC").text(result.result.franquicia);  
						cambioPantalla();
					},
					error: function(result) {
						$("#btncontinuar1").prop('disabled', false);
						$('.mensajeError').show();
						//$('#textoError2').text(result.responseJSON.msg);
						$('.loader').hide();
					}
            	});
        	};
        	return null;            	
        };

        function cambioPantalla(){
        	$('.loader').show();               
            setTimeout(function(){
              $('.loader').hide();
              $(".box-contratacion").show();
              $(".box-login").hide();
              $('.nav-tabs li:eq(1) a').tab('show');
              $('#l-cob-box').removeClass('stuck');
              $('html,body').animate({scrollTop:($('#step2').offset().top+(-80))},1000,function(){});                   
            }, tiempoEspera);    
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
        
        
        
        /* -------------- FIN SCRIPT SIMULACIÓN --------------- */
        
		
	});
});