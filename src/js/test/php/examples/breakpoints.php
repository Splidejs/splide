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
  <title>Breakpoints</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

	<style>
		.splide__slide {
			overflow: hidden;
		}
	</style>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      const options = {
        perPage: 3,
        arrows: false,
        mediaQuery: 'max',
        // destroy: true,
        breakpoints: {
          1200: {
            perPage: 1,
            gap: '1rem',
            arrows: true,
            padding: 50,
            height: 500,
            destroy: false,
          },
          1000: {
            perPage: 2,
            gap: 0,
            arrows: false,
            padding: 0,
            pagination: false,
          },
          800: {
            destroy: true,
          },
        },
      }

      new Splide( '#splide01', options ).mount();
      new Splide( '#splide02', options ).mount();
    } );
  </script>
</head>
<body>

<div id="splide01" class="splide">
	<div class="splide__track">
		<div class="splide__list">
			<?php render_slides(); ?>
		</div>
	</div>
</div>

<div id="splide02" class="splide">
	<div class="splide__track">
		<div class="splide__list">
			<?php render_slides(); ?>
		</div>

		<div class="splide__arrows">
			<button class="splide__arrow splide__arrow--prev">
				←
			</button>
			<button class="splide__arrow splide__arrow--next">
				→
			</button>
		</div>

		<div class="splide__pagination"></div>
	</div>
</div>

</body>
</html>
