import { getCookie } from 'cookies-next';
import { IncomingMessage } from 'http';
import { NextApiResponse } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { GetServerSidePropsContext } from 'next'
import axios from 'axios';

<<<<<<< Updated upstream
export const getAuthHeader = (
    options: {
        // req, res is required if using SSR
        req?: IncomingMessage & { cookies: NextApiRequestCookies }
        res?: NextApiResponse | any
    } = {}
) => {
    const { req, res } = options
    // Calling tracker
    const accessToken = getCookie('access-token', { req, res })

    const headers: any =
    {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }

    return headers
}

export const getInitialPageProps = async (ctx: GetServerSidePropsContext) => {
    const { req, res } = ctx
    const headers = getAuthHeader({ req, res })
    const currentUser = await axios.post('url', 'data',
        {
            headers: headers,
        })

    return {
        headers,
        currentUser: currentUser === null ? null : currentUser.data.currentUser,
    }
}
=======
// export const getAuthHeader = (
//     options: {
//         req?: IncomingMessage & { cookies: NextApiRequestCookies };
//         res?: NextApiResponse | any;
//     } = {}
// ) => {
//     const { req, res } = options;
//     const accessToken = getCookie()
// };
>>>>>>> Stashed changes
