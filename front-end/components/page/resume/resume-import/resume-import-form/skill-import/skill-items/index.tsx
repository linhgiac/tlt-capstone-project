import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { SkillItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import SectionItem from '../../../../../../custom/section-item';

type SkillItemsProps = {
    className?: string;
    sectionType: string;
    items?: SkillItemDataType[];
    disableLevel: boolean;
    onRemoveItem: (position: number, id?: number) => void;
    onChangeItem: (changedData: SkillItemDataType) => void;
};

const SkillItems = (props: SkillItemsProps) => {
    const {
        className,
        sectionType,
        items,
        disableLevel,
        onRemoveItem,
        onChangeItem,
    } = props;

    return (
        <Droppable droppableId="skill">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {items?.map((item, i) => (
                        <SectionItem
                            key={i}
                            index={i}
                            position={item.position}
                            itemHeader={item.name ? item.name : 'Not specified'}
                            item={item}
                            sectionType={sectionType}
                            disableLevel={disableLevel}
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

export default SkillItems;
