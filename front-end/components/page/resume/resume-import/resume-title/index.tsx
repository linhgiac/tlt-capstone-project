import { Divider, Tooltip } from 'antd';
import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ResumeConstants } from '../../../../../configs/constants/resume.constants';
import { resumeTitleValueState } from '../../../../../recoil-state/resume-state/resume-title.state';
import { EditableTitle } from '../../../../custom';
import styles from './styles.module.scss';

type ResumeTitleProps = {
    initialValue?: string;
    onClick?: () => void;
};

const ResumeTitle = (props: ResumeTitleProps) => {
    const [resumeTitleValue, setResumeTitleValue] = useRecoilState(
        resumeTitleValueState
    );
    return (
        <>
            <div
                className={styles['resume-title']}
                onClick={props.onClick}>
                <Tooltip
                    placement="bottom"
                    title="Click to change title!">
                    {resumeTitleValue}
                </Tooltip>

                <Divider />
            </div>

            {/* <EditableTitle
                className={styles['resume-title']}
                onChangeTitle={(value: string) => {
                    setResumeTitleValue(value);
                }}
                defaultTitle={ResumeConstants.TITLE_CONSTANTS.resume}>
                {resumeTitleValue}
            </EditableTitle> */}
        </>
    );
};

export default ResumeTitle;
