import React from 'react';
import { SkillItemDataType } from '../../../../configs/interfaces/resume.interface';
import DataDisplay from '../../../shared/DataDisplay';
import Divide from '../divide/Divide';
import styles from './section.module.scss';

type Props = {
    header?: string;
    items?: SkillItemDataType[];
    isShown?: boolean;
};

const Skill = (props: Props) => {
    const { header, items, isShown } = props;
    return (
        <div>
            <div>
                <Divide />
                <DataDisplay className={styles.header}>{header}</DataDisplay>
                <div className={styles.skills}>
                    {items?.map(item => {
                        return (
                            <>
                                {isShown ? (
                                    <DataDisplay>
                                        {item.name} - {item.level}
                                    </DataDisplay>
                                ) : (
                                    <DataDisplay>{item.name}</DataDisplay>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Skill;
