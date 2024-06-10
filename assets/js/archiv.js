// Load all tipps to archive
(function () {
  const numberOfTips = 6
  const weeks = ['24-05', '24-06', '24-07', '24-08', '24-09', '24-10', '24-11', '24-12', '24-13', '24-14', '24-15', '24-16', '24-17', '24-18', '24-19', '24-20', '24-21']

  weeks.forEach(week => {
    for (let i = 1; i <= numberOfTips; i++) {
      const divName = 'archiv-' + week + '-' + i
      $("#archiv").append('<div id="' + divName + '"></div>');
      loadHTML('/tips/' + week + '/tip' + i + '.html', '#' + divName)
    }
  })
})()
