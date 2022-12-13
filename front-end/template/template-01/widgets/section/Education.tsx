import React from 'react';
import { EducationItemDataType } from '../../../../configs/interfaces/resume.interface';
import DataDisplay from '../../../shared/DataDisplay';
import Divide from '../divide/Divide';

type Props = {
    header?: string;
    items?: EducationItemDataType[];
};

const Education = (props: Props) => {
    const { header, items } = props;
    return (
        <div>
            <div>
                <Divide />
                <DataDisplay>{header}</DataDisplay>
                {items?.map(item => {
                    return (
                        <>
                            <DataDisplay>{item.school}</DataDisplay>
                            <DataDisplay>
                                {item.startDate} -{' '}
                                {item.endDate ? item.endDate : 'Now'}
                            </DataDisplay>
                            <DataDisplay>{item.degree}</DataDisplay>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default Education;
