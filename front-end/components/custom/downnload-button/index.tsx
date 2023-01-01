import { Button } from 'antd';
import jsPDF from 'jspdf';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { resumeSavedState } from '../../../recoil-state/resume-state/resume.state';

type Props = {};

const DownloadButton = (props: Props) => {
    const resume = useRecoilValue(resumeSavedState);
    const downloadHandler = async () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4',
            hotfixes: ['px_scaling']
        });
        const data: any = await document.querySelector('#inner-pdf');
        const width = pdf.internal.pageSize.getWidth();
        const windowWidth = data.getBoundingClientRect().width;
        console.log({ width, windowWidth });
        if (data) {
            pdf.html(data, {
                x: 0,
                y: 0,
                width: windowWidth * 0.99,
                windowWidth: windowWidth,
            }).then(() => {
                pdf.save(`${resume.title}.pdf`);
            });
        }

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
        <Button
            type="primary"
            size="large"
            onClick={downloadHandler}>
            Download
        </Button>
    );
};

export default DownloadButton;
