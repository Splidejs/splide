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
  <title>Default</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script type="text/javascript" src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        type   : 'loop',
        perPage: 1,
        gap    : '1.5rem',
        height : 400,
        // focus  : 'center',
        // cover  : true,
        // speed: 1000,
        // padding: '20%',
        classes: {
          arrows: 'splide__arrows splide__test',
          clone : 'splide__clone splide__test',
        }
      } );

      splide.on( 'moved', () => {
        console.log( 'moved' );
      } );

      splide.on( 'click', () => {
        console.log( 'click' );
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

<?php render(); ?>

</body>
</html>
