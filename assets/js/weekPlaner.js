(async function () {
  // get tips from url
  let tips = getUrlParameter('tips')

  if (tips === false) return

  // Load tips data dynamically
  let tipsData;
  try {
    const response = await fetch('/data/tips.json');
    tipsData = await response.json();
  } catch (error) {
    console.error('Failed to load tips data:', error);
    return;
  }

  tips = tips.split(',')

  // load html page and insert into div
  tips.forEach(tip => {
    const [year, week, day] = tip.split('-')
    const divName = 'week-' + week + '-day-' + day

    tipData = tipsData.tips.filter(tip => {
      console.log(year, week, day, tip.week, tip.tipNumber)
      if (tip.week == (year + "-" + week) && tip.tipNumber == day) {
        return true
      } else {
        return false
      }
    })[0]

    console.log('Tips to load:', tipsData)
    console.log('Filtered tips:', tipData)

    $("#week-planer").append('<div id="' + divName + '"></div>');
    loadHTML('/tips/' + year + "-" + week + '/tip' + day + '.html', '#' + divName, tipData.category)
  })
})();
