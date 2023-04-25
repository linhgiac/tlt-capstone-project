import classNames from 'classnames';
import { StringNullableChain } from 'lodash';
import React from 'react';

import styles from '../../styles.module.scss';
import DataDisplay from '../../../shared/DataDisplay';

type Props = {
    className?: string;
    value?: any;
};

const Masthead = (props: Props) => {
    const { className, value } = props;
    return (
        <DataDisplay className={classNames(className)}>
            <div style={{ textAlign: 'center' }}>
                <DataDisplay className={styles.name}>
                    {value?.firstName} {value?.lastName}
                </DataDisplay>
                <DataDisplay className={styles.job}>
                    {value?.jobTitle}
                </DataDisplay>
            </div>
        </DataDisplay>
    );
};

export default Masthead;
