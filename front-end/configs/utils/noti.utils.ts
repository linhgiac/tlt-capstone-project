export const openNotificationWithIcon = (
    type: 'success' | 'error',
    api: any,
    title: string,
    msg: string
) => {
    api[type]({
        message: title,
        description: msg,
    });
    // console.log('api', api)
};
