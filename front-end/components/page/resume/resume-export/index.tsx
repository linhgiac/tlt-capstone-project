import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import ResumeExportResult from './resume-export-result';
import ResumeExportSelection from './resume-export-selection';

type ResumeExportProps = {
    className?: string;
    onChangeLayout: () => void;
};

function ResumeExport({ className, onChangeLayout }: ResumeExportProps) {
    return (
        <div
            className={classNames(
                className,
                styles['resume-export-container']
            )}>
            <div className={classNames('center', styles['resume-export-main'])}>
                <ResumeExportResult />
                <ResumeExportSelection onChangeEditorLayout={onChangeLayout} />
            </div>
        </div>
    );
}

export default ResumeExport;
