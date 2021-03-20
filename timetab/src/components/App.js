import React, { Suspense } from 'react';
import '../css/App.css';
import Clock from './Clock';
import { useTranslation, Trans } from 'react-i18next';

function Header (props) {
  return (
  <header>
    <Trans i18nKey="settings.settings">
      Settings
    </Trans>
  </header>
  )
}

function TimeTab() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <Header name="pepe" />
      <button type="button" onClick={() => changeLanguage('en')}>
          en
      </button>
      <button type="button" onClick={() => changeLanguage('ar')}>
          ar
      </button>
      <Clock />
    </div>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div>
    <div>loading...</div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <TimeTab />
    </Suspense>
  );
}

