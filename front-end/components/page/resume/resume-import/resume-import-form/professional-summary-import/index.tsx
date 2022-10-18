import React from 'react';
import { EditableTitle } from '../../../../../custom';
import classNames from 'classnames';
import SectionImportTitle from '../../section-import-title';
import { Form, Input } from 'antd';
import styles from './styles.module.scss';
import { professionalSummaryFieldState } from '../../../../../../recoil-state/resume-state';
import { useRecoilState } from 'recoil';

const { TextArea } = Input;

type ProfessionalSummaryImportProps = {
    className?: string;
};

function ProfessionalSummaryImport(props: ProfessionalSummaryImportProps) {
    const { className } = props;

    const [form] = Form.useForm();
    const [professionalSummaryField, setProfessionalSummaryField] =
        useRecoilState(professionalSummaryFieldState);
    const SUMMARY_INTRO =
        'Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest achievements, best qualities and skills.';

    const changeFieldsHandler = (_: any, allFields: any) => {
        setProfessionalSummaryField(
            allFields.map((field: any) => {
                return { name: field.name[0], value: field.value };
            })
        );
    };
    return (
        <div className={classNames(className)}>
            <SectionImportTitle>Professional Summary</SectionImportTitle>
            <p style={{ color: 'grey', fontSize: '12px' }}>{SUMMARY_INTRO}</p>
            <Form
                form={form}
                layout='vertical'
                fields={professionalSummaryField}
                onFieldsChange={changeFieldsHandler}
                size='large'
                colon={false}>
                <Form.Item name='professionalSummary'>
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
