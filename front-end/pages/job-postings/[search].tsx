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
import classNames from 'classnames';

type JobPostingsProps = {
    jobList: any;
    jobsCount: number;
    error?: any;
};

const JobPostings = (props: JobPostingsProps) => {
    const { jobList, jobsCount, error } = props;
    const router = useRouter();
    const [jobQuery, setJobQuery] = useRecoilState(jobQueryState);
    const [jobs, setJobs] = useState<any>();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [jobsTotal, setJobsTotal] = useState(jobsCount);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [jobs]);

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

    const handlePageChange: PaginationProps['onChange'] = async (
        pageNumber,
        pageSize
    ) => {
        const jobOffset = (pageNumber - 1) * pageSize;
        const { location, ...rest } = jobQuery;
        // router.query.search
        let convertedLocation = '';
        if (location === 'ho-chi-minh') {
            convertedLocation = 'Ho Chi Minh city, Vietnam';
        } else if (location === 'ha-noi') {
            convertedLocation = 'Ha Noi city, Vietnam';
        } else if (location === 'da-nang') {
            convertedLocation = 'Da Nang city, Vietnam';
        }
        const authHeader = getAuthHeader();
        try {
            const response = await axios.post(
                `${HOST}jobs/searching/?limit=${PAGE_LIMIT}&offset=${jobOffset}`,
                {
                    query: {
                        location: convertedLocation,
                        ...rest,
                    },
                },
                {
                    headers: authHeader,
                }
            );
            const jobPostingList = convertJobResponse(response.data.results);
            setJobs(jobPostingList);
            setJobsTotal(response.data.count);
        } catch (error: any) {
            error?.response?.data.detail &&
                // setError(error.response.data.detail);
                // Error Handling
                console.log(error.response.data.detail);
        }
    };

    return (
        <div className={styles['job-postings-container']}>
            <div className={styles.search}>
                <div className={styles.search}>
                    <SearchModalContent />
                </div>
                <div
                    className={classNames(styles['search-btn'])}
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
            </div>

            <Button
                icon={<FilterOutlined />}
                shape="round"
                size="large"
                block={true}
                style={{
                    color: '#777777',
                }}
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
        // const response = await axios.post(
        //     `${HOST}jobs/searching/?limit=${PAGE_LIMIT}&offset=0`,
        //     {
        //         query: {
        //             job_title: job,
        //             location: location,
        //             job_portal,
        //             keywords,
        //             last_updated,
        //         },
        //         sort: sort_by,
        //     },
        //     {
        //         headers: headers,
        //     }
        // );
        // const jobList = convertJobResponse(response.data.results);
        // const jobList: any = [];
        return {
            props: {
                ...defaultReturnProps,
                jobList: JOB_DATA.results,
                // jobsCount: response.data.count,
                jobsCount: JOB_DATA.count,
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
