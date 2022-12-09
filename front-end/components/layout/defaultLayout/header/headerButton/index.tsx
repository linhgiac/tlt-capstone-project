import { Button } from 'antd';
import React from 'react';

type HeaderButtonProps = {};

const HeaderButton = (props: HeaderButtonProps) => {
    return (
        <div>
            <Button size='large' type='text'>
                Log in
            </Button>
            <Button size='large' type='primary'>
                Sign Up
            </Button>
        </div>
    );
};

export default HeaderButton;
