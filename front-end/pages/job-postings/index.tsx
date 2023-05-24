import axios from "axios";

import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { useState, useEffect } from "react";

import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Pagination, Button, Modal } from "antd";
import type { PaginationProps } from 'antd';

import { useRecoilValue, useSetRecoilState } from "recoil";

import styles from "./styles.module.scss"
import { getAuthHeader } from "../../configs/restApi/clients";
import { HOST, LAYOUT } from "../../configs/constants/misc";
import FilterModalContent from "../../components/page/job/filter-modal";
import SearchModalContent from "../../components/page/job/search-modal";
import { jobPostingsState, jobQueryState } from "../../recoil-state/job-state/job-state";
import JobPostingList from "../../components/page/job/job-posting-list";
import { DEFAULT_JOB_TITLE_INPUT, DEFAULT_LOCATION_INPUT, PAGE_LIMIT } from "../../configs/constants/job.constants";
import { convertJobResponse } from "../../configs/utils/format.utils";


type JobPostingsProps = {
    jobList: any,
    jobsCount: number,
    error?: any,
};

const JobPostings = (props: JobPostingsProps) => {
    const { jobList, jobsCount, error } = props;
    const setJobPostings = useSetRecoilState(jobPostingsState)
    const jobQuery = useRecoilValue(jobQueryState);

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [jobsTotal, setJobsTotal] = useState(jobsCount);
    const [jobsOffset, setJobsOffset] = useState(0);

    useEffect(() => {
        setJobPostings(jobList);
    }, [jobList]);

    const handlePageChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
        setJobsOffset((pageNumber - 1) * pageSize);
    };

    const showSearchModal = () => {
        setIsSearchModalOpen(true);
    };

    const handleSearchModalCancel = () => {
        setIsSearchModalOpen(false);
    }

    const showFilterModal = () => {
        setIsFilterModalOpen(true);
    };

    const handleFilterModalCancel = () => {
        setIsFilterModalOpen(false);
    }

    return (
        <div className={styles["job-postings-container"]}>
            <div
                className={styles["search-btn"]}
                onClick={showSearchModal}
            >
                <div className={styles["search-icon"]}>
                    <SearchOutlined
                        style={{
                            color: "#798899",
                            strokeWidth: "60",
                            stroke: "#798899",
                        }}
                    />
                </div>
                <div className={styles["search-text"]}>
                    Jobs in Vietnam
                </div>
            </div>
            <Button
                icon={<FilterOutlined />}
                shape="round"
                block={true}
                style={{
                    color: "#777777",
                }}
                size="small"
                onClick={showFilterModal}
            >
                Filter
            </Button>
            <JobPostingList />
            <Pagination
                defaultCurrent={1}
                pageSize={PAGE_LIMIT}
                total={jobsTotal}
                onChange={handlePageChange}
            />
            {/* SEARCH MODAL */}
            <Modal
                title={(
                    <div className={styles["modal-title"]}>edit your search</div>
                )}
                open={isSearchModalOpen}
                onCancel={handleSearchModalCancel}
                footer={null}
                maskClosable
            >
                <SearchModalContent
                    handleSearchModalCancel={handleSearchModalCancel}
                />
            </Modal>
            {/* FILTER MODAL */}
            <Modal
                title={(
                    <div className={styles["modal-title"]}>Filter Your Job</div>
                )}
                open={isFilterModalOpen}
                onCancel={handleFilterModalCancel}
                footer={null}
            >
                <FilterModalContent
                    handleFilterModalCancel={handleFilterModalCancel}
                />
            </Modal>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { req, res } = ctx;
    const defaultReturnProps = {
        currentLayout: LAYOUT.DEFAULT,
    };
    try {
        const headers = getAuthHeader({ req, res });
        const response = await axios.post(
            `${HOST}jobs/searching/?limit=${PAGE_LIMIT}&offset=0`,
            {
                "query": {
                    job_title: DEFAULT_JOB_TITLE_INPUT,
                    location: DEFAULT_LOCATION_INPUT
                }
            },
            {
                headers: headers
            }
        );
        const jobList = convertJobResponse(response.data.results);
        return {
            props: {
                ...defaultReturnProps,
                jobList,
                jobsCount: response.data.count
            },
        };
    } catch (error: any) {
        return {
            props: {
                ...defaultReturnProps,
                error: JSON.stringify(error),
            },
        };
    }
};

export default JobPostings;