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


const Home: NextPage = props => {
    const router = useRouter();
    const setIsLogged = useSetRecoilState(userLoginState);
    useEffect(() => {
        const hasToken = hasCookie('refreshToken');
        if (hasToken) {
            setIsLogged(true);
        } 
    }, [setIsLogged]);

    return <HomeContent />;
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
                ...await serverSideTranslations(locale as string, ['common']),
            },
        };
    } catch (error: any) {
        return {
            props: {
                ...defaultReturnProps,
                ...await serverSideTranslations(locale as string, ['common']),
                error: JSON.stringify(error),
            },
        };
    }
};
