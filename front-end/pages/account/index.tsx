import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import React from 'react';
import AccountAvatar from '../../components/page/account/account-avatar';
import { LAYOUT } from '../../configs/constants/misc';

import styles from './styles.module.scss';

type Props = {};

const AccountSettings = (props: Props) => {
    return (
        <div className={classNames(styles['setting__container'])}>
            <div className={classNames(styles['setting-title'])}>
                Account Settings
            </div>
            <div className={classNames(styles['account__container'])}>
                <div className={classNames(styles['account-title'])}>
                    Account
                </div>
                <div className={classNames(styles['account-form__container'])}>
                    <AccountAvatar
                        className={classNames(styles['account-avatar'])}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;

export const getServerSideProps: GetServerSideProps = async () => {
    const defaultReturnProps = {
        currentLayout: LAYOUT.DEFAULT,
    };
    try {
        return {
            props: {
                ...defaultReturnProps,
            },
        };
    } catch (error: any) {
        return {
            props: {
                ...defaultReturnProps,
                error: JSON.stringify(error),
            },
        };
    }
};
