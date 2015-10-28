import * as utils from './utils';
import cookie from './browserLookups/cookie';
import querystring from './browserLookups/querystring';
import localStorage from './browserLookups/localStorage';
import navigator from './browserLookups/navigator';

function getDefaults() {
  return {
    order: ['querystring', 'cookie', 'localStorage', 'navigator'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',

    // cache user language
    caches: ['localStorage']
    //cookieMinutes: 10,
    //cookieDomain: 'myDomain'
  };
}

class Browser {
  constructor(services, options = {}) {
    this.init(services, options);

    this.type = 'languageDetector';
    this.detectors = {};
  }

  init(services, options = {}) {
    this.services = services;
    this.options = utils.defaults(options, this.options || {}, getDefaults());

    this.addDetector(cookie);
    this.addDetector(querystring);
    this.addDetector(localStorage);
    this.addDetector(navigator);
  }

  addDetector(detector) {
    this.detectors[detector.name] = detector;
  }

  detect(detectionOrder) {
    if (!detectionOrder) detectionOrder = this.options.order;

    let detected = [];
    detectionOrder.forEach(function(detectorName) {
      if (this.detectors[detectorName]) {
        let lookup = this.detectors[detectorName].lookup(this.options);
        if (lookup && typeof lookup === 'string') lookup = [lookup];
        if (lookup) detected = detected.concat(lookup);
      }
    });

    let found;
    detected.forEach(lng => {
      if (found) return;
      let cleanedLng = this.services.languageUtils.formatLanguageCode(lng);
      if (this.services.languageUtils.isWhitelisted(cleanedLng)) found = cleanedLng;
    });

    return found || this.options.fallbackLng[0];
  }

  cacheUserLanguage(lng, caches) {
    if (!caches) caches = this.options.detection.caches;
    caches.forEach(function(cacheName) {
      if (this.detectors[cacheName]) {
        this.detectors[cacheName].cacheUserLanguage(lng, this.options);
      }
    });
  }
}

export default Browser;