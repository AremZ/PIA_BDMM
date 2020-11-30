<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
      <script>
        function set(){
          var container =  document.getElementById("user");
          alert (container.value);
          document.cookie = "user="+container.value;
          <?php 
          $phpVar =  $_COOKIE['user'];
          $cookie_name = "user";
          setcookie($cookie_name, $phpVar, time() + (86400 * 30), "/"); // 86400 = 1 day
          ?>
        }
      </script>
<?php
if(!isset($_COOKIE["user"])) {
  echo "Cookie named '" . "user" . "' is not set!";
} else {
  echo "Cookie '" . "user" . "' is set!<br>";
  echo "Value is: " . $_COOKIE["user"];
}
?>

    <h1>AIUDAPOFAVO</h1>


    <input type="text" name="user" id="user">
    <input type="text" name="pass" id="">
    <button onclick="set();">enviar</button>
</body>
</html>