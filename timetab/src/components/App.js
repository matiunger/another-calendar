import React, { Suspense, useState, useEffect } from 'react';
import '../css/App.css';
import Welcome from './Welcome';
import Settings from './Settings';
import { useTranslation, Trans } from 'react-i18next';

import Modal from 'react-modal';

import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import _ from "lodash";
import SunCalc from 'suncalc'
import store from 'store'

// https://www.npmjs.com/package/suncalc

function Footer(props) {
  return (
    <footer>
      <Grid container direction="row">
        <Grid className="photoby" item xs={6} >
          {props.photoAuthor ? (<React.Fragment><Trans i18nKey="photoBy">Photo by</Trans>&nbsp;<a href={props.photoUrl} target="_blank">{props.photoAuthor}</a></React.Fragment>) : null}
        </Grid>
        <Grid item xs={6} className="settings-button" style={{ textAlign: "right" }}><SettingsIcon onClick={() => props.openSettings()} style={{ fontSize: 24 }} className="settings-button__btn" /></Grid>
      </Grid>
    </footer>
  )
}

function TimeTab(props) {
  const { i18n } = useTranslation();

  const [themes, setThemes] = useState(null)
  const [themeProperties, setThemeProperties] = useState(null)
  const [themeImages, setThemeImages] = useState(null)

  const [theme, setTheme] = useState(null)

  const defaultLocation = { "lat": 0, "lng": 0, "autodetect": true, "error" : null }

  const [location, setLocation] = useState(store.get('location') || defaultLocation)

  const [photoAutor, setphotoAutor] = useState(null)
  const [photoUrl, setphotoUrl] = useState(null)

  const [sunCalcTimes, setSunCalcTimes] = useState(SunCalc.getTimes(new Date(), location.lat, location.lng))

  const [settingsIsOpen, setSettingsOpen] = useState(false)

  const requestImageFile = require.context('../', true);


  const openSettingsModal = () => {
    setSettingsOpen(true);
  }
  const closeSettingsModal = () => {
    setSettingsOpen(false);
  }

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    store.set('theme', newTheme)
  }

  let moonIllumination = SunCalc.getMoonIllumination(new Date());

  const modalCustomStyles = {
    content: {
      top: '30%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      minWidth: '650px'
    },
    overlay: {
      backgroundColor: '#00000094'
    }
  };
  Modal.setAppElement('#app')

  useEffect(() => {
    store.set('location', defaultLocation)
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
        changeTheme(store.get('theme') || "default")


        if (location.autodetect && navigator.geolocation) {

          navigator.geolocation.getCurrentPosition((position) => {
            const loc = {
              "lat": position.coords.latitude,
              "lng": position.coords.longitude,
              "autodetect": true
            }
            setLocation(loc)
            store.set('location', loc)
          }, geoError);
        }


      })
  }, []);

  useEffect(() => {
    console.log("change location")
    setSunCalcTimes(SunCalc.getTimes(new Date(), location.lat, location.lng))
  }, [location]);

  // render theme
  useEffect(() => {
    if (themes) {
      const myTheme = _.find(themes, ['name', theme])
      const myThemeLogic = myTheme["logic"]

      const sunrise_hs = sunCalcTimes.sunrise.getHours() + sunCalcTimes.sunrise.getMinutes() / 60
      const sunset_hs = sunCalcTimes.sunset.getHours() + sunCalcTimes.sunset.getMinutes() / 60

      for (let index = 0; index < myThemeLogic.length; index++) {
        const timeframeInfo = myThemeLogic[index]
        const h_start = eval(timeframeInfo["start"])
        const h_end = eval(timeframeInfo["end"])

        const now = new Date()
        const hs = (now.getHours() + now.getMinutes() / 60)

        if (hs > h_start && hs < h_end) {
          const random_index = Math.round(Math.random() * (timeframeInfo["theme"].length - 1))
          const mySubTheme = timeframeInfo["theme"][random_index]
          const myThemeProps = _.find(themeProperties, ['name', mySubTheme["props"]])["properties"]
          const myThemeBackgroundImg = mySubTheme["bgdImage"] !== "" ? _.find(themeImages, ['id', mySubTheme["bgdImage"]]) : undefined;

          // theme props, colors
          for (var key in myThemeProps) {
            if (myThemeProps.hasOwnProperty(key)) {
              if (key.indexOf("--cursor") > -1) {
                const cursorImageUrl = requestImageFile("./img/cursors/" + myThemeProps[key]).default
                document.documentElement.style.setProperty(key, `url('${cursorImageUrl}'), auto`);
              } else {
                document.documentElement.style.setProperty(key, myThemeProps[key]);
              }
            }
          }

          document.body.classList.remove("full-background");
          if (myThemeBackgroundImg) {
            document.documentElement.style.setProperty("--background-image-small", `url('${myThemeBackgroundImg["base64"]}')`);
            var img = new Image();

            const imgSrc = requestImageFile('./' + myThemeBackgroundImg["uri"]).default
            img.onload = function () {
              document.documentElement.style.setProperty("--background-image", `url('${imgSrc}')`);
              document.body.classList.add("full-background");
              setphotoAutor(myThemeBackgroundImg["author"])
              setphotoUrl(myThemeBackgroundImg["url"])
            };
            img.src = imgSrc
          }
          setphotoAutor(undefined)
          setphotoUrl(undefined)
          break;

        }
      }
    }
  }, [theme]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const changeLocation = (key, value) => {
    console.log(key)
    console.log(value)
    let keys = key.split(".")
    let loc = store.get("location")
    loc[keys[1]] = (typeof value) == "string" ? parseFloat(value) : value
    store.set("location", loc)
    setLocation(store.get('location'))
  };

  const geoError = (err) => {
    console.log("No geolocation. Setting saved or default")
    console.log(err.message)
    changeLocation("location.autodetect", false)
    changeLocation("location.error", err.code)
  };



  return (
    <div className="main">

      <Welcome times={sunCalcTimes} moonIllumination={moonIllumination} />
      <Footer photoAuthor={photoAutor} photoUrl={photoUrl} openSettings={openSettingsModal} />
      <Modal
        isOpen={settingsIsOpen}
        //onAfterOpen={afterOpenModal}
        closeTimeoutMS={300}
        onRequestClose={closeSettingsModal}
        style={modalCustomStyles}
        contentLabel="Example Modal"
      ><Settings location={location} closeSettings={closeSettingsModal} changeLocation={changeLocation} changeLanguagee={changeLanguage} themes={themes} themeProps={themeProperties} backgroundImages={themeImages} changeTheme={changeTheme} /></Modal>
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

