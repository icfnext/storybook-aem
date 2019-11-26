import React, { Component } from "react";
import addons, { makeDecorator } from '@storybook/addons';
import { PARAM_KEY, CHANGE } from './constants';

export const AEMGrid = props => {
    return (
        <div className="root responsivegrid">
            <div className="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                {props.children}
            </div>
        </div>
    );
};

export const Centered = props => {
    const parentStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
    };
    return (
        <div className="centered-parent" style={parentStyles}>
            <div className="centered-child">
                {props.children}
            </div>
        </div>
    )
};

class Wrapper extends Component {
    constructor(props) {
        super();
        this.channel = addons.getChannel();
        this.channel.on(CHANGE, this.onChange.bind(this));

        this.state = {
            template: this.getTemplateByLabel(props.parameters.templates, props.parameters.defaultTemplate) || Centered,
            templates: props.parameters.templates
        }
    }

    onChange(label) {
        if (label) this.setState({ template: this.getTemplateByLabel(this.state.templates, label) });
    }

    getTemplateByLabel(templates, label) {
        return templates.filter(templateObject => templateObject.label === label)[0].template;
    };

    render() {
        return <this.state.template children={this.props.getStory(this.props.context)} />;
    }
};


const withPageTemplate = makeDecorator({
    name: 'withPageTemplate',
    parameterName: PARAM_KEY,
    skipIfNoParametersOrOptions: true,
    wrapper: (getStory, context, { parameters }) => <Wrapper getStory={getStory} context={context} parameters={parameters} />
});

export default withPageTemplate;
