# AEM Storybook Core

AEM Storybook Core provides some of the core functionality needed in AEM to make storybook-aem work in an AEM hosted context.

## Installation

```
mvn clean install -PautoInstallPackage
```

## Features

### Proxy Servlet

#### Configuring the proxy
Go to the [OSGI console](http://localhost:4502/system/console/configMgr) and look for the "Storybook AEM Proxy" configuration.
Configure the headers in this format:

    jsonplaceholder.typicode.com||Authorization||Basic c29tZXRlc3RpbmdleGFtcGxldGhpbmc=

This has three parts separated by "||". The first part is the domain that this header will apply to. The second part is the header name and the third part is the header value. This can be used to add basic auth to the request or other request headers.

####
Using the proxy
Send a request to http://localhost:4502/bin/aemstorybook-proxy.proxy/https://jsonplaceholder.typicode.com/todos/1. You should recieve an example JSON response from jsonplaceholder.typicode.com.
