import { Menu } from 'antd';
import React from 'react';
import { MenuProps } from 'antd';
import { getItem } from '../../../../../configs/utils/antd.utils';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

type MenuItem = Required<MenuProps>['items'][number];
type HeaderRouterProps = {};

const HeaderRouter = (props: HeaderRouterProps) => {
    const router = useRouter();
    const headerRouterItems: MenuItem[] = [
        getItem('Resume', 'resume', <DownOutlined />, false, [
            getItem('All templates', 'templates/all'),
            getItem('Creative', 'templates/creative'),
            getItem('Simple', 'templates/simple'),
            getItem('Professional', 'templates/professional'),
            getItem('Modern', 'templates/modern'),
        ]),
        getItem('Blog', 'blog'), getItem('', 'login', null, false)
    ];

    const clickHandler: MenuProps['onClick'] = e => {
        if (e.key !== 'resume')
            router.push({
                pathname: `/${e.key}`,
            });
    };
    return (
        <Menu
            mode="horizontal"
            items={headerRouterItems}
            onClick={clickHandler}
            // style={{ fontSize: '16px' }}
        />
    );
};
export default HeaderRouter;
