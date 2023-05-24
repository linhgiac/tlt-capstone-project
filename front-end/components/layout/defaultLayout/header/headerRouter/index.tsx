import { Menu } from 'antd';
import React from 'react';
import { MenuProps } from 'antd';
import { getItem } from '../../../../../configs/utils/antd.utils';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { HOW_TO_WRITE_A_RESUME } from '../../../../../configs/constants/blog.constants';

type MenuItem = Required<MenuProps>['items'][number];
type HeaderRouterProps = {
    isInline: boolean;
    onCloseDrawer: () => void;
};

const HeaderRouter = (props: HeaderRouterProps) => {
    const { isInline, onCloseDrawer } = props;
    const router = useRouter();
    const headerRouterItems: MenuItem[] = [
        getItem('Resume', 'resume', <DownOutlined />, false, [
            getItem('All templates', 'templates/all'),
            getItem('Creative', 'templates/creative'),
            getItem('Simple', 'templates/simple'),
            getItem('Professional', 'templates/professional'),
            getItem('Modern', 'templates/modern'),
        ]),
        getItem('Jobs', 'job-postings'),
        getItem('Blogs', 'blogs'),
    ];

    const clickHandler: MenuProps['onClick'] = e => {
        onCloseDrawer();
        if (e.key === 'blogs') {
            router.push({
                pathname: `/blogs/${HOW_TO_WRITE_A_RESUME}`
            })
        }
        else if (e.key === 'job-postings') {
            router.push({
                pathname: "/job-postings"
            })
        }
        else if (e.key !== 'resume')
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
