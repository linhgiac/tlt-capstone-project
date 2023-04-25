import React from 'react';

import styles from './styles.module.scss';
import DataDisplay from '../../../shared/DataDisplay';
import { SolutionOutlined, UserOutlined } from '@ant-design/icons';

type Props = {
    header?: string;
    items: any;
};

const ProfessionalSummary = (props: Props) => {
    const { items, header } = props;
    return (
        <DataDisplay>
            <DataDisplay
                icon={<SolutionOutlined />}
                className={styles.header}>
                {header}
                {/* <Divide className={styles.underline} /> */}
            </DataDisplay>
            <DataDisplay className={styles.item}>{items?.content}</DataDisplay>
        </DataDisplay>
    );
};

export default ProfessionalSummary;
