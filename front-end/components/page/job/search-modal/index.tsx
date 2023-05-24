import axios from "axios";

import React, { useState } from "react";

import { useRecoilState } from "recoil";

import { Form, Input, Button, Select } from "antd";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
import { HOST } from "../../../../configs/constants/misc";
import { jobPostingsState } from "../../../../recoil-state/job-state/job-state";
import { DEFAULT_JOB_TITLE_INPUT } from "../../../../configs/constants/job.constants";

type SearchModalContentProps = {
    handleSearchModalCancel: () => void,
};

const SearchModalContent = (props: SearchModalContentProps) => {
    const { handleSearchModalCancel } = props;
    const [jobPostings, setJobPostings] = useRecoilState(jobPostingsState)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        console.log("TvT log: value from search modal", values);
        setLoading(true)
        // try {
        //     const response = await axios.get(
        //         `${HOST}jobs/?keywords=${values.keywords}&location=${values.location}`,
        //     );
        //     console.log("TvT log: response data from search modal: ", response.data);
        //     setJobPostings(response.data)
        //     setLoading(false)
        //     handleSearchModalCancel()
        // } catch (error: any) {
        //     error?.response?.data.detail &&
        //         // setError(error.response.data.detail);
        //         // Error Handling
        //         console.log(error.response.data.detail);
        // }
    };

    return (
        <>
            <Form
                form={form}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="job_title"
                    initialValue={DEFAULT_JOB_TITLE_INPUT}
                >
                    <Input
                        placeholder="Enter a job title"
                        allowClear
                        prefix={<SearchOutlined />}
                    />
                </Form.Item>
                <Form.Item
                    name="location"
                    initialValue="Ho Chi Minh city, Vietnam"
                >
                    <Select
                        showSearch
                        placeholder="Select a city"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: 'Ho Chi Minh city, Vietnam',
                                label: 'Hồ Chí Minh',
                            },
                            {
                                value: 'Ha Noi city, Vietnam',
                                label: 'Hà Nội',
                            },
                            {
                                value: 'Da Nang city, Vietnam',
                                label: 'Đà Nẵng',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                    >
                        SEARCH
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default SearchModalContent;