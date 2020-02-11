# Storybook-AEM-Confluence
> Integrate Confluence and JIRA with your Storybook stories

Storybook-AEM-Confluence is an addon that enables you to pull content from the Confluence API into storybook. For example, you can add the content from your wiki page about your component in an addon panel. Additionally, Storybook-AEM-Confluence supports multiple content ID's so you can have more than one page from Confluence per component.

## Install Storybook-AEM-Confluence:

```npm i storybook-aem-confluence```

## Usage
Open or create your storybook addons file and add:
```
// .storybook/addons.js
import 'storybook-aem-confluence/register';
```

Next open or create the storybook middleware file and add:
```
// .storybook/middleware.js
const proxy = require('http-proxy-middleware'); 
const ConfluenceMiddleware = require('storybook-aem-confluence/middleware');

module.exports = router => {
    // any other code

    router.use(
        '/confluence/:id',
        ConfluenceMiddleware({
            baseUrl: 'https://[confluenceDomain].atlassian.net/wiki',
            username: process.env.confluenceUser,
            password: process.env.confluencePassword
        })
    );
}
```

> It is suggested to use [dotenv](https://www.npmjs.com/package/dotenv) or some other mechanism to get your username and password, and not have them stored in code.

Next, in your storybook config, add this:
```
// .storybook/config.js
import { withConfluence } from 'storybook-aem-confluence';

addDecorator(withConfluence);
```

And finally, in your stories you can use the confluence panel like so:

```
// path/to/your/story.js
// You may also add the confluence parameter on individual stories as well
export default {
    parameters: {
        confluence: {
            tabs: [
                {
                    title: 'Tab 1',
                    id: '123456789'
                },
                {
                    title: 'Tab 2',
                    id: '987654321'
                }
                
            ]
        }
    }
};
```