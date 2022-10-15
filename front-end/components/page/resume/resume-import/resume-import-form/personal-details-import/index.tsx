import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import SectionImportTitle from '../../section-import-title';
import ImageUpload from '../../../../../custom/image-upload';
import classNames from 'classnames';
import styles from './styles.module.scss';
import {
    FieldFormData,
    PersonalDetailsFormValue,
} from '../../../../../../configs/interfaces/resume';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    personalDetailFieldsState,
    personalDetailValueState,
} from '../../../../../../recoil-state/resume-state';

type PersonalDetailsImportProps = {
    className?: string;
};

const PersonalDetailsImport = (props: PersonalDetailsImportProps) => {
    const { className } = props;
    const [form] = Form.useForm();

    const [personalDetailFields, setPersonalDetailFields] = useRecoilState(
        personalDetailFieldsState
    );
    const changeFieldsHandler = (_: any, allFields: any) => {
        console.log(
            'all Fields:',
            allFields.map((field: any) => {
                return { name: field.name[0], value: field.value };
            })
        );
        setPersonalDetailFields(
            allFields.map((field: any) => {
                return { name: field.name[0], value: field.value };
            })
        );
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
                            label='Wanted Job Title'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        span={12}
                        className={classNames('p-l-24', 'no-margin')}>
                        <Form.Item className='no-margin' name='avatar' label=''>
                            <ImageUpload
                                className={classNames(
                                    'no-margin',
                                    'no-padding'
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='start'>
                    <Col span={12} className='p-r-24'>
                        <Form.Item
                            className='no-margin'
                            name='firstName'
                            label='First Name'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} className='p-l-24'>
                        <Form.Item
                            className='no-margin'
                            name='lastName'
                            label='Last Name'>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='start'>
                    <Col span={12} className='p-r-24'>
                        <Form.Item
                            className='no-margin'
                            name='email'
                            label='Email'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} className='p-l-24'>
                        <Form.Item
                            className='no-margin'
                            name='phone'
                            label='Phone'>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='start'>
                    <Col span={12} className='p-r-24'>
                        <Form.Item
                            className='no-margin'
                            name='country'
                            label='Country'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} className='p-l-24'>
                        <Form.Item
                            className='no-margin'
                            name='city'
                            label='City'>
                            <Input />
                        </Form.Item>
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
                layout='vertical'
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
