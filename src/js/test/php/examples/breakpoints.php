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
  <title>Breakpoints</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        perPage    : 3,
        arrows     : false,
        mediaQuery : 'min',
        breakpoints: {
          1200: {
            perPage: 1,
            gap    : '1rem',
            arrows : true,
            padding: 50,
          },
          1000: {
            perPage: 2,
            gap    : 0,
            arrows : false,
            padding: 0,
          },
          800: {
            destroy: true,
          },
        },
      } );

      splide.mount();
    } );
  </script>
</head>
<body>

<?php render(); ?>

</body>
</html>
