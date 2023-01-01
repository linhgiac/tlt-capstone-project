import { Progress } from 'antd';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { SkillItemDataType } from '../../../../configs/interfaces/resume.interface';
import styles from './styles.module.scss';

type Props = {
    header?: string;
    items?: SkillItemDataType[];
    isShown?: boolean;
};

const Skill = (props: Props) => {
    const { header, items, isShown } = props;
    console.log('isShown :>> ', isShown);

    return (
        <div>
            <div>{header}</div>
            {items?.map((item, i) => {
                console.log('item :>> ', item);
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
                    <div
                        key={i}
                        className={classNames(styles['item'])}>
                        <div className={styles['content']}>{item.name}</div>
                        {isShown && (
                            <Progress
                                percent={levelProgress()}
                                strokeLinecap="butt"
                                strokeColor="#000"
                                showInfo={false}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Skill;
