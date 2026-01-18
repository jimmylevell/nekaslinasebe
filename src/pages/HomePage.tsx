import { useTips } from '../hooks/useTips';
import { TipCard } from '../components/TipCard';

export const HomePage = () => {
  const { getCurrentWeekTips, loading, error } = useTips();

  const tips = getCurrentWeekTips();

  if (loading) {
    return (
      <section className="section site-portfolio">
        <div className="container">
          <div className="row mb-5 align-items-center">
            <div className="col-md-12 col-lg-12 mb-4 mb-lg-0" data-aos="fade-up">
              <h2>Načítání...</h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section site-portfolio">
        <div className="container">
          <div className="row mb-5 align-items-center">
            <div className="col-md-12 col-lg-12 mb-4 mb-lg-0" data-aos="fade-up">
              <h2>Chyba při načítání tipů</h2>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section site-portfolio">
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-md-12 col-lg-12 mb-4 mb-lg-0" data-aos="fade-up">
            <h2 className="mb-4">Ahoj, jsem tvůj nový průvodce duševním zdravím.</h2>
            <p>
              Každý týden tu najdeš <b>6 tipů #nekaslinasebe</b>, tzn. jeden tip na každý den.
              Neděle můžeš využít k odpočinku a naplánování si pár minutek #nekaslinasebe pro
              nadcházející týden. Každý den můžeš zkusit jeden konkrétní tip. Kliknutím na
              obrázek se dozvíš, jak konkrétně tip můžeš aplikovat. Ať už máš minutku, 5 nebo
              15 minut. Vše je pro tebe připraveno, tak hurá na to.
            </p>
          </div>
        </div>
        <div id="portfolio-grid" className="row no-gutter" data-aos="fade-up" data-aos-delay="200">
          {tips.map((tip) => (
            <TipCard key={`${tip.week}-${tip.tipNumber}`} tip={tip} />
          ))}
        </div>
        <p>
          <b>PS:</b> Je čiště jen a jen na tobě, jestli si na <b>celý týden vybereš jeden tip</b> a
          ten budeš zkoušet v různých časových variantách. Nebo jestli budeš každý den zkoušet jiný
          tip. Tady <b>mysli</b> hlavně a především <b>na sebe</b>. Nezahlť se tím. že "musíš".
          Tipy tu nejsou od toho, aby tě zahltily a vyvíjely na tebe tlak (na výkon). Proto s tipy
          zacházej tak, jak je ti to příjemné. Každý z nás to má jinak, a to je v pořádku. Tak
          #nekaslinasebe. Jsem v tom s Tebou, Terka.
        </p>
        <div className="col-md-12 ml-auto mt-3">
          <p>
            Vše, co tu vidíš, děláme <b>zadarmo</b>. Kdybys nás chtěl/a podpořit, budeme rádi, když
            mrkneš na naše{' '}
            <b>
              <a href="https://kpsychologovi.cz/shop/" target="_blank" rel="noopener noreferrer">
                nekaslinasebe produkty
              </a>
            </b>
            , na{' '}
            <b>
              <a
                href="https://www.kurzyproradost.cz/kurz/jak-na-uzkosti-obavy-stres-a-emoce-353?pid=774708"
                target="_blank"
                rel="noopener noreferrer"
              >
                kurz o úzkostech
              </a>
            </b>{' '}
            nebo{' '}
            <b>
              <a href="https://skillmea.cz/online-kurzy/emocni-fitko-jak-na-emoce">
                kurz emočního fitka: jak na emoce
              </a>
            </b>
            , který tě naučí efektivně pracovat s emocemi. Právě díky tomu budeme moct pokračovat v
            poskytování každodenních #nekaslinasebe tipů zdarma. Novinkou je knížka{' '}
            <b>
              <a
                href="https://obchod.portal.cz/hry-a-procvicovani/nekasli-na-sebe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nekašli na sebe: Tvůj parťák na cestě s emocemi.
              </a>
            </b>{' '}
            Předem moc děkujeme.
          </p>
        </div>
      </div>
    </section>
  );
};
