import React, { Component, Fragment } from 'react';
import { Form, Placeholder, ScrollArea, FlexBar, Separator } from '@storybook/components';
import { FORCE_RE_RENDER, STORY_CHANGED } from '@storybook/core-events';
import { parsePolicy } from './utils';

export default class Panel extends Component {
    constructor(props){
        super();
        this.api = props.api;
        this.channel = this.api.getChannel();
        this.channel.on(STORY_CHANGED, this.storyChangedHandler.bind(this));

        this.state = { 
            policyPath: props.parameters.policy || null,
            policyXMLFile: props.parameters.policyXMLFile || null,
            policyJSONFile: props.parameters.policyJSONFile || null,
            policy: null,
            policyJSON: [],
            styleIdKeyValues: {},
            styleIds: props.parameters.styleIds || [],
            loading: true
        };
        console.log('this.state:', this.state)
        if (props.parameters.policy || props.parameters.policyJSONFile || props.parameters.policyXMLFile) {
            this.fetchComponentPolicy();
        }
    }

    storyChangedHandler(event) {
        if (this.props.parameters && this.props.parameters.policy && this.props.parameters.policy !== this.state.policyPath) {
            this.setState({ policyPath: this.props.parameters.policy });
            this.fetchComponentPolicy();
        }
        if (this.props.parameters && this.props.parameters.policyXMLFile && this.props.parameters.policyXMLFile !== this.state.policyXMLFile) {
            this.setState({ policyXMLFile: this.props.parameters.policyXMLFile });
            this.fetchComponentPolicy();
        }
        if (this.props.parameters && this.props.parameters.policyJSONFile && this.props.parameters.policyJSONFile !== this.state.policyJSONFile) {
            this.setState({ policyJSONFile: this.props.parameters.policyJSONFile });
            this.fetchComponentPolicy();
        }
        if (this.props.parameters && this.props.parameters.styleIds && this.props.parameters.styleIds !== this.state.styleIds) {
            this.setState({ styleIds: this.props.parameters.styleIds });
            this.renderStory(this.props.parameters.styleIds);
        }
    }

    componentDidMount() {
        this.fetchComponentPolicy();
    }

    async fetchComponentPolicy() {
        this.setState({ loading: true });
        let policyJSON;
        if (this.state.policyPath) {
            const response = await fetch(this.state.policyPath);
            policyJSON = await response.json();
        } else if (this.state.policyJSONFile) {
            policyJSON = this.state.policyJSONFile;
        }

        const parsedPolicy = parsePolicy(policyJSON);
        this.setState({ 
            loading: false,
            policyJSON: policyJSON,
            policy: parsedPolicy.policy,
            styleIdKeyValues: parsedPolicy.styleIdKeyValues
        });
    }

    getClassesFromStyleIds(styleIds) {
        return (styleIds || this.state.styleIds).map( id => this.state.styleIdKeyValues[id] );
    }

    setStyleIds(id) {
        let ids = [...this.state.styleIds];
        let index = ids.indexOf(id)
        if (index === -1) ids.push(id);
        else ids.splice(index, 1);

        this.setState({ styleIds: ids });
        this.renderStory(ids);
    }

    renderStory(passedIds) {
        const styleIds = passedIds || this.state.styleIds;
        this.channel.emit('aemStyleSystem:update', { classes: this.getClassesFromStyleIds(styleIds).join(' ') });
        this.channel.emit(FORCE_RE_RENDER);
    }

    renderStyleGroup(policies) {
        return policies.styleGroups.map((group,policyKey) =>{
            return (
                <div key={policyKey} style={{borderRight:'1px solid #aaa',flexBasis:0,flexGrow:1}}>
                    <FlexBar border>
                        <p><b>{group.styleGroupLabel}</b></p>
                    </FlexBar>
                    <Form>{group.styles.map((style,styleKey) => 
                        <Form.Field key={styleKey} label={style.label} style={{justifyContent:'space-between'}}>
                            <input  type="checkbox" 
                                    value={style.id}
                                    checked={this.state.styleIds.includes(style.id)}
                                    onChange={e => this.setStyleIds(style.id)} />
                        </Form.Field>
                    )}</Form>
                </div>
            )
        });
    }

    renderPolicy(policy,key) {
        key = key || policy.tabName;
        return (
            <div key={key} className="render-policy">
                <FlexBar border>
                    <Fragment key="left">
                        <p><b>{policy.tabName}</b></p>
                        <Separator />
                        <p><i>{policy.tabDescription}</i></p>
                    </Fragment>
                </FlexBar>
                <div style={{position:'relative',display:'flex',alignItems:'stretch'}}>
                    {this.renderStyleGroup(policy)}
                </div>
            </div>
        );
    }

    render() {
        if (this.state.policy === null) return <Placeholder>No Style System Policy Path configured</Placeholder>
        else if (this.state.loading) return <Placeholder>Fetching Style System Policy</Placeholder>
        else if (this.state.policy.length === 0) return <Placeholder>No Styles found in Style System Policy</Placeholder>
        else if (this.state.policy.length === 1) return this.renderPolicy(this.state.policy[0]);
        else return <div>{this.state.policy.map((policy,key) => this.renderPolicy(policy,key))}</div>;
    }
}