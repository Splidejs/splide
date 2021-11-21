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
        perPage    : 1,
        waitForTransition: false,
        breakpoints: {
          1000: {
            destroy: true,
          }
        },
      } );

      var splide02 = new Splide( '#splide02', {
        // type             : 'loop',
        width            : 600,
        fixedWidth       : 100,
        fixedHeight      : 56,
        gap              : '.7em',
        isNavigation     : true,
        focus            : 'center',
        pagination       : false,
        rewind           : true,
        waitForTransition: false,
        dragMinThreshold: {
          mouse: 10,
          touch: 10,
        },
      } );

      var splide03 = new Splide( '#splide03', {
        width            : 100,
        type             : 'loop',
        direction        : 'ttb',
        height           : 300,
        fixedWidth       : 100,
        fixedHeight      : 56,
        gap              : '.7em',
        isNavigation     : true,
        pagination       : false,
        waitForTransition: false,
      } );

      splide01.sync( splide02 );

      splide01.mount();
      splide02.mount();
      splide03.mount();

      splide01.on( 'move', function () { console.log( 1 ) } );
      splide02.on( 'move', function () { console.log( 2 ) } );
      splide03.on( 'move', function () { console.log( 3 ) } );

      // Attempts to sync after mount.
      splide01.sync( splide03 );
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
