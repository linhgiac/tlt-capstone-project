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
            <img className={styles.flag} src={"./assets/flags/" + language +".png"}/>
            <span className={styles.name}>{NativeLanguageName[language]}</span>
        </div>
    )
}

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
        <Dropdown overlay={menu}>
            {/* <Button> */}
                {/* <ChangeLanguageItem language={router.locale ?? 'en'}></ChangeLanguageItem> */}
                <img className={styles.biggerFlag} src={"./assets/flags/" + router.locale +".png"}/>
            {/* </Button> */}
        </Dropdown>
    )
}

export default ChangeLanguageButton