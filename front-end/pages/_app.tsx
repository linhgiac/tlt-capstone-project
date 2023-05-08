import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { RecoilRoot } from 'recoil';
import Layout from '../components/layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'

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

export default appWithTranslation(MyApp, nextI18NextConfig);
