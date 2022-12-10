import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'antd';
import { LAYOUT } from '../configs/constants/misc';

const Home: NextPage = props => {
    const router = useRouter();
    console.log('props :>> ', props);
    return (
        <div>
            <Button
                type="primary"
                size="large"
                onClick={() => {
                    router.push({
                        pathname: '/templates',
                    });
                }}>
                Create My Resume
            </Button>
        </div>
    );
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
