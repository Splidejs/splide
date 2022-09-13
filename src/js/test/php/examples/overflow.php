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
  <title>Overflow</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>

  <script>
    document.addEventListener( 'DOMContentLoaded', function () {
      var splide01 = new Splide( '#splide01', {
        fixedWidth : '6rem',
        gap        : 10,
        omitEnd    : true,
        focus      : 0,
      } );

      splide01.on( 'overflow', overflow => {
        console.log( 'splide01:', overflow );
        splide01.root.classList.toggle( 'is-inactive', ! overflow );
        splide01.options = { arrows: overflow, pagination: overflow, drag: overflow };
      } );

      splide01.mount();

      var splide02 = new Splide( '#splide02', {
        type      : 'loop',
        gap       : '1rem',
        fixedWidth: 100,
      } );

      splide02.on( 'overflow', overflow => {
        console.log( 'splide02:', overflow );
        splide02.root.classList.toggle( 'is-inactive', ! overflow );

        if ( overflow ) {
          splide02.options = { clones: undefined, arrows: true, pagination: true, drag: true };
        } else {
          splide02.go( 0 );
          splide02.options = { clones: 0, arrows: false, pagination: false, drag: false };
        }
      } );

      splide02.mount();

      var splide03 = new Splide( '#splide03', {
        // height : 400,
        type   : 'loop',
        gap    : '1rem',
        perPage: 3,
      } );

      splide03.on( 'overflow', overflow => {
        console.log( 'splide03:', overflow );
        splide03.go( 0 );

        if ( overflow ) {
          splide03.options = { clones: undefined, arrows: true, pagination: true, drag: true };
        } else {
          splide03.options = { clones: 0, arrows: false, pagination: false, drag: false };
        }
      } );

      splide03.mount();

      var add    = document.getElementById( 'add' );
      var remove = document.getElementById( 'remove' );

      var index = 1;

      add.addEventListener( 'click', function() {
        splide03.add( [
          `<li class="splide__slide"><img src="../../assets/images/pics/slide${ String( ++index ).padStart( 2, '0' ) }.jpg"></li>`,
        ] );
      } );

      remove.addEventListener( 'click', function() {
        splide03.remove( splide03.length - 1 );
      } );

      var splide04 = new Splide( '#splide04', {
        autoWidth : true,
        gap       : '1rem',
        focus     : 0,
        drag      : 'free',
        omitEnd   : true,
      } );

      splide04.on( 'overflow', overflow => {
        console.log( 'splide04:', overflow );

        if ( overflow ) {
          splide04.options = { arrows: true, pagination: true, drag: true };
        } else {
          splide04.options = { arrows: false, pagination: false, drag: false };
        }
      } );

      splide04.mount();
    } );
  </script>

  <style>
    .splide.is-inactive .splide__list {
      justify-content: center;
    }
  </style>
</head>
<body>

<?php render( 'splide01' ); ?>
<?php render( 'splide02' ); ?>

<?php render( 'splide03', 1 ); ?>
<button id="add">Add</button>
<button id="remove">Remove</button>

<div id="splide04" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <li style="width: 100px" class="splide__slide">
        <img src="../../assets/images/pics/slide01.jpg">
      </li>
      <li style="width: 200px" class="splide__slide">
        <img src="../../assets/images/pics/slide02.jpg">
      </li>
      <li style="width: 100px" class="splide__slide">
        <img src="../../assets/images/pics/slide03.jpg">
      </li>
      <li style="width: 200px" class="splide__slide">
        <img src="../../assets/images/pics/slide04.jpg">
      </li>
      <li style="width: 300px" class="splide__slide">
        <img src="../../assets/images/pics/slide05.jpg">
      </li>
      <li style="width: 200px" class="splide__slide">
        <img src="../../assets/images/pics/slide06.jpg">
      </li>
    </ul>
  </div>
</div>

</body>
</html>
