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
        perPage: 1,
        gap    : '1rem',
        drag   : 'free',
        height : 200,
        pagination: false,
        arrows: false,
        slideFocus: false,
      } );

      splide.on( 'moved', () => {
        console.log( 'moved' );
      } );

      splide.on( 'click', () => {
        console.log( 'click' );
      } );

      splide.mount();


      const pre = document.getElementById( 'message' );

      console.log = ( string ) => {
        pre.textContent = string + '\n' + pre.textContent;
      }
    } );
  </script>

  <style>
    body {
      margin: 50em 0;
    }
  </style>
</head>
<body>
45
<?php render( 'splide01', 10, true ); ?>

<pre id="message"></pre>

</body>
</html>
