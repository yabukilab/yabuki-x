<?php
//パラメータをテキストボックスに再現する準備
$paramq = '';
if (isset($_GET['q']))
  $paramq = htmlspecialchars($_GET['q'], ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { height: 100%; }
      td { font-size: smaller; }
    </style>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
    <script src="gsizipsmaps2.js"></script>
    <title>郵便番号検索フォームと地理院タイルのマッシュアップ2</title>
  </head>
  <body>
    <form method="get">
      <p>
        <input type="text" name="q" value='<?php echo $paramq; ?>' placeholder="郵便番号（ハイフン不要）" />
        <input type="submit" value="search" />
        <span id="output"></span>
      </p>
    </form>
    <div id="map_canvas" style="float:left; width:500px; height:500px;"></div>
    <?php require('zips.php'); ?>
  </body>
</html>
