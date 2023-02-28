import { isEmpty } from 'lodash';
import React from 'react';
import { EmploymentHistoryItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import Draggable from '../../../../../../custom/draggable';
import Droppable from '../../../../../../custom/droppable';
import SectionItem from '../../../../../../custom/section-item';

type EmploymentHistoryItemsProps = {
    className?: string;
    sectionType: string;
    items: EmploymentHistoryItemDataType[];

    onRemoveItem: (position: number, id?: number) => void;
    onChangeItem: (changedData: EmploymentHistoryItemDataType) => void;
};

const EmploymentHistoryItems = (props: EmploymentHistoryItemsProps) => {
    const { className, sectionType, items, onRemoveItem, onChangeItem } = props;

    return (
        <Droppable
            id={sectionType}
            items={items}
            acceptableItemType={'employmentHistoryItem'}>
            <div>
                {items?.map((item, i) => {
                    return (
                        <Draggable
                            key={i}
                            index={i}
                            position={item.position}
                            item={item}>
                            <SectionItem
                                index={i}
                                position={item.position}
                                itemHeader={
                                    item.jobTitle
                                        ? item.jobTitle
                                        : 'Not specified'
                                }
                                sectionType={sectionType}
                                item={item}
                                onChangeItem={onChangeItem}
                                onRemove={onRemoveItem.bind(
                                    null,
                                    item.position
                                )}
                            />
                        </Draggable>
                    );
                })}
            </div>
        </Droppable>
    );
};

export default EmploymentHistoryItems;
