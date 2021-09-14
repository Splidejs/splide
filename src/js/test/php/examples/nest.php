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
  <title>Nest</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script type="text/javascript" src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var primary = new Splide( '#splide01', {
        gap : '1.5rem',
        drag: false,
        height: 600,
      } );

      var nested01 = new Splide( '#nested01', {
        rewind : true,
        gap    : '1rem',
        perPage: 2,
      } );

      var nested02 = new Splide( '#nested02', {
        direction: 'ttb',
        gap      : '1rem',
        height   : 400,
        perPage  : 2,
      } );

      primary.mount();
      nested01.mount();
      nested02.mount();
    } );
  </script>
</head>
<body>

<div id="splide01" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <?php render_slides( 2 ); ?>

      <div class="splide__slide">
        <?php render( 'nested01', 8 ); ?>
      </div>

      <div class="splide__slide">
        <?php render( 'nested02', 6 ); ?>
      </div>
    </ul>
  </div>
</div>


</body>
</html>
