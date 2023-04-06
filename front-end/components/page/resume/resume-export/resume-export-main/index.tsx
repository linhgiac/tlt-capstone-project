import classNames from 'classnames';
import React from 'react';
import { RESUME_SIZE } from '../../../../../configs/constants/resume.constants';
import { ResumeDataType } from '../../../../../configs/interfaces/resume.interface';
import Canvas from '../../../../custom/canvas';
import Page from './Page';
import styles from './styles.module.scss';

type ResumeExportMainProps = {
    className?: string;
    scale?: any;
};

const ResumeExportMain = (props: ResumeExportMainProps) => {
    const { className, scale = 1 } = props;
    return (
        <div>
            <Page />
        </div>
    );
};

export default ResumeExportMain;
