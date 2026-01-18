import { useParams } from 'react-router-dom';
import { useTips } from '../hooks/useTips';
import { useTranslation } from 'react-i18next';

export const TipDetailPage = () => {
  const { weekId, tipNumber } = useParams<{ weekId: string; tipNumber: string }>();
  const { getTip, loading, error } = useTips();
  const { t } = useTranslation();

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
                  <b>{t('tipDetail.howToInPractice')}</b>
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
            <p dangerouslySetInnerHTML={{ __html: t('tipDetail.support') }} />
          </div>
        </div>
      </div>
    </section>
  );
};
