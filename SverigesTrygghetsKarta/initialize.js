// Laddar Google Charts-paket för geografiska kartor och core-diagram
google.charts.load('current', {
  packages: ['geochart', 'corechart']
});

// sök knappen initialiserar
function initialize() {
  document.querySelector('button').addEventListener('click', function() {
    fetchData();
    showModal();
  });
  drawVisualization([]); // Initial tom karta
}

google.charts.setOnLoadCallback(initialize);

function showModal() {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block"; // Visa färgförklarningen

  span.onclick = function() {
    modal.style.display = "none"; // Stängs när användaren klickar på "x"
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none"; // Stäng när användaren klickar utanför färgförklarningen
    }
  }
}