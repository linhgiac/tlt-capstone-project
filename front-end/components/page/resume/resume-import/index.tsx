import React, { useCallback, useEffect } from 'react';
import ResumeTitle from './resume-title';
import classNames from 'classnames';
import { Button } from 'antd';
import ResumeImportForm from './resume-import-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    educationItemsState,
    employmentHistoryItemsState,
    linkItemsState,
} from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';
import { convertPayloadData, convertTest } from '../../../../configs/utils/format.utils';
import styles from './styles.module.scss';
import { ResumeDataType } from '../../../../configs/interfaces/resume.interface';
import { ResumeConstants } from '../../../../configs/constants/resume.constants';
import { resumeTitleValueState } from '../../../../recoil-state/resume-state/resume-title.state';
import {
    personalDetailChangedValueState,
    professionalSummaryChangedValueState,
    resumeChangedValueState,
} from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';

type ResumeImportProps = {
    className?: string;
    initialResume: ResumeDataType;
};

const ResumeImport = (props: ResumeImportProps) => {
    const { className, initialResume } = props;
    const resumeChangedValue: ResumeDataType = useRecoilValue(
        resumeChangedValueState
    );
    
    const setResumeInitialTitle = useSetRecoilState(resumeTitleValueState);

    const resetPersonalDetailChangeValue = useSetRecoilState(
        personalDetailChangedValueState
    );
    const resetProfessionalSummaryChangeValue = useSetRecoilState(
        professionalSummaryChangedValueState
    );
    const resetEmploymentHistoriesChangeValue = useSetRecoilState(
        employmentHistoryItemsState
    );

    const resetEducationsChangeValue = useSetRecoilState(educationItemsState);

    const resetLinksChangeValue = useSetRecoilState(linkItemsState);

    const resetChangeValue = useCallback(async () => {
        resetPersonalDetailChangeValue({});
        resetProfessionalSummaryChangeValue({});
        resetEmploymentHistoriesChangeValue([]);
        resetEducationsChangeValue([]);
        resetLinksChangeValue([]);
    }, [
        resetPersonalDetailChangeValue,
        resetProfessionalSummaryChangeValue,
        resetEmploymentHistoriesChangeValue,
        resetEducationsChangeValue,
        resetLinksChangeValue,
    ]);

    useEffect(() => {

    }, []);

    const submitFormHandler = async () => {
        const resumeConvertedValue = await convertPayloadData(
            resumeChangedValue
        );
        const response = await fetch('/api/resume-editor', {
            method: 'POST',
            body: JSON.stringify({ resumeValue: resumeConvertedValue }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        await resetChangeValue();
    };

    const getDataHandler = async () => {
        // const response = await fetch('/api/resume-editor');
        // const data = await response.json();
        // console.log({ data });
        convertTest();
    };

    useEffect(() => {
        // resetChangeValue();
        if (initialResume.title) {
            setResumeInitialTitle(initialResume.title);
        }
    }, [
        resumeChangedValue,
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
                type="primary"
                size="large"
                onClick={submitFormHandler}>
                Save Resume
            </Button>
            <Button
                className={'btn'}
                type="primary"
                size="large"
                onClick={getDataHandler}>
                Get Resume Data
            </Button>
        </div>
    );
};

export default ResumeImport;
