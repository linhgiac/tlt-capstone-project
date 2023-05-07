import React, { useState } from 'react';
import router from 'next/router';
import { Drawer, Layout } from 'antd';
import styles from './styles.module.scss';
import HeaderRouter from './headerRouter';
import HeaderButton from './headerButton';
import ChangeLanguageButton from '../../../custom/change-language-button';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../recoil-state/user-state/user-state';
import classNames from 'classnames';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;
type Props = {};

type RightHeaderProps = {
    className?: string;
    isInline?: boolean;
    onCloseDrawer: () => void;
};
const RightHeader = ({
    isInline = false,
    className,
    onCloseDrawer,
}: RightHeaderProps) => {
    return (
        <div className={classNames(className)}>
            <HeaderRouter
                isInline={isInline}
                onCloseDrawer={onCloseDrawer}
            />
            <HeaderButton
                className={styles.button}
                isInline={isInline}
                onCloseDrawer={onCloseDrawer}
            />
            <ChangeLanguageButton
                forceReload={false}
                onCloseDrawer={onCloseDrawer}></ChangeLanguageButton>
        </div>
    );
};

const DefaultHeader = (props: Props) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const closeDrawerHandler = () => {
        setIsOpenDrawer(false);
    };
    return (
        <Header className={styles.header}>
            <div
                className={styles.logo}
                onClick={() => {
                    closeDrawerHandler();
                    router.push('/');
                }}>
                Logo
            </div>
            <span>
                <RightHeader
                    onCloseDrawer={closeDrawerHandler}
                    className={styles['right-header__horizontal']}
                />
            </span>

            <MenuOutlined
                className={styles['menu-colapse-icon']}
                style={{ fontSize: '24px' }}
                onClick={() => {
                    setIsOpenDrawer(true);
                }}
            />
            <Drawer
                className={styles['right-header__drawer']}
                closable
                onClose={() => setIsOpenDrawer(false)}
                placement="right"
                open={isOpenDrawer}>
                <RightHeader
                    onCloseDrawer={closeDrawerHandler}
                    isInline
                    className={styles['right-header__inline']}
                />
            </Drawer>
        </Header>
    );
};

export default DefaultHeader;
