import React, { useState } from 'react';
import { Col, Form, Input, Row } from 'antd';
import SectionImportTitle from '../section-import-title';
import ImageUpload from '../../../../custom/image-upload';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useForm } from 'antd/es/form/Form';

type PersonalDetailsImportProps = {
    className?: string;
};

const PersonalDetailsImport = (props: PersonalDetailsImportProps) => {
    const { className } = props;
    const [form] = useForm();
    const getFixedField = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [expand, setExpand] = useState(false);

        return (
            <>
                <Row justify='start'>
                    <Col span={12} className='p-r-24'>
                        <Form.Item
                            className='no-margin'
                            label='Wanted Job Title'></Form.Item>
                        <Input />
                    </Col>
                    <Col
                        span={12}
                        className={classNames('p-l-24', 'no-margin')}>
                        <ImageUpload
                            className={classNames('no-margin', 'no-padding')}
                        />
                    </Col>
                </Row>
                <Row justify='start'>
                    <Col span={12} className='p-r-24'>
                        <Form.Item
                            className='no-margin'
                            label='First Name'></Form.Item>
                        <Input />
                    </Col>
                    <Col span={12} className='p-l-24'>
                        <Form.Item
                            className='no-margin'
                            label='Last Name'></Form.Item>
                        <Input />
                    </Col>
                </Row>
                <Row justify='start'>
                    <Col span={12} className='p-r-24'>
                        <Form.Item
                            className='no-margin'
                            label='Email'></Form.Item>
                        <Input />
                    </Col>
                    <Col span={12} className='p-l-24'>
                        <Form.Item
                            className='no-margin'
                            label='Phone'></Form.Item>
                        <Input />
                    </Col>
                </Row>
                <Row justify='start'>
                    <Col span={12} className='p-r-24'>
                        <Form.Item
                            className='no-margin'
                            label='Country'></Form.Item>
                        <Input />
                    </Col>
                    <Col span={12} className='p-l-24'>
                        <Form.Item
                            className='no-margin'
                            label='City'></Form.Item>
                        <Input />
                    </Col>
                </Row>
            </>
        );
    };
    return (
        <div className={classNames(className)}>
            <SectionImportTitle>Personal Details</SectionImportTitle>
            <Form form={form} size='large' colon={false}>
                {getFixedField()}
            </Form>
        </div>
    );
};

export default PersonalDetailsImport;
