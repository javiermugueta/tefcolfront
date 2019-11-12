//https://cookieconsent.insites.com/documentation/javascript-api/
var $cookies_enabled;
function trackingScripts(enable) {
    $cookies_enabled = enable;
}


    var p;


    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#00a9e0",
                "text": "#fff"
            },
            "button": {
                "background": "#5bc500",
                "text": "#ffffff"
            }
        },
        "type": "opt-in",
        //"dismissOnScroll": 100,
        "content": {
            //"message": "<p class='desktop-mobile'>Utilizamos cookies propias y de terceros para elaborar perfiles basados en hábitos de navegación del usuario, para mejorar tu experiencia, personalizar y analizar tu navegación, mostrar publicidad y anuncios basados en tus intereses. Si sigues navegando, consideramos que aceptas su uso.</p><p class='desktop-mobile'>Puedes obtener más información en <a href='/politica-de-cookies.html' target='_blank'>Política de cookies</a>, incluida la necesaria para modificar su configuración.</p><p class='cookies-mobile'>Esta web utiliza cookies propias y de terceros para analizar tu navegación. Si sigues navegando, consideramos que aceptas su uso. Más info <a href='/politica-de-cookies.html' target='_blank'>aquí</a></p>",
            "message": "<p class='desktop-mobile'>Utilizamos cookies propias y de terceros para elaborar perfiles basados en hábitos de navegación del usuario, para mejorar tu experiencia, personalizar y analizar tu navegación, mostrar publicidad y anuncios basados en tus intereses.</p><p class='desktop-mobile'>Puedes obtener más información en <a href='/politica-de-cookies.html' class='modalCookies'>Política de cookies</a>, incluida la necesaria para modificar su configuración.</p><p class='cookies-mobile'>Esta web utiliza cookies propias y de terceros para analizar tu navegación y mostrar publicidad basada en tus intereses. Más info <a href='/politica-de-cookies.html' class='modalCookies'>aquí</a></p>",
            "dismiss": "Descartar",
            "deny": "Descartar",
            "allow": "OK!",
            "link": "Leer más",
            "policy": 'Politica de Cookies',
            "href": "/politica-de-cookies.html"
        },
        "cookie": {
            "name": "cookieconsentciber_status",
        },
        onInitialise: function (status) {
            var type = this.options.type;
            var didConsent = this.hasConsented();
            if (type == 'opt-in' && didConsent) {
                console.log("Cookies on")
                trackingScripts(didConsent)

            }
            if (type == 'opt-in' && !didConsent) {
                console.log("No cookies")
                // disable cookies
            }
        },

        onStatusChange: function(status, chosenBefore) {
            var type = this.options.type;
            var didConsent = this.hasConsented();
            console.log(type, didConsent)
            if (type == 'opt-in' && didConsent) {
                console.log("cambiamos")
               //trackingScripts(didConsent)
               // p.close();
               window.location.reload();
            }
            if (type == 'opt-in' && didConsent==false) {
                // disable cookies
                window.location.reload();
            }
        },
    }, function (popup) {
        p = popup;
      })

window.addEventListener("load", function(){
    
    if (document.getElementById('btn-open-revoque') !=null) 
        document.getElementById('btn-open-revoque').onclick = function (e) {
            p.open();
        };

    if (document.getElementById('btn-open-revoque-footer') !=null) 
        document.getElementById('btn-open-revoque-footer').onclick = function (e) {
            p.open();
        };
});