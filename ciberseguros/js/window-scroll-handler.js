
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
 $('input').iCheck('disable');

 //store the element
var $cache = $('#l-cob-box');
var vTop = ($cache.offset().top - parseFloat($cache.css('marginTop').replace(/auto/, 0))) - 90;

function reCalcVtop(){                
    vTop = ($cache.offset().top - parseFloat($cache.css('marginTop').replace(/auto/, 0))) - 90;
}

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
      reCalcVtop();
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