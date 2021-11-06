<?php
require_once '../settings.php';
$settings = get_settings();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Sync</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide01 = new Splide( '#splide01', {
        width      : 800,
        type       : 'loop',
        heightRatio: 0.3,
        perPage    : 2,
        // waitForTransition: false,

        breakpoints: {
          1000: {
            destroy: true,
          }
        },
      } );

      var splide02 = new Splide( '#splide02', {
        width            : 600,
        fixedWidth       : 100,
        fixedHeight      : 56,
        gap              : '.7em',
        isNavigation     : true,
        focus            : 'center',
        pagination       : false,
        rewind           : true,
        waitForTransition: true,
        dragMinThreshold: {
          mouse: 10,
          touch: 10,
        },
      } );

      var splide03 = new Splide( '#splide03', {
        width       : 100,
        type        : 'loop',
        direction   : 'ttb',
        height      : 300,
        fixedWidth  : 100,
        fixedHeight : 56,
        gap         : '.7em',
        isNavigation: true,
        pagination  : false,
      } );

      splide01.sync( splide02 );
      splide01.sync( splide03 );
      splide01.mount();
      splide02.mount();
      splide03.mount();
    } );
  </script>
</head>
<body>

<div id="splide01" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <?php
      for ( $i = 0; $i < 10; $i++ ) {
        echo '<li class="splide__slide">';
        printf( '<img src="../../assets/images/pics/slide%02d.jpg">', $i + 1 );
        echo '</li>' . PHP_EOL;
      }
      ?>
    </ul>
  </div>
</div>

<div id="splide02" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <?php
      for ( $i = 0; $i < 10; $i++ ) {
        echo '<li class="splide__slide">';
        printf( '<img src="../../assets/images/pics/slide%02d.jpg">', $i + 1 );
        echo '</li>' . PHP_EOL;
      }
      ?>
    </ul>
  </div>
</div>

<div id="splide03" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <?php
      for ( $i = 0; $i < 10; $i++ ) {
        echo '<li class="splide__slide">';
        printf( '<img src="../../assets/images/pics/slide%02d.jpg">', $i + 1 );
        echo '</li>' . PHP_EOL;
      }
      ?>
    </ul>
  </div>
</div>

</body>
</html>
