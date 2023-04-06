import React from 'react';
import router from 'next/router';
import { Layout } from 'antd';
import styles from './styles.module.scss';
import HeaderRouter from './headerRouter';
import HeaderButton from './headerButton';
import ChangeLanguageButton from '../../../custom/change-language-button';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../recoil-state/user-state/user-state';

const { Header } = Layout;
type Props = {};


const DefaultHeader = (props: Props) => {

    
    return (
        <Header className={styles.header}>
            <div
                className={styles.logo}
                onClick={() => router.push('/')}>
                Logo
            </div>

            <div className={styles['right-header']}>
                <HeaderRouter />
                <HeaderButton className={styles.button} />
                <ChangeLanguageButton forceReload={false}></ChangeLanguageButton>
            </div>
        </Header>
    );
};

export default DefaultHeader;
