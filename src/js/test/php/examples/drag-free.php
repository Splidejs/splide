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
  <title>Drag Free</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script type="text/javascript" src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        perPage: 3,
        gap    : '2em',
        drag   : 'free',
	      // snap   : true,
        // height : 400,
        type   : 'loop',
        // direction: 'rtl',
        // waitForTransition: false,
      } );

      // splide.on( 'move', () => console.log( 'move' ) );
      // splide.on( 'moved', () => console.log( 'moved' ) );
      splide.on( 'dragging scrolling', () => {
        const bar = document.querySelector( '.bar' );
        bar.style.width = `${ splide.Components.Move.getRate() * 100 }%`;
        splide.Components.Move.getRate()
      } );

      splide.mount();
    } );
  </script>

  <style>
    body {
      margin: 50em 0;
    }
  </style>
</head>
<body>

<?php render( 'splide01', 10 ); ?>

<div class="bar" style="height: 3px; background: #00bbff">
</div>

</body>
</html>
