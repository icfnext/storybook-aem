# Storybook-AEM-Style-System

> AEM Style System Addon for use with [@storybook/aem](https://www.npmjs.com/package/@storybook/aem), and [storybook-aem](https://www.npmjs.com/package/storybook-aem) CLI.

## Usage

Include the Addon in your main or addons file.
```
// .storybook/main.js
module.exports = {
    stories: ['../path/to/*.stories.js'],
    addons: [
        // Additional Addons
        'storybook-aem-style-system/register'
    ]
};
```

```
// .storybook/addons.js file is also supported
import 'storybook-aem-style-system/register';
```

In your story files:
```
// component.stories.js
import { aemMetadata } from '@storybook/aem';
import { StyleSystem } from 'storybook-aem-style-system';
import MyTemplate from './component.html';

// Pass the policy path as a parameter to aemStyleSystem
export default {
  title: 'Components/Example',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: ['example', StyleSystem],
        tagName: 'div'
      }
    })
  ],
  parameters: {
    aemStyleSystem: {
      policy: '/conf/project_namespace/settings/wcm/policies/project_namespace/components/content/example.infinity.json'
    }
  }
};
  
export const exampleComponent = () => ({
  template: MyTemplate
});
// You can assign default styleIds like so
exampleComponent.story = {
	parameters: {
		aemStyleSystem: {
			styleIds: ['style-id']
		}
	}
}
```