import { isEmpty } from 'lodash';
import React from 'react';

import styles from './styles.module.scss';
import DataDisplay from '../../../shared/DataDisplay';
import { UserOutlined } from '@ant-design/icons';

type Props = {
    header?: string;
    items: any;
};

const PersonalDetails = (props: Props) => {
    const { items, header } = props;

    return (
        <DataDisplay>
            <DataDisplay
                icon={<UserOutlined />}
                className={styles.header}>
                {header}
                {/* <Divide className={styles.underline} /> */}
            </DataDisplay>
            <DataDisplay className={styles.item}>
                <DataDisplay>{items?.address}</DataDisplay>
                <DataDisplay>{items?.city}</DataDisplay>
                <DataDisplay>{items?.country}</DataDisplay>
                <DataDisplay>{items?.phone}</DataDisplay>
                <DataDisplay>{items?.email}</DataDisplay>
                {(items?.dateOfBirth || items?.placeOfBirth) && (
                    <div>
                        <div
                            style={{
                                color: '#666666',
                                paddingTop: '5px',
                            }}>
                            Date/Place of birth
                        </div>
                        <DataDisplay>{items?.dateOfBirth}</DataDisplay>
                        <DataDisplay>{items?.placeOfBirth}</DataDisplay>
                    </div>
                )}
            </DataDisplay>
        </DataDisplay>
    );
};

export default PersonalDetails;
