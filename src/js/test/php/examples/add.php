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
  <title>Add / Remove</title>

  <link rel="stylesheet" href="../../../../../dist/css/themes/splide-<?php echo $settings['theme'] ?>.min.css">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script src="../../../../../dist/js/splide.js"></script>
</head>
<body>

<?php render(); ?>

<button id="add">Add</button>
<button id="remove">Remove</button>

<script>
  var splide = new Splide( '#splide01', {
    type   : 'loop',
    perPage: 3,
    gap    : '1rem',
  } );

  splide.mount();

  var add    = document.getElementById( 'add' );
  var remove = document.getElementById( 'remove' );

  add.addEventListener( 'click', function() {
    splide.add( [
      '<img src="../../assets/images/pics/slide15.jpg">',
      '<img src="../../assets/images/pics/slide16.jpg">',
    ] );
  } );

  remove.addEventListener( 'click', function() {
    splide.remove( splide.length - 1 );
  } );
</script>

</body>
</html>
