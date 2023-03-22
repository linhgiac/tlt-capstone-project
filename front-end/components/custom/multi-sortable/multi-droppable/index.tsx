import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';
import LayoutItem from '../../../page/resume/select-template/layout-editor/layout-item';

type Props = {
    id: string;
    items: any[];
    children: React.ReactNode;
};

const MultiDroppable = (props: Props) => {
    const { id, items, children } = props;

    const { setNodeRef } = useDroppable({ id });
    return (
        <SortableContext
            id={id}
            items={items?.map(item => item.position)}
            strategy={verticalListSortingStrategy}>
            <div ref={setNodeRef}>{children}</div>
        </SortableContext>
    );
};

export default MultiDroppable;
