import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import SectionForm from '../section-form';
import { SECTION_TYPE } from '../../../configs/constants/resume.constants';
import { Modal } from 'antd';

type Props = {
    className?: string;
    itemHeader: string;
    children?: string;
    sectionType: string;
    onRemove: () => void;
};

const SectionItem = (props: Props) => {
    const { className, itemHeader, children, sectionType, onRemove } = props;
    const labelList = useMemo(() => SECTION_TYPE[sectionType], [sectionType]);
    const [isVisible, setIsVisible] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const clickHandler = () => {
        setIsVisible(!isVisible);
    };
    const showModal = () => {
        setIsOpened(true);
    };
    const deleteHandler = () => {
        onRemove();
        setIsOpened(false);
    };
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
                        onClick={showModal}>
                        <DeleteOutlined />
                    </div>
                </div>
                <div className={styles['section-item__form']}>
                    {isVisible && <SectionForm labelList={labelList} />}
                </div>
            </div>
            <div>
                <Modal
                    title='Delete Entry'
                    open={isOpened}
                    onOk={deleteHandler}
                    onCancel={() => {
                        setIsOpened(false);
                    }}></Modal>
            </div>
        </>
    );
};

export default SectionItem;
