import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import DownloadButton from '../../../../custom/downnload-button';
import styles from './styles.module.scss';

type ResumeExportSelectionProps = {
    className: string;
    onChangeEditorLayout: () => void;
};

const ResumeExportSelection = (props: ResumeExportSelectionProps) => {
    const { className, onChangeEditorLayout } = props;
    const clickHandler = async () => {
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
