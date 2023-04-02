import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Input, Row, Typography } from 'antd';
import SectionImportTitle from '../../section-import-title';
import ImageUpload from '../../../../../custom/image-upload';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import {
    FieldFormData,
    PersonalDetailsDataType,
} from '../../../../../../configs/interfaces/resume.interface';
import { personalDetailTitleValueState } from '../../../../../../recoil-state/resume-state/resume-title.state';
import { assignIn } from 'lodash';
import { personalDetailChangedValueState } from '../../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { resumeSavedState } from '../../../../../../recoil-state/resume-state/resume.state';
// import { personalDetailValueState } from '../../../../../../recoil-state/resume-state/resume-single-section.state';
import { useTranslation } from 'next-i18next';

type PersonalDetailsImportProps = {
    className?: string;
    defaultTitle?: string;
};

const PersonalDetailsImport = (props: PersonalDetailsImportProps) => {
    const [resumeSaved, setResumeSaved] = useRecoilState(resumeSavedState);
    const { className, defaultTitle } = props;
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [personalDetailsChangedValues, setPersonalDetailsChangedValues] =
        useRecoilState(personalDetailChangedValueState);
    const [personalDetailTitle, setPersonalDetailTitle] = useRecoilState(
        personalDetailTitleValueState
    );

    const changeValuesHandler = useCallback(
        (changedValues: any, values: any) => {
            setPersonalDetailsChangedValues((prev: any) => {
                const result = { ...prev, ...changedValues };
                return result;
            });
            // setPersonalDetailsValues(values);
        },
        [setPersonalDetailsChangedValues]
    );

    useEffect(() => {
        form.setFieldsValue(resumeSaved?.personalDetails);
    }, [form, resumeSaved?.personalDetails]);

    // useEffect(() => {
    //     form.setFieldsValue(personalDetailsChangedValues);
    //     const fields = form.getFieldsValue(true);
    // }, [form, personalDetailsChangedValues, setPersonalDetailsChangedValues]);
    const getFixedField = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [expand, setExpand] = useState(false);
        const { Text } = Typography;

        const expandHandler = () => {
            setExpand(!expand);
        };
        return (
            <>
                <Row justify="start">
                    <Col
                        span={12}
                        className="p-r-24">
                        <Form.Item
                            className="no-margin"
                            name="jobTitle"
                            label={t('edit-wanted-job-title', {ns: 'edit'})}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        span={12}
                        className={classNames('p-l-24', 'no-margin')}>
                        <Form.Item
                            className="no-margin"
                            name="avatar"
                            label="">
                            <ImageUpload
                                className={classNames(
                                    'no-margin',
                                    'no-padding'
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col
                        span={12}
                        className="p-r-24">
                        <Form.Item
                            className="no-margin"
                            name="firstName"
                            label={t('edit-first-name', {ns: 'edit'})}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        span={12}
                        className="p-l-24">
                        <Form.Item
                            className="no-margin"
                            name="lastName"
                            label={t('edit-last-name', {ns: 'edit'})}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col
                        span={12}
                        className="p-r-24">
                        <Form.Item
                            className="no-margin"
                            name="email"
                            label={t('edit-email', {ns: 'edit'})}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        span={12}
                        className="p-l-24">
                        <Form.Item
                            className="no-margin"
                            name="phone"
                            label={t('edit-phone', {ns: 'edit'})}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col
                        span={12}
                        className="p-r-24">
                        <Form.Item
                            className="no-margin"
                            name="country"
                            label={t('edit-country', {ns: 'edit'})}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col
                        span={12}
                        className="p-l-24">
                        <Form.Item
                            className="no-margin"
                            name="city"
                            label={t('edit-city', {ns: 'edit'})}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                {!expand ? (
                    <Text
                        className={styles['expand-details-text']}
                        onClick={expandHandler}>
                        <br />
                        {t('edit-show-add-details', {ns: 'edit'})} <DownOutlined />
                    </Text>
                ) : (
                    <>
                        <Row justify="start">
                            <Col
                                span={12}
                                className="p-r-24">
                                <Form.Item
                                    className="no-margin"
                                    name="address"
                                    label={t('edit-address', {ns: 'edit'})}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col
                                span={12}
                                className="p-l-24">
                                <Form.Item
                                    className="no-margin"
                                    name="postalCode"
                                    label={t('edit-postal-code', {ns: 'edit'})}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col
                                span={12}
                                className="p-r-24">
                                <Form.Item
                                    className="no-margin"
                                    name="drivingLicense"
                                    label={t('edit-driving-license', {ns: 'edit'})}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col
                                span={12}
                                className="p-l-24">
                                <Form.Item
                                    className="no-margin"
                                    name="nationality"
                                    label={t('edit-nationality', {ns: 'edit'})}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="start">
                            <Col
                                span={12}
                                className="p-r-24">
                                <Form.Item
                                    className="no-margin"
                                    name="placeOfBirth"
                                    label={t('edit-place-of-birth', {ns: 'edit'})}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col
                                span={12}
                                className="p-l-24">
                                <Form.Item
                                    className="no-margin"
                                    name="dateOfBirth"
                                    label={t('eidt-date-of-birth', {ns: 'edit'})}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Text
                            className={styles['expand-details-text']}
                            onClick={expandHandler}>
                            <br />
                            {t('edit-hide-add-details', {ns: 'edit'})} <UpOutlined />
                        </Text>
                    </>
                )}
            </>
        );
    };
    return (
        <div className={classNames(className)}>
            <SectionImportTitle
                onChangeTitle={(title: string) => {
                    setPersonalDetailTitle(title);
                }}
                defaultTitle={defaultTitle}>
                {personalDetailTitle}
            </SectionImportTitle>
            <Form
                form={form}
                layout="vertical"
                // fields={personalDetailFields}
                // initialValues={personalDetailsChangedValues}
                // onFieldsChange={changeFieldsHandler}
                onValuesChange={changeValuesHandler}
                size="large"
                colon={false}>
                {getFixedField()}
            </Form>
        </div>
    );
};

export default PersonalDetailsImport;
