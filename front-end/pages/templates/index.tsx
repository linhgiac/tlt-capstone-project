import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

type TemplatesProps = {};

const Templates = (props: TemplatesProps) => {
    const router = useRouter();
    return (
        <div>
            <Button
                type='primary'
                size='large'
                onClick={() => {
                    router.push({
                        pathname: '/dashboard',
                    });
                }}>
                Create My Resume
            </Button>
        </div>
    );
};

export default Templates;
