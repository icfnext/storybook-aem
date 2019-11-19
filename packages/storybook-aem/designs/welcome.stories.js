import React, { Component } from 'react';

export default { title: 'Welcome' };

export const Welcome = () => {
    return (
        <div>
            <h1>Welcome to storybook-aem</h1>
            <hr/>
            <p>Storybook-aem is used to build components in AEM by leveraging Storybook.</p>
            <blockquote>FYI: storybook-aem is a work in progress</blockquote>
        </div>
    )
};

export const Usage = () => {
    return (
        <div>
            <h2>Usage</h2>
            <p>To use `storybook-aem` run `storybook-aem init` from the directory with your `package.json` file. Configure your project according to the questions in the init configuration. This will save storybook-aem settings in your `package.json` file. Once you've configured your `storybook-aem` project, you can start storybook via `npm run storybook`. Upon initial load, you will see a welcome story, and a few stories.</p>
            
            <p>You can add more stories with the command `storybook-aem story` and follow the configuration. You may have to restart storybook after you add new stories.</p>
        </div>
    )
};

export const wrapperComponents = () => {
    return (
        <div>
            <h2>Wrapper Components</h2>
            <p>If you investigate a story after it has been generated with `storybook-aem story` you will notice the wrapper-components. These are used to take HTML and wrap it with a JavaScript component to be more easily used and manipulated in Storybook. </p>

            <p>The AsyncWrapper component will fetch a URL and template it's HTML. This is especially useful when fetching component markup from AEM. If you're unfamiliar, AEM will return rendered component HTML, complete with authored data, if you request it's absolute path. </p>

            <p>There are two 'easy' ways to get this path.</p>
            <ol>
                <li>You can explore the JCR heirarchy in http://localhost:4502/crx/de to find and copy your component path</li>
                <li>In author mode, right click on the component in question, find and copy the `data-path` attribute in the author markup</li>
            </ol>

            <p>Once you have the path to the component, prefix the path with `http://localhost:4502` and add the suffix `.html?wcmmode=disabled`, and open in a new tab to see the markup. Add this markup to your AsyncWrapper component.</p>

            <p>The `HTMLWrapper` components accept a prop of a string of the HTML you want to display.</p>
        </div>
    )
};

export const defaultStories = () => {
    return (
        <div>
            <h2>Default Stories</h2>
            <p>Storybook-aem ships with a few default stories to demonstrate patterns. These can be found in your `[componentFolder]/design/`. Feel free to keep or delete them as needed.</p>
        </div>
    )
};