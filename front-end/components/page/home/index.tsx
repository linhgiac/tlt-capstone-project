import { Divider } from 'antd';
import React from 'react';
import HomeHero from './homeHero';
import HomeInstruction from './homeInstruction';
import styles from './styles.module.scss';

type HomeContentProps = {};

const HomeContent = (props: HomeContentProps) => {
    return (
        <>
            <HomeHero className={styles['home-hero-container']} />
            <div
                style={{
                    height: '60px',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 5px 0px 5px 0px',
                }}></div>
            <HomeInstruction />
        </>
    );
};

export default HomeContent;
