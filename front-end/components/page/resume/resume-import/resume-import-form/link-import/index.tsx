import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
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
import axios from 'axios';
import { HOST } from '../../../../../../configs/constants/misc';
import { getAuthHeader } from '../../../../../../configs/restApi/clients';
import { isEmpty } from 'lodash';
import SingleDndContainer from '../../../../../custom/single-sortable/single-dndcontainer';
import { useTranslation } from 'next-i18next';

type LinkProps = {
    className?: string;
    defaultTitle?: string;
    sectionType: any;
};

const LinkImport = (props: LinkProps) => {
    const { t } = useTranslation();
    const { className, defaultTitle, sectionType = 'links' } = props;
    const [linkTitle, setLinkTitle] = useRecoilState(linkTitleValueState);

    const [linkItems, setLinkItems] = useRecoilState(linkItemsState);

    const addItemHandler = () => {
        const newItem = {
            position: linkItems ? linkItems.length + 1 : 1,
        };
        setLinkItems(prevItems => {
            if (prevItems === undefined) return [newItem];
            return prevItems.concat([newItem]);
        });
    };
    const removeItemHandler = async (position: number, id?: number) => {
        try {
            if (id) {
                const response = await axios.delete(
                    `${HOST}resume-form/${id}/delete-link`,
                    { headers: getAuthHeader() }
                );
            }
            setLinkItems(prevItems => {
                return prevItems.filter(item => item.position != position);
            });

            setLinkItems(prevItems => {
                return arrangePosition(prevItems);
            });
        } catch (error) {}
    };
    const changeItemHandler = useCallback(
        (changedData: LinkItemDataType) => {
            setLinkItems(prevItems => {
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
        [setLinkItems]
    );
    const dragItemHandler = (items: any) => {
        setLinkItems(
            items.map((item: any, i: number) => {
                return { ...item, position: i + 1 };
            })
        );
    };
    return (
        <SingleDndContainer
            onDragEnd={dragItemHandler}
            items={linkItems}>
            <div className={classNames(className)}>
                <SectionImportTitle
                    onChangeTitle={(title: string) => {
                        setLinkTitle(title);
                    }}
                    defaultTitle={defaultTitle}>
                    {linkTitle}
                </SectionImportTitle>
                <p style={{ color: 'grey', fontSize: '12px' }}>
                    {t('edit-link-description', {ns: 'edit'})}
                </p>
                {!isEmpty(linkItems) && (
                    <LinkItems
                        items={linkItems}
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

export default LinkImport;
