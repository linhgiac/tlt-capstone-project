import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { EmploymentHistoryItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import SectionItem from '../../../../../../custom/section-item';

type EmploymentHistoryItemsProps = {
    className?: string;
    sectionType: string;
    items?: EmploymentHistoryItemDataType[];

    onRemoveItem: (position: number, id?: number) => void;
    onChangeItem: (changedData: EmploymentHistoryItemDataType) => void;
};

const EmploymentHistoryItems = (props: EmploymentHistoryItemsProps) => {
    const { className, sectionType, items, onRemoveItem, onChangeItem } = props;
    return (
        <Droppable droppableId="employmentHistory">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {items?.map((item, i) => (
                        <SectionItem
                            key={i}
                            index={i}
                            position={item.position}
                            itemHeader={
                                item.jobTitle ? item.jobTitle : 'Not specified'
                            }
                            sectionType={sectionType}
                            item={item}
                            onChangeItem={onChangeItem}
                            onRemove={onRemoveItem.bind(null, item.position)}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default EmploymentHistoryItems;
