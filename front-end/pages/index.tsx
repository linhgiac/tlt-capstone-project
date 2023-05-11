import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    NextPage,
} from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LAYOUT } from '../configs/constants/misc';
import HomeContent from '../components/page/home';
import { useSetRecoilState } from 'recoil';
import { userLoginState } from '../recoil-state/user-state/user-state';
import { getAuthHeader } from '../configs/restApi/clients';
import { getCookie, hasCookie } from 'cookies-next';
import { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const Home: NextPage = props => {
    const router = useRouter();
    const setIsLogged = useSetRecoilState(userLoginState);
    useEffect(() => {
        const hasToken = hasCookie('refreshToken');
        if (hasToken) {
            setIsLogged(true);
        }
    }, [setIsLogged]);

    return (
        <>
            <Head>
                <title>TLT Resume Builder</title>
            </Head>
            <HomeContent />;
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    const defaultReturnProps = {
        currentLayout: LAYOUT.DEFAULT,
    };

    try {
        return {
            props: {
                ...defaultReturnProps,
                ...await serverSideTranslations(locale as string, ['home']),
            },
        };
    } catch (error: any) {
        return {
            props: {
                ...defaultReturnProps,
                ...await serverSideTranslations(locale as string, ['home']),
                error: JSON.stringify(error),
            },
        };
    }
};
