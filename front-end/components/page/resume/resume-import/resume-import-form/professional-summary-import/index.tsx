import React from 'react';
import { EditableTitle } from '../../../../../custom';
import classNames from 'classnames';
import SectionImportTitle from '../../section-import-title';
import { Form, Input } from 'antd';
import styles from './styles.module.scss';

const { TextArea } = Input;

type ProfessionalSummaryImportProps = {
    className?: string;
};

function ProfessionalSummaryImport(props: ProfessionalSummaryImportProps) {
    const { className } = props;
    const SUMMARY_INTRO =
        'Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest achievements, best qualities and skills.';
    return (
        <div className={classNames(className)}>
            <SectionImportTitle>Professional Summary</SectionImportTitle>
            <p style={{ color: 'grey', fontSize: '12px' }}>{SUMMARY_INTRO}</p>
            <Form>
                <Form.Item>
                    <TextArea
                        className={styles['professional-summary-input']}
                        autoSize={{ minRows: 5, maxRows: 5 }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default ProfessionalSummaryImport;
