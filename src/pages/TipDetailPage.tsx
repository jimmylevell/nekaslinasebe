import { useParams } from 'react-router-dom';
import { useTips } from '../hooks/useTips';

export const TipDetailPage = () => {
  const { weekId, tipNumber } = useParams<{ weekId: string; tipNumber: string }>();
  const { getTip, loading, error } = useTips();

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <h2>Načítání...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <h2>Chyba při načítání tipu</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  const tip = weekId && tipNumber ? getTip(weekId, parseInt(tipNumber)) : null;

  if (!tip) {
    return (
      <section className="section">
        <div className="container">
          <h2>Tip nenalezen</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="row mb-8 align-items-center">
          <div className="col-md-8,9" data-aos="fade-up">
            <h2>{tip.title}</h2>
            <p>{tip.content}</p>
          </div>
        </div>
      </div>

      <div className="site-section pb-0">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-md-8" data-aos="fade-up">
              <img
                src={tip.imageBig || tip.image}
                alt={tip.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-4 ml-auto mb-5" data-aos="fade-up" data-aos-delay="100">
              <div className="sticky-content">
                <h3 className="h3">
                  <b>Jak na tip #nekaslinasebe v praxi?</b>
                </h3>
                <p className="mb-4">
                  <span className="text-muted"></span>
                </p>
                <div className="mb-5">
                  <p>{tip.practicalTips || ''}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 ml-auto mt-3">
            <p>
              Vše, co tu vidíš, děláme <b>zadarmo</b>. Kdybys nás chtěl/a podpořit, budeme
              rádi, když mrkneš na naše{' '}
              <b>
                <a
                  href="https://kpsychologovi.cz/shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
              , který tě naučí efektivně pracovat s emocemi. Právě díky tomu budeme moct
              pokračovat v poskytování každodenních #nekaslinasebe tipů zdarma.{' '}
              <b>
                Novinkou je knížka{' '}
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
      </div>
    </section>
  );
};
