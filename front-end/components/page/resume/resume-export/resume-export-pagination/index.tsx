import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { resumeLayoutState, resumeSelectedPageIndexState } from '../../../../../recoil-state/resume-state/resume.state';

type ResumeExportPaginationProps = {
    className?: string;
};

const ResumeExportPagination = (props: ResumeExportPaginationProps) => {
    const { className } = props;
    const [pageIndex, setPageIndex] = useRecoilState(resumeSelectedPageIndexState);
    const resumeLayout = useRecoilValue(resumeLayoutState);

    const increPageIndex = () => {
        if(pageIndex < resumeLayout.length - 1) {
            setPageIndex(pageIndex + 1);
        }
    }

    const decrePageIndex = () => {
        if(pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    }

    useEffect(() => {   
        if(pageIndex >= resumeLayout.length )
        {
            setPageIndex(0);
        }
    }, [resumeLayout.length])

    return (
        <div className={classNames(className)}>
            <Button onClick={decrePageIndex} style={{backgroundColor: 'transparent'}}><LeftOutlined /></Button>
            {pageIndex + 1} / {resumeLayout.length}
            <Button onClick={increPageIndex} style={{backgroundColor: 'transparent'}}><RightOutlined /></Button>
        </div>
    )
};

export default ResumeExportPagination;
