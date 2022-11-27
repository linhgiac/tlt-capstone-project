import generateCalendar from 'antd/lib/calendar/generateCalendar';
import React, { useEffect, useRef } from 'react';

type CanvasProps = {
    width: number;
    height: number;
    generateResume: (ctx: CanvasRenderingContext2D) => void;
};

const Canvas = (props: CanvasProps) => {
    const { width, height, generateResume } = props;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        generateResume(ctx);
    }, [generateResume]);

    return <canvas width={width} height={height} ref={canvasRef} />;
};

export default Canvas;
