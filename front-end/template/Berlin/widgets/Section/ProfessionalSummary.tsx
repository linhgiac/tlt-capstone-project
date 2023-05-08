import React from 'react';
import styles from './styles.module.scss';

type Props = {
    items: any;
};

const ProfessionalSummary = (props: Props) => {
    return <div className={styles.content}>{props.items.content}</div>;
};

export default ProfessionalSummary;
