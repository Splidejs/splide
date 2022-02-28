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
  <title>Extension</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script type="text/javascript" src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        perPage: 2,
        gap    : '1rem',
      } );

      var Extension = function ( Splide ) {
        function setup() {
          Splide.Components.Controller.setIndex( 4 );
        }

        return {
          setup: setup,
        }
      }

      splide.mount( { Extension: Extension } );
    } );
  </script>
</head>
<body>

<?php render(); ?>

</body>
</html>
