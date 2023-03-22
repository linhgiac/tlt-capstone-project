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

const SingleDroppable = (props: Props) => {
    const { id, items, children } = props;
    return (
        <SortableContext
            id={id}
            items={items?.map((_, index) => index + 1)}
            strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    );
};

export default SingleDroppable;
