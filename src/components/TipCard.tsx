import { Link } from 'react-router-dom';
import type { Tip } from '../types/tips';
import { useTranslation } from 'react-i18next';

interface TipCardProps {
  tip: Tip;
}

export const TipCard = ({ tip }: TipCardProps) => {
  const { t } = useTranslation();

  return (
    <div className={`item ${tip.category} col-sm-6 col-md-4 col-lg-4 mb-4`}>
      <Link to={`/tips/${tip.week}/${tip.tipNumber}`} className="item-wrap fancybox">
        <div className="work-info">
          <h3>{tip.title}</h3>
          <span>{t('common.clickOnMe')}</span>
        </div>
        <span className="overlay category">{tip.category}</span>
        <img className="img-fluid" src={`${import.meta.env.BASE_URL}${tip.image}`} alt={tip.title} />
      </Link>
    </div>
  );
};
