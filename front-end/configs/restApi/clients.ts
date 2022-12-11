import { IncomingMessage } from 'http';
import { NextApiResponse } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export const getAuthHeader = (
    options: {
        req?: IncomingMessage & { cookies: NextApiRequestCookies };
        res?: NextApiResponse | any;
    } = {}
) => {
    const { req, res } = options;
    const accessToken = getCookie()
};
