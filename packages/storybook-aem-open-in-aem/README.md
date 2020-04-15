# Storybook-AEM-Wrappers
> Wrapper components to be used in conjunction with Storybook-AEM

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

###### preview.js
```js
import { addParameters } from '@storybook/client-api';

addParameters({
  openInAEM: {
    aemUrl: 'localhost:4502'
  }
});
```
