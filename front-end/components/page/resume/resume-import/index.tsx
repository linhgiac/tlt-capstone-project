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
import styles from './styles.module.scss';
import { ResumeDataType } from '../../../../configs/interfaces/resume.interface';
import { ResumeConstants } from '../../../../configs/constants/resume.constants';
import { resumeTitleValueState } from '../../../../recoil-state/resume-state/resume-title.state';

type ResumeImportProps = {
    className?: string;
    initialResume: ResumeDataType;
};

const ResumeImport = (props: ResumeImportProps) => {
    const { className, initialResume } = props;
    console.log('initialResume', initialResume);
    const resumeValue: ResumeDataType = useRecoilValue(resumeValueState);

    const setResumeInitialTitle = useSetRecoilState(resumeTitleValueState);

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
        console.log('resumeConvertedValue', resumeConvertedValue);
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

    const getDataHandler = async () => {
        const response = await fetch('/api/resume-editor');
        const data = await response.json();
        console.log('get resume data', data);
    };

    useEffect(() => {
        // resetChangeValue();
        if (initialResume.title) {
            setResumeInitialTitle(initialResume.title);
        }
        console.log('resumeValue', resumeValue);
    }, [
        resumeValue,
        resetChangeValue,
        initialResume.title,
        setResumeInitialTitle,
    ]);

    return (
        <div className={classNames(className)}>
            <h2>Resume Import</h2>
            <ResumeTitle
                initialValue={
                    initialResume?.title
                        ? initialResume?.title
                        : ResumeConstants.TITLE_CONSTANTS.resume
                }
            />
            <ResumeImportForm initialValue={initialResume} />
            <Button
                className={'btn'}
                type='primary'
                size='large'
                onClick={submitFormHandler}>
                Save Resume
            </Button>
            <Button
                className={'btn'}
                type='primary'
                size='large'
                onClick={getDataHandler}>
                Get Resume Data
            </Button>
        </div>
    );
};

export default ResumeImport;
