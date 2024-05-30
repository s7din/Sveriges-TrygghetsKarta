<?php
// URL för SCB API
$url = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/ME/ME0003/ME0003I/MedborgTrygghet1';

// JSON-fråga till API
$jsonData = '{
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "vs:BLän",
        "values": [
          "01",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "12",
          "13",
          "14",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25"
        ]
      }
    },
    {
      "code": "MedBakgrund",
      "selection": {
        "filter": "item",
        "values": [
          "000",
          "010",
          "020"
        ]
      }
    },
    {
      "code": "ContentsCode",
      "selection": {
        "filter": "item",
        "values": [
          "0000057M",
          "0000057I",
          "0000057G",
          "0000057K"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
}';

// cURL-inställningar för POST-anrop
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($jsonData))
);

$result = curl_exec($ch);
curl_close($ch); 

// Konverterar svaret till PHP-array
$resultData = json_decode($result, true);

// Returnerar data som JSON
echo json_encode($resultData);

?>

