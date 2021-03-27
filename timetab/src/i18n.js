import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

const resources = {
  en: {
    translation: {
      "settings": {
        "settings":"Settings",
        "theme": "Theme",
        "language": "Language",
        "location": "Location",
        "latitude":"Latitude",
        "longitude":"Longitude",
        "autodetect":"Autodetect",
        "pleaseShareLocation" : "Please share your <1 target='_blank' href='https://support.google.com/chrome/answer/142065'>location</1>"
      },
      "themes" : {
        "default": "Mix",
        "beach": "Beach",
        "mountain": "Mountains",
        "light": "Light",
        "dark": "Dark"
      },
      "sunhours": {
        "beforeSunset": "Sunset in <1 className='sun-hours__info-minutes'>{{minutes}}</1> minutes",
        "beforeSunrise": "Sunrise in <1 className='sun-hours__info-minutes'>{{minutes}}</1> minutes"
      },
      "photoBy" : "Photo by"
  },
  },
  es: {
    translation: {
      "settings": {
        "settings":"Ajustes",
        "theme": "Tema",
        "language": "Idioma",
        "location": "Ubicación",
        "latitude":"Latitud",
        "longitude":"Longitud",
        "autodetect":"Autodetectar",
        "pleaseShareLocation" : "Por favor compartí tu <1 target='_blank' href='https://support.google.com/chrome/answer/142065'>ubicación</1>"
      },
      "themes" : {
        "default": "Variado",
        "beach": "Playa",
        "mountain": "Montañas",
        "light": "Claro",
        "dark": "Oscuro"
      },
      "sunhours": {
        "beforeSunset": "Quedan <1 className='sun-hours__info-minutes'>{{minutes}}</1> minutos de sol",
        "beforeSunrise": "Amanece en <1 className='sun-hours__info-minutes'>{{minutes}}</1> minutos"
      },
      "photoBy" : "Foto de"
  },
  },
  de: {
    translation: {
      "settings": {
        "settings":"Einstellungen",
        "theme": "Theme",
        "language": "Sprache",
        "location": "Standort",
        "latitude":"Breitengrad",
        "longitude":"Längengrad",
        "autodetect":"Autodetect",
        "pleaseShareLocation" : "Bitte teilen Sie Ihren <1 target='_blank' href='https://support.google.com/chrome/answer/142065'>Standort</1>"
      },
      "themes" : {
        "default": "Mix",
        "beach": "Strand",
        "mountain": "Berge",
        "light": "Hell",
        "dark": "Dunkel"
      },
      "sunhours": {
        "beforeSunset": "Sonnenuntergang in <1 className='sun-hours__info-minutes'>{{minutes}}</1> Minuten",
        "beforeSunrise": "Sonnenaufgang in <1 className='sun-hours__info-minutes'>{{minutes}}</1> Minuten"
      },
      "photoBy" : "Foto von"
  },
  },
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  //.use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    //load: 'all',
    debug: false,
    supportedLngs: ['en', 'de', 'es'],
    nonExplicitSupportedLngs: true,
    react: { 
        useSuspense: false //   <---- this will do the magic
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;