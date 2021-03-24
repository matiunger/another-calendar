
import '../css/Settings.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Trans } from 'react-i18next';
import store from 'store'
import _ from "lodash";

import flag_ar from '../img/flags/AR.svg';
import flag_us from '../img/flags/US.svg';
import flag_de from '../img/flags/DE.svg';

function Settings(props) {

  const [locationAutodetect, setLocationAutodetect] = useState(props.location.autodetect);

  const handleLocAutodetectChange = (event) => {
    //console.log(event.target.checked)
    props.changeLocation("location.autodetect", event.target.checked)
    setLocationAutodetect(event.target.checked);
  };

  const useStylesChips = makeStyles({
    root: {
      marginRight: "16px",
      fontFamily: "var(--font-secondary)"
    },
  });

  const useStylesChipsActive = makeStyles({
    root: {
      marginRight: "16px",
      fontFamily: "var(--font-secondary)",
      borderColor: "black",
      fontWeight: "600"
    },
  });

  const classesChips = useStylesChips()
  const classesChipsActive = useStylesChipsActive()

  const useStylesThemes = makeStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: 0,
      flexWrap: 'wrap',
      marginRight: "16px",
      display: "inline-block",
      width: "100px",
      height: "86px",
      padding: "8px",
      margin: "4px",
      cursor: "pointer",
      overflow: "hidden",
      padding: 0,
      fontFamily: "var(--font-secondary)"
    },
  });

  const useStylesThemesActive = makeStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: 0,
      flexWrap: 'wrap',
      marginRight: "16px",
      display: "inline-block",
      width: "100px",
      height: "86px",
      padding: "8px",
      margin: "4px",
      cursor: "pointer",
      overflow: "hidden",
      padding: 0,
      borderColor: "black",
      fontWeight: "bold",
      fontFamily: "var(--font-secondary)"
    },
  });

  const classesThemes = useStylesThemes();
  const classesThemesActive = useStylesThemesActive();

  const useStylesForms = makeStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      marginRight: "16px",
      width: "120px",
      fontFamily: "var(--font-secondary)"
    },
  });

  const classesForm = useStylesForms();

  const activeLang = store.get("i18nextLng")
  const activeTheme = store.get("theme")

  function renderTheme(item) {
    let t_style;
    const elevation = activeTheme === item.name ? 7 : 1;
    const variant = activeTheme === item.name ? "elevation" : "outlined";
    if (item.thumbnail !== "") {
      const myThemeBackgroundImg = _.find(props.backgroundImages, ['id', item.thumbnail])
      t_style = { "backgroundImage": `url('${myThemeBackgroundImg.base64}')` };
    } else if (item["palette"].length) {
      t_style = { "background": `linear-gradient(90deg, ${item["palette"][0]} 0%, ${item["palette"][0]} 33%, ${item["palette"][1]} 33%, ${item["palette"][1]} 66%, ${item["palette"][2]} 66%, ${item["palette"][2]} 100%)` }
    }
    /*var theme_node = `<div data-id='${key}' class='modal-settings__theme-container'><div ${t_style} class='modal-settings__theme'>${themes[key]["name"]}</div></div>`*/

    return (
      <Paper variant="outlined" className={activeTheme === item.name ? classesThemesActive.root : classesThemes.root} key={item.name} elevation={elevation} onClick={() => props.changeTheme(item.name)}>
        <h3><Trans i18nKey={"themes." + item.name}>{item.name}</Trans></h3>
        <div className="theme-box--img" style={t_style}></div>
      </Paper>)
  }

  return (
    <div className="">
      <Grid container direction="row">
        <Grid item xs={6}></Grid>
        <Grid item xs={6} className="btn-close" style={{ textAlign: "right" }}><CloseIcon onClick={() => props.closeSettings()} style={{ fontSize: 24 }} className="" /></Grid>
      </Grid>
      <section>
        <h2>
          <Trans i18nKey="settings.language">Language</Trans>
        </h2>
        <div >
          <Chip className={activeLang === "en" ? classesChipsActive.root : classesChips.root} label="English" variant="outlined" avatar={<Avatar src={flag_us} />} onClick={() => props.changeLanguagee("en")} />
          <Chip className={activeLang === "ar" ? classesChipsActive.root : classesChips.root} label="Español" variant="outlined" avatar={<Avatar src={flag_ar} />} onClick={() => props.changeLanguagee("ar")} />
          <Chip className={activeLang === "de" ? classesChipsActive.root : classesChips.root} label="Deutsch" variant="outlined" avatar={<Avatar src={flag_de} />} onClick={() => props.changeLanguagee("de")} />
        </div>
      </section>
      <section>
        <h2>
          <Trans i18nKey="settings.location">Location</Trans>
        </h2>
        <div style={{display: "flex"}}>
          <TextField className={classesForm.root} disabled={locationAutodetect} id="outlined-basic" label="Latitude" variant="outlined" type="number" onBlur={(e) => { props.changeLocation("location.lat", e.target.value) }} defaultValue={props.location.lat} />
          <TextField className={classesForm.root} disabled={locationAutodetect} id="outlined-basic" label="Longitude" variant="outlined" type="number" onBlur={(e) => { props.changeLocation("location.lng", e.target.value) }} defaultValue={props.location.lng} />
          <FormControlLabel
            disabled={props.location.error != null}
            control={
              <Switch
                checked={locationAutodetect}
                onChange={handleLocAutodetectChange}
                name="locationAutodetect"
                color="primary"
              />
            }
            label="Autodetect"
          /> {props.location.error && <div className="please-share" ><Trans i18nKey="settings.pleaseShareLocation">Please share your <a target="_blank" href="https://support.google.com/chrome/answer/142065">location</a></Trans></div>}

        </div>
      </section>
      <section>
      <h2>
          <Trans i18nKey="settings.theme">Theme</Trans>
          </h2>
        <div>
          {props.themes.map(renderTheme)}
        </div>
      </section>
      <div>
      </div>
    </div>
  );
}

export default Settings

