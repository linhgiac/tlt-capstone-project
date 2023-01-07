import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { RecoilRoot } from 'recoil';
import Layout from '../components/layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface MyAppPropsType {
    currentLayout: string;
}
function MyApp({ Component, pageProps }: AppProps<MyAppPropsType>) {
    const { currentLayout } = pageProps;
    const router = useRouter();
    return (
        <ConfigProvider prefixCls="tlt">
            <RecoilRoot>
                <Layout currentLayout={currentLayout}>
                    <Component
                        key={router.asPath}
                        {...pageProps}
                    />
                </Layout>
            </RecoilRoot>
        </ConfigProvider>
    );
}

export default MyApp;
