import { Button } from 'antd';
import classNames from 'classnames';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { resumeSavedState } from '../../../../../recoil-state/resume-state/resume.state';
import DownloadButton from '../../../../custom/downnload-button';
import styles from './styles.module.scss';

type ResumeExportSelectionProps = {
    className: string;
    onChangeEditorLayout: () => void;
};

const ResumeExportSelection = (props: ResumeExportSelectionProps) => {
    const { className, onChangeEditorLayout } = props;
    const clickHandler = () => {
        onChangeEditorLayout();
    };
    return (
        <div className={classNames(className, styles['resume-export-button'])}>
            <Button
                type="text"
                shape="round"
                size="large"
                onClick={clickHandler}
                className={styles['resume-export-button__selection']}>
                Select Template
            </Button>
            <DownloadButton />
        </div>
    );
};

export default ResumeExportSelection;
