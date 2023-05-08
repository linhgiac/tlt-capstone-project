import classNames from 'classnames';
import React from 'react';
import DataDisplay from '../../../shared/DataDisplay';
import Divide from '../../Divide';
import styles from '../../styles.module.scss';

type Props = {
    className?: string;
    value?: any;
};

const Masthead = (props: Props) => {
    const { value } = props;
    return (
        <DataDisplay>
            <DataDisplay className={classNames(styles['name'])}>
                {value?.firstName}
            </DataDisplay>
            <DataDisplay className={classNames(styles['name'])}>
                {value?.lastName}
            </DataDisplay>
            <DataDisplay className={classNames(styles['job'])}>
                {value?.jobTitle}
            </DataDisplay>
        </DataDisplay>
    );
};

export default Masthead;
