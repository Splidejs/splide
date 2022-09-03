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
  <link rel="stylesheet" href="../../assets/css/planet.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
	      type        : 'loop',
	      width       : 480,
	      rewind      : true,
	      // live        : false,
	      speed       : 600,
	      arrowPath   : 'm13.5 7.01 13 13m-13 13 13-13',
	      updateOnMove: true,
      } );

      splide.mount();
    } );
  </script>
</head>
<body>

<div class="wrapper">
	<div id="splide01" class="splide" aria-label="Planets gallery carousel">
		<div class="splide__track">
			<ul class="splide__list">
				<li class="splide__slide">
					<div class="splide__slide__inner">
						<img src="../../assets/images/planets/neptune.jpg"
						     alt="">
						<h3 class="splide__heading">Neptune</h3>
						<div class="splide__desc">
							<p>
								Neptune is the eighth and farthest-known Solar planet from the Sun.
							</p>
							<cite aria-hidden="true">Quoted from Wikipedia</cite>
						</div>
					</div>
				</li>
				<li class="splide__slide">
					<div class="splide__slide__inner">

						<img src="../../assets/images/planets/saturn.jpg"
						     alt="">
						<h3 class="splide__heading">Saturn</h3>
						<div class="splide__desc">
							<p>
								Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.
							</p>
							<cite aria-hidden="true">Quoted from Wikipedia</cite>
						</div>
					</div>
				</li>
				<li class="splide__slide">
					<div class="splide__slide__inner">

						<img src="../../assets/images/planets/mars.jpg"
						     alt="">
						<h3 class="splide__heading">Mars</h3>
						<div class="splide__desc">
							<p>
								Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.
							</p>
							<cite aria-hidden="true">Quoted from Wikipedia</cite>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>

</body>
</html>
