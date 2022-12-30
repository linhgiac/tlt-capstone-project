import { Button } from 'antd';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
// import { MOCKED_TEMPLATES } from '../../mock/resume.mock';
import { TemplateCategoryType, TemplatesDataType } from '../../configs/interfaces/template.interface';
import TemplateHeader from '../../components/page/template/template-header';
import TemplateCategoryTabs from '../../components/page/template/template-category-tabs';

type TemplatesProps = {
    templatesData: TemplatesDataType;
};

const Templates = (props: TemplatesProps) => {
    // const { templatesData } = props;
    // const onChangeCategory = (category: string) => {
    //     console.log("Change category");
    //     // if (category === "all")
    //     //     router.replace("/templates");
    //     // else
    //     router.replace("/templates/" + category);
    // }
    const router = useRouter()
    const id = router.query.id as string;
    // const category = id === undefined ? 'all' : id;
    console.log(id);
    // console.log('pre-rendering data', templatesData);


    useEffect(() => {
        if (id === undefined)
            router.replace("/templates/all");
        // const validKey: string[] = ['creative', 'modern', 'professional', 'simple'];
        // if (id !== undefined && validKey.indexOf(id) === -1)
        //     router.replace("/templates");
    }, []);

    return (
        <></>
        // <div className='p-48'>
        //     <div className='center text-center'>
        //         <TemplateHeader category={category}></TemplateHeader>
        //     </div>
        //     <div className='center p-t-32'>
        //         <Button
        //             type='primary'
        //             size='large'
        //             onClick={() => {
        //                 router.push({
        //                     pathname: '/dashboard',
        //                 });
        //             }}>
        //             Create My Resume
        //         </Button>
        //     </div>
        //     <div className='center p-t-32'>
        //         <TemplateCategoryTabs defaultKey={category} onChange={onChangeCategory}></TemplateCategoryTabs>
        //     </div>
        // </div>
    );
};

export default Templates;


// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const category = context.params === undefined || context.params.id === undefined ? 'all' : context.params.id;
//     return { props: { templatesData: MOCKED_TEMPLATES[category as TemplateCategoryType] } };
// }
