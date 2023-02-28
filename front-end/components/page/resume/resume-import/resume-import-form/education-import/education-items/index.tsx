import React from 'react';
import { EducationItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import SectionItem from '../../../../../../custom/section-item';

type EducationItemsProps = {
    className?: string;
    sectionType: string;
    items?: EducationItemDataType[];
    onRemoveItem: (position: number, id?: number) => void;
    onChangeItem: (changedData: EducationItemDataType) => void;
};

const EducationItems = (props: EducationItemsProps) => {
    const { className, sectionType, items, onRemoveItem, onChangeItem } = props;

    return (
        <div>
            {items?.map((item, i) => (
                <SectionItem
                    key={i}
                    index={i}
                    position={item.position}
                    itemHeader={item.school ? item.school : 'Not specified'}
                    item={item}
                    sectionType={sectionType}
                    onChangeItem={onChangeItem}
                    onRemove={onRemoveItem.bind(null, item.position)}
                />
            ))}
        </div>
    );
};

export default EducationItems;
