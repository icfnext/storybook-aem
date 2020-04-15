# Storybook Open in AEM

> This adds a button to the Storybook toolbar that can open a story in AEM.

## Usage
```
npm i storybook-aem-open-in-aem/register
```

###### main.js
```js
module.exports = {
  addons: [
    'storybook-aem-open-in-aem/register'
  ]
};
```

To use a relative url, leave the `aemUrl` parameter blank. Otherwise, enter the url of AEM.

###### preview.js
```js
import { addParameters } from '@storybook/client-api';

addParameters({
  openInAEM: {
    aemUrl: 'localhost:4502'
  }
});
```
