import { useTips } from '../hooks/useTips';
import { TipCard } from '../components/TipCard';

export const ArchivePage = () => {
  const { getAllTips, loading, error } = useTips();

  const tips = getAllTips();

  if (loading) {
    return (
      <section className="section site-portfolio">
        <div className="container">
          <div className="row mb-5 align-items-center">
            <div className="col-md-12 col-lg-12 mb-4 mb-lg-0">
              <h2 className="mb-4">Archiv</h2>
              <p>Načítání...</p>
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
            <div className="col-md-12 col-lg-12 mb-4 mb-lg-0">
              <h2 className="mb-4">Archiv</h2>
              <p>Chyba při načítání tipů: {error}</p>
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
          <div className="col-md-12 col-lg-12 mb-4 mb-lg-0">
            <h2 className="mb-4">Archiv</h2>
            <div id="archiv" className="row no-gutter">
              {tips.map((tip) => (
                <TipCard key={`${tip.week}-${tip.tipNumber}`} tip={tip} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
