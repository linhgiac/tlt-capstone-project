import { PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
    className?: string;
    type: 'employment' | 'education' | 'link' | 'skill' | 'item';
};

const SectionItemAdditionalButton = (props: Props) => {
    const { className, type } = props;
    const { Text } = Typography;

    return (
        <div className={(classNames(className), 'p-t-20')}>
            <Text className={styles['section-item-add-button']}>
                <PlusOutlined /> Add one more {type}
            </Text>
        </div>
    );
};

export default SectionItemAdditionalButton;
