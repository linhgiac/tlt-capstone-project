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
    resumeInfoState,
} from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { getAuthHeader } from '../../../../configs/restApi/clients';
import { HOST } from '../../../../configs/constants/misc';
import axios from 'axios';

type ResumeImportProps = {
    className?: string;
    initialResume: ResumeDataType;
};

const ResumeImport = (props: ResumeImportProps) => {
    const { className, initialResume } = props;
    const resumeChangedValue: ResumeDataType = useRecoilValue(
        resumeChangedValueState
    );
    const setResumeInfo = useSetRecoilState(resumeInfoState);
    const setResumeInitialTitle = useSetRecoilState(resumeTitleValueState);


    useEffect(() => {}, [resumeChangedValue]);

    const submitFormHandler = async () => {
        const resumeConvertedValue = await convertPayloadData(
            resumeChangedValue
        );
        console.log('resumeConvertedValue :>> ', resumeConvertedValue);

        // try {
        //     const response = await axios.post(
        //         `${HOST}resume/update/`,
        //         resumeConvertedValue,
        //         {
        //             headers: getAuthHeader(),
        //         }
        //     );
        //     console.log('response', response);
        // } catch (error) {
        //     console.log('error :>> ', error);
        // }

        // await resetChangeValue();
    };

    const getDataHandler = async () => {
        // const response = await fetch('/api/resume-editor');
        // const data = await response.json();
        // console.log({ data });
        convertTest();
    };

    useEffect(() => {
        // resetChangeValue();
        setResumeInfo({
            id: initialResume.id,
            template: initialResume.template,
        });
        if (initialResume.title) {
            setResumeInitialTitle(initialResume.title);
        }
    }, [
        initialResume.id,
        initialResume.template,
        initialResume.title,
        setResumeInfo,
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
