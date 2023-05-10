import { GetServerSideProps } from 'next';
import React from 'react';
import RegisterContent from '../../components/page/register';
import { LAYOUT } from '../../configs/constants/misc';
import { Form } from 'antd';
import Head from 'next/head';

type Props = {};

const Register = (props: Props) => {
    return (
        <div style={{ height: '100vh' }}>
            <Head>
                <title>Register</title>
            </Head>
            <RegisterContent />
        </div>
    );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async () => {
    const defaultReturnProps = {
        currentLayout: LAYOUT.LOGIN,
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
