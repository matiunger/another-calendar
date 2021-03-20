import React, { Suspense, useState, useEffect } from 'react';
import '../css/App.css';
import Clock from './Clock';
import SunHours from './SunHours';
import { useTranslation, Trans } from 'react-i18next';

import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import _ from "lodash";
import SunCalc from 'suncalc'

// https://www.npmjs.com/package/suncalc

function Header(props) {
  return (
    <header>
      <Trans i18nKey="settings.settings">
        Settings
    </Trans>
    </header>
  )
}

function Footer(props) {
  return (
    <footer>
      <Grid container direction="row">
        <Grid item xs={6} style={{ textAlign: "left" }}>
          <Trans i18nKey="photoBy">Photo by</Trans>&nbsp;<a href={props.photoUrl} target="_blank">{props.photoAuthor}</a>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}><SettingsIcon style={{ fontSize: 24 }} /></Grid>
      </Grid>
    </footer>
  )
}


function TimeTab(props) {
  const { t, i18n } = useTranslation();

  const [themes, setThemes] = useState(null)
  const [themeProperties, setThemeProperties] = useState(null)
  const [themeImages, setThemeImages] = useState(null)

  const [theme, setTheme] = useState(null)

  const [photoAutor, setphotoAutor] = useState(null)
  const [photoUrl, setphotoUrl] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch('./themes/themes.json'),
      fetch('./themes/properties.json'),
      fetch('./themes/images.json')
    ])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([data1, data2, data3]) => {
        setThemes(data1);
        setThemeProperties(data2);
        setThemeImages(data3);
        setTheme("beach")
      })
      .then()
  }, []);

  // render theme
  useEffect(() => {
    if (themes) {
      const myTheme = _.find(themes, ['name', theme])
      const myThemeProps = _.find(themeProperties, ['name', myTheme["defaultProps"]])["properties"]

      let myThemeBackgroundImg;
      if (myTheme["thumbnail"] != "") {
        myThemeBackgroundImg = _.find(themeImages, ['id', myTheme["thumbnail"]])
      }

      // theme props, colors
      for (var key in myThemeProps) {
        if (myThemeProps.hasOwnProperty(key)) {
          document.documentElement.style.setProperty(key, myThemeProps[key]);
        }
      }

      document.body.classList.remove("full-background");
      if (myThemeBackgroundImg) {
        document.documentElement.style.setProperty("--background-image-small", `url('${myThemeBackgroundImg["base64"]}')`);
        var img = new Image();
        img.onload = function () {
          document.documentElement.style.setProperty("--background-image", `url('../${myThemeBackgroundImg["uri"]}')`);
          document.body.classList.add("full-background");
          setphotoAutor(myThemeBackgroundImg["author"])
          setphotoUrl(myThemeBackgroundImg["url"])
        };
        img.src = myThemeBackgroundImg["uri"]
      }

    }
  }, [theme]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  let times = SunCalc.getTimes(new Date(), -34.0621, -58.3845);
  let moonIllumination = SunCalc.getMoonIllumination(new Date());

  return (
    <div className="main">
      <Header name="pepe" />
      <button type="button" onClick={() => changeLanguage('en')}>
        en
        </button>
      <button type="button" onClick={() => changeLanguage('ar')}>
        ar
        </button>
      <div className="welcome">
        <Clock />
        <SunHours times={times} moonIllumination={moonIllumination}/>
      </div>
      <Footer photoAuthor={photoAutor} photoUrl={photoUrl} />
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

