<?php
require_once '../parts.php';
require_once '../settings.php';

$settings = get_settings();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Autoplay</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script type="text/javascript" src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        // rewind       : true,
        type         : 'loop',
        autoplay     : true,
        pauseOnHover : false,
        resetProgress: false,
      } );

      var toggleButton = document.querySelector( '.splide__toggle' );

      splide.on( 'autoplay:play', function () {
        toggleButton.classList.add( 'is-active' );
        toggleButton.setAttribute( 'aria-label', 'Pause autoplay' );
        toggleButton.textContent = 'Pause';
      } );

      splide.on( 'autoplay:pause', function () {
        toggleButton.classList.remove( 'is-active' );
        toggleButton.setAttribute( 'aria-label', 'Start autoplay' );
        toggleButton.textContent = 'Play';
      } );

      toggleButton.addEventListener( 'click', function () {
        var Autoplay = splide.Components.Autoplay;

        if ( Autoplay.isPaused() ) {
          Autoplay.play();
        } else {
          Autoplay.pause();
        }
      } );

      splide.mount();
    } );
  </script>
</head>
<body>

<div id="splide01" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide01.jpg">
      </li>
      <li class="splide__slide" data-splide-interval="1000">
        <img src="../../assets/images/pics/slide02.jpg">
      </li>
      <li class="splide__slide" data-splide-interval="10000">
        <img src="../../assets/images/pics/slide03.jpg">
      </li>
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide04.jpg">
      </li>
<!--      --><?php //render_slides(); ?>
    </ul>
  </div>

  <div class="splide__progress">
    <div class="splide__progress__bar"></div>
  </div>

  <div class="splide__autoplay">
    <button class="splide__play">Play</button>
    <button class="splide__pause">Pause</button>
  </div>
</div>

<button class="splide__toggle is-active" type="button">
  Pause
</button>

</body>
</html>
