import { DragOutlined, LayoutOutlined } from '@ant-design/icons';
import { Button, Divider, Layout, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import DownloadButton from '../../../custom/downnload-button';
import ResumeExportMain from '../resume-export/resume-export-main';
import ResumeExportPagination from '../resume-export/resume-export-pagination';
import ActionList from './action-list';
import LayoutEditor from './layout-editor';
import styles from './styles.module.scss';
import TemplateItem from './template-list';
import TemplateList from './template-list';

const { Sider, Content } = Layout;

type Props = {
    className?: string;
    onChangeLayout: () => void;
    templates?: any;
};

const TemplateSelector = (props: Props) => {
    const { onChangeLayout, templates } = props;
    const templateRef = useRef<any>(null);
    const layoutRef = useRef<any>(null);
    const actionHandler = (action: string) => {
        switch (action) {
            case 'editor':
                onChangeLayout();
                break;

            case 'template':
                if (templateRef.current) {
                    templateRef.current.scrollIntoView();
                }
                break;
            case 'layout':
                if (layoutRef.current) {
                    layoutRef.current.scrollIntoView();
                }
                break;
            case 'export':
                break;
        }
    };
    return (
        <div>
            {/* <div className={styles.header}>
                <div style={{ height: '70px', lineHeight: '70px' }}>
                    <Button
                        className={styles.button}
                        type="default"
                        onClick={onChangeLayout}>
                        Back to Editor
                    </Button>
                    <DownloadButton />
                </div>
            </div> */}
            <div className={styles.container}>
                <Layout className={styles.layout}>
                    {' '}
                    <Sider
                        // collapsible
                        reverseArrow={true}
                        collapsedWidth={0}
                        width={48}>
                        <div style={{ height: '100%', overflowY: 'auto' }}>
                            <ActionList onAction={actionHandler} />
                        </div>
                    </Sider>
                    <Sider
                        breakpoint="md"
                        collapsedWidth={0}
                        width={'30%'}
                        className={styles['template-container']}>
                        <div
                            style={{
                                height: '100%',
                                overflowY: 'auto',
                                padding: '30px',
                            }}>
                            <div ref={templateRef}>
                                <div className={styles['action-item-header']}>
                                    <LayoutOutlined
                                        style={{ paddingRight: '5px' }}
                                    />
                                    Template
                                </div>
                                <div
                                    style={{
                                        border: 'solid 0.5px white',
                                        marginBottom: '20px',
                                    }}></div>
                                <div className={styles['template-list']}>
                                    {templates.map(
                                        (template: any, i: number) => {
                                            return (
                                                <TemplateItem
                                                    key={i}
                                                    value={template}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            <div ref={layoutRef}>
                                <div className={styles['action-item-header']}>
                                    <DragOutlined
                                        style={{ paddingRight: '5px' }}
                                    />
                                    Layout
                                </div>
                                <div
                                    style={{
                                        border: 'solid 0.5px white',
                                        marginBottom: '20px',
                                    }}></div>
                                <LayoutEditor />
                            </div>
                        </div>
                    </Sider>
                    <Content>
                        <div className={classNames(styles['resume'])}>
                            <div className={styles['resume-change-index-button']}>
                                <ResumeExportPagination />
                            </div>    
                            <ResumeExportMain
                                className={styles['resume-preview']}
                                scale={0.8}
                            />
                        </div>
                    </Content>
                </Layout>
            </div>
        </div>
    );
};

export default TemplateSelector;
