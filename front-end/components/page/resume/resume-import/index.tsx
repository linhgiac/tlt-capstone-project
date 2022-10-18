import React from 'react';
import ResumeTitle from './resume-title';
import classNames from 'classnames';
import { Button } from 'antd';
import ResumeImportForm from './resume-import-form';
import { resumeValueState } from '../../../../recoil-state/resume-state';
import { useRecoilValue } from 'recoil';

type ResumeImportProps = {
    className?: string;
};

const ResumeImport = (props: ResumeImportProps) => {
    const { className } = props;
    const resumeValue = useRecoilValue(resumeValueState);

    const submitFormHandler = async () => {
        const response = await fetch('/api/resume-editor', {
            method: 'POST',
            body: JSON.stringify({ resumeValue }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log('data', data);
    };
    return (
        <div className={classNames(className)}>
            <h2>Resume Import</h2>
            <ResumeTitle />
            <ResumeImportForm />
            <Button type='primary' size='large' onClick={submitFormHandler}>
                Save Resume
            </Button>
        </div>
    );
};

export default ResumeImport;
