import React from 'react';
import classNames from 'classnames';

type ResumeExportPaginationProps = {
    className?: string;
};

const ResumeExportPagination = (props: ResumeExportPaginationProps) => {
    const { className } = props;
    return <div className={classNames(className)}>ResumeExportPagination</div>;
};

export default ResumeExportPagination;
