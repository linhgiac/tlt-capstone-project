import React from 'react';
import SectionItem from '../../../../../custom/section-item';
import classNames from 'classnames';

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
            <SectionItem itemHeader={'Untitled'} sectionType={sectionType} />
        </div>
    );
};

export default EmploymentHistoryImport;
