import React from 'react';
import { useRouter } from 'next/router';
import { last } from 'lodash';
import { Layout } from 'antd';

import { BlogMenu, VerticalBanner, BlogAsideAction } from '../../components/page/blogs';
import styles from './styles.module.scss';
import Content from '../../components/page/blogs/contents';

const { Sider, Content: AntdContent } = Layout;

const Blogs: React.FC = () => {
    const router = useRouter();
    const blogPath = last(router.asPath.split('/'));

    return (
        <Layout className={styles['container']}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                width={'20%'}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 70,
                    bottom: 0,
                }}>
                <BlogMenu />
            </Sider>
            <AntdContent className={styles['content']}>
                
                {blogPath && <Content blogTitle={blogPath} />}
            </AntdContent>
            <Sider
                className={styles['right-sidebar']}
                breakpoint="lg"
                collapsedWidth="0"
                width={'25%'}
                style={{
                    backgroundColor: 'white',
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    right: 0,
                    top: 70,
                    bottom: 0,
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <VerticalBanner />
                    <BlogAsideAction />
                </div>
            </Sider>
        </Layout>
    );
};

export default Blogs;