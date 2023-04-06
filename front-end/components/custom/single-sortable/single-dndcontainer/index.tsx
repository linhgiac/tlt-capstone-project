import {
    closestCenter,
    DndContext,
    MouseSensor,
    rectIntersection,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode;
    items: any;
    onDragEnd: (items: any[]) => void;
    isMultiDrop?: boolean;
};

const SingleDndContainer = (props: Props) => {
    const { children, items, onDragEnd, isMultiDrop = false } = props;
    const [newItems, setNewItems] = useState<any[]>([]);

    useEffect(() => {
        setNewItems(items);
    }, [items]);

    const mouseSensor = useSensor(MouseSensor);
    const sensors = useSensors(mouseSensor);

    const dragEndHandler = (event: any) => {
        const { active, over } = event;
        if (!over) {
            return;
        }
        if (active.id !== over.id) {
            setNewItems((prevItems: any) => {
                const oldIndex = +active.id - 1;
                const newIndex = +over.id - 1;
                const newArray = arrayMove(items, oldIndex, newIndex);
                onDragEnd(newArray);
                return newArray;
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={dragEndHandler}>
            {children}
        </DndContext>
    );
};

export default SingleDndContainer;
