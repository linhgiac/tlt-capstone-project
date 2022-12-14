import React, { useRef, useState } from 'react';
import { Input, InputRef } from 'antd';
import classNames from 'classnames';
import { EditOutlined, UndoOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

type EditableTitleProps = {
    className?: string;
    children: string;
    onChangeTitle: (value: string) => void;
    defaultTitle?: string;
};

export const EditableTitle = (props: EditableTitleProps) => {
    const { className, children, onChangeTitle, defaultTitle } = props;
    const [titleWidth, setTitleWidth] = useState(`${children.length * 0.55}em`);
    // const [isEditing, setIsEditing] = useState(false);

    // const editHandler = useCallback(() => {
    //     setIsEditing(true);
    // }, [isEditing]);
    const ref = useRef<InputRef>(null);

    const editHandler = () => {
        if (ref.current && ref) {
            ref.current.focus();
            ref.current.select();
            // setIsEditing(true);
        }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeTitle(e.target.value);
    };
    const resetTitleHandler = () => {
        if (defaultTitle) {
            onChangeTitle(defaultTitle);
        }
    };

    return (
        <div className={classNames('flex-row')}>
            <div className={classNames('flex-row', styles['editable-title'])}>
                <div
                    className={classNames(
                        className,
                        styles['editable-title-input-div']
                    )}>
                    {children}
                </div>

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
                    // style={{ width: titleWidth }}
                    // onBlur={() => setIsEditing(false)}
                />
            </div>

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
