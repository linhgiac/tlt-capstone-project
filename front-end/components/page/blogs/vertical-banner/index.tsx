import { Button } from 'antd';
import { useRouter } from 'next/router';

import styles from './styles.module.scss'

function VerticalBanner() {
    const router = useRouter();
    return (
        <div
            className={styles.banner}
            onClick={() => {
                router.push('/templates');
            }}
        >
            <div className={styles.bannerImg}>
            </div>
            <div className={styles.bannerText}>
                <h2>Build your resume in 15 minutes</h2>
                <p>Use professional field-tested resume templates that follow the exact 'resume rules' employers look for.</p>
            </div>
            <div className={styles.bannerBtn}>
                Create My Resume
            </div>
        </div>
    )
}

export default VerticalBanner