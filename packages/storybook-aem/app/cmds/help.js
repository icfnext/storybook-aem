const menus = {
    main: `
storybook-aem [command] <options>

Commands:
  init .................. Start a new project, or add to existing project
  component ............. Create a new component in your project. Generates files in the specified component folder
  content ............... Create AEM Content saved in the JCR from [component].content.js files
  help .................. Show help menu for storybook-aem
  version, v ............ Show storybook-aem version
`,
  
    init: `
      storybook-aem init <options>
  
      --location, -l ..... the location to use`,

    component: `
      storybook-aem component <options>

      --location, -l ..... the location to use`,

    content: `
      storybook-aem component <options>
    
      --location, -l ..... the location to use`
  }
  
module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
  
    console.log(menus[subCmd] || menus.main)
}