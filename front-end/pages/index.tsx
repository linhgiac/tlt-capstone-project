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
import { hasCookie } from 'cookies-next';
import { useEffect } from 'react';

const Home: NextPage = props => {
    const router = useRouter();
    const setIsLogged = useSetRecoilState(userLoginState);
    useEffect(() => {
        const hasToken = hasCookie('tokenRefresh');
        if (hasToken) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [setIsLogged]);

    return <HomeContent />;
};

export default Home;

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
