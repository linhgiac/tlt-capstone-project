import React from 'react';
import PersonalDetailsImport from './resume-import-form/personal-details-import';
import ResumeTitle from './resume-title';
import ProfessionalSummaryImport from './resume-import-form/professional-summary-import';
import classNames from 'classnames';
import { Button } from 'antd';
import { FieldFormData } from '../../../../configs/interfaces/resume';
import ResumeImportForm from './resume-import-form';
import { useRecoilState } from 'recoil';
import { personalDetailFieldsState } from '../../../../recoil-state/resume-state';

type ResumeImportProps = {
    className?: string;
};

const ResumeImport = (props: ResumeImportProps) => {
    const { className } = props;
    const personalDetailFields = useRecoilState(personalDetailFieldsState);

    const submitFormHandler = () => {
        // console.log(personalDetailFields);
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
