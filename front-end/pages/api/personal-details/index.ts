// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PersonalDetails } from '../../../configs/interfaces/resume'
import { PersonalDetailData } from '../../../mock/resume'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PersonalDetails | {}>
) {
  res.status(200).json({})
}
