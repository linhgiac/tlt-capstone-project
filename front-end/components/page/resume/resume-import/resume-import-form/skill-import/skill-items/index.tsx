import React from 'react';
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
        <>
            {items?.map((item, i) => (
                <SectionItem
                    key={i}
                    position={item.position}
                    itemHeader={item.name ? item.name : 'Not specified'}
                    item={item}
                    sectionType={sectionType}
                    disableLevel={disableLevel}
                    onChangeItem={onChangeItem}
                    onRemove={onRemoveItem.bind(null, item.position)}
                />
            ))}
        </>
    );
};

export default SkillItems;
