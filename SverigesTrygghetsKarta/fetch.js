// Mappning av regioner och deras namn
const regionNames = {
  '01': 'Stockholms län',
  '03': 'Uppsala län',
  '04': 'Södermanlands län',
  '05': 'Östergötlands län',
  '06': 'Jönköpings län',
  '07': 'Kronobergs län',
  '08': 'Kalmar län',
  '09': 'Gotlands län',
  '10': 'Blekinge län',
  '12': 'Skåne län',
  '13': 'Hallands län',
  '14': 'Västra Götalands län',
  '17': 'Värmlands län',
  '18': 'Örebro län',
  '19': 'Västmanlands län',
  '20': 'Dalarnas län',
  '21': 'Gävleborgs län',
  '22': 'Västernorrlands län',
  '23': 'Jämtlands län',
  '24': 'Västerbottens län',
  '25': 'Norrbottens län'
};

// Funktion för att hämta data baserat på användarens val
function fetchData() {
  const trygghetValue = document.getElementById('trygghet').value;
  const könValue = document.getElementById('kön').value; 
  const årValue = document.getElementById('år').value; 

  let apiUrl = 'https://studenter.miun.se/~alba2203/SverigesTrygghetsKarta/api.php?'; // Bas-URL för API:et
  let allDataUrl = 'https://studenter.miun.se/~alba2203/SverigesTrygghetsKarta/api.php'; // URL för all data
  let scbData = 'https://www.statistikdatabasen.scb.se/sq/148398'; // URL från SCB

  // Lägger till parametrar till API URL baserat på användarens val
  if (trygghetValue) {
    apiUrl += `condition=${(trygghetValue)}&`;
  }
  if (könValue) {
    apiUrl += `gender=${(könValue)}&`;
  }
  if (årValue) {
    apiUrl += `year=${(årValue)}`;
  }

  // Visar API-länken för användaren
  document.getElementById('apiLink').innerHTML = `
  <div class="api-link-container">
    <div class="api-link-item">
      <p><a href="#" id="showApiLink">Gör denna tabell tillgänglig i din applikation</a></p>
      <div id="apiDetails" style="display:none;">
        <p>API URL för filtrerade data (du kan justera URL:en för att ändra sökvillkoren som kön, år, etc.):</p>
        <a href="${apiUrl}" target="_blank">Din filtrerade data</a>
        <p>API URL för all data:</p>
        <a href="${allDataUrl}" target="_blank">All data</a>
        <p>Ursprunglig data hämtad från SCB:</p> 
          <a href="${scbData}" target="_blank">
            Statistikdatabasen SCB</a>
      </div>
    </div>
  </div>
  `;
  
  // Hanterar visning och döljer av API-detaljer
  document.getElementById('showApiLink').addEventListener('click', function(event) {
    event.preventDefault();
    const apiDetails = document.getElementById('apiDetails');
    const maxWidthContainer = document.querySelector('.banner');
    if (apiDetails.style.display === 'none' || apiDetails.style.display === '') {
        apiDetails.style.display = 'block';
        maxWidthContainer.style.marginTop = '100px';
    } else {
        apiDetails.style.display = 'none';
        maxWidthContainer.style.marginTop = '0px';
    }
  });
  

  // Bestämmer nycklar baserat på användarens val
  const trygghetKey = trygghetValue === 'när det är mörkt' ? '700' : '710';
  const könKey = { 'Samtliga': '000', 'Män': '010', 'Kvinnor': '020' }[könValue];
  const årKey = årValue;

  // Hämtar data från 'osorterad.php'
  fetch('osorterad.php')
    .then(response => response.json()) 
    .then(data => {
      if (!data || !data.data) {
        console.error('Data eller data.data är undefined');
        return;
      }
      // Filtrerar data baserat på användarens val
      const filteredData = data.data.filter(item =>
        item.key && item.key.length > 3 &&
        item.key[1] === trygghetKey &&
        item.key[2] === könKey &&
        item.key[3] === årKey
      );

      // Uppdaterar kartan, diagram och toplistan med filtrerad data
      displayGeoData(filteredData);  
      displayBarData(filteredData);   
      updateTopLists(filteredData);   

      // Visar histogram, toplistans och api sektionen
      document.getElementById('fullWidthBanner').style.display = 'flex';
      document.getElementById('sectionContainer').style.display = 'block';
    })
    .catch(error => {
      console.error('Fel vid hämtning av data:', error);
      document.getElementById('resultat').innerText = 'Misslyckades med att hämta data.';
    });
}
