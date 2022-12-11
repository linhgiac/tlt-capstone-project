import { DashboardItemType } from "../../../../configs/interfaces/dashboard.interface";
import classNames from 'classnames';
import styles from '../styles.module.scss';
import { useState } from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { EditableTitle } from "../../../custom";
import ResumeTitle from "../../resume/resume-import/resume-title";
import { useRouter } from "next/router";

type DashboardItemProps = {
    item: DashboardItemType
}

const DashboardItem = (props: DashboardItemProps) => {
    const { item } = props;
    const router = useRouter();

    const onClick = () => {
        console.log("On click item");
        router.push({
            pathname: '/resumes/[id]/edit',
            query: {
                id: 1,
                // id: item.id,
            },
        });
    }
    const onRename = (value: string) => {
        console.log("On rename: ", value);
    }
    const onDelete = () => {
        console.log("Delete resume: ", item.id);
    }
    return (
        <div className={classNames(styles['dashboard-item'])}>
            <button onClick={onClick} className={classNames(styles['dashboard-item-preview'])}></button>
            <div className={classNames(styles['dashboard-item-body'])}>
                <ResumeTitle initialValue={item.title}></ResumeTitle>
                <div className={classNames(styles['dashboard-item-lastupdated'])}>Updated {item.lastUpdated}</div>
                <div className={classNames(styles['dashboard-item-button-list'])}>
                    <button className={classNames(styles['dashboard-item-button'])} onClick={onClick}>
                        Edit
                    </button>
                    <button className={classNames(styles['dashboard-item-button'])} onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DashboardItem;