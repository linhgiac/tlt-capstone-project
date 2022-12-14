import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
import {
    EDUCATION_DESCRIPTION,
    EMPLOYMENT_HISTORY_DESCRIPTION,
} from '../../../../../../configs/constants/description.constants';
import LinkItems from './link-items';
import { useRecoilState } from 'recoil';
import { linkItemsState } from '../../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';
import { arrangePosition } from '../../../../../../configs/utils/position';
import { linkTitleValueState } from '../../../../../../recoil-state/resume-state/resume-title.state';
import SectionImportTitle from '../../section-import-title';
import {
    ComplexSectionDetailsDataType,
    LinkItemDataType,
} from '../../../../../../configs/interfaces/resume.interface';
import { Switch } from 'antd';

type LinkProps = {
    className?: string;
    defaultTitle?: string;
    sectionType: any;
    initialValue?: ComplexSectionDetailsDataType;
};

const LinkImport = (props: LinkProps) => {
    const {
        className,
        defaultTitle,
        sectionType = 'links',
        initialValue,
    } = props;
    const [linkTitle, setLinkTitle] = useRecoilState(linkTitleValueState);

    const [linkItems, setLinkItems] = useRecoilState(linkItemsState);

    useEffect(() => {
        if (initialValue && initialValue.items) {
            setLinkItems(initialValue.items);
        }
    }, [initialValue, setLinkItems]);
    const addItemHandler = () => {
        const newItem = {
            position: linkItems ? linkItems.length : 1,
        };
        setLinkItems(prevItems => {
            return prevItems.concat([newItem]);
        });
    };
    const removeItemHandler = async (position: number) => {
        setLinkItems(prevItems => {
            return prevItems.filter(item => item.position != position);
        });

        setLinkItems(prevItems => {
            return arrangePosition(prevItems);
        });
    };
    const changeItemHandler = useCallback(
        (changedData: LinkItemDataType, allData: LinkItemDataType) => {
            setLinkItems(prevItems => {
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
        [setLinkItems]
    );

    return (
        <div className={classNames(className)}>
            <SectionImportTitle
                onChangeTitle={(title: string) => {
                    setLinkTitle(title);
                }}
                defaultTitle={defaultTitle}>
                {linkTitle}
            </SectionImportTitle>
            <p style={{ color: 'grey', fontSize: '12px' }}>
                {EDUCATION_DESCRIPTION}
            </p>

            <LinkItems
                items={linkItems}
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

export default LinkImport;
