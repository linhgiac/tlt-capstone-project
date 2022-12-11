import { Tabs } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import HomeInstructionStepContent from './homeInstructionStepContent';
import styles from './styles.module.scss';

type Props = {
    className: string;
};
const STEP_CONTENT = [
    {
        title: 'Your First Step',
        description:
            'We’ve made sure that signing up to our resume maker tools is even more convenient than usual. Use one of the most common networks used by professionals (LinkedIn, Facebook or your Google account) or simply skip this step and enter your name and email address. We keep your data strictly confidential.',
    },
    {
        title: 'Achieve Beauty With Ease',
        description:
            'Choose one of our beautiful, professionally designed resume or cover letter formats. Add your personal info and choose and edit the necessary sections. Customize the layout and visuals as much (or as little) as you want. We provide a ton of ready content with lots of room for your own creativity and needs.',
    },
    {
        title: 'Now It’s Yours!',
        description:
            'Export your new resume, CV or application letter in one of the available formats. PDF will provide you with the best and most consistent visual formatting. Word files allow you to edit the document further or submit the resume to an online application system. You can also share your career updates online.',
    },
];
const HomeInstructionStep = (props: Props) => {
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
                                1. Sign up
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
                                2. Create
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
                                3. Download
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
