import React from 'react';
import { EmploymentHistoryItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import SectionItem from '../../../../../../custom/section-item';

type EmploymentHistoryItemsProps = {
    className?: string;
    sectionType: string;
    items?: EmploymentHistoryItemDataType[];
};

const EmploymentHistoryItems = (props: EmploymentHistoryItemsProps) => {
    const { className, sectionType, items } = props;
    return (
        <>
            {items?.map((item) => (
                <SectionItem
                    key={item.id}
                    itemHeader={'Not specified'}
                    sectionType={sectionType}
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
