import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ConfigProvider prefixCls='tlt'>
            <Component {...pageProps} />;
        </ConfigProvider>
    );
}

export default MyApp;
