import axios from "axios";

import React, { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { Form, Input, Button, Select } from 'antd';
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';
import { HOST } from '../../../../configs/constants/misc';
import {
    jobPostingsState,
    jobQueryState,
} from '../../../../recoil-state/job-state/job-state';
import {
    DEFAULT_JOB_TITLE_INPUT,
    JOB_DATA,
} from '../../../../configs/constants/job.constants';
import { convertSearchJobPayload } from '../../../../configs/utils/format.utils';
import { useRouter } from 'next/router';
import { kebabCase } from 'lodash';

type SearchModalContentProps = {
    // horizontal?: boolean;
};

const SearchModalContent = (props: SearchModalContentProps) => {
    const router = useRouter();
    const [jobPostings, setJobPostings] = useRecoilState(jobPostingsState);
    const [searchQuery, setSearchQuery] = useRecoilState(jobQueryState);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            job_title: searchQuery.job_title,
            location: searchQuery.location,
        });
    }, [searchQuery]);
    const handleSubmit = async (values: any) => {
        console.log('TvT log: value from search modal', values);
        setLoading(true);
        setSearchQuery({
            job_title: values.job_title,
            location: values.location,
            sort_by: 'relevancy',
        });
        router.push({
            pathname: '/job-postings/[search]',
            query: {
                search: `${kebabCase(values.job_title)}_${values.location}`,
            },
        });

        setLoading(false);
    };

    return (
        <>
            <Form
                form={form}
                onFinish={handleSubmit}>
                <div className={styles['search-form__item']}>
                    <Form.Item name="job_title">
                        <Input
                            placeholder="Enter a job title"
                            size="large"
                            style={{ height: '40px', borderRadius: '4px' }}
                            allowClear
                            prefix={<SearchOutlined />}
                        />
                    </Form.Item>
                    <Form.Item name="location">
                        <Select
                            showSearch
                            placeholder="Select a city"
                            optionFilterProp="children"
                            size="large"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={[
                                {
                                    value: 'ho-chi-minh',
                                    label: 'Hồ Chí Minh',
                                },
                                {
                                    value: 'ha-noi',
                                    label: 'Hà Nội',
                                },
                                {
                                    value: 'da-nang',
                                    label: 'Đà Nẵng',
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            style={{
                                borderRadius: '8px',
                                height: '40px',
                                width: '150px',
                            }}
                            htmlType="submit"
                            block
                            loading={loading}>
                            SEARCH
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};

export default SearchModalContent;