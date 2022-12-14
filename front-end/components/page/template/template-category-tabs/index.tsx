import classNames from 'classnames';
import React from 'react';
import { Tabs } from 'antd';

type TemplateCategoryButtonProps = {
    activeKey: string,
    onChange: (key: string) => void,
};

const TemplateCategoryTabs = (props: TemplateCategoryButtonProps) => {
    const { activeKey, onChange } = props;

    return (
        <Tabs
            activeKey={activeKey}
            onChange={onChange}
            items={[
                {
                    label: `All templates`,
                    key: 'all',
                },
                {
                    label: `Creative`,
                    key: 'creative',
                },
                {
                    label: `Simple`,
                    key: 'simple',
                },
                {
                    label: `Professional`,
                    key: 'professional',
                },
                {
                    label: `Modern`,
                    key: 'modern',
                },
            ]}>
        </Tabs>
    );
};

export default TemplateCategoryTabs;
