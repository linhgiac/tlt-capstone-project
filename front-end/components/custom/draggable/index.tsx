import { HolderOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import classNames from 'classnames';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';

import styles from './styles.module.scss';
import { useDraggable } from '@dnd-kit/core';

type Props = {
    index: number;
    position: number;
    children: React.ReactNode;
    item: any;
    isVisibleForm?: boolean;
};
const Draggable = (props: Props) => {
    const { children, isVisibleForm, position, index, item } = props;
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: position,
        });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div
            key={item.id}
            style={style}
            ref={setNodeRef}>
            <div className={classNames(styles.container)}>
                <div
                    className={classNames({ hidden: isVisibleForm })}
                    {...listeners}>
                    <HolderOutlined />
                </div>
                {children}
            </div>
        </div>
    );
};
export default Draggable;
