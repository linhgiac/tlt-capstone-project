import {
    closestCenter,
    DndContext,
    MouseSensor,
    rectIntersection,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
    // getDraggedItem,
    moveBetweenContainers,
    moveInsideContainer,
} from '../../../../configs/utils/layout.utils';

type Props = {
    children: React.ReactNode;
    items: any;
    onDragEnd: (items: any) => void;
    onDragOver: (items: any) => void;
    isMultiDrop?: boolean;
};

const MultiDndContainer = (props: Props) => {
    const {
        children,
        items,
        onDragEnd,
        onDragOver,
        isMultiDrop = false,
    } = props;
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {}, [items, activeId]);

    const mouseSensor = useSensor(MouseSensor);
    const sensors = useSensors(mouseSensor);

    const dragStartHandler = ({ active }: any) => {
        
        setActiveId(active.id);
    };
    const dragCancelHandler = () => setActiveId(null);

    const dragOverHandler = async ({ active, over }: any) => {
       
        if (!over?.id) {
            return;
        }
        const activeContainer = active.data.current.sortable.containerId;
        const overContainer =
            over.data.current?.sortable.containerId || over.id;
        if (activeContainer !== overContainer) {
            onDragOver((items: any) => {
                const activeIndex = get(active, [
                    'data',
                    'current',
                    'sortable',
                    'index',
                ]);

                const overIdSplit = over.id.split('-');
                const overIndex =
                    overIdSplit.length === 2
                        ? items[overIdSplit[1]][overIdSplit[0]].length + 1
                        : over.data.current?.sortable.index;
                const itemsAfterMove = moveBetweenContainers(
                    items,
                    active.id,
                    activeIndex,
                    activeContainer,
                    overIndex,
                    overContainer
                );
                return itemsAfterMove;
            });
        }
        setActiveId(null);
    };

    const dragEndHandler = (event: any) => {
        const { active, over } = event;
        if (!over) {
            setActiveId(null);
            return;
        }
        if (active.id !== over.id) {
            const activeContainer = active.data.current.sortable.containerId;
            const overContainer =
                over.data.current?.sortable.containerId || over.id;

            onDragEnd((items: any) => {
                const activeIndex = active.data.current.sortable.index;
                const overIdSplit = over.id.split('-');
                const overIndex =
                    overIdSplit.length === 2
                        ? items[overIdSplit[1]][overIdSplit[0]].length + 1
                        : over.data.current?.sortable.index;
                let itemsAfterMove;
                if (activeContainer === overContainer) {
                    itemsAfterMove = moveInsideContainer(
                        items,
                        activeIndex,
                        activeContainer,
                        overIndex
                    );
                } else {
                    itemsAfterMove = moveBetweenContainers(
                        items,
                        active.id,
                        activeIndex,
                        activeContainer,
                        overIndex,
                        overContainer
                    );
                }
                return itemsAfterMove;
            });
        }
        setActiveId(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={dragEndHandler}
            onDragOver={dragOverHandler}
            onDragStart={dragStartHandler}
            onDragCancel={dragCancelHandler}>
            {children}
        </DndContext>
    );
};

export default MultiDndContainer;
