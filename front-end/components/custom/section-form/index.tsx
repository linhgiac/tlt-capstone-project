import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import {
    Col,
    DatePicker,
    Form,
    Input,
    Rate,
    Row,
    Radio,
    RadioChangeEvent,
} from 'antd';
import styles from './styles.module.scss';
import { has, isEmpty } from 'lodash';
import SkillLevelInput from './skill-level-input';
import moment from 'moment';
import dayjs from 'dayjs';

const { Group, Button } = Radio;
type Props = {
    className?: string;
    children?: string;
    labelList: any;
    value?: any;
    onChangeItemValue: (itemChangedFields: any) => void;
    disabledLevel?: boolean;
};

const SectionForm = (props: Props) => {
    const {
        className,
        children,
        labelList,
        value,
        onChangeItemValue,
        disabledLevel = false,
    } = props;
    const [form] = Form.useForm();
    const [skillLevel, setSkillLevel] = useState('novice');
    const { TextArea } = Input;
    useEffect(() => {
        if (!isEmpty(labelList) && Object.keys(labelList).includes('level')) {
            setSkillLevel(value?.level);
        }
    }, [labelList, value?.level]);
    const changeSkillLevelHandler = useCallback((e: RadioChangeEvent) => {
        setSkillLevel(e.target.value);
    }, []);

    const getFormItemList = (labelList: any) => {
        const itemLst: any[] = [];
        for (const key in labelList) {
            if (key === 'startDate') {
                itemLst.push(
                    <Col
                        span={12}
                        key={key}>
                        <Form.Item
                            className="p-b-15 no-margin"
                            name={key}
                            label={labelList[key]}>
                            <DatePicker
                                picker="month"
                                size="large"
                                className="center"
                                bordered={false}
                            />
                        </Form.Item>
                    </Col>
                );
            } else if (key === 'endDate') {
                itemLst.push(
                    <Col
                        span={12}
                        key={key}>
                        <Form.Item
                            className="p-b-15 no-margin"
                            name={key}
                            label={labelList[key]}>
                            <DatePicker
                                picker="month"
                                size="large"
                                className="center"
                                bordered={false}
                            />
                        </Form.Item>
                    </Col>
                );
            } else if (key === 'description') {
                continue;
            } else if (key === 'level') {
                itemLst.push(
                    <SkillLevelInput
                        labelKey={key}
                        onChange={changeSkillLevelHandler}
                        disabledLevel={disabledLevel}
                        labelList={labelList}
                        skillLevel={skillLevel}
                    />
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
        (changedValues: any, _: any) => {
            // if (changedValues.startDate) {
            //     changedValues.startDate = moment(
            //         changedValues.startDate
            //     ).format('YYYY/MM');
            // }
            // if (changedValues.endDate) {
            //     changedValues.endDate = moment(changedValues.endDate).format(
            //         'YYYY/MM'
            //     );
            // }
            onChangeItemValue(changedValues);
        },
        [onChangeItemValue]
    );
    useEffect(() => {
        const convertValue = {
            ...value,
            startDate: value.startDate ? moment(value.startDate) : undefined,
            endDate: value.endDate ? moment(value.endDate) : undefined,
        };
        form.setFieldsValue(convertValue);
    }, [form, value]);

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
                colon={false}
                // initialValues={value}
            >
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
