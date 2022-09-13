<?php
require_once '../settings.php';
$settings = get_settings();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Auto Width</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide01 = new Splide( '#splide01', {
        // width     : 1000,
        autoWidth : true,
        gap       : '1rem',
        // trimSpace : tr,
        focus     : 0,
        drag      : 'free',
        omitEnd   : true,
      } );

      splide01.mount();

      var splide02 = new Splide( '#splide02', {
        // width     : 1000,
        type      : 'loop',
        autoWidth : true,
        gap       : '1rem',
        focus     : 'center',
        trimSpace : false,
        drag      : 'free',

      } );

      splide02.mount();
    } );
  </script>
</head>
<body>

<div id="splide01" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <li style="width: 500px" class="splide__slide">
        <img src="../../assets/images/pics/slide01.jpg">
      </li>
      <li style="width: 300px" class="splide__slide">
        <img src="../../assets/images/pics/slide02.jpg">
      </li>
      <li style="width: 400px" class="splide__slide">
        <img src="../../assets/images/pics/slide03.jpg">
      </li>
      <li style="width: 600px" class="splide__slide">
        <img src="../../assets/images/pics/slide04.jpg">
      </li>
      <li style="width: 300px" class="splide__slide">
        <img src="../../assets/images/pics/slide05.jpg">
      </li>
      <li style="width: 500px" class="splide__slide">
        <img src="../../assets/images/pics/slide06.jpg">
      </li>
    </ul>
  </div>
</div>

<div id="splide02" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <li style="width: 500px" class="splide__slide">
        <img src="../../assets/images/pics/slide01.jpg">
      </li>
      <li style="width: 300px" class="splide__slide">
        <img src="../../assets/images/pics/slide02.jpg">
      </li>
      <li style="width: 400px" class="splide__slide">
        <img src="../../assets/images/pics/slide03.jpg">
      </li>
      <li style="width: 600px" class="splide__slide">
        <img src="../../assets/images/pics/slide04.jpg">
      </li>
      <li style="width: 300px" class="splide__slide">
        <img src="../../assets/images/pics/slide05.jpg">
      </li>
      <li style="width: 500px" class="splide__slide">
        <img src="../../assets/images/pics/slide06.jpg">
      </li>
    </ul>
  </div>
</div>

</body>
</html>
