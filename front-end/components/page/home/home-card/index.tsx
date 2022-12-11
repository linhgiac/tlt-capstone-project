import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';
import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

type Props = {
    title: string;
    description?: string;
    children: React.ReactNode;
};

const HomeCard = (props: Props) => {
    const { title, description, children } = props;
    return (
        <div className={classNames(styles['home-card-container'])}>
            <div className={styles['home-card-main']}>
                <Title className={styles.title}>{title}</Title>
                <Text className={styles.description}>{description}</Text>
                {children}
            </div>
        </div>
    );
};

export default HomeCard;
