import React, { useCallback, useEffect, useState } from 'react';
import { EditableTitle } from '../../../../../custom';
import classNames from 'classnames';
import SectionImportTitle from '../../section-import-title';
import { Button, Form, Input } from 'antd';
import styles from './styles.module.scss';
import { useRecoilState } from 'recoil';
import { professionalSummaryTitleValueState } from '../../../../../../recoil-state/resume-state/resume-title.state';
import { ProfessionalSummaryDataType, ProfessionalSummarySuggestionMode } from '../../../../../../configs/interfaces/resume.interface';
import { professionalSummaryChangedValueState } from '../../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { setInterval, clearInterval } from 'timers';
import ProfessionalSummarySuggestions from './professional-summary-suggestions';
import { HOST } from '../../../../../../configs/constants/misc';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { remove } from 'lodash';
import { useTranslation } from 'next-i18next';

const loadingIcon = (
    <LoadingOutlined
        style={{ fontSize: 24 }}
        spin
    />
);

const { TextArea } = Input;

type ProfessionalSummaryImportProps = {
    className?: string;
    defaultTitle?: string;
};

function ProfessionalSummaryImport(props: ProfessionalSummaryImportProps) {
    const { className, defaultTitle } = props;
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [
        professionalSummaryChangedValues,
        setProfessionalSummaryChangedValues,
    ] = useRecoilState(professionalSummaryChangedValueState);
    const [professionalSummaryTitle, setProfessionalSummaryTitle] =
        useRecoilState(professionalSummaryTitleValueState);
    const [lastTypingTicks, setLastTypingTicks] = useState<number>(0);
    const [lastCheckTypingTicks, setLastCheckTypingTicks] = useState<number>(0);
    const [isStopTyping, setIsStopTyping] = useState<boolean>(true);
    const [suggestions, setSuggestions] = useState<any>([]);
    const [suggestionMode, setSuggestionMode] =
        useState<ProfessionalSummarySuggestionMode>('sequences');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [requestId, setRequestId] = useState<number>(0);
    const [responseId, setResponseId] = useState<number>(0);

    // const changeFieldsHandler = (changeFields: any, _: any) => {
    //     setProfessionalSummaryField(
    //         // allFields.map((field: any) => {
    //         //     return { name: field.name[0], value: field.value };
    //         // })
    //         [{ name: changeFields[0].name[0], value: changeFields[0].value }]
    //     );
    // };
    const typing = () => {
        setIsLoading(false);
        setSuggestions([]);
        setIsStopTyping(false);
        setLastTypingTicks(Date.now());
    };

    const checkStopTyping = () => {
        setLastCheckTypingTicks(Date.now());
    };

    const getSuggestions = async (
        suggestionMode: ProfessionalSummarySuggestionMode
    ) => {
        setIsLoading(true);
        const currentRequestId = Date.now();
        setRequestId(currentRequestId);
        var sequences = '';
        const content = form.getFieldValue('content');
        if (suggestionMode == 'paragraph') {
            sequences = content !== undefined ? content : '';
        } else {
            const contentSplit =
                content !== undefined ? content.split('.') : [''];
            sequences = contentSplit[contentSplit.length - 1];
        }
        const removeSpaceInput = sequences.replaceAll(' ', '');
        if (removeSpaceInput.length !== 0) {
            console.log('getSuggestions: ' + sequences);
            const url = `${HOST}professional_summary/`;
            const input = {
                sequences: sequences,
                mode: suggestionMode,
                requestId: currentRequestId,
            };
            console.log(input);
            try {
                const response = await axios.post(url, input, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });
                const data = response.data; //  MOCKED_SUGGESTIONS[suggestionMode] //
                console.log(data);
                const currentResponseId = response.data.responseId;
                setResponseId(currentResponseId);
                setSuggestions(data.data);
            } catch (error: any) {
                console.log(error);
            }
        } else {
            setIsLoading(false);
        }
    };

    const changeSuggestionMode = (
        suggestionMode: ProfessionalSummarySuggestionMode
    ) => {
        setSuggestionMode(suggestionMode);
        setIsStopTyping(false);
    };

    const onSelectSuggestion = (
        suggestionMode: ProfessionalSummarySuggestionMode,
        suggestion: string
    ) => {
        typing();
        var content = form.getFieldValue('content');
        if (suggestionMode == 'tokens') {
            form.setFieldValue('content', content + ' ' + suggestion);
        } else if (suggestionMode == 'sequences') {
            var contentSplit = content.split('.');
            contentSplit.pop();
            const oldContent =
                contentSplit.length === 0 ? '' : contentSplit.join('.') + '. ';
            const newContent = oldContent + suggestion;
            form.setFieldValue('content', newContent);
        } else {
            form.setFieldValue('content', suggestion);
        }
        setProfessionalSummaryChangedValues(prev => {
            return { ...prev, content: form.getFieldValue('content') };
        });
    };

    useEffect(() => {
        console.log(
            'professionalSummaryChangedValues :>> ',
            professionalSummaryChangedValues
        );
    }, [professionalSummaryChangedValues]);

    useEffect(() => {
        const interval = setInterval(() => checkStopTyping(), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (lastCheckTypingTicks - lastTypingTicks > 5000 && !isStopTyping) {
            console.log('Stop typing');
            setIsStopTyping(true);
            getSuggestions(suggestionMode);
        }
    }, [
        lastCheckTypingTicks,
        lastTypingTicks,
        isStopTyping,
        suggestionMode,
        getSuggestions,
    ]);

    useEffect(() => {
        if (requestId === responseId) setIsLoading(false);
    }, [requestId, responseId]);

    useEffect(() => {
        form.setFieldsValue(professionalSummaryChangedValues);
    }, [form, professionalSummaryChangedValues]);
    const changeValuesHandler = useCallback(
        (changedValues: any, _: any) => {
            setProfessionalSummaryChangedValues(prev => {
                return { ...prev, ...changedValues };
            });
            typing();
        },
        [setProfessionalSummaryChangedValues]
    );
    return (
        <div className={classNames(className)}>
            <SectionImportTitle
                onChangeTitle={(title: string) => {
                    setProfessionalSummaryTitle(title);
                }}
                defaultTitle={defaultTitle}>
                {professionalSummaryTitle}
            </SectionImportTitle>
            <p style={{ color: 'grey', fontSize: '12px' }}>
                {t('edit-summary-description', {ns: 'edit'})}
            </p>
            {/* <div>
                <Button onClick={() => changeSuggestionMode('tokens')}>Tokens</Button>
                <Button onClick={() => changeSuggestionMode('sequences')}>Sequences</Button>
                <Button onClick={() => changeSuggestionMode('paragraph')}>Paragraph</Button>
            </div> */}
            <Form
                form={form}
                layout="vertical"
                // fields={professionalSummaryField}
                // initialValues={initialValue}
                // onFieldsChange={changeFieldsHandler}
                onValuesChange={(changedValues, values) =>
                    changeValuesHandler(changedValues, values)
                }
                size="large"
                colon={false}>
                <Form.Item name="content">
                    <TextArea
                        className={styles['professional-summary-input']}
                        autoSize={{ minRows: 5, maxRows: 5 }}
                    />
                </Form.Item>
            </Form>
            {isLoading ? (
                <div>
                    <Spin indicator={loadingIcon} /> Generate suggestions ...
                </div>
            ) : (
                <></>
            )}
            {suggestions.length !== 0 && requestId === responseId ? (
                <ProfessionalSummarySuggestions
                    suggestions={suggestions}
                    suggestionMode={suggestionMode}
                    onSelectSuggestion={
                        onSelectSuggestion
                    }></ProfessionalSummarySuggestions>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ProfessionalSummaryImport;
