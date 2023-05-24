import React, { useState, useRef, useEffect } from "react";

import { Form, Input, Button, Collapse, Checkbox, Radio, Space, Tooltip, Tag } from "antd";
import type { InputRef } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from "./styles.module.scss";

type FilterModalContentProps = {
    handleFilterModalCancel: () => void,
};

const FilterModalContent = (props: FilterModalContentProps) => {
    const { handleFilterModalCancel } = props;
    /*
        KEY WORDS HANDLING
    */
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter(tag => tag !== removedTag);
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
            <Form>
                <Collapse
                    expandIconPosition="end"
                    collapsible="header"
                    bordered={false}
                    className={styles["form-collapse"]}
                >
                    <Collapse.Panel
                        header="Sort By"
                        key="1"
                    >
                        <Form.Item>
                            <Button>Relevancy</Button>
                            <Button>Newest</Button>
                        </Form.Item>
                    </Collapse.Panel>
                    <Collapse.Panel
                        header="Job Portal"
                        key="2"
                    >
                        <Form.Item>
                            <Checkbox>Linkedin</Checkbox>
                            <br />
                            <Checkbox>VietnamWorks</Checkbox>
                            <br />
                            <Checkbox>TopCV</Checkbox>
                            <br />
                        </Form.Item>
                    </Collapse.Panel>
                    <Collapse.Panel
                        header="Keywords (Skills/Certificates/...)"
                        key="3"
                    >
                        <Form.Item>
                            {tags.map((tag, index) => {
                                if (editInputIndex === index) {
                                    return (
                                        <Input
                                            ref={editInputRef}
                                            key={tag}
                                            size="small"
                                            className={styles["tag-input"]}
                                            value={editInputValue}
                                            onChange={handleEditInputChange}
                                            onBlur={handleEditInputConfirm}
                                            onPressEnter={handleEditInputConfirm}
                                        />
                                    );
                                }

                                const isLongTag = tag.length > 20;

                                const tagElem = (
                                    <Tag
                                        className={styles["edit-tag"]}
                                        key={tag}
                                        closable={true}
                                        onClose={() => handleClose(tag)}
                                    >
                                        <span
                                            onDoubleClick={e => {
                                                if (index !== 0) {
                                                    setEditInputIndex(index);
                                                    setEditInputValue(tag);
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                        </span>
                                    </Tag>
                                );
                                return isLongTag ? (
                                    <Tooltip title={tag} key={tag}>
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
                                    className={styles["tag-input"]}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputConfirm}
                                    onPressEnter={handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (
                                <Tag className={styles["site-tag-plus"]} onClick={showInput}>
                                    <PlusOutlined /> New Keyword
                                </Tag>
                            )}
                        </Form.Item>
                    </Collapse.Panel>
                    <Collapse.Panel
                        header="Last Updated"
                        key="4"
                    >
                        <Form.Item>
                            <Radio.Group
                            // onChange={onChange}
                            // value={value}
                            >
                                <Space direction="vertical">
                                    <Radio value={1}>3 Days agon</Radio>
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
                        block
                    >
                        REFINE JOBS
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default FilterModalContent;