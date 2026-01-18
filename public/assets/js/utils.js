// load html page and insert into div
function loadHTML(url, div, category) {
  $(div).load(url + " main > *", function () {

    // prepend week to title
    const week = url.split('/')[2]
    const title = $(div).find('h2').text() + " - " + category;
    $(div).find('h2').text(week + ' - ' + title)
  })
}

// get get parameters from url
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

var generateUrl = async function generateUrl(numberOfTips) {
  // Load tips data dynamically
  let tipsData;
  try {
    const response = await fetch('/data/tips.json');
    tipsData = await response.json();
  } catch (error) {
    console.error('Failed to load tips data:', error);
    return;
  }

  const listOfTips = []

  // Generate list from actual tips data
  tipsData.tips.forEach(tip => {
    listOfTips.push(tip.week + '-' + tip.tipNumber)
  })

  // randomly select tips
  const selectedTips = []
  for (let i = 0; i < Math.min(numberOfTips, listOfTips.length); i++) {
    const randomIndex = Math.floor(Math.random() * listOfTips.length)
    selectedTips.push(listOfTips[randomIndex])
    listOfTips.splice(randomIndex, 1)
  }

  const link = window.document.location.origin + '/pages/weekPlaner.html?tips=' + selectedTips.join(',')

  // Create a styled button link instead of plain text
  const buttonHtml = `
    <div class="mt-3">
      <p class="mb-2">Your personalized planner is ready:</p>
      <a href="${link}" class="btn btn-success btn-lg">
        <i class="bi bi-calendar-week"></i> Open My Planner
      </a>
      <div class="mt-2">
        <small class="text-muted">Or copy this link: </small>
        <input type="text" class="form-control mt-1" value="${link}" readonly onclick="this.select()">
      </div>
    </div>
  `

  $('#generatedUrl').html(buttonHtml)
}
