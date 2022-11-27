import React from 'react';
import { EditableTitle } from '../../../../../custom';
import classNames from 'classnames';
import SectionImportTitle from '../../section-import-title';
import { Form, Input } from 'antd';
import styles from './styles.module.scss';
import { professionalSummaryFieldState } from '../../../../../../recoil-state/resume-state/resume-single-section.state';
import { useRecoilState } from 'recoil';
import { professionalSummaryTitleValueState } from '../../../../../../recoil-state/resume-state/resume-title.state';
import { PROFESSIONAL_SUMMARY_DESCRIPTION } from '../../../../../../configs/constants/description.constants';
import { ProfessionalSummaryDataType } from '../../../../../../configs/interfaces/resume.interface';

const { TextArea } = Input;

type ProfessionalSummaryImportProps = {
    className?: string;
    defaultTitle?: string;
    initialValue: ProfessionalSummaryDataType | undefined;
};

function ProfessionalSummaryImport(props: ProfessionalSummaryImportProps) {
    const { className, defaultTitle, initialValue } = props;

    const [form] = Form.useForm();
    const [professionalSummaryField, setProfessionalSummaryField] =
        useRecoilState(professionalSummaryFieldState);
    const [professionalSummaryTitle, setProfessionalSummaryTitle] =
        useRecoilState(professionalSummaryTitleValueState);
    const changeFieldsHandler = (changeFields: any, _: any) => {
        setProfessionalSummaryField(
            // allFields.map((field: any) => {
            //     return { name: field.name[0], value: field.value };
            // })
            [{ name: changeFields[0].name[0], value: changeFields[0].value }]
        );
    };
    return (
        <div className={classNames(className)}>
            <SectionImportTitle
                onChangeTitle={(title: string) => {
                    setProfessionalSummaryTitle(title);
                }}
                defaultTitle={defaultTitle}>
                {professionalSummaryTitle}
            </SectionImportTitle>
            <p style={{ color: 'grey', fontSize: '12px' }}>
                {PROFESSIONAL_SUMMARY_DESCRIPTION}
            </p>
            <Form
                form={form}
                layout='vertical'
                fields={professionalSummaryField}
                initialValues={initialValue}
                onFieldsChange={changeFieldsHandler}
                size='large'
                colon={false}>
                <Form.Item name='content'>
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
