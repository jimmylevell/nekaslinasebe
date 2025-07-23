class TipManager {
  constructor() {
    this.tipsData = null;
    this.init();
  }

  async init() {
    await this.loadTipsData();
  }

  async loadTipsData() {
    try {
      const response = await fetch('/data/tips.json');
      this.tipsData = await response.json();
    } catch (error) {
      console.error('Failed to load tips data:', error);
    }
  }

  // Get all weeks in order
  getWeeks() {
    return this.tipsData?.weeks || [];
  }

  // Get current week tips for homepage
  getCurrentWeekTips() {
    const currentWeek = this.tipsData?.currentWeek;
    return this.getTipsForWeek(currentWeek);
  }

  // Get tips for specific week
  getTipsForWeek(weekId) {
    if (!this.tipsData) return [];
    return this.tipsData.tips.filter(tip => tip.week === weekId);
  }

  // Get all tips
  getAllTips() {
    return this.tipsData?.tips || [];
  }

  // Get specific tip
  getTip(weekId, tipNumber) {
    if (!this.tipsData) return null;
    return this.tipsData.tips.find(tip =>
      tip.week === weekId && tip.tipNumber === tipNumber
    );
  }

  // Generate homepage tip grid
  generateHomepageTips() {
    const tips = this.getCurrentWeekTips();
    const gridContainer = document.getElementById('portfolio-grid');

    if (!gridContainer || !tips.length) return;

    gridContainer.innerHTML = tips.map(tip => `
          <div class="item ${tip.category} col-sm-6 col-md-4 col-lg-4 mb-4">
            <a href="/tips/${tip.week}/tip${tip.tipNumber}.html" class="item-wrap fancybox">
              <div class="work-info">
                <h3>${tip.title}</h3>
                <span>- klikni na mě -</span>
              </div>
              <img class="img-fluid" src="${tip.image}">
            </a>
          </div>
        `).join('');
  }

  // Generate archive tips
  generateArchiveTips() {
    const archiveContainer = document.getElementById('archiv');
    if (!archiveContainer) return;

    const weeks = this.getWeeks();
    weeks.forEach(week => {
      const weekTips = this.getTipsForWeek(week.id);
      weekTips.forEach(tip => {
        const divName = `archiv-${tip.week}-${tip.tipNumber}`;
        archiveContainer.innerHTML += `<div id="${divName}"></div>`;
        this.loadTipContent(`/tips/${tip.week}/tip${tip.tipNumber}.html`, `#${divName}`);
      });
    });
  }

  // Generate individual tip page
  generateTipPage(weekId, tipNumber) {
    const tip = this.getTip(weekId, tipNumber);
    if (!tip) return;

    // Update page title
    document.title = `${tip.title} - #nekaslinasebe tipy`;

    // Update content
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.innerHTML = this.generateTipHTML(tip);
    }
  }

  generateTipHTML(tip) {
    return `
      <section class="section">
        <div class="container">
          <div class="row mb-8 align-items-center">
            <div class="col-md-8,9" data-aos="fade-up">
              <h2>${tip.title}</h2>
              <p>${tip.content}</p>
            </div>
          </div>
        </div>

        <div class="site-section pb-0">
          <div class="container">
            <div class="row align-items-stretch">
              <div class="col-md-8" data-aos="fade-up">
                <img src="${tip.imageBig || tip.image}" alt="Image" class="img-fluid">
              </div>
              <div class="col-md-4 ml-auto mb-5" data-aos="fade-up" data-aos-delay="100">
                <div class="sticky-content">
                  <h3 class="h3"><b>Jak na tip #nekaslinasebe v praxi?</b></h3>
                  <p class="mb-4"><span class="text-muted"></span></p>
                  <div class="mb-5">
                    <p>${tip.practicalTips || ''}</p>
                  </div>
                </div>
              </div>
            </div>
            ${this.generateStandardFooterContent()}
          </div>
        </div>
      </section>
    `;
  }

  generateStandardFooterContent() {
    return `
      <div class="col-md-12 ml-auto mt-3">
        <p> Vše, co tu vidíš, děláme <b>zadarmo</b>. Kdybys nás chtěl/a podpořit, budeme rádi, když mrkneš na naše
          <b><a href="https://kpsychologovi.cz/shop/" target="_blank">nekaslinasebe produkty</a></b>, na <b><a
            href="https://www.kurzyproradost.cz/kurz/jak-na-uzkosti-obavy-stres-a-emoce-353?pid=774708"
            target="_blank">kurz o úzkostech</a></b> nebo <b><a
            href="https://skillmea.cz/online-kurzy/emocni-fitko-jak-na-emoce">kurz emočního fitka: jak na
            emoce</a></b>, který tě naučí efektivně pracovat s emocemi. Právě díky tomu budeme moct pokračovat v
          poskytování
          každodenních #nekaslinasebe tipů zdarma. <b>Novinkou je knížka <a
            href="https://obchod.portal.cz/hry-a-procvicovani/nekasli-na-sebe" target="_blank">Nekašli na sebe:
            Tvůj parťák na cestě s emocemi.</a></b> Předem moc děkujeme.
        </p>
      </div>
    `;
  }

  loadTipContent(url, selector) {
    $(selector).load(url + " main > *", function () {
      const week = url.split('/')[2];
      const title = $(selector).find('h2').text();
      $(selector).find('h2').text(week + ' - ' + title);
    });
  }
}

// Initialize tip manager
const tipManager = new TipManager();

// Export for use in other scripts
window.tipManager = tipManager;
