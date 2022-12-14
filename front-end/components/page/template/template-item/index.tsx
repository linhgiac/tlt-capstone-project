import { Button } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { TemplateDataType } from '../../../../configs/interfaces/template.interface';
import styles from '../styles.module.scss';
import Image from 'next/image'

type TemplateItemProps = {
    item: TemplateDataType
};

const TemplateItem = (props: TemplateItemProps) => {
    const { item } = props;
    const [isActive, setIsActive] = useState(false);
    const onMouseEnter = () => {
        setIsActive(true);
    }
    const onMouseLeave = () => {
        setIsActive(false);
    }
    const onClick = () => {
        console.log("item clicked");
    }

    return (
        <button className={classNames(styles['template-item-container'])}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}>
            <div className={classNames(styles['template-item-body'])}>
                <div className={'center ' + classNames(styles['template-item-preview'])}>
                    <div className={classNames(styles['template-item-image'])}>
                        {item.get_thumbnail && <Image src={item.get_thumbnail} width={225} height={321} />}
                    </div>
                    {/* <div className={classNames(styles['template-item-button'])}>
                        {(isActive) ? <Button className={classNames(styles['template-item-button'])}>Use This Template</Button> : <></>}
                    </div> */}
                </div>
            </div>
            <div className={classNames(styles['template-item-title']) + ' ' + classNames(styles[(isActive) ? 'template-item-title-active' : 'template-item-title-inactive'])}>
                {item.title}
            </div>
            <div className={classNames(styles['template-item-description'])}>
                {item.description}
            </div>
        </button>
    );
};

export default TemplateItem;
