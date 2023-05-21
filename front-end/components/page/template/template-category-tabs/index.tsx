import classNames from 'classnames';
import React from 'react';
import { Tabs } from 'antd';
import { useTranslation, UseTranslation } from 'next-i18next';

type TemplateCategoryButtonProps = {
    activeKey: string,
    onChange: (key: string) => void,
};

const TemplateCategoryTabs = (props: TemplateCategoryButtonProps) => {
    const { activeKey, onChange } = props;
    const { t } = useTranslation();
    return (
        <div style={{ width: '100%' }}>
            <Tabs
                activeKey={activeKey}
                onChange={onChange}
                items={[
                    {
                        label: t('template-all-tab', { ns: 'template' }),
                        key: 'all',
                    },
                    {
                        label: t('template-creative-tab', { ns: 'template' }),
                        key: 'creative',
                    },
                    {
                        label: t('template-simple-tab', { ns: 'template' }),
                        key: 'simple',
                    },
                    {
                        label: t('template-professional-tab', {
                            ns: 'template',
                        }),
                        key: 'professional',
                    },
                    {
                        label: t('template-modern-tab', { ns: 'template' }),
                        key: 'modern',
                    },
                ]}></Tabs>
        </div>
    );
};

export default TemplateCategoryTabs;
