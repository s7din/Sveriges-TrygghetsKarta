// Funktion för att visa geografisk data
function displayGeoData(filteredData) {
    const chartData = filteredData.map(d => {
      const values = d.values.map(value => isNaN(Number(value)) ? 0 : Number(value));
      const multipliers = [-2, -1, 1, 2];
      const sum = values.reduce((acc, value, index) => acc + (value * (multipliers[index] || 0)), 0);
      const regionCode = d.key[0];
      const regionFullName = regionNames[regionCode];
      return [regionFullName, sum];
    });
  
    drawVisualization(chartData);
  }
  
  // Funktion för att visa de 3 tryggaste och 3 otryggaste regionerna
  function updateTopLists(filteredData) {
    const regionScores = filteredData.map(d => {
      const values = d.values.map(value => isNaN(Number(value)) ? 0 : Number(value));
      const multipliers = [-2, -1, 1, 2];
      const sum = values.reduce((acc, value, index) => acc + (value * (multipliers[index] || 0)), 0);
      return { regionCode: d.key[0], score: sum };
    }).filter(d => d.score !== 0); // Filtrera bort regioner med 0 poäng
  
    // Sortera regioner efter tryggaste och otryggaste
    const sortedBySafest = [...regionScores].sort((a, b) => b.score - a.score).slice(0, 3);
    const sortedByUnsafe = [...regionScores].sort((a, b) => a.score - b.score).slice(0, 3);
  
    // Hämta list-elementen från DOM
    const safeList = document.getElementById('top-three-safe');
    const unsafeList = document.getElementById('top-three-unsafe');
  
    // Rensa tidigare innehåll i listorna
    safeList.innerHTML = '';
    unsafeList.innerHTML = '';
  
    // Uppdatera säkra listan
    sortedBySafest.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = regionNames[item.regionCode] || 'Unknown Region';
      safeList.appendChild(listItem);
    });
  
    // Uppdatera osäkra listan
    sortedByUnsafe.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = regionNames[item.regionCode] || 'Unknown Region';
      unsafeList.appendChild(listItem);
    });
  }
  
