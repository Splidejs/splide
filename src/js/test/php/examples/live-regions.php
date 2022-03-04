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
	      width     : 600,
	      rewind    : true,
	      live      : true,
	      speed     : 1000,
	      pagination: true,
	      arrowPath : 'm13.5 7.01 13 13m-13 13 13-13',
      } );

      splide.mount();
    } );
  </script>
</head>
<body>

<div class="wrapper">
	<div id="splide01" class="splide" aria-label="Planets gallery">
		<div class="splide__track">
			<ul class="splide__list">
				<li class="splide__slide">
					<img src="../../assets/images/planets/neptune.jpg" alt="Neptune as seen from Voyager 2 from 4.4 million miles">
					<h3 class="splide__heading">Neptune</h3>
					<div class="splide__desc">
						Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.
					</div>
				</li>
				<li class="splide__slide">
					<img src="../../assets/images/planets/saturn.jpg" alt="Saturn as seen from the Cassini–Huygens space-research mission">
					<h3 class="splide__heading">Saturn</h3>
					<div class="splide__desc">
						Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth.
					</div>
				</li>
				<li class="splide__slide">
					<img src="../../assets/images/planets/mars.jpg" alt="A simulated view of Mars as it would be seen from the Mars Global Surveyor spacecraft">
					<h3 class="splide__heading">Mars</h3>
					<div class="splide__desc">
						Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury.
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>

</body>
</html>
