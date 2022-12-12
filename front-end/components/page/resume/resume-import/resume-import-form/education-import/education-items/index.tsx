import React from 'react';
import { EducationItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import SectionItem from '../../../../../../custom/section-item';

type EducationItemsProps = {
    className?: string;
    sectionType: string;
    items?: EducationItemDataType[];
    onRemoveItem: (position: number) => void;
    onChangeItem: (
        changedData: EducationItemDataType,
        allData: EducationItemDataType
    ) => void;
};

const EducationItems = (props: EducationItemsProps) => {
    const { className, sectionType, items, onRemoveItem, onChangeItem } = props;

    return (
        <>
            {items?.map(item => (
                <SectionItem
                    key={item.position}
                    position={item.position}
                    itemHeader={item.school ? item.school : 'Not specified'}
                    sectionType={sectionType}
                    onChangeItem={onChangeItem}
                    onRemove={onRemoveItem.bind(null, item.position)}
                />
            ))}
        </>
    );
};

export default EducationItems;
