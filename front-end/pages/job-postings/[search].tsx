import axios from 'axios';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { useState, useEffect } from 'react';

import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Pagination, Button, Modal } from 'antd';
import type { PaginationProps } from 'antd';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import styles from './styles.module.scss';
import { getAuthHeader } from '../../configs/restApi/clients';
import { HOST, LAYOUT } from '../../configs/constants/misc';
import FilterModalContent from '../../components/page/job/filter-modal';
import SearchModalContent from '../../components/page/job/search-modal';
import {
    jobPostingsState,
    jobQueryState,
} from '../../recoil-state/job-state/job-state';
import JobPostingList from '../../components/page/job/job-posting-list';
import {
    DEFAULT_JOB_TITLE_INPUT,
    DEFAULT_LOCATION_INPUT,
    JOB_DATA,
    PAGE_LIMIT,
} from '../../configs/constants/job.constants';
import {
    convertJobResponse,
    convertSearchJobPayload,
} from '../../configs/utils/format.utils';
import { camelCase, kebabCase, lowerCase } from 'lodash';
import { useRouter } from 'next/router';

type JobPostingsProps = {
    jobList: any;
    jobsCount: number;
    error?: any;
};

const JobPostings = (props: JobPostingsProps) => {
    const { jobList, jobsCount, error } = props;
    const router = useRouter();
    const [jobQuery, setJobQuery] = useRecoilState(jobQueryState);
    const [jobs, setJobs] = useState();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [jobsTotal, setJobsTotal] = useState(jobsCount);
    const [jobsOffset, setJobsOffset] = useState(0);

    useEffect(() => {
        setJobs(jobList);
        setJobQuery({
            job_title: lowerCase(router.query.search?.toString().split('_')[0]),
            location: router.query.search?.toString().split('_')[1]
                ? router.query.search?.toString().split('_')[1]
                : 'ho-chi-minh',
            sort_by: router.query.sort_by,
            job_portal: router.query.job_portal,
            keywords: router.query.keywords,
            last_updated: router.query.last_updated,
        });
    }, [jobList, router]);

    const handlePageChange: PaginationProps['onChange'] = (
        pageNumber,
        pageSize
    ) => {
        setJobsOffset((pageNumber - 1) * pageSize);
    };

    const searchJobHandler = (jobs: any) => {
        setIsSearchModalOpen(false);
        setJobs(jobs);
    };

    const filterJobHandler = (value: any) => {
        setIsFilterModalOpen(false);
        setJobs(value);
    };

    return (
        <div className={styles['job-postings-container']}>
            <div
                className={styles['search-btn']}
                onClick={() => setIsSearchModalOpen(true)}>
                <div className={styles['search-icon']}>
                    <SearchOutlined
                        style={{
                            color: '#798899',
                            strokeWidth: '60',
                            stroke: '#798899',
                        }}
                    />
                </div>
                <div className={styles['search-text']}>Jobs in Vietnam</div>
            </div>
            <Button
                icon={<FilterOutlined />}
                shape="round"
                block={true}
                style={{
                    color: '#777777',
                }}
                size="small"
                onClick={() => setIsFilterModalOpen(true)}>
                Filter
            </Button>
            <JobPostingList jobs={jobs} />
            <Pagination
                defaultCurrent={1}
                pageSize={PAGE_LIMIT}
                total={jobsTotal}
                onChange={handlePageChange}
            />
            {/* SEARCH MODAL */}
            <Modal
                title={
                    <div className={styles['modal-title']}>
                        edit your search
                    </div>
                }
                open={isSearchModalOpen}
                onCancel={() => setIsSearchModalOpen(false)}
                footer={null}
                maskClosable>
                <SearchModalContent />
            </Modal>
            {/* FILTER MODAL */}
            <Modal
                title={
                    <div className={styles['modal-title']}>Filter Your Job</div>
                }
                open={isFilterModalOpen}
                onCancel={() => setIsFilterModalOpen(false)}
                footer={null}>
                <FilterModalContent />
            </Modal>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {
    const { req, res } = ctx;
    const defaultReturnProps = {
        currentLayout: LAYOUT.DEFAULT,
    };
    const [job, location] = convertSearchJobPayload(ctx.query?.search);
    const sort_by = ctx.query?.sort_by;
    const job_portal = ctx.query?.job_portal;
    const keywords = ctx.query?.keywords;
    const last_updated = ctx.query?.last_updated;
    console.log(
        sort_by,
        job_portal,
        keywords,
        last_updated,

        job,
        location
    );

    try {
        const headers = getAuthHeader({ req, res });
        const response = await axios.post(
            `${HOST}jobs/searching/?limit=${PAGE_LIMIT}&offset=0`,
            {
                query: {
                    job_title: job,
                    location: location,
                    sort_by,
                    job_portal,
                    keywords,
                    last_updated,
                },
            },
            {
                headers: headers,
            }
        );
        const jobList = convertJobResponse(response.data.results);
        // const jobList: any = [];
        return {
            props: {
                ...defaultReturnProps,
                jobList,
                jobsCount: response.data.count,
                // jobsCount: JOB_DATA.count,
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
