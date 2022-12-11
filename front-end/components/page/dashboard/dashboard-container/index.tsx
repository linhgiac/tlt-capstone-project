import { Col, Row } from "antd";
import { DashboardItemType } from "../../../../configs/interfaces/dashboard.interface"
import DashboardItem from "../dashboard-item";
import classNames from 'classnames';
import styles from '../styles.module.scss';

type DashboardContainerProps = {
    data: DashboardItemType[]
};

const DashboardContainer = (props: DashboardContainerProps) => {
    const { data } = props;
    const layoutItems = (data: DashboardItemType[]) => {
        const itemPerRow = 2;
        const items = [];
        const children = [];
        for (let i = 0; i < data.length; i++) {
            items.push(<DashboardItem item={data[i]}></DashboardItem>)
            if (items.length == itemPerRow) {
                children.push(
                    <Row className={classNames(styles['dashboard-row'])} key={children.length}>
                        {items.map((item) => (<Col key={item.props.item.id}>{item}</Col>))}
                    </Row>
                )
                while (items.length > 0)
                    items.pop();
            }
        }
        if (items.length > 0) {
            children.push(
                <Row className={classNames(styles['dashboard-row'])} key={children.length}>
                    {items.map((item) => (<Col key={item.props.item.id}>{item}</Col>))}
                </Row>
            )
        }
        return children;
    }
    return (
        <div className={classNames(styles['dashboard-container'])}>
            {layoutItems(data)}
        </div>
    );
}

export default DashboardContainer;