import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WorkshopPage } from './pages/WorkshopPage';
import { ContactPage } from './pages/ContactPage';
import { ArchivePage } from './pages/ArchivePage';
import { WeekPlannerPage } from './pages/WeekPlannerPage';
import { TipDetailPage } from './pages/TipDetailPage';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageHandler() {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = searchParams.get('lang') || searchParams.get('language');
    if (lang && ['cs', 'en'].includes(lang)) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams, i18n]);

  return null;
}

function App() {
  return (
    <Router basename={import.meta.env.VITE_BASE_PATH}>
      <LanguageHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/week-planner" element={<WeekPlannerPage />} />
          <Route path="/tips/:weekId/:tipNumber" element={<TipDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
