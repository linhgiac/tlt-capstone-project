import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';
import { Button, Typography } from 'antd';
import HomeCard from '../homeCard';
const { Text, Title } = Typography;
type HomeHeroProps = {
    className: string;
};

const HomeHero = (props: HomeHeroProps) => {
    const { className } = props;
    const DESCRIPTION =
        'Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for';
    return (
        <HomeCard
            className={styles['home-hero-container']}
            title={'Online Resume Builder'}
            description={DESCRIPTION}>
            <Button
                type="primary"
                size="large"
                className={styles['button']}>
                Create My Resume
            </Button>
            <div className={styles['image']}></div>
        </HomeCard>
    );
};

export default HomeHero;
