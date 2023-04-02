import { PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useTranslation } from 'next-i18next';

type Props = {
    className?: string;
    sectionType: keyof typeof Type;
    onAddItem: (type: string) => void;
};
enum Type {
    employmentHistories = 'employment',
    educations = 'education',
    workExperiences = 'project',
    skills = 'skills',
    links = 'links',
    customs = 'item',
}

const SectionItemAdditionalButton = (props: Props) => {
    const { className, sectionType, onAddItem } = props;
    const { Text } = Typography;
    const { t } = useTranslation();

    return (
        <div
            className={(classNames(className), 'p-t-20')}
            onClick={() => {
                onAddItem(sectionType);
            }}>
            <Text className={styles['section-item-add-button']}>
                <PlusOutlined /> {t('edit-add-one-more-' + Type[sectionType], {ns: 'edit'})}
            </Text>
        </div>
    );
};

export default SectionItemAdditionalButton;
