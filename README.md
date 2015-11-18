# Introduction

This is a i18next language detection plugin use to detect user language in the browser with support for:

- cookie
- localStorage
- navigator
- querystring

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-browser-languagedetector), bower or [downloaded](https://github.com/i18next/i18next-browser-languagedetector/blob/master/i18nextBrowserLanguageDetector.min.js) from this repo.

```
# npm package
$ npm install i18next-browser-languagedetector

# bower
$ bower install i18next/i18next-browser-languagedetector
```

Wiring up:

```js
import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';

i18next
  .use(LngDetector)
  .init(i18nextOptions);
```

As with all modules you can either pass the constructor function (class) to the i18next.use or a concrete instance.

## Detector Options

```js
{
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'navigator'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',

  // cache user language on
  caches: ['localStorage', 'cookie']

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain'
}
```

Options can be passed in:

**preferred** - by setting options.backend in i18next.init:

```js
import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';

i18next
  .use(LngDetector)
  .init({
    detection: options
  });
```

on construction:

```js
  import LngDetector from 'i18next-browser-languagedetector';
  const lngDetector = new LngDetector(null, options);
```

via calling init:

```js
  import LngDetector from 'i18next-browser-languagedetector';
  const lngDetector = new LngDetector();
  lngDetector.init(options);
```

## Adding own detection functionality

### interface
export default {
  name: 'myDetectorsName',

  lookup(options) {
    // options -> are passed in options
    return 'en';
  },

  cacheUserLanguage(lng, options) {
    // options -> are passed in options
    // lng -> current language, will be called after init and on changeLanguage

    // store it
  }
};


### adding it

```js
  import LngDetector from 'i18next-browser-languagedetector';
  const lngDetector = new LngDetector();
  lngDetector.addDetector(myDetector);

  i18next
    .use(lngDetector)
    .init({
      detection: options
    });
```
