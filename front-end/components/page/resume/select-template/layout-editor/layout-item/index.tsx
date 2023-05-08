import classNames from 'classnames';
import { startCase } from 'lodash';
import React from 'react';

import styles from '../styles.module.scss';

type Props = {
    item: string;
};

const LayoutItem = (props: Props) => {
    const { item } = props;
    return (
        <div className={classNames(styles['layout-item__container'])}>
            {startCase(item)}
        </div>
    );
};

export default LayoutItem;
