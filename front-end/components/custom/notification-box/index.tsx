import React from 'react';
import styles from './styles.module.scss';
import { Typography } from 'antd';
import classNames from 'classnames';
const { Title, Text } = Typography;

type Props = {
    type: 'success' | 'error';
    title: string;
    msg?: string;
    className?: string;
};

const NotificationBox = (props: Props) => {
    const { type, title, msg, className } = props;
    const container =
        type === 'success' ? 'container-success' : 'container-error';
    return (
        <div
            className={classNames(
                className,
                styles['container'],
                styles[container]
            )}>
            <Title className={styles['title']}>{title}</Title>
            {msg && <Text>{msg}</Text>}
        </div>
    );
};

export default NotificationBox;
