import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ResumeConstants } from '../../../../../configs/constants/resume.constants';
import { resumeTitleValueState } from '../../../../../recoil-state/resume-state/resume-title-state';
import { EditableTitle } from '../../../../custom';
import styles from './styles.module.scss';

type ResumeTitleProps = {};

const ResumeTitle = (props: ResumeTitleProps) => {
    const [resumeTitleValue, setResumeTitleValue] = useRecoilState(
        resumeTitleValueState
    );
    return (
        <>
            <EditableTitle
                className={styles['resume-title']}
                onChangeTitle={(value: string) => {
                    console.log('value', value);
                    setResumeTitleValue(value);
                }}
                defaultTitle={ResumeConstants.TITLE_CONSTANTS.resume}>
                {resumeTitleValue}
            </EditableTitle>
        </>
    );
};

export default ResumeTitle;
