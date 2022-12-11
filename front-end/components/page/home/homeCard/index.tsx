import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';
import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

type Props = {
    className?: string;
    title: string;
    description?: string;
    children: React.ReactNode;
};

const HomeCard = (props: Props) => {
    const { className, title, description, children } = props;
    return (
        <div className={classNames(className, styles['home-card-container'])}>
            <div className={styles['home-card-main']}>
                <div className={styles['home-card-main__title']}>
                    <Title className={styles.title}>{title}</Title>
                    <Text className={styles.description}>{description}</Text>
                </div>

                {children}
            </div>
        </div>
    );
};

export default HomeCard;
