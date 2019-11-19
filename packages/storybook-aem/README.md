# storybook-aem

Storybook-aem is used to build components in AEM by leveraging Storybook.

---
## FYI: storybook-aem is a work in progress
---

## Installation
To install `storybook-aem` run `npm install storybook-aem` from the directory with your `package.json` file.

## Usage
To use `storybook-aem` run `storybook-aem init` from the directory with your `package.json` file. Configure your project according to the questions in the init configuration. This will save storybook-aem settings in your `package.json` file. Once you've configured your `storybook-aem` project, you can start storybook via `npm run storybook`. Upon initial load, you will see a welcome story, and a few stories.

You can add more stories with the command `storybook-aem story` and follow the configuration. You may have to restart storybook after you add new stories.

## Wrapper Components
If you investigate a story after it has been generated with `storybook-aem story` you will notice the wrapper-components. These are used to take HTML and wrap it with a JavaScript component to be more easily used and manipulated in Storybook. 

The AsyncWrapper component will fetch a URL and template it's HTML. This is especially useful when fetching component markup from AEM. If you're unfamiliar, AEM will return rendered component HTML, complete with authored data, if you request it's absolute path. 

There are two 'easy' ways to get this path.
1. You can explore the JCR heirarchy in http://localhost:4502/crx/de to find and copy your component path
2. In author mode, right click on the component in question, find and copy the `data-path` attribute in the author markup

Once you have the path to the component, prefix the path with `http://localhost:4502` and add the suffix `.html?wcmmode=disabled`, and open in a new tab to see the markup. Add this markup to your AsyncWrapper component.

The HTMLWrapper components accept a prop of a string of the HTML you want to display.

## Default Stories
Storybook-aem ships with a few default stories to demonstrate patterns. These can be found in your `[componentFolder]/design/`. Feel free to keep or delete them as needed.

```
storybook-aem [command] <options>

Commands:
  init .................. Start a new storybook-aem project, must run before other commands
  story, stories ........ Create new storybook story files, along with AEM content json files. 
  wip - component ....... Create a new component in your project. Generates files in the specified component folder
  wip - content ......... Create AEM Content saved in the JCR from [component].content.js files
  help .................. Show help menu for storybook-aem
  version, v ............ Show storybook-aem version
```
