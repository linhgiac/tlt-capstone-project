import classNames from 'classnames';
import React from 'react';
import { RESUME_SIZE } from '../../../../../configs/constants/resume.constants';
import { ResumeDataType } from '../../../../../configs/interfaces/resume.interface';
import Canvas from '../../../../custom/canvas';
import Template from '../../../../template';
import styles from './styles.module.scss';

type ResumeExportMainProps = {
    className?: string;
    resumeData: ResumeDataType;
};

const ResumeExportMain = (props: ResumeExportMainProps) => {
    const { className, resumeData } = props;
    return (
        // <div className={classNames(className)}>
        <Template className={classNames(className)} resumeData={resumeData} />
        // </div>
    );
};

export default ResumeExportMain;
