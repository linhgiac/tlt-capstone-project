import { useTranslation } from 'next-i18next';
import React from 'react';
import { EducationItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import Draggable from '../../../../../../custom/draggable';
import SectionItem from '../../../../../../custom/section-item';
import SingleDroppable from '../../../../../../custom/single-sortable/single-droppable';

type EducationItemsProps = {
    className?: string;
    sectionType: string;
    items: EducationItemDataType[];
    onRemoveItem: (position: number, id?: number) => void;
    onChangeItem: (changedData: EducationItemDataType) => void;
};

const EducationItems = (props: EducationItemsProps) => {
    const { className, sectionType, items, onRemoveItem, onChangeItem } = props;
    const { t } = useTranslation();
    return (
        <SingleDroppable
            id={sectionType}
            items={items}>
            <div>
                {items?.map((item, i) => {
                    return (
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
                                itemHeader={
                                    item.school ? item.school : t('edit-not-specified', {ns: 'edit'})
                                }
                                item={item}
                                sectionType={sectionType}
                                onChangeItem={onChangeItem}
                                onRemove={onRemoveItem.bind(
                                    null,
                                    item.position
                                )}
                            />
                        </Draggable>
                    );
                })}
            </div>
        </SingleDroppable>
    );
};

export default EducationItems;
