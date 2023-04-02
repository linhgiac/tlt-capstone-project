import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
import EducationItems from './education-items';
import { useRecoilState } from 'recoil';
import { educationItemsState } from '../../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';
import { arrangePosition } from '../../../../../../configs/utils/position';
import { educationTitleValueState } from '../../../../../../recoil-state/resume-state/resume-title.state';
import SectionImportTitle from '../../section-import-title';
import {
    ComplexSectionDataType,
    ComplexSectionDetailsDataType,
    EducationItemDataType,
} from '../../../../../../configs/interfaces/resume.interface';
import axios from 'axios';
import { HOST } from '../../../../../../configs/constants/misc';
import { getAuthHeader } from '../../../../../../configs/restApi/clients';
import { isEmpty } from 'lodash';
import SingleDndContainer from '../../../../../custom/single-sortable/single-dndcontainer';
import { useTranslation } from 'next-i18next';

type EducationProps = {
    className?: string;
    defaultTitle?: string;
    sectionType: any;
};

const EducationImport = (props: EducationProps) => {
    const { className, defaultTitle, sectionType = 'educations' } = props;
    const [educationTitle, setEducationTitle] = useRecoilState(
        educationTitleValueState
    );
    const { t } = useTranslation();

    const [educationItems, setEducationItems] =
        useRecoilState(educationItemsState);

    const addItemHandler = () => {
        const newItem = {
            position: educationItems ? educationItems.length + 1 : 1,
        };
        setEducationItems(prevItems => {
            if (prevItems === undefined) return [newItem];
            return prevItems.concat([newItem]);
        });
    };
    const removeItemHandler = async (position: number, id?: number) => {
        try {
            if (id) {
                const response = await axios.delete(
                    `${HOST}resume-form/${id}/delete-education`,
                    { headers: getAuthHeader() }
                );
            }
            setEducationItems(prevItems => {
                return prevItems.filter(item => item.position != position);
            });

            setEducationItems(prevItems => {
                return arrangePosition(prevItems);
            });
        } catch (error) {}
    };
    const changeItemHandler = useCallback(
        (changedData: EducationItemDataType) => {
            setEducationItems(prevItems => {
                const { position } = changedData;

                const newItems = prevItems.map(item => {
                    if (item.position === changedData.position) {
                        item = { ...item, ...changedData };
                    }
                    return item;
                });
                return newItems;
            });
        },
        [setEducationItems]
    );
    const dragItemHandler = (items: any) => {
        setEducationItems(
            items.map((item: any, i: number) => {
                return { ...item, position: i + 1 };
            })
        );
    };

    return (
        <SingleDndContainer
            onDragEnd={dragItemHandler}
            items={educationItems}>
            <div className={classNames(className)}>
                <SectionImportTitle
                    onChangeTitle={(title: string) => {
                        setEducationTitle(title);
                    }}
                    defaultTitle={defaultTitle}>
                    {educationTitle}
                </SectionImportTitle>
                <p style={{ color: 'grey', fontSize: '12px' }}>
                    {t('edit-education-description', {ns: 'edit'})}
                </p>
                {!isEmpty(educationItems) && (
                    <EducationItems
                        items={educationItems}
                        sectionType={sectionType}
                        onRemoveItem={removeItemHandler}
                        onChangeItem={changeItemHandler}
                    />
                )}

                <SectionItemAdditionalButton
                    onAddItem={addItemHandler}
                    className={classNames(className)}
                    sectionType={sectionType}
                />
            </div>
        </SingleDndContainer>
    );
};

export default EducationImport;
