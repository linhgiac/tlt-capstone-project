import React from 'react';
import Berlin from './Berlin';
import Stockholm from './Stockholm';
import Template01 from './template-01';

type Props = {
    id?: number;
    scale?: number;
};

const TemplateMap = (props: Props) => {
    const { id = 1, scale = 1 } = props;

    const templateMappingHandler = () => {
        switch (id) {
            case 1:
                return <Template01 />;
            case 2:
                return <Berlin />;
            case 3:
                return <Stockholm />;
        }
    };

    return (
        <div
            id="pdf"
            className={'cv-format'}
            style={{
                backgroundColor: '#fff',
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
            }}>
            {templateMappingHandler()}
        </div>
    );
};

export default TemplateMap;
