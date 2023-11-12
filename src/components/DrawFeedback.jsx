import './draw-feedback.css';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { FaPencilAlt, FaEraser, FaCircle, FaTrash } from 'react-icons/fa';
import colors from '../constants/colors.mjs';
import AnswerContext from './AnswerContext.jsx';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DrawFeedback = (props) => {
  const { t } = useTranslation();
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
    answerContext[props.index] = {
      question_id: props.question_id,
      content: drawingData,
    };
  };

  return (
    <div
      className="draw-container"
      style={{ backgroundColor: props.neutralColor }}>
      <div className="button-group">
        <Tooltip title={t('session.draw.penTooltip')}>
          <button
            style={{
              color: colors.black,
              marginLeft: '5px',
              marginRight: '5px',
            }}
            onClick={() => {
              setTool('pen');
              setColor(colors.black);
            }}>
            <FaPencilAlt />
          </button>
        </Tooltip>
        <Tooltip title={t('session.draw.eraseTooltip')}>
          <button
            style={{ marginLeft: '5px', marginRight: '5px' }}
            onClick={() => setTool('eraser')}>
            <FaEraser />
          </button>
        </Tooltip>
        <Tooltip title={t('session.draw.redTooltip')}>
          <button
            style={{ color: colors.red, marginLeft: '5px', marginRight: '5px' }}
            onClick={() => setColor(colors.red)}>
            <FaCircle />
          </button>
        </Tooltip>
        <Tooltip title={t('session.draw.greenTooltip')}>
          <button
            style={{
              color: colors.green,
              marginLeft: '5px',
              marginRight: '5px',
            }}
            onClick={() => setColor(colors.green)}>
            <FaCircle />
          </button>
        </Tooltip>
        <Tooltip title={t('session.draw.blueTooltip')}>
          <button
            style={{
              color: colors.blue,
              marginLeft: '5px',
              marginRight: '5px',
            }}
            onClick={() => setColor(colors.blue)}>
            <FaCircle />
          </button>
        </Tooltip>
        <Tooltip title={t('session.draw.resetTooltip')}>
          <button
            style={{ marginLeft: '5px', marginRight: '5px' }}
            onClick={() => {
              const canvas = canvasRef.current;
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }}>
            <FaTrash />
          </button>
        </Tooltip>
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
