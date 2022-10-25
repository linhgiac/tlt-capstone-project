export const arrangePosition = (items: any) => {
    return items.map((item: any) =>( {...item, position:items.indexOf(item)}))
}