import React from 'react';
import SectionItem from '../../../../../custom/section-item';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
import { EMPLOYMENT_HISTORY_DESCRIPTION } from '../../../../../../configs/constants/description.constants';

type Props = {
    className?: string;
    defaultTitle?: string;
    sectionType: string;
};

const EmploymentHistoryImport = (props: Props) => {
    const { className, defaultTitle, sectionType } = props;
    return (
        <div className={classNames(className)}>
            <h1>{defaultTitle}</h1>
            <p style={{ color: 'grey', fontSize: '12px' }}>
                {EMPLOYMENT_HISTORY_DESCRIPTION}
            </p>
            <SectionItem itemHeader={'Untitled'} sectionType={sectionType} />
            <SectionItemAdditionalButton
                className={classNames(className)}
                type={'employment'}
            />
        </div>
    );
};

export default EmploymentHistoryImport;
