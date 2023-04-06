import React from 'react';
import Berlin from './Berlin';
import Template01 from './template-01';

type Props = {
    id?: number;
};

const TemplateMap = (props: Props) => {
    const { id = 1 } = props;
    
    const templateMappingHandler = () => {
        switch (id) {
            case 1:
                return <Template01 />;
            case 2:
                return <Berlin />;
        }
    };
    
    return (
        <div
            className={'cv-format'}
            // style={{
            //     transform: `scale(${scale})`,
            //     transformOrigin: 'top left',
            // }}
            >
            {templateMappingHandler()}
        </div>
    );
};

export default TemplateMap;
