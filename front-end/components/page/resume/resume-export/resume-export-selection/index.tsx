import { Button } from 'antd';
import React from 'react';
import styles from './styles.module.scss';

type ResumeExportSelectionProps = {
    onChangeEditorLayout: () => void;
};

const ResumeExportSelection = (props: ResumeExportSelectionProps) => {
    const { onChangeEditorLayout } = props;
    const clickHandler = () => {
        onChangeEditorLayout();
    };
    return (
        <div className={styles['resume-export-button']}>
            <Button
                type='text'
                shape='round'
                size='large'
                onClick={clickHandler}
                className={styles['resume-export-button__selection']}>
                Select Template
            </Button>
            <Button type='primary' size='large'>
                Download
            </Button>
        </div>
    );
};

export default ResumeExportSelection;
