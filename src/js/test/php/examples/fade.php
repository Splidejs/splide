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
	      // rewind: false,
	      // rewindByDrag: false,
	      // autoplay: true,
	      // interval: 1000,
        breakpoints: {
          640: {
            width: '100%',
          },
        },
      } );

      splide.mount();

      // setTimeout( () => {
      //   splide.refresh();
      // }, 1000 );
    } );
  </script>

  <style>
    /*.splide__list {*/
    /*  align-items: flex-start;*/
    /*}*/

    .splide__slide {
      background: #fff;
    }
  </style>
</head>
<body>

<section id="splide01" class="splide" aria-label="Basic Structure Example">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide01.jpg">
        <p>
          Lorem ipsum dolor sit amet, quod sale at pro, everti iisque tractatos sit ea. Agam alterum sit at. Libris petentium his ne, ne eam detraxit inimicus tractatos. Ius mundi verear ad, at percipit constituto pro, ei possim eirmod quo. Vim laudem aperiam reprehendunt in.
        </p>
      </li>
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide02.jpg">
        <p>
          Has cu etiam veniam recusabo, his animal nostrud fabellas ne. Vis suas qualisque eu, eum ei impedit civibus, an solum definiebas pro.
        </p>
      </li>
      <li class="splide__slide">
        <img src="../../assets/images/pics/slide03.jpg">
        <p>
          Mollis epicuri laboramus ea qui, his ei meis graecis quaestio. Ius ne suscipit prodesset. Qui at delicata euripidis eloquentiam, eius solum volumus eum eu. Usu eu deserunt abhorreant, errem qualisque nec in. Te has labitur virtute hendrerit, cum quaeque oportere mediocritatem in, eos imperdiet intellegam id.
        </p>
        <p>
          Has cu etiam veniam recusabo, his animal nostrud fabellas ne. Vis suas qualisque eu, eum ei impedit civibus, an solum definiebas pro.
        </p>
      </li>
    </ul>
  </div>
</section>


</body>
</html>
