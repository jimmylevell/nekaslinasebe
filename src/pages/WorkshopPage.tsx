import { useTranslation } from 'react-i18next';

export const WorkshopPage = () => {
  const { t } = useTranslation();
  
  return (
    <section className="section">
      <div className="container">
        <div className="row mb-4 align-items-center">
          <div className="col-md-12" data-aos="fade-up">
            <h2 className="mb-2">{t('workshop.title')}</h2>
            <p>
              {t('workshop.intro')}
            </p>
            <p dangerouslySetInnerHTML={{ __html: t('workshop.why') }} />
            <p>
              {t('workshop.paragraph1')}
            </p>
            <p dangerouslySetInnerHTML={{ __html: t('workshop.ps1') }} />

            <p>
              {t('workshop.consistency')}
            </p>
            <p dangerouslySetInnerHTML={{ __html: t('workshop.remember') }} />
            <p dangerouslySetInnerHTML={{ __html: t('workshop.question') }} />
            <p dangerouslySetInnerHTML={{ __html: t('workshop.ps2') }} />
          </div>
        </div>
      </div>
    </section>
  );
};
