import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import SectionForm from '../section-form';
import { SECTION_TYPE } from '../../../configs/constants/resume.constants';

type Props = {
    className?: string;
    itemHeader: string;
    children?: string;
    sectionType: string;
};

const SectionItem = (props: Props) => {
    const { className, itemHeader, children, sectionType } = props;
    const labelList = useMemo(() => SECTION_TYPE[sectionType], [sectionType]);
    const [isVisible, setIsVisible] = useState(false);
    const clickHandler = () => {
        setIsVisible(!isVisible);
    };
    const deleteHandler = () => {};
    return (
        <>
            <div
                className={classNames(
                    className,
                    styles['section-item__container']
                )}>
                <div className={styles['section-item__content']}>
                    <div
                        className={classNames(
                            'flex-row',

                            styles['section-item__header']
                        )}
                        onClick={clickHandler}>
                        <div>{itemHeader}</div>
                        <div
                            className={classNames(
                                'center',
                                styles['section-item__icon']
                            )}>
                            {!isVisible ? <DownOutlined /> : <UpOutlined />}
                        </div>
                    </div>
                    <div
                        className={classNames(
                            'center',
                            styles['section-item__remove']
                        )}
                        onClick={deleteHandler}>
                        <DeleteOutlined />
                    </div>
                </div>
                <div className={styles['section-item__form']}>
                    {isVisible && <SectionForm labelList={labelList} />}
                </div>
            </div>
        </>
    );
};

export default SectionItem;
