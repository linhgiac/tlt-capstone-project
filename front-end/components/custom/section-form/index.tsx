import React, { useCallback, useState } from 'react';
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
import { has } from 'lodash';
import { ComplexSectionItemDataType } from '../../../configs/interfaces/resume.interface';

const { Group, Button } = Radio;
type Props = {
    className?: string;
    children?: string;
    labelList: any;
    value?: ComplexSectionItemDataType;
    onChangeItemValue: (itemChangedFields: any, itemAllFields: any) => void;
    disableLevel?: boolean;
    // itemField?;
};
const SKILL_LEVEL = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];
const SectionForm = (props: Props) => {
    const {
        className,
        children,
        labelList,
        value,
        onChangeItemValue,
        disableLevel,
    } = props;
    const [form] = Form.useForm();
    const [skillLevel, setSkillLevel] = useState(SKILL_LEVEL[0]);
    const { TextArea } = Input;

    const changeSkillLevelHandler = useCallback((e: RadioChangeEvent) => {
        console.log('e.target.value', e.target.value);
        setSkillLevel(SKILL_LEVEL[e.target.value - 1]);
    }, []);
    const mapLevelToLabel = () => {
        switch (skillLevel) {
            case 'Novice':
                return <div className={styles.novice}>Novice</div>;
            case 'Beginner':
                return <div className={styles.beginner}>Beginner</div>;
            case 'Skillful':
                return <div className={styles.skillful}>Skillful</div>;
            case 'Experienced':
                return <div className={styles.experienced}>Experienced</div>;
            case 'Expert':
                return <div className={styles.expert}>Expert</div>;
            default:
                break;
        }
    };
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
                    <Col
                        span={12}
                        key={key}>
                        <Form.Item
                            className="p-b-15 no-margin"
                            name={key}
                            label={
                                <div className={styles['skill-label']}>
                                    {labelList[key]} - {mapLevelToLabel()}
                                </div>
                            }>
                            <div className={styles['skill-level-container']}>
                                <Group
                                    disabled={disableLevel}
                                    buttonStyle="solid"
                                    size="large"
                                    defaultValue={1}
                                    onChange={changeSkillLevelHandler}>
                                    <Button value={1}>
                                        <div
                                            className={
                                                styles['skill-level-button']
                                            }></div>
                                    </Button>
                                    <Button value={2}>
                                        <div
                                            className={
                                                styles['skill-level-button']
                                            }></div>
                                    </Button>
                                    <Button value={3}>
                                        <div
                                            className={
                                                styles['skill-level-button']
                                            }></div>
                                    </Button>
                                    <Button value={4}>
                                        <div
                                            className={
                                                styles['skill-level-button']
                                            }></div>
                                    </Button>
                                    <Button value={5}>
                                        <div
                                            className={
                                                styles['skill-level-button']
                                            }></div>
                                    </Button>
                                </Group>
                            </div>
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
