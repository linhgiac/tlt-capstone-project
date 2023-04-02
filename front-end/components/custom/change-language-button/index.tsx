import React from 'react';
import nextI18nextConfig from '../../../next-i18next.config';
import { Button, Dropdown, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import styles from './styles.module.scss';

type ChangeLanguageItemProps = {
    language: string
}

const NativeLanguageName: any = {
    'en' : "English",
    'de' : "German",
    'ja' : "Japanese",
    'fr' : 'French',
    'vi' : 'Vietnamese'
}

const ChangeLanguageItem = (props : ChangeLanguageItemProps) => {
    const {language} = props;
    return (
        <div>
            <img className={styles.flag} src={"/assets/flags/" + language +".png"}/>
            <span className={styles.name}>{NativeLanguageName[language]}</span>
        </div>
    )
}

type ChangeLanguageButtonProps = {
    forceReload: boolean
}

const ChangeLanguageButton = (props: ChangeLanguageButtonProps) => {
    const {forceReload} = props;
    const router = useRouter();
    const onChangeLanguage: MenuProps['onClick'] = async e => {
        console.log('click ', e);
        setCookie('language', e.key);
        if (forceReload) {
            await router.replace(router.asPath, undefined, {
                locale: e.key,
                shallow: true,
            });
            router.reload();
        } else {
            router.replace(router.asPath, undefined, {
                locale: e.key,
                shallow: false,
            });
        }
    };
     
    const menu = (
        <Menu
            onClick={onChangeLanguage}
            items={nextI18nextConfig.i18n.locales.map((lng) => {
                return (
                    {
                        key: lng,
                        label: (
                            <div>
                                <ChangeLanguageItem language={lng}></ChangeLanguageItem>
                            </div>)
                    }
                )
            })}
        ></Menu>
    )

    return (
        <Dropdown overlay={menu} placement="bottomRight">
            <img className={styles.biggerFlag} src={"/assets/flags/" + router.locale +".png"}/>
        </Dropdown>
    )
}

export default ChangeLanguageButton