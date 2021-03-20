import React, { Suspense } from 'react';
import '../css/App.css';
import Clock from './Clock';
import { useTranslation, Trans } from 'react-i18next';

import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';



function Header (props) {
  return (
  <header>
    <Trans i18nKey="settings.settings">
      Settings
    </Trans>
  </header>
  )
}

function Footer (props) {
  return (
    <footer>
      <Grid container direction="row">
        <Grid item xs={6} style={{textAlign:"left"}}>
          <Trans i18nKey="photoBy">Photo by</Trans>&nbsp;<a href="" target="_blank">{props.photoAuthor}</a>
        </Grid>
        <Grid item xs={6} style={{textAlign:"right"}}><SettingsIcon style={{ fontSize: 24 }} /></Grid>
      </Grid>
    </footer>
  )
}


function TimeTab() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div id="app">
      <div class="main"></div>
      
      
      
      
      <Header name="pepe" />
      <button type="button" onClick={() => changeLanguage('en')}>
          en
      </button>
      <button type="button" onClick={() => changeLanguage('ar')}>
          ar
      </button>
      <Clock />
      <Footer photoAuthor='pepe' />
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

