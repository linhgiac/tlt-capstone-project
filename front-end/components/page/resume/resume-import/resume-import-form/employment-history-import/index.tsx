import React, { useEffect } from 'react';
import SectionItem from '../../../../../custom/section-item';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
import { EMPLOYMENT_HISTORY_DESCRIPTION } from '../../../../../../configs/constants/description.constants';
import EmploymentHistoryItems from './employment-history-items';
import { useRecoilState } from 'recoil';
import {
    employmentHistoriesValueState,
    employmentHistoryItemsState,
} from '../../../../../../recoil-state/resume-state/resume-complex-section.state';

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
    // const removeItemHandler = () => {};
    useEffect(() => {
        console.log('employmentHistoryItems', employmentHistoryItems);
    }, [employmentHistoryItems]);

    return (
        <div className={classNames(className)}>
            <h1>{defaultTitle}</h1>
            <p style={{ color: 'grey', fontSize: '12px' }}>
                {EMPLOYMENT_HISTORY_DESCRIPTION}
            </p>
            <EmploymentHistoryItems
                items={employmentHistoryItems}
                sectionType={sectionType}
                // onRemoveItem={removeItemHandler}
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
