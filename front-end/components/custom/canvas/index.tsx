import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import resumeExportStyles from '../../page/resume/resume-export/styles.module.scss';

type CanvasProps = {
    width: number;
    height: number;
    className?: string;
    onGenerateCanvas: (ctx: CanvasRenderingContext2D) => void;
};

const Canvas = (props: CanvasProps) => {
    const { width, height, onGenerateCanvas, className } = props;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const uiHeight = entries[0].target.clientHeight;
            const scale = uiHeight / 1660;

            const canvasResize = Array.from(
                document.getElementsByClassName(
                    styles['canvas-resize']
                ) as HTMLCollectionOf<HTMLElement>
            );
            if (canvasResize) {
                canvasResize.forEach((canvas) => {
                    canvas.style.transform = `scale( ${scale} )`;
                });
            }
        });
        const uiSize = document.getElementsByClassName(
            resumeExportStyles['resume-export-main']
        )[0];
        resizeObserver.observe(uiSize);

        return () => {
            resizeObserver.unobserve(uiSize);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        onGenerateCanvas(ctx);
    }, [onGenerateCanvas]);

    return (
        <canvas
            className={classNames(className, styles['canvas-resize'])}
            width={width}
            height={height}
            ref={canvasRef}
        />
    );
};

export default Canvas;
