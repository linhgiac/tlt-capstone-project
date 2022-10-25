import React from 'react';
import { EmploymentHistoryItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import SectionItem from '../../../../../../custom/section-item';

type EmploymentHistoryItemsProps = {
    className?: string;
    sectionType: string;
    items?: EmploymentHistoryItemDataType[];
    onRemoveItem: (position: number) => void;
};

const EmploymentHistoryItems = (props: EmploymentHistoryItemsProps) => {
    const { className, sectionType, items, onRemoveItem } = props;
    return (
        <>
            {items?.map((item) => (
                <SectionItem
                    key={item.position}
                    itemHeader={'Not specified'}
                    sectionType={sectionType}
                    onRemove={onRemoveItem.bind(null, item.position)}
                />
            ))}
            {/* {items?.map((item) => {
                    <SectionItem
                        // itemHeader={item.employer ? item.employer : 'Not specified'}
                        key={item.position}
                        itemHeader={'Not specified'}
                        sectionType={sectionType}
                    />;
                })} */}
        </>
    );
};

export default EmploymentHistoryItems;
