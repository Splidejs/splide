<?php
require_once '../settings.php';
$settings = get_settings();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Auto Height</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        width     : 1000,
        height    : '90vh',
        direction : 'ttb',
        autoHeight: true,
        gap       : '1rem',
        trimSpace : 'move',
        focus     : 'center',
      } );

      splide.mount();
    } );
  </script>

  <style>
    .splide__slide {
      overflow: hidden;
    }
  </style>
</head>
<body>

<div id="splide01" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <li style="height: 500px" class="splide__slide">
        <img src="../../assets/images/pics/slide01.jpg">
      </li>
      <li style="height: 300px" class="splide__slide">
        <img src="../../assets/images/pics/slide02.jpg">
      </li>
      <li style="height: 400px" class="splide__slide">
        <img src="../../assets/images/pics/slide03.jpg">
      </li>
      <li style="height: 200px" class="splide__slide">
        <img src="../../assets/images/pics/slide04.jpg">
      </li>
      <li style="height: 300px" class="splide__slide">
        <img src="../../assets/images/pics/slide05.jpg">
      </li>
      <li style="height: 200px" class="splide__slide">
        <img src="../../assets/images/pics/slide06.jpg">
      </li>
    </ul>
  </div>
</div>

</body>
</html>
