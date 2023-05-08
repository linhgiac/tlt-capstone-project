import React from 'react';

import styles from './styles.module.scss';
import DataDisplay from '../../../shared/DataDisplay';
import { UserAddOutlined } from '@ant-design/icons';
import { Progress } from 'antd';

type Props = {
    header?: string;
    items: any;
    isShown?: boolean;
};

const Skill = (props: Props) => {
    const { header, items, isShown } = props;
    console.log('itemssSkill', items);
    return (
        <DataDisplay>
            <DataDisplay
                icon={<UserAddOutlined />}
                className={styles.header}>
                {header}
                {/* <Divide className={styles.underline} /> */}
            </DataDisplay>

            {items.map((item: any, i: number) => {
                const levelProgress = () => {
                    switch (item.level) {
                        case 'novice':
                            return 20;
                        case 'beginner':
                            return 40;
                        case 'skillful':
                            return 60;
                        case 'experienced':
                            return 80;
                        case 'expert':
                            return 100;
                    }
                };
                return (
                    <DataDisplay
                        key={i}
                        className={styles.item}>
                        <DataDisplay>{item.name}</DataDisplay>
                        {isShown && (
                            <Progress
                                percent={levelProgress()}
                                strokeLinecap="butt"
                                strokeColor="#333"
                                showInfo={false}
                            />
                        )}
                    </DataDisplay>
                );
            })}
        </DataDisplay>
    );
};

export default Skill;
