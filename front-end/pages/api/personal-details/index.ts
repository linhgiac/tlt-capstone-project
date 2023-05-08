// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PersonalDetailsDataType } from '../../../configs/interfaces/resume.interface'
import { PersonalDetailData } from '../../../mock/resume.mock'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PersonalDetailsDataType | {}>
) {
  res.status(200).json({})
}
