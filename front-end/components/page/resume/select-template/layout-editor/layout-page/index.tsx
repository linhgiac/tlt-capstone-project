import {
    DndContext,
    DragOverlay,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import classNames from 'classnames';
import React from 'react';
import Draggable from '../../../../../custom/draggable';
import DroppableLayoutItem from '../../../../../custom/multi-sortable/multi-droppable';
import LayoutItem from '../layout-item';

import styles from '../styles.module.scss';
import MultiDroppable from '../../../../../custom/multi-sortable/multi-droppable';
import MultiDndContainer from '../../../../../custom/multi-sortable/multi-dndcontainer';
import { Divider } from 'antd';
import { upperFirst } from 'lodash';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
    index: number;
    items: any;
    onRemovePage: (index: number) => void;
};

const LayoutPage = (props: Props) => {
    const { index, items, onRemovePage } = props;

    const sensors = useSensors(useSensor(MouseSensor));

    const dragItemHandler = (items: any) => {
        console.log('items', items);
    };
    return (
        <MultiDndContainer
            onDragEnd={dragItemHandler}
            items={items}>
            <div className={classNames(styles['layout-page__container'])}>
                <div className={classNames(styles['layout-page__title'])}>
                    <div>Page {index}</div>
                    <div
                        className={classNames(
                            styles['layout-page__title-close']
                        )}
                        onClick={() => {
                            onRemovePage(index - 1);
                        }}>
                        <CloseOutlined />
                    </div>
                </div>
                <div className={classNames(styles['layout-page__columns'])}>
                    {Object.keys(items).map((item: any, index: number) => {
                        return (
                            <div
                                className={classNames(
                                    styles['layout-page__column']
                                )}
                                key={index}>
                                <div
                                    className={classNames(
                                        styles['layout-page__columns_title']
                                    )}>
                                    {upperFirst(item)}
                                </div>
                                <MultiDroppable
                                    id={`item-${index + 1}`}
                                    items={items[item]}>
                                    <div>
                                        {items[item].map(
                                            (item: any, i: number) => {
                                                return (
                                                    <Draggable
                                                        key={i}
                                                        index={item.position}
                                                        position={item.position}
                                                        item={item}>
                                                        <LayoutItem
                                                            name={item.position}
                                                        />
                                                    </Draggable>
                                                );
                                            }
                                        )}
                                    </div>
                                </MultiDroppable>
                            </div>
                        );
                    })}
                </div>
            </div>
        </MultiDndContainer>
    );
};

export default LayoutPage;
