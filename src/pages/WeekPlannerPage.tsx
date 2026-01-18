import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTips } from '../hooks/useTips';
import { TipCard } from '../components/TipCard';
import { useTranslation } from 'react-i18next';

export const WeekPlannerPage = () => {
  const [searchParams] = useSearchParams();
  const { getAllTips, getTip, loading } = useTips();
  const { t } = useTranslation();
  const [generatedUrl, setGeneratedUrl] = useState<string>('');

  const allTips = getAllTips();
  
  // Parse tips from URL query parameter
  const tipsParam = searchParams.get('tips');
  const selectedTipIds = tipsParam ? tipsParam.split(',') : [];
  
  const selectedTips = selectedTipIds
    .map((tipId) => {
      const [, tipNumber] = tipId.split('-').slice(-2);
      const yearWeek = tipId.substring(0, tipId.lastIndexOf('-'));
      return getTip(yearWeek, parseInt(tipNumber));
    })
    .filter((tip) => tip !== null);

  const generateRandomTips = (numberOfTips: number) => {
    if (allTips.length === 0) return;

    const availableTips = [...allTips];
    const selected: string[] = [];

    for (let i = 0; i < Math.min(numberOfTips, availableTips.length); i++) {
      const randomIndex = Math.floor(Math.random() * availableTips.length);
      const tip = availableTips[randomIndex];
      selected.push(`${tip.week}-${tip.tipNumber}`);
      availableTips.splice(randomIndex, 1);
    }

    const link = `${window.location.origin}/week-planner?tips=${selected.join(',')}`;
    setGeneratedUrl(link);
  };

  if (loading) {
    return (
      <section className="section site-portfolio">
        <div className="container">
          <h2>{t('common.loading')}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="section site-portfolio">
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-md-12 col-lg-12 mb-4 mb-lg-0">
            <h2 className="mb-4">{t('weekPlanner.title')}</h2>
            <div>
              <div className="mb-4 text-center">
                <p className="lead">
                  {t('weekPlanner.intro')}
                </p>
                <button className="btn btn-primary btn-lg me-2" onClick={() => generateRandomTips(1)}>
                  <i className="bi bi-shuffle"></i> {t('weekPlanner.feelingLuckyDay')}
                </button>

                <button className="btn btn-primary btn-lg" onClick={() => generateRandomTips(6)}>
                  <i className="bi bi-shuffle"></i> {t('weekPlanner.feelingLuckyWeek')}
                </button>

                {generatedUrl && (
                  <div className="mt-3">
                    <p className="mb-2">{t('weekPlanner.plannerReady')}</p>
                    <a href={generatedUrl} className="btn btn-success btn-lg">
                      <i className="bi bi-calendar-week"></i> {t('weekPlanner.openPlanner')}
                    </a>
                    <div className="mt-2">
                      <small className="text-muted">{t('weekPlanner.copyLink')} </small>
                      <input
                        type="text"
                        className="form-control mt-1"
                        value={generatedUrl}
                        readOnly
                        onClick={(e) => e.currentTarget.select()}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div id="week-planner" className="row no-gutter">
                {selectedTips.map((tip) => (
                  <TipCard key={`${tip.week}-${tip.tipNumber}`} tip={tip} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
