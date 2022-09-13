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
  <title>Fixed Size</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide01 = new Splide( '#splide01', {
        // type       : 'loop',
        fixedWidth : '6rem',
        gap        : 10,
        omitEnd    : true,
        focus      : 0,
      } );

      splide01.mount();

      var splide02 = new Splide( '#splide02', {
        fixedWidth : 200,
        gap        : '1rem',
      } );

      splide02.mount();
    } );
  </script>
</head>
<body>

<?php render( 'splide01' ); ?>
<?php render( 'splide02' ); ?>

</body>
</html>
