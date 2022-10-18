import React, { useCallback, useState } from 'react';
import { Input, Typography } from 'antd';
import classNames from 'classnames';
import { EditOutlined } from '@ant-design/icons';

type EditableTitleProps = {
    className?: string;
    children?: string;
    onChangeTitle: (value: string) => void;
};

export const EditableTitle = (props: EditableTitleProps) => {
    const { className, children, onChangeTitle } = props;
    const [isEditing, setIsEditing] = useState(false);

    const editHandler = useCallback(() => {
        setIsEditing(!isEditing);
    }, [isEditing]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeTitle(e.target.value);
    };
    return (
        <div className='flex-row'>
            {!isEditing ? (
                <>
                    <div className={classNames(className)}>{children}</div>
                    <EditOutlined
                        className={classNames(className, 'center', 'p-l-8')}
                        onClick={editHandler}
                    />
                </>
            ) : (
                <Input
                    className={classNames(className)}
                    onBlur={editHandler}
                    defaultValue={children}
                    onPressEnter={editHandler}
                    onChange={changeHandler}
                />
            )}
        </div>
    );
};
