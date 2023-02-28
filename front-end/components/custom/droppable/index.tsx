import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';

type Props = {
    id: string;
    items: any[];
    children: React.ReactNode;
};

const Droppable = (props: Props) => {
    const { id, items, children } = props;
    return (
        <SortableContext
            items={items?.map((_, index) => index + 1)}
            strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    );
};

export default Droppable;
