import { Button } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import HomeCard from '../homeCard';
import HomeInstructionStep from './homeInstructionStep';
import styles from './styles.module.scss';
import { useTranslation } from 'next-i18next';

type Props = {};

const HomeInstruction = (props: Props) => {
    const {t} = useTranslation();
    const router = useRouter();
    const TITLE = t('home-card-title');
    const DESCRIPTION =t('home-card-description');
    return (
        <HomeCard
            title={TITLE}
            description={DESCRIPTION}>
            <Button
                type="primary"
                className={styles['button']}
                onClick={() => {
                    router.push('/templates');
                }}>
                {t('home-create-button')}
            </Button>
            <HomeInstructionStep
                className={classNames(
                    'center',
                    styles['home-instruction__step']
                )}
            />
        </HomeCard>
    );
};

export default HomeInstruction;
