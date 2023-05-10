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
import axios from 'axios';
import { HOST } from '../../../../../../configs/constants/misc';
import { getAuthHeader } from '../../../../../../configs/restApi/clients';

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

    const uploadImageHandler = async (image: any) => {
        const authHeader = Object.assign(getAuthHeader(), {
            'Content-Type': 'multipart/form-data',
        });
        try {
            const response = await axios.put(
                `${HOST}resume/${resumeSaved.id}/images-uploading/`,
                { image },
                {
                    headers: authHeader,
                }
            );
            setPersonalDetailsChangedValues((prev: any) => {
                return { ...prev, image: response.data.image };
            });
        } catch (error: any) {
            console.log('error', error);
        }
    };

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
            <div className={styles['form-layout']}>
                <Form.Item
                    className={classNames('no-margin', styles['form-item'])}
                    name="jobTitle"
                    label={t('edit-wanted-job-title', { ns: 'edit' })}>
                    <Input />
                </Form.Item>

                <Form.Item
                    className={classNames('no-margin', styles['form-item'])}
                    style={{ paddingTop: '17px' }}
                    name="image"
                    label="">
                    <div className={styles['upload-image__container']}>
                        <ImageUpload
                            className={classNames('no-margin', 'no-padding')}
                            onUpload={uploadImageHandler}
                            fetchingURL={
                                resumeSaved.image ? resumeSaved.image : ''
                            }
                        />
                        <span
                            onClick={uploadImageHandler}
                            className={styles['upload-image__text']}>
                            Upload image
                        </span>
                    </div>
                </Form.Item>

                <Form.Item
                    className={classNames('no-margin', styles['form-item'])}
                    name="firstName"
                    label={t('edit-first-name', { ns: 'edit' })}>
                    <Input />
                </Form.Item>

                <Form.Item
                    className={classNames('no-margin', styles['form-item'])}
                    name="lastName"
                    label={t('edit-last-name', { ns: 'edit' })}>
                    <Input />
                </Form.Item>

                <Form.Item
                    className={classNames('no-margin', styles['form-item'])}
                    name="email"
                    label={t('edit-email', { ns: 'edit' })}>
                    <Input />
                </Form.Item>

                <Form.Item
                    className={classNames('no-margin', styles['form-item'])}
                    name="phone"
                    label={t('edit-phone', { ns: 'edit' })}>
                    <Input />
                </Form.Item>

                <Form.Item
                    className={classNames('no-margin', styles['form-item'])}
                    name="country"
                    label={t('edit-country', { ns: 'edit' })}>
                    <Input />
                </Form.Item>

                <Form.Item
                    className={classNames('no-margin', styles['form-item'])}
                    name="city"
                    label={t('edit-city', { ns: 'edit' })}>
                    <Input />
                </Form.Item>

                {!expand ? (
                    <Text
                        className={styles['expand-details-text']}
                        onClick={expandHandler}>
                        <br />
                        {t('edit-show-add-details', { ns: 'edit' })}{' '}
                        <DownOutlined />
                    </Text>
                ) : (
                    <>
                        <Form.Item
                            className={classNames(
                                'no-margin',
                                styles['form-item']
                            )}
                            name="address"
                            label={t('edit-address', { ns: 'edit' })}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className={classNames(
                                'no-margin',
                                styles['form-item']
                            )}
                            name="postalCode"
                            label={t('edit-postal-code', {
                                ns: 'edit',
                            })}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className={classNames(
                                'no-margin',
                                styles['form-item']
                            )}
                            name="drivingLicense"
                            label={t('edit-driving-license', {
                                ns: 'edit',
                            })}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className={classNames(
                                'no-margin',
                                styles['form-item']
                            )}
                            name="nationality"
                            label={t('edit-nationality', {
                                ns: 'edit',
                            })}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className={classNames(
                                'no-margin',
                                styles['form-item']
                            )}
                            name="placeOfBirth"
                            label={t('edit-place-of-birth', {
                                ns: 'edit',
                            })}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className={classNames(
                                'no-margin',
                                styles['form-item']
                            )}
                            name="dateOfBirth"
                            label={t('eidt-date-of-birth', {
                                ns: 'edit',
                            })}>
                            <Input />
                        </Form.Item>

                        <Text
                            className={styles['expand-details-text']}
                            onClick={expandHandler}>
                            <br />
                            {t('edit-hide-add-details', { ns: 'edit' })}{' '}
                            <UpOutlined />
                        </Text>
                    </>
                )}
            </div>
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
