import React from 'react';
import { useRecoilState } from 'recoil';
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
                    setResumeTitleValue(value);
                }}>
                {resumeTitleValue}
            </EditableTitle>
        </>
    );
};

export default ResumeTitle;
