import { Button } from 'antd';
import jsPDF from 'jspdf';
import React from 'react';
import { useRecoilValue } from 'recoil';
import html2canvas from 'html2canvas';

import { resumeSavedState } from '../../../recoil-state/resume-state/resume.state';
import { DownloadOutlined, DragOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';

type Props = {
    icon?: any;
};

const DownloadButton = (props: Props) => {
    const { icon } = props;
    const { t } = useTranslation();
    const resume = useRecoilValue(resumeSavedState);
    const downloadHandler = async () => {
        // const pdf = new jsPDF({
        //     orientation: 'portrait',
        //     unit: 'px',
        //     format: 'a4',
        //     hotfixes: ['px_scaling']
        // });

        const data: any = await document.querySelector('#pdf');

        // const width = pdf.internal.pageSize.getWidth();
        // const windowWidth = data.getBoundingClientRect().width;
        if (data) {
            try {
                const scale = data.style.transform;
                data.style.transform = 'scale(1)';
                const canvas = await html2canvas(data, {
                    allowTaint: false,
                    useCORS: true,
                });
                const imgData = canvas.toDataURL('image/png', 1.0);
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save(`${resume.title}.pdf`);
                data.style.transform = scale;
                // data.style.removeProperty('transform');
            } catch (error) {
                console.log(error);
            }
        }

        // if (data) {
        //     pdf.html(data, {

        //     }).then(() => {
        //         pdf.save(`${resume.title}.pdf`);
        //     });
        // }

        // const input: any = document.getElementById('pdf');

        // html2canvas(input).then(canvas => {
        //     const imgData = canvas.toDataURL('image/png');
        //     const pdf = new jsPDF();
        //     const width = pdf.internal.pageSize.getWidth();
        //     const height = pdf.internal.pageSize.getHeight();
        //     pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        //     // pdf.output('dataurlnewwindow');
        //     pdf.save('download.pdf');
        // });
    };
    return (
        <>
            {icon ? (
                <Button
                    style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        fontSize: '18px',
                    }}
                    onClick={downloadHandler}>
                    <DownloadOutlined />
                </Button>
            ) : (
                <Button
                    style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        paddingLeft: '25px',
                        paddingRight: '25px',
                        borderRadius: '8px',
                    }}
                    type="primary"
                    size="large"
                    onClick={downloadHandler}>
                    {t('edit-download', {ns: 'edit'})}
                </Button>
            )}
        </>
    );
};

export default DownloadButton;
