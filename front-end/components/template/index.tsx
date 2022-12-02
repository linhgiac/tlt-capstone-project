import classNames from 'classnames';
import React from 'react';
import { ResumeDataType } from '../../configs/interfaces/resume.interface';
import DefaultTemplate from './defaultTemplate';

type TemplateProps = {
    className?: string;
    resumeData: ResumeDataType;
};

const Template = (props: TemplateProps) => {
    const { className, resumeData } = props;

    const switchTemplateHandler = (templateId: number) => {
        switch (templateId) {
            case 1:
                return (
                    <DefaultTemplate
                        className={classNames(className)}
                        resumeData={resumeData}
                    />
                );
        }
    };
    return <>{switchTemplateHandler(resumeData.templateId)}</>;
};

export default Template;
