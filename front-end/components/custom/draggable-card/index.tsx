import { HolderOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from './styles.module.scss';

type Props = {
    index: number;
    position: number;
    children: React.ReactNode;
    item: any;
    isVisibleForm?: boolean;
};
const DraggableCard = (props: Props) => {
    const { children, isVisibleForm, position, index, item } = props;
    return (
        <Draggable
            key={item.id}
            draggableId={`${item.id}`}
            index={index}>
            {provided => (
                <div
                    className={classNames(styles.container)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <div className={classNames({ hidden: isVisibleForm })}>
                        <HolderOutlined />
                    </div>
                    {children}
                </div>
            )}
        </Draggable>
    );
};
export default DraggableCard;
