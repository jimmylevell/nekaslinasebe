// load html page and insert into div
function loadHTML(url, div) {
  $(div).load(url + " main > *", function () {

    // prepend week to title
    const week = url.split('/')[2]
    const title = $(div).find('h2').text()
    $(div).find('h2').text(week + ' - ' + title)
  })
}

// Load all tipps to archive
(function () {
  const numberOfTips = 6
  const weeks = ['24-05', '24-06']

  weeks.forEach(week => {
    for (let i = 1; i <= numberOfTips; i++) {
      const divName = 'archiv-' + week + '-' + i
      $("#archiv").append('<div id="' + divName + '"></div>');
      loadHTML('/tips/' + week + '/tip' + i + '.html', '#' + divName)
    }
  })
})()
