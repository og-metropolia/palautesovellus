import React, { useRef, useState } from 'react';
import { FaPencilAlt, FaEraser, FaCircle, FaPaperPlane, FaTrash } from 'react-icons/fa';
import colors from '../constants/colors.mjs';
import './draw-feedback.css';  // Note the lowercase here

const DrawFeedback = (props) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState(colors.black);
    const [tool, setTool] = useState('pen');

    const getCoordinates = (event) => {
        if (event.type.startsWith("touch")) {
            return {
                x: event.touches[0].clientX - event.target.offsetLeft,
                y: event.touches[0].clientY - event.target.offsetTop
            };
        } else {
            return {
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY
            };
        }
    };

    const startDrawing = (event) => {
        const coordinates = getCoordinates(event);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 15;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = 3;
        }

        ctx.strokeStyle = color;
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(coordinates.x, coordinates.y);
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
        const coordinates = getCoordinates(event);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(coordinates.x, coordinates.y);
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
        <div className="container" style={{ backgroundColor: props.neutralColor }}>
            <div className="button-group">
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
                className="canvas"
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
            ></canvas>
            <div className="button-group">
                <button className="button" style={{ backgroundColor: props.bgColor, color: props.fgColor }} onClick={sendDrawingToTeacher}><FaPaperPlane /> Lähetä</button>
                <button className="button" style={{ backgroundColor: props.bgColor, color: props.fgColor }} onClick={clearCanvas}><FaTrash /> Tyhjennä</button>
            </div>
        </div>
    );
};

export default DrawFeedback;
