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
  <title>Vertical Slider</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <style>
    .splide__slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  </style>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        width            : 400,
        type             : 'loop',
        perPage          : 2,
        padding          : '3rem',
        gap              : 5,
        direction        : 'ttb',
        height           : '90vh',
        waitForTransition: false,
        // releaseWheel     : true,
        // releaseTouch     : true,
        wheel            : 'free',
        wheelSleep       : 200,
      } );

      splide.mount();
    } );
  </script>
</head>
<body style="padding: 50vh 0">

<?php render(); ?>

</body>
</html>
