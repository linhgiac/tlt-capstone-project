import React from 'react';
import { LinkItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import Draggable from '../../../../../../custom/draggable';
import Droppable from '../../../../../../custom/droppable';
import SectionItem from '../../../../../../custom/section-item';

type LinkItemsProps = {
    className?: string;
    sectionType: string;
    items: LinkItemDataType[];
    onRemoveItem: (position: number, id?: number) => void;
    onChangeItem: (changedData: LinkItemDataType) => void;
};

const LinkItems = (props: LinkItemsProps) => {
    const { className, sectionType, items, onRemoveItem, onChangeItem } = props;

    return (
        <Droppable
            id={sectionType}
            items={items}>
            <div>
                {items?.map((item, i) => (
                    <Draggable
                        key={i}
                        index={i}
                        position={item.position}
                        item={item}>
                        <SectionItem
                            key={i}
                            index={i}
                            position={item.position}
                            itemHeader={
                                item.label ? item.label : 'Not specified'
                            }
                            item={item}
                            sectionType={sectionType}
                            onChangeItem={onChangeItem}
                            onRemove={onRemoveItem.bind(null, item.position)}
                        />
                    </Draggable>
                ))}
            </div>
        </Droppable>
    );
};

export default LinkItems;
