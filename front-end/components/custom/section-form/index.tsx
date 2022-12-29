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

const { Group, Button } = Radio;
type Props = {
    className?: string;
    children?: string;
    labelList: any;
    value?: any;
    onChangeItemValue: (itemChangedFields: any, itemAllFields: any) => void;
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
                colon={false}
                initialValues={value}>
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
