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
  <title>Default</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script type="text/javascript" src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide = new Splide( '#splide01', {
        // type   : 'loop',
        perPage: 2,
        // perMove: 1,
        rewind: true,
	      rewindByDrag: true,
        // padding: {
        //   right: 0,
        //   left: 40,
        // },
        // updateOnMove: true,
        // focus: 'center',
	      dragMinThreshold: {
					mouse: 20,
		      touch: 0,
	      },
	      speed: 1000,
				waitForTransition: false,
        // noDrag: 'button',
      } );

	    // splide.on( 'move', () => {
		  //   console.log( 'move' );
	    // } );
	    //
      // splide.on( 'moved', () => {
      //   console.log( 'moved' );
      // } );
	    //
      // splide.on( 'visible', Slide => {
      //   console.log( 'visible', Slide.index );
      // } );
	    //
      // splide.on( 'hidden', Slide => {
      //   console.log( 'hidden', Slide.index );
      // } );
	    //
      // splide.on( 'click', () => {
      //   console.log( 'click' );
      // } );
	    //
      // splide.on( 'shifted', () => {
      //   console.log( 'shifted' );
      // } );
	    //
	    // splide.on( 'drag', () => {
		  //   console.log( 'drag' );
	    // } );
	    //
	    // splide.on( 'dragged', () => {
		  //   console.log( 'dragged' );
	    // } );

      splide.mount();

	    const pre = document.querySelector( 'pre' );

	    // Array.from( document.getElementsByTagName( 'button' ) ).forEach( button => {
			// 	button.addEventListener( 'click', () => {
			// 		alert( 'click' );
			// 	} );
			// } );

			// console.log = ( ...args ) => {
			// 	pre.textContent = args.join( ' ' ) + '\n' + pre.textContent;
			// };
    } );
  </script>

  <style>
    body {
      margin: 50em 0;
    }
  </style>
</head>
<body>
3444556
<?php render( 'splide01', 11 ); ?>

<pre></pre>

</body>
</html>
