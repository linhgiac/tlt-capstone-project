import React from 'react';
import { FieldFormData } from '../../../../../configs/interfaces/resume';
import PersonalDetailsImport from './personal-details-import';
import ProfessionalSummaryImport from './professional-summary-import';

type Props = {
    className?: string;
    onChange: (fields: FieldFormData[]) => void;
    fields: FieldFormData[];
};

const ResumeImportForm = (props: Props) => {
    const { className, onChange, fields } = props;
    return (
        <div>
            <PersonalDetailsImport
                className='p-b-20'
                fields={fields}
                onChange={}
            />
            <ProfessionalSummaryImport className='p-b-20' />
        </div>
    );
};

export default ResumeImportForm;
