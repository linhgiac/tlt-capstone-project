import React, { useCallback, useRef, useState } from 'react';
import { Input, InputRef, Typography } from 'antd';
import classNames from 'classnames';
import { EditOutlined, UndoOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { ResumeConstants } from '../../../configs/constants/resume.constants';

type EditableTitleProps = {
    className?: string;
    children: string;
    onChangeTitle: (value: string) => void;
    defaultTitle?: string;
};

export const EditableTitle = (props: EditableTitleProps) => {
    const { className, children, onChangeTitle, defaultTitle } = props;
    const [titleWidth, setTitleWidth] = useState(`${children.length * 0.55}em`);

    // const editHandler = useCallback(() => {
    //     setIsEditing(true);
    // }, [isEditing]);
    const ref = useRef<InputRef>(null);

    const editHandler = () => {
        if (ref.current && ref) {
            ref.current.focus();
            ref.current.select();
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleWidth(`${+e.target.value.length * 0.55}em`);
        onChangeTitle(e.target.value);
    };
    const resetTitleHandler = () => {
        if (defaultTitle) {
            setTitleWidth(`${+defaultTitle?.length * 0.55}em`);
            onChangeTitle(defaultTitle);
        }
    };

    return (
        <div className='flex-row'>
            <Input
                ref={ref}
                className={classNames(
                    className,
                    styles['editable-title-input']
                )}
                defaultValue={children}
                value={children}
                // onPressEnter={editHandler}
                onChange={changeHandler}
                style={{ width: titleWidth }}
            />
            {/* <div className={classNames(className)}>{children}</div> */}
            <EditOutlined
                className={classNames(
                    className,
                    'center',
                    'p-l-8',
                    styles['editable-title-icon']
                )}
                onClick={editHandler}
            />
            {defaultTitle && (
                <UndoOutlined
                    className={classNames(
                        className,
                        'center',
                        'p-l-8',
                        styles['editable-title-icon']
                    )}
                    onClick={resetTitleHandler}
                />
            )}
        </div>
    );
};
