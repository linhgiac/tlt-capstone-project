import { Button } from 'antd';
import jsPDF from 'jspdf';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { resumeSavedState } from '../../../recoil-state/resume-state/resume.state';

type Props = {};

const DownloadButton = (props: Props) => {
    const resume = useRecoilValue(resumeSavedState);
    const downloadHandler = async () => {
        const pdf = new jsPDF('portrait', 'pt', 'a4');
        const data: any = await document.querySelector('#pdf');
        const width = pdf.internal.pageSize.getWidth();
        if (data) {
            pdf.html(data, { x: 0, y: 0, width: width }).then(() => {
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
