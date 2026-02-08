import { useParams } from 'react-router-dom';
import { useTips } from '../hooks/useTips';
import { useTranslation } from 'react-i18next';
import type { PracticalTips } from '../types/tips';

export const TipDetailPage = () => {
  const { weekId, tipNumber } = useParams<{ weekId: string; tipNumber: string }>();
  const { getTip, loading, error } = useTips();
  const { t, i18n } = useTranslation();

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <h2>{t('common.loading')}</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <h2>{t('common.error')}</h2>
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
          <h2>{t('tipDetail.notFound')}</h2>
        </div>
      </section>
    );
  }

  const basePath = import.meta.env.VITE_BASE_PATH || '/';
  const imageUrl = tip.imageBig || tip.image;
  const imagePath = basePath.endsWith('/') && imageUrl.startsWith('/')
    ? imageUrl.slice(1)
    : imageUrl;

  // Helper function to check if practicalTips is structured format
  const isStructuredTips = (tips: string | PracticalTips | undefined): tips is PracticalTips => {
    return typeof tips === 'object' && tips !== null && 'oneMinute' in tips;
  };

  // Get practical tips based on language and format
  const practicalTips = i18n.language === 'en' ? tip.practicalTips_en : tip.practicalTips;
  const hasStructuredTips = isStructuredTips(practicalTips);

  // Get PS content
  const psContent = i18n.language === 'en' ? tip.psContent_en : tip.psContent;

  // Split content into paragraphs for better formatting
  const contentParagraphs = (i18n.language === 'en' ? tip.content_en : tip.content)?.split('\n\n') || [];

  return (
    <section className="section">
      <div className="container">
        <div className="row mb-8 align-items-center">
          <div className="col-md-8,9" data-aos="fade-up">
            <h2>{tip.title}</h2>
            {contentParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="site-section pb-0">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-md-8" data-aos="fade-up">
              <img
                src={basePath + imagePath}
                alt={tip.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-4 ml-auto mb-5" data-aos="fade-up" data-aos-delay="100">
              <div className="sticky-content">
                <h3 className="h3">
                  <b>{t('tipDetail.howToInPractice')}</b>
                </h3>
                <p className="mb-4">
                  <span className="text-muted">{t('tipDetail.ifYouHave')}</span>
                </p>
                <div className="mb-5">
                  {hasStructuredTips ? (
                    <>
                      {practicalTips.oneMinute && (
                        <p>
                          <b>1 {t('tipDetail.minute')}</b>: {practicalTips.oneMinute}
                        </p>
                      )}
                      {practicalTips.fiveMinutes && (
                        <p>
                          <b>5 {t('tipDetail.minutes')}</b>: {practicalTips.fiveMinutes}
                        </p>
                      )}
                      {practicalTips.fifteenMinutes && (
                        <p>
                          <b>15 {t('tipDetail.minutes')}</b>: {practicalTips.fifteenMinutes}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>{practicalTips as string || ''}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {psContent && (
            <div className="col-md-12 ml-auto mt-3">
              <p><b>PS:</b> {psContent}</p>
            </div>
          )}
          <div className="col-md-12 ml-auto mt-3">
            <p dangerouslySetInnerHTML={{ __html: t('tipDetail.support') }} />
          </div>
        </div>
      </div>
    </section>
  );
};
