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
  <title>Live Regions</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        width: 800,
	      rewind: true,
	      // autoplay: true,
	      // live: false,
	      slideFocus: false,
      } );

      splide.mount();
    } );
  </script>

	<style>
      .splide__slide {
          /*display: none;*/
      }

		.splide__slide.is-active {
				display: block;
		}
	</style>
</head>
<body>

<div id="splide01" class="splide" aria-label="Slider With Live Region">
	<div class="splide__track">
		<ul class="splide__list">
			<?php
			for ( $i = 0; $i < 5; $i++ ) {
				echo '<li class="splide__slide">';
				printf( '<img src="../../assets/images/pics/slide%1$02d.jpg" alt="Alt text on image %1$d">', $i + 1 );
				printf( '<h3>Slide %02d</h3>', $i + 1 );
				print( '<p>Slide description</p>' );
				echo '</li>' . PHP_EOL;
			}
			?>
		</ul>
	</div>

	<div class="splide__autoplay">
		<button class="splide__play">Play</button>
		<button class="splide__pause">Pause</button>
	</div>
</div>

</body>
</html>
