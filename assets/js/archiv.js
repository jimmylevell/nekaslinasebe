// Load all tips to archive
(async function () {
  // Load tips data dynamically
  let tipsData;
  try {
    const response = await fetch('/data/tips.json');
    tipsData = await response.json();
  } catch (error) {
    console.error('Failed to load tips data:', error);
    return;
  }

  // Generate archive from actual tips data
  tipsData.tips.forEach(tip => {
    const divName = 'archiv-' + tip.week + '-' + tip.tipNumber
    $("#archiv").append('<div id="' + divName + '"></div>');
    loadHTML('/tips/' + tip.week + '/tip' + tip.tipNumber + '.html', '#' + divName)
  })
})()
