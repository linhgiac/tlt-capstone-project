import React, { useState, useRef, useEffect } from "react";

import { Form, Input, Button, Collapse, Checkbox, Radio, Space, Tooltip, Tag } from "antd";
import type { InputRef } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from "./styles.module.scss";
import { JOB_DATA } from '../../../../configs/constants/job.constants';
import { useRouter } from 'next/router';
import { kebabCase } from 'lodash';
import { useRecoilValue } from 'recoil';
import { jobQueryState } from '../../../../recoil-state/job-state/job-state';

type FilterModalContentProps = {};

const FilterModalContent = (props: FilterModalContentProps) => {
    const {} = props;
    const router = useRouter();
    /*
        KEY WORDS HANDLING
    */
    const [filterForm] = Form.useForm();
    const [tags, setTags] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);
    const searchQuery = useRecoilValue(jobQueryState);

    useEffect(() => {
        console.log('keywords', router.query.keywords);
        if (
            router.query.keywords &&
            typeof router.query.keywords === 'string'
        ) {
            setTags([router.query.keywords]);
        } else if (router.query.keywords) {
            setTags(router.query.keywords);
        }
    }, [router]);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);

    useEffect(() => {
        filterForm.setFieldsValue({
            sort_by: router.query.sort_by,
            job_portal: router.query.job_portal,
            last_updated: router.query.last_updated,
        });
    }, [router]);

    const filterHandler = (values: any) => {
        console.log('TvT log: value from filter modal', {
            ...values,
            keywords: tags,
        });
        setLoading(true);
        console.log('search', searchQuery);
        router.push({
            pathname: '/job-postings/[search]',
            query: {
                search: `${kebabCase(searchQuery.job_title)}_${
                    searchQuery.location
                }`,
                ...values,
                keywords: tags,
            },
        });

        setLoading(false);
    };
    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag: any) => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
    };

    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setInputValue('');
    };
    /*
        ~ KEY WORDS HANDLING
    */

    return (
        <>
            <Form
                onFinish={filterHandler}
                form={filterForm}>
                <Collapse
                    expandIconPosition="end"
                    collapsible="header"
                    bordered={false}
                    className={styles['form-collapse']}>
                    <Collapse.Panel
                        header="Sort By"
                        key="1">
                        <Form.Item
                            name="sort_by"
                            initialValue="relevancy">
                            <Radio.Group>
                                <Radio.Button value="relevancy">
                                    Relevancy
                                </Radio.Button>
                                <Radio.Button value="newest">
                                    Newest
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Collapse.Panel>
                    <Collapse.Panel
                        header="Job Portal"
                        key="2">
                        <Form.Item name="job_portal">
                            <Checkbox.Group>
                                <Checkbox value="linkedin">Linkedin</Checkbox>
                                <br />
                                <Checkbox value="vietnamworks">
                                    VietnamWorks
                                </Checkbox>
                                <br />
                                <Checkbox value="topcv">TopCV</Checkbox>
                                <br />
                            </Checkbox.Group>
                        </Form.Item>
                    </Collapse.Panel>
                    <Collapse.Panel
                        header="Keywords (Skills/Certificates/...)"
                        key="3">
                        <Form.Item name="keywords">
                            {tags.map((tag: any, index: any) => {
                                if (editInputIndex === index) {
                                    return (
                                        <Input
                                            ref={editInputRef}
                                            key={tag}
                                            size="small"
                                            className={styles['tag-input']}
                                            value={editInputValue}
                                            onChange={handleEditInputChange}
                                            onBlur={handleEditInputConfirm}
                                            onPressEnter={
                                                handleEditInputConfirm
                                            }
                                        />
                                    );
                                }

                                const isLongTag = tag.length > 20;

                                const tagElem = (
                                    <Tag
                                        className={styles['edit-tag']}
                                        key={tag}
                                        closable={true}
                                        onClose={() => handleClose(tag)}>
                                        <span
                                            onDoubleClick={e => {
                                                if (index !== 0) {
                                                    setEditInputIndex(index);
                                                    setEditInputValue(tag);
                                                    e.preventDefault();
                                                }
                                            }}>
                                            {isLongTag
                                                ? `${tag.slice(0, 20)}...`
                                                : tag}
                                        </span>
                                    </Tag>
                                );
                                return isLongTag ? (
                                    <Tooltip
                                        title={tag}
                                        key={tag}>
                                        {tagElem}
                                    </Tooltip>
                                ) : (
                                    tagElem
                                );
                            })}
                            {inputVisible && (
                                <Input
                                    ref={inputRef}
                                    type="text"
                                    size="small"
                                    className={styles['tag-input']}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputConfirm}
                                    onPressEnter={handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (
                                <Tag
                                    className={styles['site-tag-plus']}
                                    onClick={showInput}>
                                    <PlusOutlined /> New Keyword
                                </Tag>
                            )}
                        </Form.Item>
                    </Collapse.Panel>
                    <Collapse.Panel
                        header="Last Updated"
                        key="4">
                        <Form.Item name="last_updated">
                            <Radio.Group
                            // onChange={onChange}
                            // value={value}
                            >
                                <Space direction="vertical">
                                    <Radio value={1}>3 Days ago</Radio>
                                    <Radio value={2}>Past Week</Radio>
                                    <Radio value={3}>Any Time</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </Collapse.Panel>
                </Collapse>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block>
                        REFINE JOBS
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default FilterModalContent;