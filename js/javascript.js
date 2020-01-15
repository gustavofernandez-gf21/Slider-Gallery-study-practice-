//toda la funcion esta en un .ready para que de esta forma se cargue al iniciar la pagina
var i = 1;
$(document).ready(function() {
  //este es el intervalo en el que se mueven las imagenes
  var interval = window.setInterval(rotateSlides, 3000);

  //funcion que rota los slides
  function rotateSlides() {

    var $primerSlide = $('#carro').find('div:first'); //obtenemos el primer slide
    var ancho = $primerSlide.width(); //obtenemos el ancho del slide, usamos este metodo porque no sabemos el tamaño en el que puede estar siendo reproducido

    //funcion de animacion
    $primerSlide.animate({
      marginLeft: -ancho
    }, 1000, function() { //se usa el ancho obtenido antes en negativo, porque queremos que se mueva a la izquierda, si lo poenmos en positivo, la animacion sera hacia la derecha.

      var $ultimoSlide = $('#carro').find('div:last');
      $ultimoSlide.after($primerSlide); //cambiamos de lugar el primer slide con el ultimo slide, de esa forma el primer slide que se animo, ahora esta en el ultimo lugar.

      $primerSlide.css({
        marginLeft: 0
      }); //reestablecemos el margen del primer slide, asi la animacion es continua. De otra forma al culminar todos los slides, la animacion no se repetira, porque todos los slides tendran margen izquierdo negativo.

    })
  }
  //controles de las flechas izquierda y derecha
  $("#leftArrow").click(previousSlide);
  $("#rightArrow").click(nextSlide);
  $(".slide-image").click(nextSlide);

  //funcion de slide siguiente
  function nextSlide() {
    window.clearInterval(interval); //al hacer click se detiene la animacion
    var $slideActual = $("#carro").find("div:first"); //obetenemos el slide actual
    var ancho = $slideActual.width(); //ancho del slide actual

    //repetimos la animacion anterior
    $slideActual.animate({
      marginLeft: -ancho
    }, 200, function() { //200 milisegundos para que sea mas rapido al hacer click
      var $ultimoSlide = $("#carro").find("div:last");
      $ultimoSlide.after($slideActual);
      $slideActual.css({
        marginLeft: 0
      })
      interval = window.setInterval(rotateSlides, 3000);
    });
  }
  //funcion para retroceder el carro
  function previousSlide() {
    window.clearInterval(interval);
    var $slideActual = $("#carro").find("div:first");
    var ancho = $slideActual.width();
    var $slidePrevio = $("#carro").find("div:last"); //obtenemos el slide anterior
    $slidePrevio.css({
      marginLeft: -ancho
    }); //restauramos el margen del slide anterior, para que pueda volver a animarse desde la izquierda, recordemos que ahora el slidePrevio esta al limite de la derecha para reaparecer en bucle
    $slideActual.before($slidePrevio); //ponemos el slidePrevio antes del slide actual, asi pueda animarse.
    $slidePrevio.animate({
      marginLeft: 0
    }, 200, function() { //reestablecemos la animacion normal
      interval = window.setInterval(rotateSlides, 3000);
    });
  }

})