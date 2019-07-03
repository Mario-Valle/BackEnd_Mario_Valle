/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/
//
function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
    OMITO ESTA SECCION DEL VIDEO PORQUE NO ESTA INCLUIDO EN EL PROYECTO,
    EL TUTOR NAREN LUNA - NO INFLUYE EN EL PROYECTO.
    Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
/*function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();*/

//CARGAMOS LOS SELECT
function init(){
    var tipos = [];
    var ciudades = [];
    $.get('data-1.json', function(data){
        for(let i = 0; i < data.length; i++){
            if(tipos.indexOf(data[i].Tipo) === -1) tipos.push(data[i].Tipo);
            if(ciudades.indexOf(data[i].Ciudad) === -1) ciudades.push(data[i].Ciudad);
        }
        for(let i = 0; i < ciudades.length; i++){
            $('#selectCiudad').append('<option value="'+ciudades[i]+'">'+ciudades[i]+'</option>');
        }
        for(let j = 0; j < tipos.length; j++){
            $('#selectTipo').append('<option value="'+tipos[j]+'">'+tipos[j]+'</option>');
        }
        $('select').material_select();
    });
}


//LLAMAMOS A LAS FUNCIONES DEL SLIDER Y CARGAMOS LOS SELECT AL CARGAR LA PAGINA
$(document).ready(function(){
    inicializarSlider();
    init();
});

//AGREGAMOS Y RENDERIZAMOS LOS RESULTADOS EN EL DOM
function showResult(array){
    $('.resultados').empty();
    for(let i=0; i<array.length; i++){
        $('.resultados').append(`<div class="card horizontal">
            <div class="card-image place-wrapper">
                <img class="img-responsive place-image" src="img/${array[i].Ciudad}.jpg">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        <b>Dirección: </b>${array[i].Direccion}<br>
                        <b>Ciudad: </b>${array[i].Ciudad}<br>
                        <b>Teléfono: </b>${array[i].Telefono}<br>
                        <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                        <b>Tipo: </b>${array[i].Tipo}<br>
                        <span class="price"><b>Precio: </b>${array[i].Precio}</span>
                    </p>
                </div>
                <div class="card-action">
                    <a>Ver mas</a>
                </div>
            </div>
        </div>`);
    }
}

//MOSTRAMOS TODOS LOS RESULTADOS SIN FILTRO
$('#mostrarTodos').click(function(){
    $.get('data-1.json', function(data){
        //showResult(data); //Lo muestra desordenado por eso uso la sg funcion de ordenamiento

        function sortJSON(data, key, orden) {
            return data.sort(function (a, b) {
                var x = a[key],
                y = b[key];

                if (orden === 'asc') {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }

                if (orden === 'desc') {
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
            });
        }        
        var arrayOrdenado = sortJSON(data,'Ciudad','asc')
        showResult(arrayOrdenado);
        //FIn de ordenacion
    });    
});



//FUNCION PARA LA BUSQUEDA POR FILTRO.
$('#submitButton').click(function(){ 
    //Asignamos los valores del select del html
    let ciudad = $('#selectCiudad option:selected').val();
    let tipo = $('#selectTipo option:selected').val();
    //Seleccionamos el precio del input del hmtl
    let precio = $('#rangoPrecio').val();
    
    //Verificamos si la variables contienen valores vacios
    //para ejecutar el resto del codigo, pero no lo usaré
    //pueto que la busqueda puede ser por una de las opciones del select o precio.
    /*
    if (ciudad == ""){
        alert("Debes elegir la ciudad !");
        return false; // Sale de la funcion 
    }else if (tipo == ""){
        alert("Debes elegir tipo de vivienda !");
        return false;
    }
    */
    //alert("BUSCANDO...\n\nCIUDAD:  " + ciudad + '\nVIVIENDA: ' + tipo + '\nPRECIOS: ' + precio);
    /*
    //Obtenemos los datos del archivo registro.php con AJAX usando el metodo GET.
    $.get('registro.php', {ciudad:ciudad, tipo:tipo, precio:precio}, function(response){
        let data = JSON.parse(response);
        var r = data.data;
        showResult(r);
    });
*/
  //Obtenemos los datos del archivo registro.php con AJAX usando el metodo GET.
    $.get('registro.php', {ciudad:ciudad, tipo:tipo, precio:precio}, function(response){
        function sortJSON(data, key, orden) {
            return data.sort(function (a, b) {
                var x = a[key],
                y = b[key];

                if (orden === 'asc') {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }

                if (orden === 'desc') {
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
            });
        }
        let data = JSON.parse(response);
        var r = data.data;
        var arrayOrdenado = sortJSON(r,'Ciudad','asc')
        showResult(arrayOrdenado);
    });

    
});




