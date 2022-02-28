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
  <title>JSON</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script type="text/javascript" src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01' );
      splide.mount();
    } );
  </script>
</head>
<body>

<?php
	$options = [
		'type' => 'fade',
//		'perPage' => 2,
	];
?>

<div id="splide01" class="splide" data-splide='<?php echo json_encode( $options ) ?>'>
	<div class="splide__track">
		<div class="splide__list">
			<?php render_slides(); ?>
		</div>
	</div>
</div>

<pre></pre>

</body>
</html>
