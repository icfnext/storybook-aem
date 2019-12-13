import React, { Component, Fragment } from 'react';
import { Form, Placeholder, ScrollArea, FlexBar, Separator } from '@storybook/components';
import { FORCE_RE_RENDER, STORY_CHANGED } from '@storybook/core-events';
import Wrapper from 'storybook-aem-wrappers';

export default function Panel(props) {
    console.log('props',props);
    const origin = window.location.origin;
    console.log('origin:', origin)

    if (!props) return <Placeholder>No Confluence configuration</Placeholder>
    if (props && props.parameters && props.parameters.length) {
        return (
            <div>
                {props.parameters.map((config,key) => 
                    <Fragment key={key}>
                        <strong>{config.title}</strong>
                        <Wrapper contentPath={`${origin}/confluence/${config.id}`} />
                    </Fragment>
                )}                
            </div>
        )
    }
}