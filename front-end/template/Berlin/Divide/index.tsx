import classNames from 'classnames';
import React from 'react';

type Props = {
    className?: string;
    type?: string;
};

const Divide = (props: Props) => {
    const { className, type = 'horizontal' } = props;
    return (
        <div
            className={classNames(className, {
                [type]: true,
            })}></div>
    );
};

export default Divide;
