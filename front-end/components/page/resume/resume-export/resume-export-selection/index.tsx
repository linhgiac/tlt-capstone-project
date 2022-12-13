import { Button } from 'antd';
import classNames from 'classnames';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { resumeSavedState } from '../../../../../recoil-state/resume-state/resume.state';
import styles from './styles.module.scss';

type ResumeExportSelectionProps = {
    className: string;
    onChangeEditorLayout: () => void;
};

const ResumeExportSelection = (props: ResumeExportSelectionProps) => {
    const { className, onChangeEditorLayout } = props;
    const resume = useRecoilValue(resumeSavedState);
    const clickHandler = () => {
        onChangeEditorLayout();
    };
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
        <div className={classNames(className, styles['resume-export-button'])}>
            <Button
                type="text"
                shape="round"
                size="large"
                onClick={clickHandler}
                className={styles['resume-export-button__selection']}>
                Select Template
            </Button>
            <Button
                type="primary"
                size="large"
                onClick={downloadHandler}>
                Download
            </Button>
        </div>
    );
};

export default ResumeExportSelection;
