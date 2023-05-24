import { useRecoilValue } from "recoil";

import styles from "./styles.module.scss";
import JobPostingItem from "../job-posting-item";
import { jobPostingsState } from "../../../../recoil-state/job-state/job-state";

type JobPostingListProps = {
    
};

const JobPostingList = (props: JobPostingListProps) => {
    const jobPostingList = useRecoilValue(jobPostingsState);
    return (
        <div className={styles["job-posting-list"]}>
            {jobPostingList.map((jobPosting: any, idx: any) => (
                <JobPostingItem
                    key={idx}
                    title={jobPosting.jobTitle}
                    company={jobPosting.company}
                    location={jobPosting.location}
                    link={jobPosting.link}
                    date={jobPosting.date}
                    jobPortal={jobPosting.jobPortal}
                />
            ))}
        </div>
    );
};

export default JobPostingList;