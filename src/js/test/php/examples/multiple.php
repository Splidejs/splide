<?php
require_once '../parts.php';
require_once '../settings.php';

$settings = get_settings();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Multiple</title>

  <link rel="stylesheet" href="../../../../../dist/css/splide-core.min.css">
  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script type="text/javascript" src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
	    new Splide( '#splide01', {
		    type      : 'slide',
		    perPage   : 2,
		    pagination: false,
		    classes   : {
			    arrows: 'splide__arrows splide__test',
		    },
	    } ).mount();

	    new Splide( '#splide02', {
		    perPage   : 1,
		    gap       : '1.5rem',
		    pagination: false,
		    arrows    : false,
		    classes   : {
			    arrows: 'splide__arrows splide__test',
		    },
	    } ).mount();

	    new Splide( '#splide03', {
		    type      : 'slide',
		    perPage   : 3,
		    gap       : '1.5rem',
		    pagination: false,
		    arrows    : false,
		    classes   : {
			    arrows: 'splide__arrows splide__test',
		    },
	    } ).mount();

	    new Splide( '#splide04', {
		    type      : 'slide',
		    perPage   : 1,
		    gap       : '1.5rem',
		    pagination: false,
		    arrows    : false,
		    classes   : {
			    arrows: 'splide__arrows splide__test',
		    },
	    } ).mount();

	    new Splide( '#splide05', {
		    type      : 'slide',
		    perPage   : 2,
		    gap       : '1.5rem',
		    pagination: false,
		    arrows    : false,
		    classes   : {
			    arrows: 'splide__arrows splide__test',
		    },
	    } ).mount();

	    new Splide( '#splide06', {
		    type      : 'slide',
		    perPage   : 4,
		    gap       : '1.5rem',
		    pagination: false,
		    arrows    : false,
		    classes   : {
			    arrows: 'splide__arrows splide__test',
		    },
	    } ).mount();

	    new Splide( '#splide07', {
		    type      : 'slide',
		    perPage   : 1,
		    gap       : '1.5rem',
		    pagination: false,
		    arrows    : false,
		    classes   : {
			    arrows: 'splide__arrows splide__test',
		    },
	    } ).mount();

	    new Splide( '#splide08', {
		    type      : 'slide',
		    perPage   : 3,
		    gap       : '1.5rem',
		    pagination: false,
		    arrows    : false,
		    classes   : {
			    arrows: 'splide__arrows splide__test',
		    },
	    } ).mount();

	    new Splide( '#splide09', {
		    type      : 'slide',
		    perPage   : 3,
		    gap       : '1.5rem',
		    pagination: false,
		    arrows    : false,
		    classes   : {
			    arrows: 'splide__arrows splide__test',
		    },
	    } ).mount();
    } );
  </script>

  <style>
    body {
      margin: 50em 0;
    }
  </style>
</head>
<body>

<?php render(); ?>

<?php render( 'splide02' ); ?>
<?php render( 'splide03' ); ?>
<?php render( 'splide04' ); ?>
<?php render( 'splide05' ); ?>
<?php render( 'splide06' ); ?>
<?php render( 'splide07' ); ?>
<?php render( 'splide08' ); ?>
<?php render( 'splide09' ); ?>

</body>
</html>
