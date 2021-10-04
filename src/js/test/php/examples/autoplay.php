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
        autoplay: true,
        pauseOnHover: false,
      } );

      splide.on( 'autoplay:play', () => {
        console.log( 'play' );
      } );

      splide.on( 'autoplay:pause', () => {
        console.log( 'paused' );
      } );

      splide.mount();
    } );
  </script>
</head>
<body>

<div id="splide01" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <?php render_slides(); ?>
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

</body>
</html>
