import { Button } from 'antd';
import { get } from 'lodash';
import React, { useState } from 'react';
import LayoutPage from './layout-page';

type Props = {};

const LayoutEditor = (props: Props) => {
    const [pages, setPages] = useState([
        {
            main: [{ position: 1 }, { position: 2 }, { position: 3 }],
            sidebar: [{ position: 4 }, { position: 5 }, { position: 6 }],
        },
        {
            main: [{ position: 7 }, { position: 8 }, { position: 9 }],
            sidebar: [{ position: 10 }, { position: 11 }, { position: 12 }],
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
        const removedMainItems = get(pages, [`${index}`, 'main']);
        const removedSidebarItems = get(pages, [`${index}`, 'sidebar']);
        const newPages = pages.filter((_: any, i: number) => i !== index);
        newPages[newPages.length - 1]['main'] = [
            ...newPages[0]['main'],
            ...removedMainItems,
            ...removedSidebarItems,
        ];
        setPages(newPages);
        console.log('new page', newPages);
    };
    return (
        <div>
            {pages.map((page: any, index: number) => {
                return (
                    <div
                        key={index}
                        style={{ marginBottom: '10px' }}>
                        <LayoutPage
                            index={index + 1}
                            items={page}
                            onRemovePage={removePageHandler}
                        />
                    </div>
                );
            })}
            <Button onClick={addPageHandler}>Add more page</Button>
        </div>
    );
};

export default LayoutEditor;
