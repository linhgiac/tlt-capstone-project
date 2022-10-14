import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import SectionImportTitle from '../../section-import-title';
import ImageUpload from '../../../../../custom/image-upload';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useForm } from 'antd/es/form/Form';
import {
    FieldFormData,
    PersonalDetailsFormValue,
} from '../../../../../../configs/interfaces/resume';
import { useRecoilState } from 'recoil';
import { personalDetailFieldsState } from '../../../../../../recoil-state/resume-state';

type PersonalDetailsImportProps = {
    className?: string;
};

const PersonalDetailsImport = (props: PersonalDetailsImportProps) => {
    const { className } = props;
    const [form] = useForm();

    const [personalDetailFields, setPersonalDetailFields] = useRecoilState(
        personalDetailFieldsState
    );
    const changeFieldsHandler = (_: any, allFields: any) => {
        console.log('all Fields:', allFields);
        setPersonalDetailFields(allFields);
    };

    // const onFinish = async (values: PersonalDetailsFormValue) => {
    //     const response = await fetch(
    //         '../../../../../pages/api/personal-details',
    //         {
    //             method: 'POST',
    //             body: JSON.stringify({}),
    //         }
    //     );
    // };

    const getFixedField = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [expand, setExpand] = useState(false);

        return (
            <>
                <Row justify='start'>
                    <Col span={12} className='p-r-24'>
                        <Form.Item
                            className='no-margin'
                            name='jobTitle'
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
                            name='firstName'
                            label='First Name'></Form.Item>
                        <Input />
                    </Col>
                    <Col span={12} className='p-l-24'>
                        <Form.Item
                            className='no-margin'
                            name='lastName'
                            label='Last Name'></Form.Item>
                        <Input />
                    </Col>
                </Row>
                <Row justify='start'>
                    <Col span={12} className='p-r-24'>
                        <Form.Item
                            className='no-margin'
                            name='email'
                            label='Email'></Form.Item>
                        <Input />
                    </Col>
                    <Col span={12} className='p-l-24'>
                        <Form.Item
                            className='no-margin'
                            name='phone'
                            label='Phone'></Form.Item>
                        <Input />
                    </Col>
                </Row>
                <Row justify='start'>
                    <Col span={12} className='p-r-24'>
                        <Form.Item
                            className='no-margin'
                            name='country'
                            label='Country'></Form.Item>
                        <Input />
                    </Col>
                    <Col span={12} className='p-l-24'>
                        <Form.Item
                            className='no-margin'
                            name='city'
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
            <Form
                form={form}
                fields={personalDetailFields}
                onFieldsChange={changeFieldsHandler}
                size='large'
                colon={false}>
                {getFixedField()}
            </Form>
        </div>
    );
};

export default PersonalDetailsImport;
