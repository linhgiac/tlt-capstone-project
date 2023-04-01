import { arrayMove } from '@dnd-kit/sortable';
import { get } from 'lodash';


export const removeAtIndex = (array: any, index: number) => {
    return [...array.slice(0, index), ...array.slice(index + 1)];
};
export const insertAtIndex = (array: any, index: number, item: any) => {
    return [...array.slice(0, index), item, ...array.slice(index)];
};

export const moveBetweenContainers = (
    pages: any,
    item: any,
    activeIndex: number,
    activeContainer: any,
    overIndex: number,
    overContainer: any
) => {
    const [activeColumn, activePage] = activeContainer.split('-');
    const [overColumn, overPage] = overContainer?.split('-');

    const newPages = pages.map((page: any, i: number) => {
        if (i === +activePage && i === +overPage) {
            return {
                ...page,
                [activeColumn]: removeAtIndex(page[activeColumn], activeIndex),
                [overColumn]: insertAtIndex(page[overColumn], overIndex, item),
            };
        } else if (i === +activePage) {
            return {
                ...page,
                [activeColumn]: removeAtIndex(page[activeColumn], activeIndex),
            };
        } else if (i === +overPage) {
            return {
                ...page,
                [overColumn]: insertAtIndex(page[overColumn], overIndex, item),
            };
        } else return page;
    });
    return newPages;
    // return item;
};

export const moveInsideContainer = (
    pages: any,
    activeIndex: number,
    activeContainer: any,
    overIndex: number
) => {
    const [activeColumn, activePage] = activeContainer.split('-');

    const newPages = pages.map((page: any, i: number) => {
        if (i === +activePage) {
            return {
                ...page,
                [activeColumn]: arrayMove(
                    page[activeColumn],
                    activeIndex,
                    overIndex
                ),
            };
        } else return page;
    });
    return newPages;
};
