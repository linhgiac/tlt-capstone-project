import { Col, Form, Radio } from 'antd';
import { RadioChangeEvent } from 'antd';
import React from 'react';
import styles from '../styles.module.scss';
type Props = {
    labelKey: string;
    labelList: any;
    disabledLevel: boolean;
    skillLevel: string;
    onChange: (e: RadioChangeEvent) => void;
};

const SkillLevelInput = (props: Props) => {
    const { labelKey, labelList, skillLevel, disabledLevel, onChange } = props;
    const mapLevelToLabel = () => {
        switch (skillLevel) {
            case 'novice':
                return <div className={styles.novice}>Novice</div>;
            case 'beginner':
                return <div className={styles.beginner}>Beginner</div>;
            case 'skillful':
                return <div className={styles.skillful}>Skillful</div>;
            case 'experienced':
                return <div className={styles.experienced}>Experienced</div>;
            case 'expert':
                return <div className={styles.expert}>Expert</div>;
            default:
                break;
        }
    };
    const skillOption = [
        {
            label: <div className={styles['skill-level-button']}></div>,
            value: 'novice',
        },
        {
            label: <div className={styles['skill-level-button']}></div>,
            value: 'beginner',
        },
        {
            label: <div className={styles['skill-level-button']}></div>,
            value: 'skillful',
        },
        {
            label: <div className={styles['skill-level-button']}></div>,
            value: 'experienced',
        },
        {
            label: <div className={styles['skill-level-button']}></div>,
            value: 'expert',
        },
    ];
    return (
        <Col
            span={12}
            key={labelKey}>
            <Form.Item
                className="p-b-15 no-margin"
                name={labelKey}
                label={
                    <div className={styles['skill-label']}>
                        {labelList[labelKey]} - {mapLevelToLabel()}
                    </div>
                }>
                <div className={styles['skill-level-container']}>
                    <Radio.Group
                        disabled={disabledLevel}
                        buttonStyle="solid"
                        size="large"
                        defaultValue={1}
                        value={skillLevel}
                        options={skillOption}
                        optionType="button"
                        onChange={onChange}></Radio.Group>
                </div>
            </Form.Item>
        </Col>
    );
};

export default SkillLevelInput;
