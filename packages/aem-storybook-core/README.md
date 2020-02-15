# AEM Storybook Core

AEM Storybook Core provides some of the core functionality needed in AEM to make storybook-aem work in an AEM hosted context.

## Installation

```
mvn clean install -PautoInstallPackage
```

## Features

### Proxy Servlet
TODO How do you do the admin configurations for the proxy?

Using the proxy
After installing the proxy send a request to http://localhost:4502/bin/aemstorybook-proxy.proxy/https://jsonplaceholder.typicode.com/todos/1
