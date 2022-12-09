import React from 'react';

type Props = {
    children: React.Node;
};

const DefaultLayout = (props: Props) => {
    const { children } = props;
    return <div>DefaultLayout</div>;
};

export default DefaultLayout;
