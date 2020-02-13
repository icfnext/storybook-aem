# AEM Storybook Core

AEM Storybook Core provides some of the core functionality needed in AEM to make storybook-aem work in an AEM hosted context.

## Installation
TODO How does this get into AEM? It should get automatically installed by the other projects when needed if at all possible.

## Features

### Proxy Servlet
TODO How do you do the admin configurations for the proxy?

TODO Add a minified AEM project.
TODO Implement the proxy servlet

Proxy servlet details:
/bin/aem-storybook.proxy/some/path/to/confluence/or/something.json

Then the proxy adds the configured authentication information and proxies the request to the url suffix, in this case "/some/path/to/confluence/or/something.json". This way http method, headers, extension, and body are all retain and untouched by the proxy. So the front end request would be identical to how it would look if directly requested from the browser, only prefixed by "/bin/aem-storybook.proxy".
