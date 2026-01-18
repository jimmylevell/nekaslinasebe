import { useTips } from '../hooks/useTips';
import { TipCard } from '../components/TipCard';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { getCurrentWeekTips, loading, error } = useTips();
  const { t } = useTranslation();

  const tips = getCurrentWeekTips();

  if (loading) {
    return (
      <section className="section site-portfolio">
        <div className="container">
          <div className="row mb-5 align-items-center">
            <div className="col-md-12 col-lg-12 mb-4 mb-lg-0" data-aos="fade-up">
              <h2>{t('common.loading')}</h2>
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
              <h2>{t('common.error')}</h2>
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
            <h2 className="mb-4">{t('home.greeting')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('home.intro') }} />
          </div>
        </div>
        <div id="portfolio-grid" className="row no-gutter" data-aos="fade-up" data-aos-delay="200">
          {tips.map((tip) => (
            <TipCard key={`${tip.week}-${tip.tipNumber}`} tip={tip} />
          ))}
        </div>
        <p dangerouslySetInnerHTML={{ __html: t('home.ps') }} />
        <div className="col-md-12 ml-auto mt-3">
          <p dangerouslySetInnerHTML={{ __html: t('home.support') }} />
        </div>
      </div>
    </section>
  );
};
