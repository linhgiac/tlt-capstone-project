import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';

type Props = {
    id: string;
    items: any[];
    acceptableItemType: string;
    children: React.ReactNode;
};

const Droppable = (props: Props) => {
    const { id, items, acceptableItemType, children } = props;
    return (
        <SortableContext
            items={items?.map((_, index) => index + 1)}
            strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    );
};

export default Droppable;
