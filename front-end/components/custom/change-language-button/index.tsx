import React from 'react';
import nextI18nextConfig from '../../../next-i18next.config';
import { Button, Dropdown, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

const ChangeLanguageButton = () => {
    const router = useRouter();
        const onChangeLanguage: MenuProps['onClick'] = e => {
        console.log('click ', e);
        setCookie('language', e.key);
        router.replace(router.asPath, undefined, {locale: e.key});
    };
    const menu = (
        <Menu
            onClick={onChangeLanguage}
            items={nextI18nextConfig.i18n.locales.map((lng) => {
                return (
                    {
                        key: lng,
                        label: (<div>{lng}</div>)
                    }
                )
            })}
        ></Menu>
    )

    return (
        <Dropdown overlay={menu}>
            <Button>Change Language</Button>
        </Dropdown>
    )
}

export default ChangeLanguageButton