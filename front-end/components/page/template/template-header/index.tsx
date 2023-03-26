import classNames from 'classnames';
import React from 'react';
import { TEMPLATE_HEADER } from '../../../../configs/constants/template.constants';
import { TemplateCategoryType, TemplateDataType } from '../../../../configs/interfaces/template.interface';
import { useTranslation } from 'next-i18next';
type TemplateHeaderProps = {
    category: string
};

const TemplateHeader = (props: TemplateHeaderProps) => {
    const { category } = props;
    const {t} = useTranslation();
    return (
        <div className='w-50'>
            <h1 className='center'>{t(TEMPLATE_HEADER[category as TemplateCategoryType].header, {ns: 'template'})}</h1>
            <div className='center'>{t(TEMPLATE_HEADER[category as TemplateCategoryType].description, {ns: 'template'})}</div>
        </div>
    );
};

export default TemplateHeader;
