import React, { useCallback } from 'react';
import { EmploymentHistoryItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import SectionItem from '../../../../../../custom/section-item';

type EmploymentHistoryItemsProps = {
    className?: string;
    sectionType: string;
    items?: EmploymentHistoryItemDataType[];
    // onGetItemHeader: (itemsHeader: any[]) => any[];
    onRemoveItem: (position: number) => void;
    onChangeItem: (
        changedData: EmploymentHistoryItemDataType,
        allData: EmploymentHistoryItemDataType
    ) => void;
};

const EmploymentHistoryItems = (props: EmploymentHistoryItemsProps) => {
    const {
        className,
        sectionType,
        items,
        onRemoveItem,
        onChangeItem,
        // onGetItemHeader,
    } = props;

    return (
        <>
            {items?.map((item) => (
                <SectionItem
                    key={item.position}
                    position={item.position}
                    itemHeader={item.jobTitle ? item.jobTitle : 'Not specified'}
                    sectionType={sectionType}
                    onChangeItem={onChangeItem}
                    onRemove={onRemoveItem.bind(null, item.position)}
                />
            ))}
        </>
    );
};

export default EmploymentHistoryItems;
