import { Card } from "antd";
import { EnvironmentOutlined, HistoryOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss"


type JobPostingItemProps = {
    title: string,
    company: string,
    location: string,
    link: string,
    date: string,
    jobPortal: string,
    error?: any,
};


const JobPostingItem = (props: JobPostingItemProps) => {
    const { title, company, location, link, date, jobPortal } = props;
    const handleJobCardClick = () => {
        window.open(link, "_blank");
    };

    return (
        <Card
            title={title}
            extra={<a href={link} target="_blank">Details</a>}
            hoverable={true}
            onClick={() => handleJobCardClick()}
            className={styles["card-item"]}
        >
            <div className={styles["company"]}>{company}</div>
            <div className={styles["location"]}>
                <EnvironmentOutlined
                    style={{
                        // color: "#777777",
                        // strokeWidth: "60",
                        // stroke: "#777777",
                        marginRight: "6px",
                    }}
                />
                {location}
            </div>
            <div className={styles["date"]}>
                <HistoryOutlined
                    style={{
                        marginRight: "6px",
                    }}
                />
                {date}
            </div>
            <Card.Meta
                description={`From ${jobPortal}`}
            />
        </Card>
    );
};

export default JobPostingItem;