// Funktion för att rita kartan med data
function drawVisualization(dataArray) {
  if (!google.visualization) {
    console.error("Google Visualization är inte laddad ännu.");
    return;
  }

  // Konvertera dataarrayen till ett DataTable-format som krävs av Google Charts
  var data = google.visualization.arrayToDataTable([
    ['Region', 'Säkerhetspoäng'],
    ...dataArray
  ]);

  // Definiera alternativ för GeoChart
  const options = {
    region: 'SE',
    displayMode: 'regions', 
    resolution: 'provinces', 
    width: 950, 
    height: 800, 
    colorAxis: {
      colors: ['gray', '#b8c2ef', '#8995d7', '#7081c4', '#2f44a8'], // Inkludera grå för nollvärden
    },
  };

  // Skapa en GeoChart och rita den i elementet med id 'visualization'
  var geochart = new google.visualization.GeoChart(document.getElementById('visualization'));
  geochart.draw(data, options);
}


// Funktion för att visa stapeldiagramdata
function displayBarData(filteredData) {
  const barData = filteredData.map(d => {
    const fullName = regionNames[d.key[0]] || `Okänd kod: ${d.key[0]}`;
    return [fullName].concat(d.values.map(Number));
  });

  drawVisualizationBar(barData);
}

// Funktion för att rita stapeldiagram
function drawVisualizationBar(chartData) {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(() => {
    var data = new google.visualization.DataTable();

    // Lägg till kolumn för regionnamn
    data.addColumn('string', 'Region');
    const columnNames = [
      'Andel mycket dåligt',
      'Andel ganska dåligt',
      'Andel ganska bra',
      'Andel mycket bra'
    ];
    // Lägg till kolumner och rader
    columnNames.forEach(name => data.addColumn('number', name));
    chartData.forEach(row => {
      data.addRow(row);
    });

    // Visa med ett procenttecken
    var formatter = new google.visualization.NumberFormat({ suffix: '%' });
    for (var i = 1; i <= columnNames.length; i++) {
      formatter.format(data, i);
    }
    var options = {
      title: 'Medborgarnas Trygghetssyn i Sverige',
      backgroundColor: 'transparent',
      chartArea: {
        width: '80%',
        height: '80%',
        left: 100,
        top: 20
      },
      isStacked: true,
      colors: ['#ef4623', '#f58e1e', '#7dbc41', '#0f9146'],
      hAxis: {
        title: 'Regioner',
      },
      vAxis: {
        title: 'Betygets procentandel',
        maxValue: 100,
        format: '#\'%\''
      }
    };

    // Rita det i elementet med id 'chart_div'
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  });
}
