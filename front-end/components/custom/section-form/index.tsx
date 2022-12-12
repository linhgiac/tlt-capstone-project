import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import styles from './styles.module.scss';
import { has } from 'lodash';

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
    const { TextArea } = Input;

    const getFormItemList = (labelList: any) => {
        const { RangePicker } = DatePicker;
        const itemLst: any[] = [];
        for (const key in labelList) {
            if (key === 'startEndDate') {
                itemLst.push(
                    <Col
                        span={12}
                        key={key}>
                        <Form.Item
                            className="p-b-15 no-margin"
                            name={key}
                            label={labelList[key]}>
                            <RangePicker
                                picker="month"
                                size="large"
                                className="center"
                                bordered={false}
                            />
                        </Form.Item>
                    </Col>
                );
            } else {
                itemLst.push(
                    <Col
                        span={12}
                        key={key}>
                        <Form.Item
                            className="p-b-15 no-margin"
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

    const changeValuesHandler = useCallback(
        (changedValues: any, values: any) => {
            onChangeItemValue(changedValues, values);
        },
        [onChangeItemValue]
    );

    return (
        <div
            className={classNames(
                className,
                styles['section-form__container']
            )}>
            <Form
                form={form}
                layout="vertical"
                onValuesChange={changeValuesHandler}
                size="large"
                colon={false}>
                <Row gutter={24}>{getFormItemList(labelList)}</Row>
                {has(labelList, 'description') && (
                    <Form.Item
                        name="description"
                        label="Description">
                        <TextArea
                            className={classNames(
                                className,
                                styles['section-form__description']
                            )}
                            autoSize={{ minRows: 5, maxRows: 5 }}
                        />
                    </Form.Item>
                )}
            </Form>
        </div>
    );
};

export default SectionForm;
