import { Button } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import {
    TemplateCategoryType,
    TemplatesDataType,
} from '../../../configs/interfaces/template.interface';
import TemplateHeader from '../../../components/page/template/template-header';
import TemplateCategoryTabs from '../../../components/page/template/template-category-tabs';
import TemplateContainer from '../../../components/page/template/template-container';
import axios from 'axios';
import { HOST } from '../../../configs/constants/misc';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

type TemplatesProps = {
    templatesData: TemplatesDataType;
};

const Templates = (props: TemplatesProps) => {
    const { templatesData } = props;
    const {t} = useTranslation();
    const router = useRouter();
    const id = router.query.id as string;


    const onChangeCategory = (newId: string) => {
        console.log('Change category');
        router.replace('/templates/' + newId);
    };

    useEffect(() => {
        const validKey: string[] = [
            'all',
            'creative',
            'modern',
            'professional',
            'simple',
        ];
        if (id !== undefined && validKey.indexOf(id) === -1)
            router.replace('/templates');
    }, []);

    return (
        <div className="p-48">
            <div className="center text-center">
                <TemplateHeader category={id}></TemplateHeader>
            </div>
            <div className="center p-t-32">
                <Button
                    type="primary"
                    size="large"
                    className={styles['button']}
                    onClick={() => {
                        router.push({
                            pathname: '/dashboard',
                        });
                    }}>
                    {t('template-create-button', {ns: 'template'})}
                </Button>
            </div>
            <div className="center p-t-32">
                <TemplateCategoryTabs
                    activeKey={id}
                    onChange={onChangeCategory}></TemplateCategoryTabs>
            </div>
            <div className="center p-32">
                <TemplateContainer
                    data={templatesData.data}></TemplateContainer>
            </div>
        </div>
    );
};

export default Templates;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const getUrl = (category: any) => {
        if (category === 'all')
            return '';
        else
            return `?category=${category}`;
    }
    const category = ctx.params === undefined || ctx.params.id === undefined ? 'all' : ctx.params.id;
    console.log(`${HOST}resume-template/?category=${getUrl(category)}`);
    const templates = await axios.get(
        `${HOST}resume-template/${getUrl(category)}`,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })

    // console.log(templates.data);
    if(ctx.params === undefined || ctx.params.id === undefined) {
        return {
            props: { 
                templatesData: templates === null ? null : { data: templates.data },
            }
        }    
    } else {
        const {locale} = ctx;
        return {
            props: { 
                templatesData: templates === null ? null : { data: templates.data },
                ...await serverSideTranslations(locale as string, ['template']),
            }
        }
    }
}
