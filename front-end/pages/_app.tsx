import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { RecoilRoot } from 'recoil';
import Layout from '../components/layout';
import { useEffect } from 'react';

interface MyAppPropsType {
    currentLayout: string;
}
function MyApp({ Component, pageProps }: AppProps<MyAppPropsType>) {
    const { currentLayout } = pageProps;

    return (
        <ConfigProvider prefixCls="tlt">
            <RecoilRoot>
                <Layout currentLayout={currentLayout}>
                    <Component {...pageProps} />
                </Layout>
            </RecoilRoot>
        </ConfigProvider>
    );
}

export default MyApp;
