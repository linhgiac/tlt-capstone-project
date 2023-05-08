import { Col, Form, Radio } from 'antd';
import { RadioChangeEvent } from 'antd';
import { useTranslation } from 'next-i18next';
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
    const { t } = useTranslation();
    const { labelKey, labelList, skillLevel, disabledLevel, onChange } = props;
    const mapLevelToLabel = () => {
        switch (skillLevel) {
            case 'novice':
                return <div className={styles.novice}>{t('edit-level-1', {ns: 'edit'})}</div>;
            case 'beginner':
                return <div className={styles.beginner}>{t('edit-level-2', {ns: 'edit'})}</div>;
            case 'skillful':
                return <div className={styles.skillful}>{t('edit-level-3', {ns: 'edit'})}</div>;
            case 'experienced':
                return <div className={styles.experienced}>{t('edit-level-4', {ns: 'edit'})}</div>;
            case 'expert':
                return <div className={styles.expert}>{t('edit-level-5', {ns: 'edit'})}</div>;
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
                        {t(labelList[labelKey], {ns: 'edit'})} - {mapLevelToLabel()}
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
