import React, { Component } from 'react';
import { Form, Placeholder, ScrollArea } from '@storybook/components';
import { FORCE_RE_RENDER, STORY_CHANGED } from '@storybook/core-events';
import { CHANGE } from '../../constants';

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.api = props.api;
        this.channel = this.api.getChannel();
        this.channel.on(STORY_CHANGED, this.storyChangedHandler.bind(this));
        this.state = {
            templates: props.parameters.templates || [],
            defaultTemplate: props.parameters.defaultTemplate || null,
            currentTemplateLabel: props.parameters.defaultTemplate.label || null
        };
    }

    storyChangedHandler(event) {
        let label = this.state.currentTemplateLabel;
        if (this.props.parameters.defaultTemplate && this.props.parameters.defaultTemplate !== this.state.defaultTemplate) {
            label = this.props.parameters.defaultTemplate;
            this.setState({ defaultTemplate: this.props.parameters.defaultTemplate });
        }
        this.channel.emit(CHANGE, label);
        this.channel.emit(FORCE_RE_RENDER);
    }

    handleChange(event) {
        this.setState({ currentTemplateLabel: event.target.value });
        this.channel.emit(CHANGE, event.target.value);
        this.channel.emit(FORCE_RE_RENDER, 'testing');
    }

    render() {
        if (this.state.templates.length === 0) return <Placeholder>Panel, No Page Templates settings found</Placeholder>;
        else return (
            <ScrollArea>
                <Form>
                    <Form.Field label="Page Template">
                        <Form.Select defaultValue={this.state.defaultTemplate} onChange={this.handleChange.bind(this)}>
                            {this.state.templates.map((template, key) => 
                                <option key={key} value={template.label}>
                                    {template.label}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Field>
                </Form>
            </ScrollArea>
        );
    }
}