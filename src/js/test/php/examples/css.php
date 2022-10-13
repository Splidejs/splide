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
  <title>CSS</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script type="text/javascript" src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      const splide = new Splide( '.splide', {
        autoWidth : true,
        pagination: false,
        type: 'loop',
        drag: 'free',
      } );

      splide.mount();
    } );
  </script>

  <style>
    body {
      margin: 50em 0;
    }

    .splide__list {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: calc( (100% + 2rem) / 3 - 2rem );
      grid-column-gap: 2rem;
    }

    .splide__slide {
      /*flex-basis: calc( (100% + 2rem) / 3 - 2rem );*/
      /*margin-right: 2rem;*/
    }

    @media screen and (max-width: 600px) {
      /*.splide__slide {*/
      /*  flex-basis: 100%;*/
      /*  margin-right: 2rem;*/
      /*}*/
    }

    .splide__slide img {
      /*aspect-ratio: 16 / 9;*/
    }
  </style>
</head>
<body>

<section class="splide" aria-label="Basic Structure Example">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide01.jpg" width="960" height="540" alt>
      </li>
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide02.jpg" width="960" height="540" alt>
      </li>
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide03.jpg" width="960" height="540" alt>
      </li>
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide04.jpg" width="960" height="540" alt>
      </li>
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide05.jpg" width="960" height="540" alt>
      </li>
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide06.jpg" width="960" height="540" alt>
      </li>
    </ul>
  </div>

  <p>
    height
  </p>
</section>

<pre></pre>

</body>
</html>
