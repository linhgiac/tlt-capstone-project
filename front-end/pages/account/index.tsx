import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import classNames from 'classnames';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';

import styles from './styles.module.scss';
import AccountForm from '../../components/page/account/account-form';
import { HOST, LAYOUT } from '../../configs/constants/misc';
import { MOCKED_USER } from '../../mock/user.mock';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil-state/user-state/user-state';
import { getAuthHeader } from '../../configs/restApi/clients';
import axios from 'axios';
import { convertProfileResponse } from '../../configs/utils/format.utils';

type AccountSettingsProps = {
    userData: any;
    error?: any;
};

const AccountSettings = (props: AccountSettingsProps) => {
    const { userData } = props;
    const [user, setUser] = useRecoilState(userState);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    return (
        <div
            style={{
                backgroundColor: 'rgb(239, 242, 249)',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div className={classNames(styles['setting__container'])}>
                <div className={classNames(styles['setting-title'])}>
                    Account Settings
                </div>
                <div className={classNames(styles['account__container'])}>
                    <div className={classNames(styles['account-title'])}>
                        Account
                    </div>
                    <div
                        className={classNames(
                            styles['account-form__container']
                        )}>
                        <AccountForm data={user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { req, res } = ctx;
    const defaultReturnProps = {
        currentLayout: LAYOUT.DEFAULT,
    };
    try {
        const headers = getAuthHeader({ req, res });
        const response = await axios.get(`${HOST}accounts/user-details/`, {
            headers: headers,
        });
        return {
            props: {
                ...defaultReturnProps,
                userData: convertProfileResponse(response.data),
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