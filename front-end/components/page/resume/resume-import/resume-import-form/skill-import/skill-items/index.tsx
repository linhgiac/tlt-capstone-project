import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import React from 'react';
import { SkillItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import Draggable from '../../../../../../custom/draggable';
import SingleDroppable from '../../../../../../custom/single-sortable/single-droppable';
import SectionItem from '../../../../../../custom/section-item';
import { useTranslation } from 'next-i18next';

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
    const { t } = useTranslation();
    return (
        <SingleDroppable
            id={sectionType}
            items={items}>
            <div>
                {items?.map((item, i) => (
                    <Draggable
                        key={i}
                        index={i}
                        id={item.position}
                        item={item}
                        dragIcon={true}>
                        <SectionItem
                            key={i}
                            index={i}
                            position={item.position}
                            itemHeader={item.name ? item.name : t('edit-not-specified', {ns: 'edit'})}
                            item={item}
                            sectionType={sectionType}
                            disableLevel={disableLevel}
                            onChangeItem={onChangeItem}
                            onRemove={onRemoveItem.bind(null, item.position)}
                        />
                    </Draggable>
                ))}
            </div>
        </SingleDroppable>
    );
};

export default SkillItems;
