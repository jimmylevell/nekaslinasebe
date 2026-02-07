import { useTranslation } from 'react-i18next';

export const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <section className="section pb-5">
      <div className="container">
        <div className="row mb-5 align-items-end">
          <div className="col-md-12" data-aos="fade-up">
            <h2>{t('about.title')}</h2>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('about.intro') }} />
            <p dangerouslySetInnerHTML={{ __html: t('about.paragraph1') }} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-5 mb-md-0" data-aos="fade-up">
            <p>
              <img src={`${import.meta.env.VITE_BASE_PATH}assets/img/person_1_sq.jpg`} alt="Image" className="img-fluid" />
            </p>
            <p dangerouslySetInnerHTML={{ __html: t('about.solution') }} />
            <p dangerouslySetInnerHTML={{ __html: t('about.howTo') }} />
            <p>{t('about.whyTry')}</p>
            <p dangerouslySetInnerHTML={{ __html: t('about.ps') }} />
          </div>
        </div>
      </div>
    </section>
  );
};
