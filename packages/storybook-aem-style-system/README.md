
# Storybook-AEM-Style-System

> AEM Style System addon for use with Storybook, and storybook-aem

  

## Usage

```
// .storybook/addons.js
import 'storybook-aem-style-system/register';
```
```
// component.stories.js
import { StyleSystem } from 'storybook-aem-style-system';
import Wrapper from 'storybook-aem-wrappers';

const contentPath = "http://4501/content/path/to/your/content.html?wcmmode=disabled";

// Pass the policy path as a parameter to aemStyleSystem
export default {
  title: 'Components',
  parameters: {
    aemStyleSystem: {
      policy: 'http://localhost:4501/conf/uhcdotcom/settings/wcm/policies/uhcdotcom/components/content/cta.infinity.json'
    }
  }
};
  
// Add the styleSystem prop to the wrapper component and call the imported Style System function
export const exampleComponent = () => {
    return <Wrapper contentPath={contentPath}
                    styleSystem={StyleSystem()}
                    classes="example component" />;
}
// You can assign default styleIds like so
exampleComponent.story = {
    name: 'Components|Example',
	parameters: {
		aemStyleSystem: {
			styleIds: ['cta-link']
		}
	}
}
```