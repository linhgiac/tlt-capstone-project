import React, { useCallback, useEffect } from 'react';
import ResumeTitle from './resume-title';
import classNames from 'classnames';
import { Button } from 'antd';
import ResumeImportForm from './resume-import-form';
import {
    personalDetailFieldsState,
    professionalSummaryFieldState,
    resumeValueState,
} from '../../../../recoil-state/resume-state/resume-single-section.state';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { employmentHistoryItemsState } from '../../../../recoil-state/resume-state/resume-complex-section.state';
import { convertPayloadData } from '../../../../configs/utils/format.utils';

type ResumeImportProps = {
    className?: string;
};

const ResumeImport = (props: ResumeImportProps) => {
    const { className } = props;
    const resumeValue: any = useRecoilValue(resumeValueState);

    const resetPersonalDetailChangeValue = useSetRecoilState(
        personalDetailFieldsState
    );
    const resetProfessionalSummaryChangeValue = useSetRecoilState(
        professionalSummaryFieldState
    );
    const resetEmploymentHistoriesChangeValue = useSetRecoilState(
        employmentHistoryItemsState
    );

    const resetChangeValue = useCallback(async () => {
        resetPersonalDetailChangeValue([]);
        resetProfessionalSummaryChangeValue([]);
        resetEmploymentHistoriesChangeValue([]);
    }, [
        resetPersonalDetailChangeValue,
        resetProfessionalSummaryChangeValue,
        resetEmploymentHistoriesChangeValue,
    ]);

    const submitFormHandler = async () => {
        const resumeConvertedValue = await convertPayloadData(resumeValue);
        const response = await fetch('/api/resume-editor', {
            method: 'POST',
            body: JSON.stringify({ resumeValue: resumeConvertedValue }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
        const data = await response.json();
        console.log('data', data);
        await resetChangeValue();
    };

    useEffect(() => {
        // resetChangeValue();
        console.log('resumeValue', resumeValue);
    }, [resumeValue, resetChangeValue]);

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
