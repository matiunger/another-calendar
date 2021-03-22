
import '../css/Settings.css';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { useTranslation, Trans } from 'react-i18next';
import store from 'store'
import _ from "lodash";

function Settings(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }));

  const useStylesThemes = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: 0,
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        padding: 0,
      },
    },
  }));
  const classes = useStyles();
  const classesThemes = useStylesThemes();
  const activeLang = store.get("i18nextLng")
  const activeTheme = store.get("theme")

  function renderTheme(item) {
    let t_style;
    const elevation = activeTheme == item.name ? 7 : 1;
    if (item.thumbnail != "") {
      const myThemeBackgroundImg = _.find(props.backgroundImages, ['id', item.thumbnail])
      t_style = { "backgroundImage" : `url('${myThemeBackgroundImg.base64}')`};
    } else if (item["palette"].length) {
      t_style = {"background": `linear-gradient(180deg, ${item["palette"][0]} 0%, ${item["palette"][0]} 33%, ${item["palette"][1]} 33%, ${item["palette"][1]} 66%, ${item["palette"][2]} 66%, ${item["palette"][2]} 100%)`}
    }
    /*var theme_node = `<div data-id='${key}' class='modal-settings__theme-container'><div ${t_style} class='modal-settings__theme'>${themes[key]["name"]}</div></div>`*/

    return (
      <Paper className="theme-box" key={item.name}  elevation={elevation} onClick={() => props.changeTheme(item.name)}>
      <Typography gutterBottom variant="body2" style={{"padding" : "8px"}}><Trans i18nKey={"themes."+item.name}>{item.name}</Trans></Typography>
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
        <Typography gutterBottom variant="body1">
          <Trans i18nKey="settings.language">Language</Trans>
        </Typography>
        <div className={classes.root}>
          <Chip elevation={5} className="lang-chip" label="English" variant={activeLang == "en" ? "default" : "outlined"} avatar={<Avatar src="static/img/flags/US.svg" />} clickable="true" onClick={() => props.changeLanguagee("en")} />
          <Chip label="Español" variant={activeLang == "ar" ? "default" : "outlined"} avatar={<Avatar src="static/img/flags/AR.svg" />} clickable="true" onClick={() => props.changeLanguagee("ar")} />
          <Chip label="Deutsch" variant={activeLang == "de" ? "default" : "outlined"} avatar={<Avatar src="static/img/flags/DE.svg" />} clickable="true" onClick={() => props.changeLanguagee("de")} />
        </div>
      </section>
      <section>
        <Typography gutterBottom variant="body1">
          <Trans i18nKey="settings.theme">Theme</Trans>
        </Typography>
        <div className={classesThemes.root}>
          {props.themes.map(renderTheme)}

        </div>
      </section>
      <div>
      </div>
    </div>
  );
}

export default Settings

