// load html page and insert into div
function loadHTML(url, div) {
  fetch(url)
    .then(response => {
      return response.text();
    })
    .then(data => {
      $(div).html(data);

      // remove unnecessary elements
      $('nav')[1].remove();
      $('footer')[0].remove();
    });
}

// Load all tipps to archive
(function () {
  const numberOfTips = 6

  for (let i = 1; i <= numberOfTips; i++) {
    $("#archiv").append('<div id="archiv-' + i + '"></div>');
    loadHTML('/archiv/stare_tipy (29.1-4.2)/tip' + i + '.html', '#archiv-' + i)
  }
})()
