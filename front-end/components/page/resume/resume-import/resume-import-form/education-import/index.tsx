import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
import {
    EDUCATION_DESCRIPTION,
    EMPLOYMENT_HISTORY_DESCRIPTION,
} from '../../../../../../configs/constants/description.constants';
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

    const [educationItems, setEducationItems] =
        useRecoilState(educationItemsState);

    
    const addItemHandler = () => {
        const newItem = {
            position: educationItems ? educationItems.length : 1,
        };
        setEducationItems(prevItems => {
            return prevItems.concat([newItem]);
        });
    };
    const removeItemHandler = async (position: number) => {
        setEducationItems(prevItems => {
            return prevItems.filter(item => item.position != position);
        });

        setEducationItems(prevItems => {
            return arrangePosition(prevItems);
        });
    };
    const changeItemHandler = useCallback(
        (
            changedData: EducationItemDataType,
            allData: EducationItemDataType
        ) => {
            setEducationItems(prevItems => {
                const { position } = changedData;

                if (prevItems.length === position) {
                    prevItems.push(changedData);
                } else {
                    const newItems = prevItems.map(item => {
                        if (item.position === changedData.position) {
                            item = { ...item, ...changedData };
                        }
                        return item;
                    });
                    return newItems;
                }
                return prevItems;
            });
        },
        [setEducationItems]
    );

    return (
        <div className={classNames(className)}>
            <SectionImportTitle
                onChangeTitle={(title: string) => {
                    setEducationTitle(title);
                }}
                defaultTitle={defaultTitle}>
                {educationTitle}
            </SectionImportTitle>
            <p style={{ color: 'grey', fontSize: '12px' }}>
                {EDUCATION_DESCRIPTION}
            </p>
            <EducationItems
                items={educationItems}
                sectionType={sectionType}
                onRemoveItem={removeItemHandler}
                onChangeItem={changeItemHandler}
            />
            <SectionItemAdditionalButton
                onAddItem={addItemHandler}
                className={classNames(className)}
                sectionType={sectionType}
            />
        </div>
    );
};

export default EducationImport;
