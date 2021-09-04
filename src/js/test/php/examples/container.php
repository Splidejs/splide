<?php
require_once '../settings.php';
$settings = get_settings();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Container/Slider</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide01 = new Splide( '#splide01', {
        perPage    : 2,
        gap        : '1rem',
        heightRatio: 0.2,
        cover      : true,
      } );

      splide01.mount();

      var splide02 = new Splide( '#splide02', {
        perPage      : 2,
        gap          : '1rem',
        heightRatio  : 0.2,
        cover        : true,
        autoplay     : true,
        arrows       : 'slider',
        pagination   : 'slider',
        rewind       : true,
        resetProgress: false,
      } );

      splide02.mount();
    } );
  </script>
</head>
<body>

<h2>Container</h2>

<div id="splide01" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <?php
      for ( $i = 0; $i < 10; $i++ ) {
        echo '<li class="splide__slide">';

        echo '<div class="splide__slide__container">';
        printf( '<img src="../../assets/images/pics/slide%02d.jpg">', $i + 1 );
        echo '</div>';

        echo '<p>';
        if ( $i % 2 ) {
          echo 'Lorem ipsum dolor sit amet, ius cu novum splendide contentiones, vim dolorem delicata explicari no. Posidonium sadipscing delicatissimi ad vix, vim at utamur ponderum. Eu doming verear complectitur vim.';
        } else {
          echo 'Lorem ipsum dolor sit amet, in usu facilis philosophia, exerci adolescens honestatis ei eum. Et vis nulla simul, pri cu euismod accusam vulputate.';
        }
        echo '</p>';

        echo '</li>' . PHP_EOL;
      }
      ?>
    </ul>
  </div>
</div>

<h2>Slider</h2>

<div id="splide02" class="splide">
  <div class="splide__slider">
    <div class="splide__track">
      <ul class="splide__list">
        <?php
        for ( $i = 0; $i < 10; $i++ ) {
          echo '<li class="splide__slide">';
          printf( '<img src="../../assets/images/pics/slide%02d.jpg">', $i + 1 );
          echo '</li>' . PHP_EOL;
        }
        ?>
      </ul>
    </div>
  </div>

  <div class="splide__progress">
    <div class="splide__progress__bar">

    </div>
  </div>

  <div class="splide__autoplay">
    <button class="splide__play">
      Play
    </button>

    <button class="splide__pause">
      Pause
    </button>
  </div>
</div>

</body>
</html>
