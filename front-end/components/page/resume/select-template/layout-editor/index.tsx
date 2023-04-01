import { Button } from 'antd';
import { get } from 'lodash';
import React, { useState } from 'react';
import MultiDndContainer from '../../../../custom/multi-sortable/multi-dndcontainer';
import LayoutPage from './layout-page';

type Props = {};

const LayoutEditor = (props: Props) => {
    const [pages, setPages] = useState([
        {
            main: ['emplotmentHistories'],
            sidebar: ['links'],
        },
        {
            main: ['education'],
            sidebar: ['skills'],
        },
    ]);

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

        newPages[0]['main'] = [
            ...newPages[0]['main'],
            ...removedPages['main'],
            ...removedPages['sidebar'],
        ];

        setPages(newPages);
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
            <Button onClick={addPageHandler}>Add more page</Button>
        </MultiDndContainer>
    );
};

export default LayoutEditor;
