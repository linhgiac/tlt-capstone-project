import classNames from 'classnames';
import React from 'react';
import { TEMPLATE_HEADER } from '../../../../configs/constants/template.constants';
import { TemplateCategoryType, TemplateDataType } from '../../../../configs/interfaces/template.interface';

type TemplateHeaderProps = {
    category: string
};

const TemplateHeader = (props: TemplateHeaderProps) => {
    const { category } = props;
    return (
        <div className='w-50'>
            <h1 className='center'>{TEMPLATE_HEADER[category as TemplateCategoryType].header}</h1>
            <div className='center'>{TEMPLATE_HEADER[category as TemplateCategoryType].description}</div>
        </div>
    );
};

export default TemplateHeader;
