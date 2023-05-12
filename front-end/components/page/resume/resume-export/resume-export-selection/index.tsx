import { WarningOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import classNames from 'classnames';
import { isEmpty, isEqual } from 'lodash';
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
        console.log('resumeSaved', resumeSaved);
        console.log('resumeeee', resumeData);

        const compareObject = (obj: any, other: any): boolean => {
            const keys = Array.from(
                new Set(Object.keys(obj).concat(Object.keys(other)))
            );
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (obj.hasOwnProperty(key) && other.hasOwnProperty(key)) {
                    if (
                        typeof obj[key] === 'object' &&
                        typeof other[key] === 'object'
                    ) {
                        if (compareObject(obj[key], other[key]) === false) {
                            console.log('False 1', key);
                            return false;
                        }
                    } else if (obj[key] !== other[key]) {
                        console.log('False 2', key);
                        return false;
                    }
                } else {
                    if (obj.hasOwnProperty(key)) {
                        if (obj[key] === null) continue;
                        if (obj[key] === undefined) continue;
                        if (
                            typeof obj[key] === 'object' &&
                            isNullObject(obj[key])
                        )
                            continue;
                        console.log('False 3', key);
                        return false;
                    }
                    if (other.hasOwnProperty(key)) {
                        if (other[key] === null) continue;
                        if (other[key] === undefined) continue;
                        if (
                            typeof other[key] === 'object' &&
                            isNullObject(other[key])
                        )
                            continue;
                        console.log('False 4', key);
                        return false;
                    }
                }
            }
            return true;
        };

        const isNullObject = (obj: any) => {
            if (Object.keys(obj).length === 0) return true;
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                const childObj = obj[keys[i]];
                if (childObj === null || childObj === undefined) continue;
                if (typeof childObj === 'object') {
                    if (!isNullObject(childObj)) return false;
                }
            }
            return true;
        };
        // console.log('compare', compareObject(resumeSaved, resumeData));
        if (compareObject(resumeSaved, resumeData)) {
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


