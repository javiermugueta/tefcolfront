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
            
            $('input').iCheck({
                checkboxClass: 'icheckbox_square-orange',
                radioClass: 'iradio_square-orange',
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

            /* Para controlar el Scroll y sus elementos */ 
            $(window).scroll(function (event) {
                var scroll = jQuery(window).scrollTop();
                if(scroll > 90){
                    $("header").addClass("header-shadow")
                }else{
                    $("header").removeClass("header-shadow");
                }

              });


            $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); }).on('touchstart.dropdown', '.dropdown-submenu', function (e) { e.preventDefault(); });
            
        },

    home: function () {
            var me = this;

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

    },

    initWalmeric: function () {
            var me = this;

            //Animate from top
            $('.wp').waypoint(function() {
                $(this).toggleClass($(this).data('animated'));
            },
            { offset: '100%' });

            $('input').iCheck({
                checkboxClass: 'icheckbox_square-orange',
                radioClass: 'iradio_square-orange',
            });

    }
}        
