import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';
import { Button, Typography } from 'antd';
import HomeCard from '../homeCard';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'next-i18next'
const { Text, Title } = Typography;
type HomeHeroProps = {
    className: string;
};

const HomeHero = (props: HomeHeroProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const router = useRouter();
    const TITLE = t('home-title');
    const DESCRIPTION = t("home-description");
    return (
        <HomeCard
            className={styles['home-hero-container']}
            title={TITLE}
            description={DESCRIPTION}>
            <Button
                type="primary"
                size="large"
                className={styles['button']}
                onClick={() => {
                    router.push('/templates');
                }}>
                {t('home-create-button')}
            </Button>
            <div className={styles['image']}>
                
            </div>
        </HomeCard>
    );
};

export default HomeHero;
