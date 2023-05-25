import { Button } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles.module.scss';
import { useTranslation } from 'next-i18next';

type Props = {
    onCloseDrawer: () => void;
};

const LoginButton = (props: Props) => {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <div
            className={styles['login-button__container']}
            onClick={props.onCloseDrawer}>
            <Button
                className={classNames(
                    'm-l-8',
                    'h-40px',
                    styles['text-button'],
                    styles['button']
                )}
                size="large"
                type="text"
                onClick={() => {
                    router.push('/log-in');
                }}>
                {t('layout-login', {ns: 'layout'})}
            </Button>
            <Button
                className={classNames(
                    'm-l-8',
                    'h-40px ',
                    'btn-lg-b-r-6',
                    styles['button']
                )}
                size="large"
                type="primary"
                onClick={() => router.push('/register')}>
                {t('layout-signup', {ns: 'layout'})}
            </Button>
        </div>
    );
};

export default LoginButton;
