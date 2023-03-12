import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';

import styles from './styles.module.scss';
import AccountForm from '../../components/page/account/account-form';
import { LAYOUT } from '../../configs/constants/misc';
import { MOCKED_USER } from '../../mock/user.mock';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil-state/user-state/user-state';

type Props = {
    userData: any;
};

const AccountSettings = (props: Props) => {
    const { userData } = props;
    const [user, setUser] = useRecoilState(userState);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

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
                    {/* <AccountAvatar
                        className={classNames(styles['account-avatar'])}
                    /> */}
                    <AccountForm data={user} />
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
                userData: MOCKED_USER,
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
