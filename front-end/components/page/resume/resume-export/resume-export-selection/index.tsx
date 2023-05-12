import { WarningOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import classNames from 'classnames';
import { isEqual } from 'lodash';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { resumeChangedValueState } from '../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { resumeSavedState } from '../../../../../recoil-state/resume-state/resume.state';
import DownloadButton from '../../../../custom/downnload-button';
import styles from './styles.module.scss';

type ResumeExportSelectionProps = {
    className: string;
    onChangeEditorLayout: () => void;
};

const ResumeExportSelection = (props: ResumeExportSelectionProps) => {
    const { className, onChangeEditorLayout } = props;
    const resumeSaved = useRecoilValue(resumeSavedState);
    const resumeData = useRecoilValue(resumeChangedValueState);
    const [isSavedWarning, setIsSaveWarning] = useState(false);

    const clickHandler = async () => {
        if (isEqual(resumeSaved, resumeData)) {
            onChangeEditorLayout();
        } else {
            setIsSaveWarning(true);
        }
    };
    return (
        <div className={classNames(className, styles['resume-export-button'])}>
            <Button
                type="text"
                shape="round"
                size="large"
                onClick={clickHandler}
                className={styles['resume-export-button__selection']}>
                Select Template
            </Button>
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {' '}
                        <WarningOutlined
                            style={{
                                fontSize: '28px',
                                color: 'coral',
                                paddingRight: '5px',
                            }}
                        />
                        You must save your information!
                    </div>
                }
                open={isSavedWarning}
                onCancel={() => {
                    setIsSaveWarning(false);
                }}
                bodyStyle={{ height: '0px', padding: '0px' }}
                footer={null}
                closable
                centered
            />

            <DownloadButton />
        </div>
    );
};

export default ResumeExportSelection;
