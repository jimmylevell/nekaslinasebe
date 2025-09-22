// load html page and insert into div
function loadHTML(url, div) {
  $(div).load(url + " main > *", function () {

    // prepend week to title
    const week = url.split('/')[2]
    const title = $(div).find('h2').text()
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

var generateUrl = function generateUrl() {
  const days = 6
  const weeks = ['24-05', '24-06', '24-07', '24-08', '24-09', '24-10', '24-11', '24-12', '24-13', '24-14', '24-15', '24-16', '24-17', '24-18', '24-19', '24-20', '24-21', '24-22', '24-23', '24-25', '24-26', '24-27', '24-28', '24-29', '24-30', '24-31', '24-47', '24-48', '24-49', '24-50', '24-51', '25-05', '25-06', '25-07', '25-08', '25-09', '25-10', '25-11', '25-12', '25-13', '25-14', '25-15', '25-16', '25-17', '25-18', '25-19', '25-20', '25-21', '25-22', '25-23', '25-24', '25-25', '25-26', '25-27', '25-28', '25-29', '25-30', '25-31', '25-32']

  const listOfTips = []

  weeks.forEach(week => {
    for (let i = 1; i <= days; i++) {
      listOfTips.push(week + '-' + i)
    }
  })

  // randomly select six tips
  const selectedTips = []
  for (let i = 0; i < days; i++) {
    const randomIndex = Math.floor(Math.random() * listOfTips.length)
    selectedTips.push(listOfTips[randomIndex])
    listOfTips.splice(randomIndex, 1)
  }

  const link = window.document.location.origin + '/pages/weekPlaner.html?tips=' + selectedTips.join(',')
  $('#generatedUrl').text(link)
}
