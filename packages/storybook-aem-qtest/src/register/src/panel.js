import React, { useState, useEffect } from 'react';
import { Tabs, ScrollArea } from '@storybook/components';
import './panel.style.css';

import PanelError from './panel.error';
import PanelLoading from './panel.loading';
import PanelEmpty from './panel.empty';

const QTestPanel = (props) => {
    const [storyID,setStoryID] = useState(props.api.getCurrentStoryData().id || false)
    const [tabs,setTabs] = useState(('tabs' in props.parameters) ? props.parameters.tabs : []);
    const [contentID,setContentID] = useState(tabs.length > 0 ? tabs[0].id : null);
    const [previousContentID,setPreviousContentID] = useState(null);
    const [content,setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const getHTML = html => ({ __html: html }); 
    
    const fetchQTestContent = () => {
        setContent(null);
        setLoading(true);
        setPreviousContentID(contentID);

        const url = `${window.location.origin}/qtest/${contentID}`;

        fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log('json:', json)
                setLoading(false);
                if (json) setContent(json.json);
                else setError('No Content Found');
            })
            .catch(e => {
                console.log('error',e);
                setContent(null);
                setLoading(false);
                setError(e);
            });
    }
    
    useEffect(() => {
        if (storyID != props.api.getCurrentStoryData().id) {
            setStoryID(props.api.getCurrentStoryData().id)
            
            if (!'tabs' in props.parameters) setTabs([]);
            if (
                ('tabs' in props.parameters) &&
                JSON.stringify(props.parameters.tabs) !== JSON.stringify(tabs)
            ) { 
                setContentID(props.parameters.tabs[0].id);
                setTabs(props.parameters.tabs);
            }
        }
        
        if (
            contentID && 
            contentID !== previousContentID && 
            !loading
        ) {
            fetchQTestContent();
        }
    });

    const getContentMarkup = () => (
        <div 
            className="qtest-panel" 
            dangerouslySetInnerHTML={getHTML(content.body.view.value)} 
        />
    );
    const loadingMarkup = content === null || loading ? <PanelLoading /> : <></>;
    const contentMarkup = content !== null ? getContentMarkup() : <></>;

    if (error) return <PanelError />
    if (tabs.length === 0) return <PanelEmpty />;
    else {
        return (
            <div>
                <Tabs selected={contentID} actions={{ onSelect: id => setContentID(id) }}>
                    {tabs.map((tab,key) => (
                        <div 
                            key={key}
                            id={tab.id} 
                            title={tab.title} 
                        >
                            {(active) => !active ? null : (
                                <ScrollArea key={key}>{loading ? loadingMarkup : contentMarkup}</ScrollArea>
                            )}
                        </div>
                    ))}
                </Tabs>
            </div>
        )
    }
}

export default QTestPanel;