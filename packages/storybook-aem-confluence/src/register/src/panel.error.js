import React from 'react';
import { Placeholder } from '@storybook/components';

const PanelError = props => {
    return (
        <Placeholder>
            <Placeholder>An error occurred: {props.error}</Placeholder>
        </Placeholder>
    )
}

export default PanelError;