import React, { useRef, useState } from 'react';
import { FaPencilAlt, FaEraser, FaCircle, FaPaperPlane, FaTrash } from 'react-icons/fa';
import colors from '../constants/colors.mjs';

const DrawFeedback = (props) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState(colors.black);
    const [tool, setTool] = useState('pen');

    const startDrawing = (event) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 15; // voit säätää leveyttä
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = 3; // voit säätää leveyttä
        }

        ctx.strokeStyle = color;
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const stopDrawing = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.closePath();
        setIsDrawing(false);
    };

    const draw = (event) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        ctx.stroke();
    };

    const sendDrawingToTeacher = () => {
        const canvas = canvasRef.current;
        const drawingData = canvas.toDataURL('image/png');
        console.log('Piirros lähetetty:', drawingData);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const selectColor = (selectedColor) => {
        setColor(selectedColor);
        setTool('pen');
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: props.neutralColor }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <button style={{ color: colors.black, marginRight: '5px' }} onClick={() => { setTool('pen'); setColor(colors.black); }}><FaPencilAlt /></button>
                <button style={{ marginRight: '5px' }} onClick={() => setTool('eraser')}><FaEraser /></button>
                <button style={{ color: colors.red, marginRight: '5px' }} onClick={() => selectColor(colors.red)}><FaCircle /></button>
                <button style={{ color: colors.green, marginRight: '5px' }} onClick={() => selectColor(colors.green)}><FaCircle /></button>
                <button style={{ color: colors.blue }} onClick={() => selectColor(colors.blue)}><FaCircle /></button>
            </div>
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                style={{ border: '1px solid black', marginBottom: '20px', backgroundColor: 'white' }}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
            ></canvas>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <button style={{ fontSize: '24px', marginRight: '10px', backgroundColor: props.bgColor, color: props.fgColor }} onClick={sendDrawingToTeacher}><FaPaperPlane /> Lähetä</button>
                <button style={{ fontSize: '24px', backgroundColor: props.bgColor, color: props.fgColor }} onClick={clearCanvas}><FaTrash /> Tyhjennä</button>
            </div>
        </div>
    );
};

export default DrawFeedback;
