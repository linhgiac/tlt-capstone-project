import { Tabs } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import HomeInstructionStepContent from './homeInstructionStepContent';
import styles from './styles.module.scss';
import { useTranslation } from 'next-i18next';

type Props = {
    className: string;
};

const HomeInstructionStep = (props: Props) => {
    const { t } = useTranslation();
    const STEP_CONTENT = [
        {
            title: t('home-instruction-step-title-1', { ns: 'home' }),
            description: t('home-instruction-step-description-1', {
                ns: 'home',
            }),
        },
        {
            title: t('home-instruction-step-title-2', { ns: 'home' }),
            description: t('home-instruction-step-description-2', {
                ns: 'home',
            }),
        },
        {
            title: t('home-instruction-step-title-3', { ns: 'home' }),
            description: t('home-instruction-step-description-3', {
                ns: 'home',
            }),
        },
    ];
    const { className } = props;
    const [currentKey, setCurrentKey] = useState('1');

    const changeKeyHandler = (key: string) => {
        setCurrentKey(key);
    };

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return (
        <div className={classNames(className)}>
            <Tabs
                defaultActiveKey="1"
                activeKey={currentKey}
                size={windowWidth > 1024 ? 'large' : 'middle'}
                onChange={changeKeyHandler}
                items={[
                    {
                        label: (
                            <div className={styles['step-title']}>
                                {t('home-instruction-step-1', { ns: 'home' })}
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
                                {t('home-instruction-step-2', { ns: 'home' })}
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
                                {t('home-instruction-step-3', { ns: 'home' })}
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
