import { Tabs } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import HomeInstructionStepContent from './homeInstructionStepContent';
import styles from './styles.module.scss';
import { useTranslation } from 'next-i18next';

type Props = {
    className: string;
};

const HomeInstructionStep = (props: Props) => {
    const {t} = useTranslation();
    const STEP_CONTENT = [
    {
        title: t('home-instruction-step-title-1'),
        description:t('home-instruction-step-description-1'),
    },
    {
        title: t('home-instruction-step-title-2'),
        description:t('home-instruction-step-description-2'),
    },
    {
        title: t('home-instruction-step-title-3'),
        description:t('home-instruction-step-description-3'),
    },
];
    const { className } = props;
    const [currentKey, setCurrentKey] = useState('1');

    const changeKeyHandler = (key: string) => {
        setCurrentKey(key);
    };

    return (
        <div className={classNames(className)}>
            <Tabs
                defaultActiveKey="1"
                activeKey={currentKey}
                size="large"
                onChange={changeKeyHandler}
                items={[
                    {
                        label: (
                            <div className={styles['step-title']}>
                                {t('home-instruction-step-1')}
                            </div>
                        ),
                        key: '1',
                        children: (
                            <HomeInstructionStepContent
                                title={STEP_CONTENT[0].title}
                                description={STEP_CONTENT[0].description}
                            />
                        ),
                    },
                    {
                        label: (
                            <div className={styles['step-title']}>
                                {t('home-instruction-step-2')}
                            </div>
                        ),
                        key: '2',
                        children: (
                            <HomeInstructionStepContent
                                title={STEP_CONTENT[1].title}
                                description={STEP_CONTENT[1].description}
                            />
                        ),
                    },
                    {
                        label: (
                            <div className={styles['step-title']}>
                                {t('home-instruction-step-3')}
                            </div>
                        ),
                        key: '3',
                        children: (
                            <HomeInstructionStepContent
                                title={STEP_CONTENT[2].title}
                                description={STEP_CONTENT[2].description}
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default HomeInstructionStep;
