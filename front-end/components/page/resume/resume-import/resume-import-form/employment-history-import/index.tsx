import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
import { EMPLOYMENT_HISTORY_DESCRIPTION } from '../../../../../../configs/constants/description.constants';
import EmploymentHistoryItems from './employment-history-items';
import { useRecoilState } from 'recoil';
import { employmentHistoryItemsState } from '../../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';
import { arrangePosition } from '../../../../../../configs/utils/position';
import { employmentHistoryTitleValueState } from '../../../../../../recoil-state/resume-state/resume-title.state';
import SectionImportTitle from '../../section-import-title';
import {
    ComplexSectionDetailsDataType,
    EmploymentHistoryItemDataType,
} from '../../../../../../configs/interfaces/resume.interface';
import { HOST } from '../../../../../../configs/constants/misc';
import axios from 'axios';
import { getAuthHeader } from '../../../../../../configs/restApi/clients';

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
    // useEffect(() => {
    //     if (initialValue && initialValue.items) {
    //         setEmploymentHistoryItems(initialValue.items);
    //     }
    // }, [initialValue, setEmploymentHistoryItems]);
    const addItemHandler = () => {
        const newItem = {
            position: employmentHistoryItems
                ? employmentHistoryItems.length
                : 1,
        };
        setEmploymentHistoryItems(prevItems => {
            return prevItems.concat([newItem]);
        });
    };
    const removeItemHandler = async (position: number, id?: number) => {
        try {
            if (id) {
                const response = await axios.delete(
                    `${HOST}resume-form/${id}/delete-employment-history`,
                    { headers: getAuthHeader() }
                );
            }

            setEmploymentHistoryItems(prevItems => {
                return prevItems.filter(item => item.position != position);
            });

            setEmploymentHistoryItems(prevItems => {
                return arrangePosition(prevItems);
            });
        } catch (error) {
            console.log('error :>> ', error);
        }
    };
    const changeItemHandler = useCallback(
        (changedData: EmploymentHistoryItemDataType) => {
            setEmploymentHistoryItems(prevItems => {
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
        [setEmploymentHistoryItems]
    );
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
                // initialValue={initialValue}
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
