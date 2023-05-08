import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

export const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    disabled?: boolean,
    children?: MenuItem[]
): MenuItem => {
    return {
        key,
        icon,
        children,
        disabled,
        label,
    } as MenuItem;
};
