var AppCiber = {        
        init: function () {
            var me = this;   
            

            //Textos legales
            $('a.link-legal-mas').click(function(){
                table = $(this).data('target');
                $('tbody.'+table).toggle();
                console.log(table);
                $('html,body').animate({scrollTop:( $('tbody.'+table).offset().top+(-130))},1000,function(){});
            });
            
            $('.col-link').click(function(){
                dirhref = $(this).data('href');
                window.location = dirhref;
            });            

            $(document.body).on('click','.anchor',function(){
                var go_to='#'+$(this).attr('id');
                $('html,body').animate({scrollTop:($(go_to).offset().top+(-80))},1000,function(){});
            });

            $(document.body).on('click','.link-anchor',function(){            
                var go_to='#'+$(this).data('target');
                $('html,body').animate({scrollTop:($(go_to).offset().top+(-80))},1000,function(){});
            });

            // Subir botón:
            $('.subir').hide();
            $(window).scroll(function () {
                if ($(this).scrollTop() > 300) { //Esto hace que el Div aparezca de despues de haber bajado 100px con el scroll
                    $('.subir').fadeIn(); //Aparece con un efecto Fade
                } else {
                    $('.subir').fadeOut(); // Desaparece con un efecto Fade
                }
            });
            $('.subir a').click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 500); // Todo esto hace que se la pagina se desplace hasta el tope con una lentitud de 500 milisegundos
                return false;
            });

            

            if($( window ).width() < 550) {
                 $('#s-otromodelo').removeClass('fixed-modelo');
             }else{
                $('#s-otromodelo').addClass('fixed-modelo');
             }

            /* Para controlar el Scroll y sus elementos */ 
            $(window).scroll(function (event) {
                var scroll = jQuery(window).scrollTop();
                if(scroll > 90){
                    $("header").addClass("header-shadow")
                }else{
                    $("header").removeClass("header-shadow");
                }

                if(scroll > $(window).height() + 200 && ($( window ).width() > 550)  ){
                    $('#s-otromodelo').addClass('fixed-modelo-hide');

                }else{
                    $('#s-otromodelo').removeClass('fixed-modelo-hide');
                }

              });

            function leerCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }
            
            
            /* Aviso Cookies */
            /*
            var tcf_cookie = leerCookie('ticiber_cookie');
            if (tcf_cookie === null || tcf_cookie === '0') {
                var url = '/politica-de-cookies.html';
                $.cookiesDirective({
                    position: 'top',
                    explicitConsent: false,
                    message: '<div class="cookies" id="cookiesdirective"><div><p>Este Sitio web utiliza cookies propias y de terceros para recopilar información sobre tus hábitos de navegación y poder así mejorar y personalizar tu experiencia, así como para mostrarte únicamente publicidad que pueda ser de tu interés, si así lo autorizas.</p><p>Puedes obtener más información en <a href="' + url + '" target="_blank">Política de cookies</a>, incluida la necesaria para modificar su configuración.</p><a class="cookie-close close">Ok!</a></div></div>',
                    duration: 3000
                });
            }*/


            lastItem = null;
            $(".lista a.dm").on('click', function () {
                $("ul.sub-menu", $(this).parent()).first().slideToggle();
                lastItem = $("ul.sub-menu", $(this).parent()).first()
                return false;
            });

            $("a.display-phones").on('click', function () {
                console.log($(this).data("target"))
                $(".list-phones-container-items").hide();
                $(".col-recurso").hide();
                $("#display-phones-items").show();
                $("#"+$(this).data("target")).fadeIn();
                return false;
            });

            
        },

    home: function () {
            var me = this;

            //Animate from top
            $('.wp').waypoint(function() {
                $(this).toggleClass($(this).data('animated'));
            },
            { offset: '100%' });

            if (typeof Swiper != "undefined") {

                var swiper = new Swiper('.swiper-container',{
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    spaceBetween: 30,
                    hashnavWatchState: true,
                    paginationClickable: true,
                    autoplay: 6500,
                    autoplayDisableOnInteraction: false,
                    loop: true
                });

                $('.swiper-container').on('mouseenter', function(e){
                    swiper.stopAutoplay();
                });
                $('.swiper-container').on('mouseleave', function(e){
                    swiper.startAutoplay();
                });

            }
                       
            // Abrimos modales
            $('.modal-info').click(function(){
                $("#myModalInfoAmpliada").modal();
            });  

            $('.graph1').click(function(){
                $("#myModalGraph1").modal();
            }); 
            $('.graph2').click(function(){
                $("#myModalGraph2").modal();
            });
/*
            $('input').iCheck({
                checkboxClass: 'icheckbox_square-orange',
                radioClass: 'iradio_square-orange',
            });*/

            $('.play-video-modal').click(function(){
                $('#myModalVideo').modal('show');            
            });
            $('#myModalVideo').on('hidden.bs.modal', function () {
                    var myPlayer = videojs("video-empresas");
                    myPlayer.pause();
            })
            $('#myModalVideo').on('shown.bs.modal', function () {
                    var myPlayer = videojs("video-empresas");
                    myPlayer.play();
            })


            $('.play-video-modal-corto').click(function(){
                $('#myModalVideoShort').modal('show');            
            });
            $('#myModalVideoShort').on('hidden.bs.modal', function () {
                    var myPlayer = videojs("video-empresas-short");
                    myPlayer.pause();
            })
            $('#myModalVideoShort').on('shown.bs.modal', function () {
                    var myPlayer = videojs("video-empresas-short");
                    myPlayer.play();
            })

            $( window ).resize(function() {
                recalcIconResize($( window ).width())
            });
            recalcIconResize($( window ).width());
            function recalcIconResize(w){
                if( w < 767 ){
                    $( ".r1-2" ).append().insertBefore( ".r1-1" );
                    $( ".hr-1" ).append().insertBefore( ".r1-1" );
                    $( ".r2-2" ).append().insertBefore( ".r2-1" );
                    $( ".hr-2" ).append().insertBefore( ".r2-1" );        
                    $( ".r3-2" ).append().insertBefore( ".r3-1" );
                    $( ".hr-3" ).append().insertBefore( ".r3-1" );
                    $( ".r4-2" ).append().insertBefore( ".r4-1" );
                    $( ".hr-4" ).append().insertBefore( ".r4-1" );
                    $( ".r5-2" ).append().insertBefore( ".r5-1" );
                    $( ".hr-5" ).append().insertBefore( ".r5-1" );
                    $( ".r6-2" ).append().insertBefore( ".r6-1" );
                    $( ".hr-6" ).append().insertBefore( ".r6-1" );
                    $( ".r7-2" ).append().insertBefore( ".r7-1" );
                    $( ".hr-7" ).append().insertBefore( ".r7-1" );
                    $( ".r8-2" ).append().insertBefore( ".r8-1" );
                    $( ".hr-8" ).append().insertBefore( ".r8-1" );

                }else{
                    $( ".r1-1" ).append().insertBefore( ".r1-2" );
                    $( ".hr-1" ).append().insertBefore( ".r1-2" );
                    $( ".r2-1" ).append().insertBefore( ".r2-2" );
                    $( ".hr-2" ).append().insertBefore( ".r2-2" );
                    $( ".r3-1" ).append().insertBefore( ".r3-2" );
                    $( ".hr-3" ).append().insertBefore( ".r3-2" );
                    $( ".r4-1" ).append().insertBefore( ".r4-2" );
                    $( ".hr-4" ).append().insertBefore( ".r4-2" );
                    $( ".r5-1" ).append().insertBefore( ".r5-2" );
                    $( ".hr-5" ).append().insertBefore( ".r5-2" );
                    $( ".r6-1" ).append().insertBefore( ".r6-2" );
                    $( ".hr-6" ).append().insertBefore( ".r6-2" );
                    $( ".r7-1" ).append().insertBefore( ".r7-2" );
                    $( ".hr-7" ).append().insertBefore( ".r7-2" );
                    $( ".r8-1" ).append().insertBefore( ".r8-2" );
                    $( ".hr-8" ).append().insertBefore( ".r8-2" );
                }
            }
            
    },

    marcas: function(){

        var swiper = new Swiper('.swiper-container',{
                pagination: '.swiper-pagination',
                paginationClickable: true,
                spaceBetween: 30,
                hashnavWatchState: true,
                paginationClickable: true,
                autoplay: 6500,
                autoplayDisableOnInteraction: false,
                loop: true
            });


            $('.swiper-container').on('mouseenter', function(e){
                swiper.stopAutoplay();
            });
            $('.swiper-container').on('mouseleave', function(e){
                swiper.startAutoplay();
            });

    },

    coberturas: function () {
    	
            $("#nav-menu-button").on("click", function() {
                var b = $(".nav-menu-stack", this);
                var n = $("#nav-menu");
                if (n && b) {
                    if (b.hasClass("is-active")) {
                        b.removeClass("is-active");
                        n.removeClass("is-active");
                    } else {
                        b.addClass("is-active");
                        n.addClass("is-active");
                    }
                }
            });
            $('[data-toggle="tooltip"]').tooltip();   

            /* Para controlar el Scroll y sus elementos */ 
            $(window).scroll(function (event) {
                var scroll = jQuery(window).scrollTop();
                if(scroll > 90){
                    $("header").addClass("header-shadow")
                }else{
                    $("header").removeClass("header-shadow");
                }

              });

            $(document.body).on('click','.anchor-cob',function(){
                var go_to='#'+$(this).data('id');
                $('html,body').animate({scrollTop:($(go_to).offset().top+(-90))},1000,function(){});
                $("h2","#col-text-c").removeClass("active");
                $(go_to + " h2").addClass("active");                
                 return false;
            });

            if(window.location.hash){
                var anchor=$('#'+window.location.hash.replace('#',''));                
                if($(anchor).length>0){$('html,body').animate({scrollTop:($(anchor).offset().top+(-90))},1000,function(){});}
                $("h2","#col-text-c").removeClass("active");
                $('#'+window.location.hash.replace('#','') + " h2").addClass("active");  
            }

             //store the element
            var $cache = $('#l-cob-box');

            //store the initial position of the element
            var vTop = ($cache.offset().top - parseFloat($cache.css('marginTop').replace(/auto/, 0))) - 90;
            $(window).scroll(function (event) {
                // what the y position of the scroll is
                var y = $(this).scrollTop();

                // whether that's below the form
                if (y >= vTop) {
                  // if so, ad the fixed class
                  $cache.addClass('stuck');
                } else {
                  // otherwise remove it
                  $cache.removeClass('stuck');
                }
              });

            $(function () {
                $('.subir').hide();
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 300) { //Esto hace que el Div aparezca de despues de haber bajado 100px con el scroll
                        $('.subir').fadeIn(); //Aparece con un efecto Fade
                    } else {
                        $('.subir').fadeOut(); // Desaparece con un efecto Fade
                    }
                });
                $('.subir a').click(function () {
                    $('body,html').animate({
                        scrollTop: 0
                    }, 500); // Todo esto hace que se la pagina se desplace hasta el tope con una lentitud de 500 milisegundos
                    return false;
                });
            });

            $('input[name=nombreSimularPoliza]').on('input',function(e){
            
                if($('input[name=nombreSimularPoliza]').val() != "" && $('input[name=nombreSimularPoliza]').val() != null ){
                    $("#btnSimularPoliza").removeAttr("disabled");  
                }else{
                    $("#btnSimularPoliza").attr("disabled", "disabled");
                }
            });
        
            $("#btnSimularPoliza").click (function() {
                $.cookie("nombreSimulacion", $('input[name=nombreSimularPoliza]').val());
            });

    },

    contratacion: function () {
            var me = this;
            
    	    
            /* Para controlar el Scroll y sus elementos */ 
            $(window).scroll(function (event) {
                var scroll = jQuery(window).scrollTop();
                if(scroll > 90){
                    $("header").addClass("header-shadow")
                }else{
                    $("header").removeClass("header-shadow");
                }

              });
             $(document.body).on('click','.anchor',function(){
                var go_to='#'+$(this).attr('id');
                $('html,body').animate({scrollTop:($(go_to).offset().top+(-80))},1000,function(){});
             });
             $(document.body).on('click','.anchor-cob',function(){
                var go_to='#'+$(this).data('id');
                $('html,body').animate({scrollTop:($(go_to).offset().top+(-90))},1000,function(){});
                $("h2","#col-text-c").removeClass("active");
                $(go_to + " h2").addClass("active");     
                return false;
            });

             $('input').iCheck({
                checkboxClass: 'icheckbox_square-orange',
                radioClass: 'iradio_square-orange',
              });
             $('input','.row-prima').iCheck('disable');

            $(function () {
                $('.subir').hide();
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 300) { //Esto hace que el Div aparezca de despues de haber bajado 100px con el scroll
                        $('.subir').fadeIn(); //Aparece con un efecto Fade
                    } else {
                        $('.subir').fadeOut(); // Desaparece con un efecto Fade
                    }
                });
                $('.subir a').click(function () {
                    $('body,html').animate({
                        scrollTop: 0
                    }, 500); // Todo esto hace que se la pagina se desplace hasta el tope con una lentitud de 500 milisegundos
                    return false;
                });
            });


    }
}        


// Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.com/#x15.4.4.18
    if (!Array.prototype.forEach) {

      Array.prototype.forEach = function forEach(callback, thisArg) {
        'use strict';
        var T, k;

        if (this == null) {
          throw new TypeError("this is null or not defined");
        }

        var kValue,
            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            O = Object(this),

            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            len = O.length >>> 0; // Hack to convert O.length to a UInt32

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if ({}.toString.call(callback) !== "[object Function]") {
          throw new TypeError(callback + " is not a function");
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length >= 2) {
          T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

          // a. Let Pk be ToString(k).
          //   This is implicit for LHS operands of the in operator
          // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
          //   This step can be combined with c
          // c. If kPresent is true, then
          if (k in O) {

            // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
            kValue = O[k];

            // ii. Call the Call internal method of callback with T as the this value and
            // argument list containing kValue, k, and O.
            callback.call(T, kValue, k, O);
          }
          // d. Increase k by 1.
          k++;
        }
        // 8. return undefined
      };
    }