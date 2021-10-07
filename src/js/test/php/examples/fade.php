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
  <title>Fade</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        width: 800,
        type : 'fade',
        breakpoints: {
          640: {
            width: '100%',
          },
        },
      } );

      splide.mount();

      setTimeout( () => {
        splide.refresh();
      }, 1000 );
    } );
  </script>
</head>
<body>

<?php render(); ?>

</body>
</html>
