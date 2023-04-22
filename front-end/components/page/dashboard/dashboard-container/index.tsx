import { Col, Row } from "antd";
import axios from 'axios';
import classNames from 'classnames';

import { DashboardItemType } from '../../../../configs/interfaces/dashboard.interface';
import DashboardItem from '../dashboard-item';
import styles from '../styles.module.scss';
import { HOST } from '../../../../configs/constants/misc';
import { getAuthHeader } from '../../../../configs/restApi/clients';
import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { dataUrlToFile } from '../../../../configs/utils/images.utils';

type DashboardContainerProps = {
    data: DashboardItemType[];
};

const DashboardContainer = (props: DashboardContainerProps) => {
    const { data } = props;
    const [itemList, setItemList] = useState<any>(data);
    // const layoutItems = () => {
    //     const itemPerRow = 2;
    //     const items: any[] = [];
    //     const children = [];

    //     for (let i = 0; i < itemList.length; i++) {
    //         items.push(
    //             <DashboardItem
    //                 item={data[i]}
    //                 onDelete={deleteHandler}
    //                 onDuplicate={duplicateHandler}></DashboardItem>
    //         );
    //         if (items.length == itemPerRow) {
    //             children.push(
    //                 <Row
    //                     className={classNames(styles['dashboard-row'])}
    //                     key={children.length}>
    //                     {items.map(item => (
    //                         <Col key={item.props.item.id}>{item}</Col>
    //                     ))}
    //                 </Row>
    //             );
    //             while (items.length > 0) items.pop();
    //         }
    //     }
    //     if (items.length > 0) {
    //         children.push(
    //             <Row
    //                 className={classNames(styles['dashboard-row'])}
    //                 key={children.length}>
    //                 {items.map(item => (
    //                     <Col key={item.props.item.id}>{item}</Col>
    //                 ))}
    //             </Row>
    //         );
    //     }
    //     return children;
    // };
   
    const deleteHandler = async (id: number) => {
        try {
            const response = await axios.delete(`${HOST}resume/${id}/delete/`, {
                headers: getAuthHeader(),
            });
            setItemList((prevItems: any[]) =>
                prevItems.filter((item: { id: number }) => item.id !== id)
            );
        } catch (error) {
            console.log('error :>> ', error);
        }
    };
    const duplicateHandler = async (id: number) => {
        try {
            const response = await axios.get(`${HOST}resume/${id}/duplicate/`, {
                headers: getAuthHeader(),
            });
            const thumbnail = itemList.filter((item: any) => item.id === id)[0]
                .thumbnail;
            setItemList((prevItems: any) => [
                ...prevItems,
                { ...response.data, thumbnail },
            ]);
        } catch (error) {
            console.log('error :>> ', error);
        }
    };

    return (
        <div className={classNames(styles['dashboard-container'])}>
            {itemList.map((item: any, index: number) => (
                <DashboardItem
                    className={classNames('w-50')}
                    key={index}
                    item={item}
                    onDelete={deleteHandler}
                    onDuplicate={duplicateHandler}
                />
            ))}
        </div>
    );
};

export default DashboardContainer;