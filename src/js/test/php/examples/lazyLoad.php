<?php
require_once '../settings.php';
$settings = get_settings();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Lazy Load</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide01 = new Splide( '#splide01', {
        perPage    : 2,
        // type       : 'fade',
        lazyLoad   : 'nearby',
        // cover      : true,
        drag       : 'free',
        rewind     : true,
        heightRatio: ( 9 / 16 ) / 2,
      } );

      splide01.mount();

      var splide02 = new Splide( '#splide02', {
        perPage    : 2,
        lazyLoad   : 'nearby',
        heightRatio: ( 9 / 16 ) / 2,
        speed      : 400,
      } );

      splide02.mount();

      let sig = 20;

      splide01.on( 'moved', ( index ) => {
        if ( index === splide01.length - 1 ) {
          splide01.add( [
            `<li class="splide__slide"><img data-splide-lazy="https://source.unsplash.com/random/960x540?sig=${ ++sig }"></li>`,
            `<li class="splide__slide"><img data-splide-lazy="https://source.unsplash.com/random/960x540?sig=${ ++sig }"></li>`,
          ] );
        }
      } );
    } );
  </script>
</head>
<body>

<h2>src & placeholder</h2>

<div id="splide01" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <?php
      for ( $i = 0; $i < 10; $i++ ) {
        echo '<li class="splide__slide">';
        printf( '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPc9/3HfwAI1gOuq1Su+AAAAABJRU5ErkJggg==" data-splide-lazy="https://source.unsplash.com/random/960x540?sig=%s">', $i + 1 );
        echo '</li>' . PHP_EOL;
      }
      ?>
    </ul>
  </div>
</div>

<h2>srcset</h2>

<div id="splide02" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <?php
      for ( $i = 0; $i < 10; $i++ ) {
        echo '<li class="splide__slide">';
        printf(
          '<img data-splide-lazy-srcset="%s, %s">',
          sprintf( 'https://source.unsplash.com/random/640x360?sig=%s 640w', $i + 1 ),
          sprintf( 'https://source.unsplash.com/random/960x540?sig=%s 960w', $i + 1 )
        );
        echo '</li>' . PHP_EOL;
      }
      ?>
    </ul>
  </div>
</div>

</body>
</html>
