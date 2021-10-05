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
  <title>Body</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script type="text/javascript" src="../../../../../dist/js/splide.js"></script>

  <style>
    body {
      /*margin: 50em 0;*/
      height: initial;
    }

    .splide {
      visibility: visible !important;
    }

    .wrapper {
      height: 400px;
      overflow: hidden;
    }
  </style>
</head>
<body>

<div class="wrapper">
  <?php render(); ?>
  aa
</div>

<script>
  setTimeout( function() {
    var splide = new Splide( '#splide01', {
      type   : 'loop',
      perPage: 3,
      perMove: 1,
      gap    : '1.5rem',
      // height : 300,
      // cover  : true,
      classes: {
        arrows: 'splide__arrows splide__test',
        clone : 'splide__clone splide__test',
      }
    } ).mount();

    // splide.mount();
  }, 0 )
</script>

</body>
</html>
