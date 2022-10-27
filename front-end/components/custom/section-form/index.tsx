import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import styles from './styles.module.scss';
import { FieldFormData } from '../../../configs/interfaces/resume.interface';
import { FieldData } from 'rc-field-form/lib/interface';
import { Field } from 'rc-field-form';

type Props = {
    className?: string;
    children?: string;
    labelList: any;
    onChangeItemValue: (itemChangedFields: any, itemAllFields: any) => void;
    // itemField?;
};

const SectionForm = (props: Props) => {
    const { className, children, labelList, onChangeItemValue } = props;
    const [form] = Form.useForm();
    const [changedFields, setChangedFields] = useState<FieldFormData[]>([]);
    const [allFields, setAllFields] = useState<FieldFormData[]>([]);
    const { TextArea } = Input;

    const getFormItemList = (labelList: any) => {
        const { RangePicker } = DatePicker;
        const itemLst: any[] = [];
        for (const key in labelList) {
            if (key === 'startEndDate') {
                itemLst.push(
                    <Col span={12} key={key}>
                        <Form.Item
                            className='p-b-15 no-margin'
                            name={key}
                            label={labelList[key]}>
                            <RangePicker
                                picker='month'
                                size='large'
                                className='center'
                                bordered={false}
                            />
                        </Form.Item>
                    </Col>
                );
            } else {
                itemLst.push(
                    <Col span={12} key={key}>
                        <Form.Item
                            className='p-b-15 no-margin'
                            name={key}
                            label={labelList[key]}>
                            <Input />
                        </Form.Item>
                    </Col>
                );
            }
        }
        return itemLst;
    };

    const changeFieldsHandler = (changedField: any, allFormFields: any) => {
        console.log('allFormFields', allFormFields);
        const itemChangedField = {
            name: changedField[0].name[0],
            value: changedField[0].value,
        };

        setChangedFields((prevChangedFields) => {
            const itemChangedFields = prevChangedFields.filter(
                (field: FieldFormData) => {
                    return field.name != itemChangedField.name;
                }
            );
            return itemChangedFields.concat([itemChangedField]);
        });
        setAllFields(
            allFormFields.map((field: { name: any[]; value: any }) => {
                return { name: field.name[0], value: field.value };
            })
        );
        console.log('changedFields', changedFields);
        console.log('allFields', allFields);
    };

    useEffect(() => {
        let itemChangeFields = {};
        changedFields.forEach(({ name, value }) => {
            const obj = { [name.toString()]: value };
            itemChangeFields = { ...itemChangeFields, ...obj };
        });
        let allChangeFields = allFields.filter(
            ({ value }) => value !== undefined
        );
        let itemAllFields = {};
        allChangeFields.forEach(({ name, value }) => {
            const obj = { [name.toString()]: value };
            itemAllFields = { ...itemAllFields, ...obj };
        });

        console.log('itemAllFields', itemAllFields);

        console.log('itemChangeFields', itemChangeFields);
        onChangeItemValue(itemChangeFields, itemAllFields);
    }, [changedFields, allFields, onChangeItemValue]);

    return (
        <div
            className={classNames(
                className,
                styles['section-form__container']
            )}>
            <Form
                form={form}
                layout='vertical'
                fields={allFields}
                onFieldsChange={changeFieldsHandler}
                size='large'
                colon={false}>
                <Row gutter={24}>{getFormItemList(labelList)}</Row>

                <Form.Item name='description' label='Description'>
                    <TextArea
                        className={classNames(
                            className,
                            styles['section-form__description']
                        )}
                        autoSize={{ minRows: 5, maxRows: 5 }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SectionForm;
