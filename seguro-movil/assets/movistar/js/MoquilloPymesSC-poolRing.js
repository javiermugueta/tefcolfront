function MoquilloPymes(){
	
	this.carga_moq = function(){
		/*var css_moquillo_Pyme = '<style type="text/css">#moquillo-Pyme *{outline: none;outline-style: none;}'+
		'.btnC2C{font-family: MovistarTextRegular;position: relative;background-color: #0087c6;color: white !important;text-align: center;margin-bottom: 20px;margin-left: 0px !important;}'+
		'#moquillo-Pyme{overflow: visible !important;line-height: 2em;position: absolute;top: 175px;z-index: 1000;font-size: 1.5em;}.moq-ancho-horizontal{width: 90%;height: 100%;}'+
		'.moq-ancho-vertical{height: 100%;width: 980px;}#moq-Pyme-cerrado {overflow: visible !important;line-height: 2em;position: relative;border: 0px solid transparent;background-color: #fff;padding: 1% 2%;}'+
		'#moquillo-Pyme.rotate90{-webkit-transform: rotate(-90deg);-moz-transform: rotate(-90deg);-ms-transform: rotate(-90deg);-o-transform: rotate(-90deg);transform: rotate(-90deg);}'+
		'#moq-Pyme-cerrado .titulo{color:#F3219C;font-weight: bolder;padding:0em 6em;}#moq-Pyme-abierta{background:white;border: 1px solid gray;background-color:#fff;box-shadow:0px 2px 10px gray;}'+
		'#moq-Pyme-abierta .titulo{color:#F3219C;font-size:25px;text-align:left;padding-left:4%;font-family:MovistarTextRegular;}#moq-Pyme-abierto{float: left;width: 96%;}#moq-pelis-series{padding: 1% 0px;}'+
		'.cerrar-moq{color:#0189C7;float:left;font-size:1.8em;margin: 38% 1% 1% 0px;}.derecha-cerrado{right: 0em;}.derecha-abierto{right: 0em;}'+
		'.moq-sc{text-align: left;border-bottom: 1px solid #d3e1e4;font-size: 16px;font-family: MovistarTextRegular;text-transform: uppercase;display: flex;}'+
		'.moq-sc li{position:relative;display:block;float:left;margin-bottom:-1px;}.moq-sc li a{border: none; color: #9a9a9a;padding: 15px;text-decoration: none;position:relative;display:block;}'+
		'.moq-sc li:hover{background-color: white;border-bottom: 2px solid #0086c3;}.moq-sc li.active{border-bottom: 2px solid #0086c3;}'+
		'.moq-sc li.active a, .moq-sc li.active a:hover, .moq-sc li a:hover{border: none;color: #0087c6;}#moquillo-Pyme #MVH-pelis-carrusel .owl-controls .owl-dots{top: -45px !important;}'+
		'#moquillo-Pyme #MVH-pelis-carrusel .owl-controls .owl-nav .owl-prev, #MVH-pelis-carrusel .owl-controls .owl-nav .owl-next{bottom: 30px !important;}#cargandoAgendaDeportiva{padding: 5% 0px;}'+
		'#moquillo-Pyme #MVH-pelis-carrusel .owl-controls .owl-nav [class*=owl-]{filter: alpha(opacity=70);}</style>';
		var html_moquillo_Pyme = '<div id="moquillo-Pyme" class="hidden-xs derecha-cerrado" style="top: 1704px; overflow: hidden; display: none;"><div style=""><a href="javascript:MostrarMoq();" style="display: none;" id="moqplegado"><img src="/estaticos/img/ico-llamar-c2c-flotante.png" style="margin-left: -169px;"></a></div><div id="moq-Pyme-cerrado" style="overflow: hidden;background: url(/estaticos/img/es_ES/c2c-emp-3.png);height: 315px;width: 210px;"><div style=""><a href="javascript:OcultarMoq();" style="" id="moqdesplegado"><img src="/estaticos/img/ico-plegar-c2c-flotante.png" style="margin-left: -169px;"></a></div><div class="GW_inferiorCol btnC2C" style="padding: 2px; height:initial;margin-top:122px;width:90%;float:right;"><a title="LE LLAMAMOS GRATIS" class="GW_linkOverBox sc-btn-c2c" href="javascript:;" itemprop="description" style="padding: 2px 2px 2px 2px;">&nbsp;</a> LE LLAMAMOS GRATIS</div><a title="CONSULTAR COBERTURA" class="sc-btn-c2c" href="javascript:;" itemprop="description" target="blanck_" style="padding: 2px 2px 2px 2px;display: block;margin-top: 212px;">&nbsp;<div class="GW_inferiorCol btnC2C" style="padding: 2px;height:initial;width:90%;float:right;background-color:#003550;"> CONSULTAR COBERTURA</div></a></div></div>';*/
		var marginIE = 0;

		var uaVersion=-1;
	    var ua = window.navigator.userAgent;
	    if (ua.indexOf("Trident/7.0") > 0)
	        uaVersion= 11;
	    else if (ua.indexOf("Trident/6.0") > 0)
	        uaVersion= 10;
	    else if (ua.indexOf("Trident/5.0") > 0)
	        uaVersion= 9;
	    else
	        uaVersion= 0;  // not IE9, 10 or 11
		 

		if(uaVersion>0){
			marginIE=20;
		}

		var css_moquillo_Pyme = '<style type="text/css">#moquillo-Pyme *{outline: none;outline-style: none;}'+
		'.btnC2C{font-family: MovistarTextRegular;position: relative;background-color: #0087c6;color: white !important;text-align: center;margin-bottom: 20px;margin-left: 0px !important;}'+
		'#moquillo-Pyme{overflow: visible !important;line-height: 0em;position: absolute;top: 175px;z-index: 1000;font-size: 1.5em;}.moq-ancho-horizontal{width: 90%;height: 100%;}'+
		'.moq-ancho-vertical{height: 100%;width: 980px;}#moq-Pyme-cerrado {overflow: visible !important;line-height: 2em;position: relative;padding: 1% 2%;}'+
		'#moquillo-Pyme.rotate90{-webkit-transform: rotate(-90deg);-moz-transform: rotate(-90deg);-ms-transform: rotate(-90deg);-o-transform: rotate(-90deg);transform: rotate(-90deg);}'+
		'#moq-Pyme-cerrado .titulo{color:#F3219C;font-weight: bolder;padding:0em 6em;}#moq-Pyme-abierta{background:white;background-color:#fff;}'+
		'#moq-Pyme-abierta .titulo{color:#F3219C;font-size:25px;text-align:left;padding-left:4%;font-family:MovistarTextRegular;}#moq-Pyme-abierto{float: left;width: 96%;}#moq-pelis-series{padding: 1% 0px;}'+
		'.cerrar-moq{color:#0189C7;float:left;font-size:1.8em;margin: 38% 1% 1% 0px;}.derecha-cerrado{right: 0em;}.derecha-abierto{right: 0em;}'+
		'.moq-sc{text-align: left;border-bottom: 1px solid #d3e1e4;font-size: 16px;font-family: MovistarTextRegular;text-transform: uppercase;display: flex;}'+
		'.moq-sc li{position:relative;display:block;float:left;margin-bottom:-1px;}.moq-sc li a{border: none; color: #9a9a9a;padding: 15px;text-decoration: none;position:relative;display:block;}'+
		'.moq-sc li:hover{background-color: white;border-bottom: 2px solid #0086c3;}.moq-sc li.active{border-bottom: 2px solid #0086c3;}'+
		'.moq-sc li.active a, .moq-sc li.active a:hover, .moq-sc li a:hover{border: none;color: #0087c6;}#moquillo-Pyme #MVH-pelis-carrusel .owl-controls .owl-dots{top: -45px !important;}'+
		'#moq-Pyme-cerrado .circ-despl{width: 25px;height: 25px;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;background-color: #954B97;} '+
		'.circ-pleg{    width: 25px;height: 25px;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;background-color: #954B97;margin-right: 20px;padding-top: 4px;} '+
		'#moq-Pyme-cerrado .icon-despl{color: #ffffff;padding-left: 6px;font-size: 15px;} '+
		'.icon-pleg{color: #ffffff;padding-left: 6px;font-size: 15px;} '+
		'#moq-Pyme-cerrado .cont-moq{padding-top: 5px;padding-left: 3px;padding-bottom: 30px;}'+
    	'#moq-Pyme-cerrado .supertext-tellam{    width: 134px;font-family: TelefonicaRegular;font-size: 14px;color: #ffffff;font-weight: bold;line-height: 15px;padding-left: 44px;text-align: left;}'+
    	'#moq-Pyme-cerrado .supertext-telefono{font-size: 15px;font-family: TelefonicaRegular;color: #ffffff;text-align: left;padding-left: 5px;    height: 20px;position: relative;top: -3px;}'+
    	'.ex-ajust-moq{margin-right:' + marginIE + 'px;}'+
		'#moquillo-Pyme #MVH-pelis-carrusel .owl-controls .owl-nav .owl-prev, #MVH-pelis-carrusel .owl-controls .owl-nav .owl-next{bottom: 30px !important;}#cargandoAgendaDeportiva{padding: 5% 0px;}'+
		'#moquillo-Pyme #MVH-pelis-carrusel .owl-controls .owl-nav [class*=owl-]{filter: alpha(opacity=70);}'+
		'.consultacob{display: block;color: #ffffff;border-bottom: 1px solid #ffffff;padding-bottom: 7px;    width: 106px;text-align: center;letter-spacing: 0px;font-family: TelefonicaRegular;margin-left: 12px;font-size: 13px;}'+
		'.btn900moq{font-family: MovistarTextRegular;text-align:right;margin-bottom:20px;line-height:17px;padding:5px 0px;background:transparent;margin-top:62px;margin-right:-4px;}</style>';
		var html_moquillo_Pyme = '<div id="moquillo-Pyme" class="hidden-xs derecha-cerrado" style="top: 1704px; overflow: hidden; display: none;"><div style=""><a href="javascript:MostrarMoq();" style="display: none;" id="moqplegado"><div class="circ-pleg"><span class="icon-fijo-nuevo icon-pleg">&nbsp;</span></div></a></div><div id="moq-Pyme-cerrado" style="background: url(/estaticos/imagenes/c2c-emp-6.png) no-repeat;    background-size: 133px 171px;" class="ex-ajust-moq"><div style="right:25px; position:relative;float: left;"><a href="javascript:OcultarMoq();" style="" id="moqdesplegado"><div class="circ-despl"><span class="icon-cheuron-dcha-2 icon-despl">&nbsp;</span></div></a></div><div class="cont-moq"><div class="supertext-tellam">Habla<br>gratis con<br>tu comercial</div><div style="width: 120px;font-size: 9px;"><div class="btnC2C" style="    padding: 2px;height: 35px;margin-top: 8px;font-size: 1.5em;background-color: #00A9E0;margin-bottom: 0px;"><a title="TE LLAMAMOS" class="GW_linkOverBox sc-btn-c2c" href="javascript:;" itemprop="description" style="padding: 2px 2px 2px 2px; display: block;">&nbsp;</a>TE LLAMAMOS</div>'+'</div><div class="supertext-telefono">O si lo prefieres...</div><div class="btn900moq sc-visible-900Activo" style="  background: transparent;padding-right: 0px;margin: 0px;text-align: left;    padding-top: 0px;font-family: TelefonicaRegular;font-size: 18px;font-weight: bold;padding-left: 5px;padding-bottom: 12px;">'+'<a class="telefono" href="tel:900 200 518" style="font-size: 19px;color: white;text-decoration: none;padding-left: 3px;line-height:16px;">900 200 518</a></div></div></div><div id="consultaCob" style="top: -30px;position: relative;"><a title="Consulta cobertura" class="sc-btn-c2c consultacob" href="javascript:;" itemprop="description" target="blanck_" style="color: #ffffff;">Consulta cobertura</a></div></div>';

		$("body").append(css_moquillo_Pyme); 
		$("body").append(html_moquillo_Pyme);
		moq_toggle();
		$("#moquillo-Pyme").css("top", $(window).scrollTop() + 30);

		$("#moquillo-Pyme").show("#moquillo-Pyme");
		
	}
	
	function moq_toggle(){
			$("#moq-Pyme-cerrado").animate({
			}, 1250, function() {
				$("#moq-Pyme-abierta").hide();				
				$("#moq-Pyme-cerrado").show();	
				$("#moquillo-Pyme").removeClass("moq-ancho-vertical");
				$("#moquillo-Pyme").css("top", $(window).scrollTop() + 30);						
			});
	}	
}

/*function cerrarMoquilloPymes(){
		$("#moq-Pyme-cerrado").hide();
		};*/

	function MostrarMoq(){
		$('#moq-Pyme-cerrado').css('display','block');
		$('#consultaCob').css('display','block');
		$('#moqplegado').css('display','none');
	}

	function OcultarMoq(){
		$('#moq-Pyme-cerrado').css('display','none');
		$('#consultaCob').css('display','none');
		$('#moqplegado').css('display','block');
	}
	
$(window).bind("scroll", function()
{
	var elem = $("#moquillo-Pyme");

	var moqDesp = 30;/*($("#moq-Pyme-abierto").is(":visible")) ? 30 : 100; */

	elem.stop().animate({
		top : $(this).scrollTop() + moqDesp
	}, 1250, 'swing');
});

$(window).bind("resize", function()
{
	//$("#moquillo-Pyme").css("right", parseFloat($("#moquillo-Pyme").css("right")) - ($("body").width() - $("#moquillo-Pyme").width() - $("#moquillo-Pyme").position().left));
});
