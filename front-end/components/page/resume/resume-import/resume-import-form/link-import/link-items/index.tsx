import React from 'react';
import { LinkItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import SectionItem from '../../../../../../custom/section-item';

type LinkItemsProps = {
    className?: string;
    sectionType: string;
    items?: LinkItemDataType[];
    onRemoveItem: (position: number, id?: number) => void;
    onChangeItem: (
        changedData: LinkItemDataType,
    ) => void;
};

const LinkItems = (props: LinkItemsProps) => {
    const {
        className,
        sectionType,
        items,
        onRemoveItem,
        onChangeItem,
    } = props;

    return (
        <>
            {items?.map((item, i) => (
                <SectionItem
                    key={i}
                    position={item.position}
                    itemHeader={item.label ? item.label : 'Not specified'}
                    item={item}
                    sectionType={sectionType}
                    onChangeItem={onChangeItem}
                    onRemove={onRemoveItem.bind(null, item.position)}
                />
            ))}
        </>
    );
};

export default LinkItems;
