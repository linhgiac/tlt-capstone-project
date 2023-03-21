import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import styles from './styles.module.scss';
import {
    personalDetailChangedValueState,
    professionalSummaryChangedValueState,
    resumeChangedValueState,
    resumeInfoState,
} from '../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import {
    employmentHistoryItemsState,
    educationItemsState,
    linkItemsState,
    skillItemsState,
    employmentHistoriesDetailsState,
    educationsDetailsState,
    linksDetailsState,
    skillsDetailsState,
} from '../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';
import { Button, Dropdown, Menu } from 'antd';
import { LinkItemDataType } from '../../../../../configs/interfaces/resume.interface';
import  {
    personalDetailTitleValueState,
    professionalSummaryTitleValueState,
    employmentHistoryTitleValueState,
    educationTitleValueState,
    linkTitleValueState,
    skillTitleValueState,
    customTitleValueState
} from '../../../../../recoil-state/resume-state/resume-title.state'

import ATSVerfiyTitle from './ats-title-suggestion-item';
import { getTitleSuggestion, verifyTitle } from '../../../../../configs/utils/ats.utils';
import ATSTitleSuggestionItem from './ats-title-suggestion-item';

type Props = {

}

type ItemProps = {
    item: any
    time: number
}

const sectionKeyPrefix: string = "section"
const itemKeyPrefix: string = "item"
const titleKeyPrefix: string = "title"


const ATSRecommendations = (props:Props) => {
    const [skillItemsStateValue, setSkillItemsState] = useRecoilState(skillItemsState)
    const [educationItemsStateValue, setEducationItemsState] = useRecoilState(educationItemsState)

    const [personalDetailTitleStateValue, setPersonalDetailTitleState] =  useRecoilState(personalDetailTitleValueState)
    const [professionalSummaryTitleStateValue, setProfessionalSummaryTitleState] =  useRecoilState(professionalSummaryTitleValueState)
    const [employmentHistoryTitleStateValue, setEmploymentHistoryTitleState] =  useRecoilState(employmentHistoryTitleValueState)
    const [educationTitleStateValue, setEducationTitleState] =  useRecoilState(educationTitleValueState)
    const [linkTitleStateValue, setLinkTitleState] =  useRecoilState(linkTitleValueState)
    const [skillTitleStateValue, setSkillTitleState] =  useRecoilState(skillTitleValueState)

    const [titleItems, setTitleItems] = useState<JSX.Element[] | false>([])

    //#region convert to menu
    const convertToItemContainer: any = (allItems: any) => {
        // console.log("ATS Itemss: ", items)
        let container: any = []
        let count = 0
        allItems.forEach((items: JSX.Element[]) => {
            items.forEach((item: JSX.Element) => {
                if(item != null) {
                    count += 1
                    container.push(
                        {
                            key: count,
                            label: item,
                        }
                    )
                }
            })
        })
        return container
    }
    
    const convertToMenu: any = (allItems: any) => {
        return <Menu items={convertToItemContainer(allItems)}/>
    }
    //#endregion

    useEffect(() => {
        const temp: string[] = []
        temp.push(personalDetailTitleStateValue)
        temp.push(professionalSummaryTitleStateValue)
        temp.push(employmentHistoryTitleStateValue)
        temp.push(educationTitleStateValue)
        temp.push(linkTitleStateValue)
        temp.push(skillTitleStateValue)

        const invalidTitles = temp.filter((title) => !verifyTitle(title))
        setTitleItems(invalidTitles.map((title, i) => {
            return <ATSTitleSuggestionItem key={i} title={title} suggestion={getTitleSuggestion(title)}></ATSTitleSuggestionItem>
        }))
    }, [educationTitleStateValue, 
        employmentHistoryTitleStateValue,
        linkTitleStateValue,
        personalDetailTitleStateValue,
        professionalSummaryTitleStateValue, 
        skillTitleStateValue])

    return (
    <div className={classNames(styles['ats-container'])}>
        <Dropdown overlay={convertToMenu([titleItems])} placement='bottomRight'>
            <Button>...</Button>
        </Dropdown>
       
    </div>
    )
}

export default ATSRecommendations