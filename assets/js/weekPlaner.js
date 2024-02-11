(function () {
  // get tips from url
  let tips = getUrlParameter('tips')

  if (tips === false) return

  tips = tips.split(',')

  // load html page and insert into div
  tips.forEach(tip => {
    const [year, week, day] = tip.split('-')
    const divName = 'week-' + week + '-day-' + day
    $("#week-planer").append('<div id="' + divName + '"></div>');
    loadHTML('/tips/' + year + "-" + week + '/tip' + day + '.html', '#' + divName)
  })
})();
