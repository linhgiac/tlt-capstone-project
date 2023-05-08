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
    console.log('valueeeee', value);
    return (
        <DataDisplay className={classNames(className)}>
            <DataDisplay className={styles.avatar}>
                <img
                    width={110}
                    height={110}
                    src={value.image}
                />
            </DataDisplay>
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
