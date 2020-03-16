## Feb 27, 2020

### General Notes
We've teamed up with the official Storybook team to work on the AEM/HTL implementation for [Storybook](https://github.com/storybookjs/aem). We've begun by porting some of the Wrapper Addon functionality to official StorybookJS/AEM. We will continue working with them to get version 1.0 released of StorybookJS/AEM. 

### New Development
- Awaiting testing and merging the PR is [Storybook-AEM-Foundation](https://github.com/icfnext/storybook-aem/pull/4). Alex Lockhart has created an OSGI powered proxy that allows for Production Mode Storybook to access cross-site XHR requests. This will enable the Storybook-AEM-Confluence package, and others that need cross-site XHR requests, to function when Storybook is hosted within AEM, and not running via the Express Server.

### Bug Fixes
- No bug fixes pushed, but several in development. See Work in Progress

### Work in Progress
- We're enhancing the CLI `story` command to add a host of new functionality. We've currently implemented the ability to create stories via the CLI, and now can also create content within AEM and connect to those stories. This helps developers more quickly create example content for testing.
- We're enhancing the AEM Grid and Style System Addons so they work in iframe mode, and also when they're not active. Currently the story parameters only function when you have the Addon active, which has some obvious shortcomings.
- Storybook-AEM-QTest! We've begun development of a new Addon to integrate QTest into Storybook. The goal for this Addon is to be able to see QTest test-cases alongside stories during development and testing.

### What's Next
Integrating our work with the official StorybookJS/AEM project will improve and, hopefully, accelerate our progress. At the moment, there are no plans to discontinue any of our Addons, however, they may come a point where the Storybook-AEM-Wrappers Addon is made obsolete by the official StorybookJS/AEM implementation. However, the remaining Addons will continue to be bugfixed, refactored and improved according to the Roadmap.

We will continue work on the enhancements and bugfixes that are currently in progress and will provide updates as soon as they are available.

### Contributing
If you'd like to contribute to the [project](https://github.com/icfnext/storybook-aem), please look at the [Issues](https://github.com/icfnext/storybook-aem/issues) and see where you can help.

---