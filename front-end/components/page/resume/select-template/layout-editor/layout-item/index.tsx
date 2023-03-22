import classNames from 'classnames';
import React from 'react';

import styles from '../styles.module.scss';

type Props = {
    name: string | number;
};

const LayoutItem = (props: Props) => {
    const { name } = props;
    return (
        <div className={classNames(styles['layout-item__container'])}>
            {name}
        </div>
    );
};

export default LayoutItem;
