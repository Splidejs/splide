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

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        width       : 400,
        // type     : 'loop',
        perPage     : 2,
        padding     : '3rem',
        gap         : 5,
        direction   : 'ttb',
        height      : '90vh',
        cover       : true,
        wheel       : true,
        releaseWheel: true,
      } );

      splide.mount();
    } );
  </script>
</head>
<body>

<?php render(); ?>

</body>
</html>
