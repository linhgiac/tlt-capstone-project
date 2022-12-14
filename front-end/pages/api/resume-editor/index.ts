import { MOCKED_RESUME } from './../../../mock/resume.mock';
import { resumeValueState } from '../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { ResumeDataType, PersonalDetailsDataType } from '../../../configs/interfaces/resume.interface';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PersonalDetailData } from '../../../mock/resume.mock'
import resumeMockedData from '../../../mock/resume.json'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResumeDataType | {}>
) {
  if (req.method === "GET"){
    res.status(200).json(resumeMockedData)
  }
  else if (req.method === "POST"){
    const resumeDataValue = req.body.resumeValue
    res.status(201).json(resumeDataValue)
  }
}
