import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
import { EMPLOYMENT_HISTORY_DESCRIPTION } from '../../../../../../configs/constants/description.constants';
import EmploymentHistoryItems from './employment-history-items';
import { useRecoilState } from 'recoil';
import { employmentHistoryItemsState } from '../../../../../../recoil-state/resume-state/resume-complex-section.state';
import { arrangePosition } from '../../../../../../configs/utils/position';
import { employmentHistoryTitleValueState } from '../../../../../../recoil-state/resume-state/resume-title.state';
import SectionImportTitle from '../../section-import-title';
import { EmploymentHistoryItemDataType } from '../../../../../../configs/interfaces/resume.interface';

type EmploymentHistoryProps = {
    className?: string;
    defaultTitle?: string;
    sectionType: any;
};

const EmploymentHistoryImport = (props: EmploymentHistoryProps) => {
    const {
        className,
        defaultTitle,
        sectionType = 'employmentHistories',
    } = props;
    const [employmentHistoryTitle, setEmploymentHistoryTitle] = useRecoilState(
        employmentHistoryTitleValueState
    );

    const [employmentHistoryItems, setEmploymentHistoryItems] = useRecoilState(
        employmentHistoryItemsState
    );
    const addItemHandler = () => {
        const newItem = {
            position: employmentHistoryItems
                ? employmentHistoryItems.length
                : 1,
        };
        setEmploymentHistoryItems((prevItems) => {
            return prevItems.concat([newItem]);
        });
    };
    const removeItemHandler = async (position: number) => {
        setEmploymentHistoryItems((prevItems) => {
            return prevItems.filter((item) => item.position != position);
        });

        setEmploymentHistoryItems((prevItems) => {
            return arrangePosition(prevItems);
        });
    };
    const changeItemHandler = useCallback(
        (
            changedData: EmploymentHistoryItemDataType,
            allData: EmploymentHistoryItemDataType
        ) => {
            setEmploymentHistoryItems((prevItems) => {
                const { position } = changedData;

                if (prevItems.length === position) {
                    prevItems.push(changedData);
                } else {
                    const revUnChangedItems = [...prevItems];
                    revUnChangedItems.splice(position, 1, changedData);
                    return revUnChangedItems;
                }
                return prevItems;
            });
        },
        [setEmploymentHistoryItems]
    );

    // useEffect(() => {
    //     console.log('employmentHistoryItems', employmentHistoryItems);
    // }, [employmentHistoryItems]);

    return (
        <div className={classNames(className)}>
            <SectionImportTitle
                onChangeTitle={(title: string) => {
                    setEmploymentHistoryTitle(title);
                }}
                defaultTitle={defaultTitle}>
                {employmentHistoryTitle}
            </SectionImportTitle>
            <p style={{ color: 'grey', fontSize: '12px' }}>
                {EMPLOYMENT_HISTORY_DESCRIPTION}
            </p>
            <EmploymentHistoryItems
                items={employmentHistoryItems}
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

export default EmploymentHistoryImport;
