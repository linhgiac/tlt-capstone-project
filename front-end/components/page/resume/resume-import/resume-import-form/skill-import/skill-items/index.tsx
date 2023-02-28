import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import React from 'react';
import { SkillItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import Draggable from '../../../../../../custom/draggable';
import Droppable from '../../../../../../custom/droppable';
import SectionItem from '../../../../../../custom/section-item';

type SkillItemsProps = {
    className?: string;
    sectionType: string;
    items: SkillItemDataType[];
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
                            itemHeader={item.name ? item.name : 'Not specified'}
                            item={item}
                            sectionType={sectionType}
                            disableLevel={disableLevel}
                            onChangeItem={onChangeItem}
                            onRemove={onRemoveItem.bind(null, item.position)}
                        />
                    </Draggable>
                ))}
            </div>
        </Droppable>
    );
};

export default SkillItems;
