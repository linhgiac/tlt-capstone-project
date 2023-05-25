import {
    DndContext,
    DragOverlay,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import Draggable from '../../../../../custom/draggable';
import LayoutItem from '../layout-item';

import styles from '../styles.module.scss';
import MultiDroppable from '../../../../../custom/multi-sortable/multi-droppable';
import MultiDndContainer from '../../../../../custom/multi-sortable/multi-dndcontainer';
import { Divider } from 'antd';
import { upperFirst } from 'lodash';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
type Props = {
    index: number;
    items: any;
    onRemovePage: (index: number) => void;
};

const LayoutPage = (props: Props) => {
    const { index, items, onRemovePage } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(styles['layout-page__container'])}>
            <div className={classNames(styles['layout-page__title'])}>
                <div>{t('edit-page', {ns: 'edit'})} {index + 1}</div>
                <div
                    className={classNames(styles['layout-page__title-close'])}
                    onClick={() => {
                        onRemovePage(index);
                    }}>
                    <CloseOutlined />
                </div>
            </div>
            <div className={classNames(styles['layout-page__columns'])}>
                {Object.keys(items).map((item: any, i: number) => {
                    return (
                        <div
                            className={classNames(
                                styles['layout-page__column']
                            )}
                            key={i}>
                            <div
                                className={classNames(
                                    styles['layout-page__columns_title']
                                )}>
                                {t('edit-' + item, {ns: 'edit'})}
                            </div>
                            <MultiDroppable
                                id={`${item}-${index}`}
                                itemId={items[item]}>
                                <div>
                                    {items[item].map((item: any, i: number) => {
                                        return (
                                            <Draggable
                                                key={i}
                                                index={i}
                                                id={item}
                                                item={item}>
                                                <LayoutItem item={item} />
                                            </Draggable>
                                        );
                                    })}
                                </div>
                            </MultiDroppable>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LayoutPage;
