import { Button } from 'antd';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { TemplateCategoryType, TemplatesDataType } from '../../configs/interfaces/template.interface';
import TemplateHeader from '../../components/page/template/template-header';
import TemplateCategoryTabs from '../../components/page/template/template-category-tabs';

type TemplatesProps = {
    templatesData: TemplatesDataType;
};

const Templates = (props: TemplatesProps) => {
    // const { templatesData } = props;
    // const onChangeCategory = (category: string) => {
    //     // if (category === "all")
    //     //     router.replace("/templates");
    //     // else
    //     router.replace("/templates/" + category);
    // }
    const router = useRouter()
    const id = router.query.id as string;
    // const category = id === undefined ? 'all' : id;


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
