import { atom } from "recoil";
import { JobQueryType } from "../../configs/interfaces/job.interface";
import { DEFAULT_JOB_TITLE_INPUT, DEFAULT_LOCATION_INPUT } from "../../configs/constants/job.constants";

export const jobPostingsState = atom<any>({
    key: "jobPostingsState",
    default: [],
});

export const jobQueryState = atom<JobQueryType>({
    key: "jobQueryState",
    default: {
        jobTitle: DEFAULT_JOB_TITLE_INPUT,
        location: DEFAULT_LOCATION_INPUT
    }
});