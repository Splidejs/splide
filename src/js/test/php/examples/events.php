<?php
require_once '../settings.php';
$settings = get_settings();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Events</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide01 = new Splide( '#splide01', {
        width  : 800,
        perPage: 2,
        gap    : 10,
      } );

      splide01.on( 'arrows:mounted', function( prev, next ) {
        console.log( 'arrows:mounted', prev, next );
      } );

      splide01.on( 'arrows:updated', function( prev, next ) {
        console.log( 'arrows:updated', prev, next );
      } );

      splide01.on( 'pagination:mounted', function( data ) {
        console.log( 'pagination:mounted', data );
      } );

      splide01.on( 'pagination:updated', function( data ) {
        console.log( 'pagination:updated', data );
      } );

      splide01.on( 'active', function( Slide ) {
        console.log( 'active', Slide.index );
      } );

      var splide02 = new Splide( '#splide02', {
        width       : 800,
        fixedWidth  : 100,
        fixedHeight : 56,
        isNavigation: true,
        gap         : 10,
        focus       : 'center',
        pagination  : false,
      } );

      splide02.on( 'navigation:mounted', function( splides ) {
        console.log( 'navigation:mounted', splides );
      } );

      splide01.sync( splide02 ).mount();
      splide02.mount();
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

</body>
</html>
