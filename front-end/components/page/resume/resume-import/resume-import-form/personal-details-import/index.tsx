import React, { useState } from 'react';
import { Col, Form, Input, Row, Typography } from 'antd';
import SectionImportTitle from '../../section-import-title';
import ImageUpload from '../../../../../custom/image-upload';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    personalDetailFieldsState,
    personalDetailTitleState,
} from '../../../../../../recoil-state/resume-state';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

type PersonalDetailsImportProps = {
    className?: string;
};

const PersonalDetailsImport = (props: PersonalDetailsImportProps) => {
    const { className } = props;
    const [form] = Form.useForm();

    const [personalDetailFields, setPersonalDetailFields] = useRecoilState(
        personalDetailFieldsState
    );
    const personalDetailTitle = useRecoilValue(personalDetailTitleState);

    const changeFieldsHandler = (_: any, allFields: any) => {
        setPersonalDetailFields(
            allFields.map((field: any) => {
                return { name: field.name[0], value: field.value };
            })
        );
    };

    const getFixedField = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [expand, setExpand] = useState(false);
        const { Text } = Typography;

        const expandHandler = () => {
            setExpand(!expand);
        };
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
                {!expand ? (
                    <Text
                        className={styles['expand-details-text']}
                        onClick={expandHandler}>
                        <br />
                        Edit additional details <DownOutlined />
                    </Text>
                ) : (
                    <>
                        <Row justify='start'>
                            <Col span={12} className='p-r-24'>
                                <Form.Item
                                    className='no-margin'
                                    name='address'
                                    label='Address'>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12} className='p-l-24'>
                                <Form.Item
                                    className='no-margin'
                                    name='postalCode'
                                    label='Postal Code'>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify='start'>
                            <Col span={12} className='p-r-24'>
                                <Form.Item
                                    className='no-margin'
                                    name='drivingLicense'
                                    label='Driving License'>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12} className='p-l-24'>
                                <Form.Item
                                    className='no-margin'
                                    name='nationality'
                                    label='Nationality'>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify='start'>
                            <Col span={12} className='p-r-24'>
                                <Form.Item
                                    className='no-margin'
                                    name='placeOfBirth'
                                    label='Place Of Birth'>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12} className='p-l-24'>
                                <Form.Item
                                    className='no-margin'
                                    name='dateOfBirth'
                                    label='Date Of Birth'>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Text
                            className={styles['expand-details-text']}
                            onClick={expandHandler}>
                            <br />
                            Hide additional details <UpOutlined />
                        </Text>
                    </>
                )}
            </>
        );
    };
    return (
        <div className={classNames(className)}>
            <SectionImportTitle>{personalDetailTitle}</SectionImportTitle>
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
