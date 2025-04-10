'use strict';
/*global $, L, document, window */

$(document).ready(function() {
  if ($('.address').length === 0) return; // 結果がないときはマップを描かない。

  var myMap = L.map("map_canvas");
  L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
  }).addTo(myMap);

  var latMin =  1000;
  var latMax = -1000;
  var lngMin =  1000;
  var lngMax = -1000;

  // class属性が「address」であるものを取り出し、
  // その内容（つまり住所）から緯度経度を取得
  // マーカーにして、「住所」のラベルを付ける。
  $('.address').each(function() {
    var myAddress = $(this).text();
    if (myAddress.indexOf("掲載がない場合") == -1) {
      $.getJSON("https://map.yahooapis.jp/geocode/V1/geoCoder?callback=?",
        {
          appid: "yabukiweb", // 自分のアプリケーションIDで置き換える。
          query: myAddress,
          al: "4",
          output: "json",
        },
        function(result) { // コールバック関数
          var lnglat = result.Feature[0].Geometry.Coordinates.split(",");
          var lng = Number(lnglat[0]);
          var lat = Number(lnglat[1]);
          L.marker([lat, lng], {title: myAddress, riseOnHover: true}).addTo(myMap);
          if (lat < latMin) latMin = lat;
          if (lat > latMax) latMax = lat;
          if (lng < lngMin) lngMin = lng;
          if (lng > lngMax) lngMax = lng;
        } // ここまでコールバック関数
      );
    }
  });

  window.setTimeout(function() {
    myMap.fitBounds([[latMin, lngMin], [latMax, lngMax]]);
  }, 1000)
});
