import './draw-feedback.css';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { FaPencilAlt, FaEraser, FaCircle, FaTrash } from 'react-icons/fa';
import colors from '../constants/colors.mjs';
import AnswerContext from './AnswerContext.jsx';

const DrawFeedback = (props) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(colors.black);
  const [tool, setTool] = useState('pen');
  const answerContext = useContext(AnswerContext);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (event.type.startsWith('touch')) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const scaleFactor = window.devicePixelRatio || 1;

    canvas.width = 400 * scaleFactor;
    canvas.height = 400 * scaleFactor;

    const ctx = canvas.getContext('2d');
    ctx.scale(scaleFactor, scaleFactor);
  }, []);

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
    ctx.lineJoin = 'round';
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
    saveDrawing();
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const drawingData = canvas.toDataURL('image/png');
    answerContext[props.index] = drawingData;
    if (props.onSave) {
      props.onSave(drawingData);
    }
  };

  return (
    <div
      className="draw-container"
      style={{ backgroundColor: props.neutralColor }}>
      <div className="button-group">
        <button
          style={{ color: colors.black, marginRight: '5px' }}
          onClick={() => {
            setTool('pen');
            setColor(colors.black);
          }}>
          <FaPencilAlt />
        </button>
        <button
          style={{ marginRight: '5px' }}
          onClick={() => setTool('eraser')}>
          <FaEraser />
        </button>
        <button
          style={{ color: colors.red, marginRight: '5px' }}
          onClick={() => setColor(colors.red)}>
          <FaCircle />
        </button>
        <button
          style={{ color: colors.green, marginRight: '5px' }}
          onClick={() => setColor(colors.green)}>
          <FaCircle />
        </button>
        <button
          style={{ color: colors.blue, marginRight: '5px' }}
          onClick={() => setColor(colors.blue)}>
          <FaCircle />
        </button>
        <button
          onClick={() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }}>
          <FaTrash />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="canvas"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}></canvas>
    </div>
  );
};

export default DrawFeedback;
