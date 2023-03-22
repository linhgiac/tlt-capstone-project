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

const MultiDndContainer = (props: Props) => {
    const { children, items, onDragEnd, isMultiDrop = false } = props;
    const [newItems, setNewItems] = useState<any[]>([]);
    console.log('itemssssssss', items);

    useEffect(() => {
        setNewItems(items);
    }, [items]);

    const mouseSensor = useSensor(MouseSensor);
    const sensors = useSensors(mouseSensor);

    const dragEndHandler = (event: any) => {
        const { active, over } = event;
        console.log('active', active);
        console.log('over', over);
        onDragEnd(items);
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

export default MultiDndContainer;
