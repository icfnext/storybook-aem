const menus = {
    main: `
storybook-aem [command] <options>

Commands:
  init .................. Start a new project, or add to existing project
  story ................. Creates/Updates your component story file, Adds story definition, Creates AEM Content example
  component ............. WIP - Create a new component in your project. Generates files in the specified component folder
  content ............... WIP - Create AEM Content saved in the JCR from [component].content.js files
  help .................. Show help menu for storybook-aem
  version, v ............ Show storybook-aem version
`,
  
init: `
storybook-aem init`,

story: `
storybook-aem story

- Use this command during your development or documentation process
- Configure for which component type you want to make stories 
- Select component
- Add a list of stories
-- By default, when creating a new story file, an empty story will be created for you
- Choose to create content in AEM to correspond to the story

Upon completing the configuration, a story file will be created or updated with the list of stories provided.
Content in AEM will also be created corresponding to each story.
The story file will be updated with the AEM Content Path created for each story component, and denoted with a 
 heading that contains the name of the story.
`,

component: `
storybook-aem component <options>

  --name, -n ..... the name of the component. Should match the folder name`,

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