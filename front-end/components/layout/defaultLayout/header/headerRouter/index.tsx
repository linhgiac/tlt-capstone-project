import { Menu } from 'antd';
import React from 'react';
import { MenuProps } from 'antd';
import { getItem } from '../../../../../configs/utils/antd.utils';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { HOW_TO_WRITE_A_RESUME } from '../../../../../configs/constants/blog.constants';
import { useTranslation } from 'next-i18next';

type MenuItem = Required<MenuProps>['items'][number];
type HeaderRouterProps = {
    isInline: boolean;
    onCloseDrawer: () => void;
};

const HeaderRouter = (props: HeaderRouterProps) => {
    const { isInline, onCloseDrawer } = props;
    const router = useRouter();
    const { t } = useTranslation();
    const headerRouterItems: MenuItem[] = [
        getItem(t('layout-resume', {ns: 'layout'}), 'resume', <DownOutlined />, false, [
            getItem(t('layout-all-templates', {ns: 'layout'}), 'templates/all'),
            getItem(t('layout-creative', {ns: 'layout'}), 'templates/creative'),
            getItem(t('layout-simple', {ns: 'layout'}), 'templates/simple'),
            getItem(t('layout-professional', {ns: 'layout'}), 'templates/professional'),
            getItem(t('layout-modern', {ns: 'layout'}), 'templates/modern'),
        ]),
        getItem(t('layout-blogs', {ns: 'layout'}), 'blogs'),
    ];

    const clickHandler: MenuProps['onClick'] = e => {
        onCloseDrawer();
        if (e.key === 'blogs') {
            router.push({
                pathname: `/blogs/${HOW_TO_WRITE_A_RESUME}`,
            });
        } else if (e.key !== 'resume')
            router.push({
                pathname: `/${e.key}`,
            });
    };
    return (
        <Menu
            mode={isInline ? 'inline' : 'horizontal'}
            items={headerRouterItems}
            onClick={clickHandler}
            style={{
                borderBottom: 'none',
                borderRight: 'none',
                fontSize: '16px',
                fontWeight: '400',
            }}
        />
    );
};
export default HeaderRouter;
