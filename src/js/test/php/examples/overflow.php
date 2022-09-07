<?php
require_once '../parts.php';
require_once '../settings.php';

$settings = get_settings();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Overflow</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide01 = new Splide( '#splide01', {
        fixedWidth : '6rem',
        gap        : 10,
      } );

      splide01.on( 'overflow', overflow => {
        if ( overflow ) {
          console.log( 'splide01: overflow' );
          splide01.root.classList.add( 'is-overflow' );
          splide01.options = { arrows: true, pagination: true, drag: true };
        } else {
          console.log( 'splide01: not overflow' );
          splide01.root.classList.remove( 'is-overflow' );
          splide01.options = { arrows: false, pagination: false, drag: false };
        }
      } );

      splide01.mount();

      var splide02 = new Splide( '#splide02', {
        type      : 'loop',
        // gap       : '1rem',
        fixedWidth: 100,
      } );

      splide02.on( 'overflow', overflow => {
        if ( overflow ) {
          console.log( 'splide02: overflow' );
          splide02.root.classList.add( 'is-overflow' );
          splide02.options = { clones: undefined, arrows: true, pagination: true, drag: true };
        } else {
          console.log( 'splide02: not overflow' );
          splide02.go( 0 );
          splide02.root.classList.remove( 'is-overflow' );
          splide02.options = { clones: 0, arrows: false, pagination: false, drag: false };
        }
      } );

      splide02.mount();
    } );
  </script>

  <style>
    .splide:not( .is-overflow ) .splide__list {
      justify-content: center;
    }
  </style>
</head>
<body>

<?php render( 'splide01' ); ?>
<?php render( 'splide02' ); ?>

</body>
</html>
