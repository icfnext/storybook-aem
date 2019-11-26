import React, { Component } from 'react';
import { AddonPanel, Form } from '@storybook/components';
import Breakpoints from './breakpoints';
import { FORCE_RE_RENDER } from '@storybook/core-events';

// add a way to customize the grid
export default class Panel extends Component {
    constructor(props){
        super();

        this.api = props.api;
        this.channel = this.api.getChannel();
        this.state = {
            breakpoints: Breakpoints,
            classes: this.setClasses(Breakpoints)
        };

        this.channel.emit('aemGrid:set', { classes: this.getClasses().join(' ') })
    }

    setClasses(breakpoints) {
        return breakpoints.map( breakpoint => {
            return {
                [breakpoint.id] : breakpoint.options[breakpoint.value].value 
            }
        });
    }

    getClasses() {
        let classes = [];
        this.state.classes.forEach( breakpoint => {
            let value = Object.values(breakpoint)[0];
            classes.push(value)
        });
        return classes;
    }

    setBreakpointValue(key, value) {
        let classes = this.state.classes.map( breakpoint => {
            if (breakpoint.hasOwnProperty(key)) breakpoint[key] = value;
            return breakpoint;
        });
        this.setState({ classes });
    }

    handleChange(event,breakpoint) {
        this.setBreakpointValue(breakpoint,event.target.value);
        this.channel.emit('aemGrid:change', { classes: this.getClasses().join(' ') });
        this.channel.emit(FORCE_RE_RENDER);
    }

    renderOptions(options) {
        return options.map( (option, key) => {
            return (
                <option key={key} 
                        value={option.value}>
                    {option.label}
                </option>
            )
        })
    }

    renderBreakpoints() {
        return this.state.breakpoints.map( (breakpoint, key) => {
            return (
                <Form.Field key={key} label={breakpoint.label}>
                    <Form.Select defaultValue={breakpoint.id} onChange={e => this.handleChange(e,breakpoint.id)}>
                        {this.renderOptions(breakpoint.options)}
                    </Form.Select>
                </Form.Field>
            );
        })
    }

    render() {
        return (
            <AddonPanel active={this.props.active} key={this.props.key}>
                <Form>
                    {this.renderBreakpoints()}
                </Form>
            </AddonPanel>
        )
    }
}