import classNames from 'classnames';
import React from 'react';
import { TEMPLATE_HEADER } from '../../../../configs/constants/template.constants';
import { TemplateDataType } from '../../../../configs/interfaces/template.interface';
import TemplateItem from '../template-item';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import styles from '../styles.module.scss';

type TemplateContainerProps = {
    data: TemplateDataType[];
};

const TemplateContainer = (props: TemplateContainerProps) => {
    const { data } = props;

    // const layoutItems = (data: TemplateDataType[]) => {
    //     const itemPerRow = 3;
    //     const items = [];
    //     const children = [];
    //     for (let i = 0; i < data.length; i++) {
    //         items.push(<TemplateItem item={data[i]}></TemplateItem>);
    //         if (items.length == itemPerRow) {
    //             children.push(
    //                 <Row key={children.length}>
    //                     {items.map(item => (
    //                         <Col
    //                             md={8}
    //                             lg={12}
    //                             key={item.props.item.id}>
    //                             {item}
    //                         </Col>
    //                     ))}
    //                 </Row>
    //             );
    //             while (items.length > 0) items.pop();
    //         }
    //     }
    //     if (items.length > 0) {
    //         children.push(
    //             <Row key={children.length}>
    //                 {items.map(item => (
    //                     <Col
    //                         md={{ span: 5, offset: 2 }}
    //                         lg={3}
    //                         key={item.props.item.id}>
    //                         {item}
    //                     </Col>
    //                 ))}
    //             </Row>
    //         );
    //     }
    //     return children;
    // }
    return (
        <div className={styles['template-container']}>
            {data.map((item: any, i: number) => {
                return (
                    <TemplateItem
                        key={i}
                        item={item}
                    />
                );
            })}
        </div>
    );
};

export default TemplateContainer;
