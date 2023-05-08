import { useMemo } from 'react';


import { getSectionById } from '../sectionMap';
import styles from './Leafish.module.scss';
import Masthead from './widgets/Masthead';
import Section from './widgets/Section';
import { PageProps } from '../../configs/utils/template.utils';

const Leafish: React.FC<PageProps> = ({ page }) => {
    const isFirstPage = useMemo(() => page === 0, [page]);

    const layout = [['skills', 'certificate'], ['employmentHistory']]

    return (
        <div className={styles.page}>
            {isFirstPage && <Masthead />}

            <div className={styles.container}>
                <div className={styles.main}>
                    {layout[0].map(key => getSectionById(key, Section))}
                </div>
                <div className={styles.sidebar}>
                    {layout[1].map(key => getSectionById(key, Section))}
                </div>
            </div>
        </div>
    );
};

export default Leafish;
