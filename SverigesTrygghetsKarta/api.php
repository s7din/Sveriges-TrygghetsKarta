<?php
header('Content-Type: application/json');

// Laddar data från JSON-fil
function loadData() {
    $json = file_get_contents('data.json'); 
    return json_decode($json, true); 
}

// Filtrerar data baserat på parametrar
function filterData($data, $year, $gender, $condition) {
    $filteredData = [];

    foreach ($data as $entry) {
        // Kontrollera om varje parameter matchar eller är tom
        if (($year === '' || $entry['year'] == $year) &&
            ($gender === '' || $entry['gender'] == $gender) &&
            ($condition === '' || $entry['condition'] == $condition)) {
            $filteredData[] = $entry;
        }
    }

    return $filteredData; 
}

// Hämta query-parametrar
$year = $_GET['year'] ?? '';
$gender = $_GET['gender'] ?? '';
$condition = $_GET['condition'] ?? '';

$data = loadData(); // Ladda data
$filteredData = filterData($data, $year, $gender, $condition);

echo json_encode($filteredData, JSON_PRETTY_PRINT); // Skriv ut JSON
?>
