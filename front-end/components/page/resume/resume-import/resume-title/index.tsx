import { Divider, Tooltip } from 'antd';
import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ResumeConstants } from '../../../../../configs/constants/resume.constants';
import { resumeTitleValueState } from '../../../../../recoil-state/resume-state/resume-title.state';
import { EditableTitle } from '../../../../custom';
import styles from './styles.module.scss';

type ResumeTitleProps = {
    title?: string;
    editable?: boolean;
    onClick?: () => void;
};

const ResumeTitle = (props: ResumeTitleProps) => {
    const { editable = true, onClick, title } = props;
    const [resumeTitleValue, setResumeTitleValue] = useRecoilState(
        resumeTitleValueState
    );
    return (
        <>
            {editable ? (
                <div
                    className={styles['resume-title']}
                    onClick={onClick}>
                    <Tooltip
                        placement="bottom"
                        title="Click to change title!">
                        {resumeTitleValue}
                    </Tooltip>

                    <Divider />
                </div>
            ) : (
                <div className={styles['resume-title']}>
                    {title}
                    {/* <Divider /> */}
                </div>
            )}

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
