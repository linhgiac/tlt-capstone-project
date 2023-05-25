import { Button } from 'antd';
import { get } from 'lodash';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { resumeLayoutState } from '../../../../../recoil-state/resume-state/resume.state';
import MultiDndContainer from '../../../../custom/multi-sortable/multi-dndcontainer';
import LayoutPage from './layout-page';
import { useTranslation } from 'next-i18next';
type Props = {};

const LayoutEditor = (props: Props) => {
    const [pages, setPages] = useRecoilState(resumeLayoutState);
    const { t } = useTranslation();

    const addPageHandler = () => {
        setPages((prevPages: any) => {
            return [...prevPages, { main: [], sidebar: [] }];
        });
    };

    const removePageHandler = (index: number) => {
        if (pages.length === 1) {
            return;
        }
        const removedPages = pages[index];
        let newPages = pages.filter((_: any, i: number) => i !== index);
        let newFirstMain = [...newPages[0]['main']];
        const newFirstSidebar = [...newPages[0]['sidebar']];

        newFirstMain = [
            ...newFirstMain,
            ...removedPages['main'],
            ...removedPages['sidebar'],
        ];
        setPages([
            { main: newFirstMain, sidebar: newFirstSidebar },
            ...newPages.slice(1),
        ]);
    };

    const dragEndHandler = (items: any) => {
        setPages(items);
    };

    const dragOverHandler = (items: any) => {
        setPages(items);
    };
    return (
        <MultiDndContainer
            onDragOver={dragOverHandler}
            onDragEnd={dragEndHandler}
            items={pages}>
            {pages.map((page: any, index: number) => {
                return (
                    <div
                        key={index}
                        style={{ marginBottom: '10px' }}>
                        <LayoutPage
                            index={index}
                            items={page}
                            onRemovePage={removePageHandler}
                        />
                    </div>
                );
            })}
            <Button onClick={addPageHandler}>{t('edit-add-page', {ns:'edit'})}</Button>
        </MultiDndContainer>
    );
};

export default LayoutEditor;
