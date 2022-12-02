import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
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
