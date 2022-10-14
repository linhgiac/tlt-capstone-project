import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ConfigProvider prefixCls='tlt'>
            <RecoilRoot>
                <Component {...pageProps} />;
            </RecoilRoot>
        </ConfigProvider>
    );
}

export default MyApp;
