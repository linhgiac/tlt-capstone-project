import React from 'react';
import styles from './styles.module.scss';

type Props = {
    title: string;
    description: string;
};

const HomeInstructionStepContent = (props: Props) => {
    const { title, description } = props;
    return (
        <div className={styles['step-panel']}>
            <div className={styles['step-panel__title']}>{title}</div>
            <div className={styles['step-panel__description']}>
                {description}
            </div>
        </div>
    );
};

export default HomeInstructionStepContent;
