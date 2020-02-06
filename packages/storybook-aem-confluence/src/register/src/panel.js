import React, { useState, useEffect } from 'react';
import { ScrollArea, Placeholder } from '@storybook/components';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { SET_OPTIONS } from '../../constants';
import './confluence.panel.style.css';

// add a way to customize the grid
const ConfluencePanel = (props) => {
    const channel = props.channel || false;
    const [contentID,setContentID] = useState(props.parameters.id || null);
    const [content,setContent] = useState(null);
    const [loading,setLoading] = useState(content === null && contentID !== null ? true : false);

    const fetchConfluenceContent = () => {
        const url = `${window.location.origin}/confluence/${contentID}`;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setContent(json.json);
                setLoading(false);
            });
            // const policyJSON = await response.json();
            // const parsedPolicy = parsePolicy(policyJSON);
    }

    // channel.on(SET_OPTIONS, (options) => {
    //     // if (options.id !== null && options.id !== contentID) setContentID(options.id);
    // });

    useEffect(() => {
        if (props.parameters.id !== null && content === null) {
            if (props.parameters.id !== contentID) setContentID(props.parameters.id);
            setLoading(true);
            fetchConfluenceContent();
        }
    });
    console.log('ConfluencePanel props:', props,content);

    const getHTML = html => ({ __html: html }); 

    if (content === null && loading) {
        return (
            <Placeholder>
                <strong>Loading Confluence Content</strong>
            </Placeholder>
        )
    } else {
        return (
            <ScrollArea>
                <div 
                    className="confluence-panel" 
                    dangerouslySetInnerHTML={getHTML(content.body.view.value)} 
                />
            </ScrollArea>
        )
    }
}

export default ConfluencePanel;