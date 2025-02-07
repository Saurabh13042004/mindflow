import React from 'react';
import { HexColorPicker } from 'react-colorful';
import * as Popover from '@radix-ui/react-popover';
import { Palette, Type, Frame, Square, Circle, Triangle, Hexagon } from 'lucide-react';

interface NodeStyle {
  backgroundColor: string;
  borderColor: string;
  borderRadius: string;
  borderStyle: string;
  fontFamily: string;
  fontSize: string;
  shape: string;
  clipPath?: string;
  width?: string;
  height?: string;
}

interface NodeCustomizerProps {
  style: NodeStyle;
  onStyleChange: (style: Partial<NodeStyle>) => void;
}

const fontFamilies = [
  'Inter, sans-serif',
  'Arial, sans-serif',
  'Georgia, serif',
  'Monospace',
];

const shapes = [
  {
    id: 'rectangle',
    icon: Square,
    label: 'Rectangle',
    style: {
      borderRadius: '4px',
      width: '280px',
      height: '60px',
      clipPath: 'none',
      aspectRatio: 'auto'
    }
  },
  {
    id: 'circle',
    icon: Circle,
    label: 'Circle',
    style: {
      borderRadius: '50%',
      width: '120px',
      height: '120px',
      clipPath: "circle(50%)",
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  {
    id: 'triangle',
    icon: Triangle,
    label: 'Triangle',
    style: {
      width: '120px',
      height: '120px',
      borderRadius: '0',
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translateY(20px)'
    }
  },
  {
    id: 'hexagon',
    icon: Hexagon,
    label: 'Hexagon',
    style: {
      width: '120px',
      height: '120px',
      borderRadius: '0',
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
];



const borderStyles = ['solid', 'dashed', 'dotted', 'double'];
const borderRadii = ['4px', '8px', '12px', '16px', '24px'];
const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];

export default function NodeCustomizer({ style, onStyleChange }: NodeCustomizerProps) {
  const handleShapeChange = (shape: string) => {
    const selectedShape = shapes.find(s => s.id === shape);
    if (selectedShape) {
      if (style.shape === shape) {
        onStyleChange({
          shape: 'rectangle',
          borderRadius: '4px',
          width: '280px',
          height: '60px',
          clipPath: 'none'
        });
      } else {
        onStyleChange({
          shape: shape,
          ...selectedShape.style
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 p-2 bg-gray-50 rounded-md">
          {shapes.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleShapeChange(id)}
              className={`p-2 rounded-md transition-colors ${
                style.shape === id ? 'bg-blue-100' : 'hover:bg-blue-50'
              }`}
              title={label}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className="p-2 rounded hover:bg-blue-50 transition-colors"
              title="Background Color"
            >
              <Palette className="w-5 h-5" />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="bg-white p-2 rounded-lg shadow-xl z-50">
              <HexColorPicker
                color={style.backgroundColor}
                onChange={(color) => onStyleChange({ backgroundColor: color })}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className="p-2 rounded hover:bg-blue-50 transition-colors"
              title="Border Color"
            >
              <Frame className="w-5 h-5" />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="bg-white p-2 rounded-lg shadow-xl z-50">
              <HexColorPicker
                color={style.borderColor}
                onChange={(color) => onStyleChange({ borderColor: color })}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <select
          className="p-2 rounded border hover:border-blue-300 transition-colors"
          value={style.borderStyle}
          onChange={(e) => onStyleChange({ borderStyle: e.target.value })}
          title="Border Style"
        >
          {borderStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded border hover:border-blue-300 transition-colors"
          value={style.borderRadius}
          onChange={(e) => onStyleChange({ borderRadius: e.target.value })}
          title="Border Radius"
        >
          {borderRadii.map((radius) => (
            <option key={radius} value={radius}>
              {radius}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded border hover:border-blue-300 transition-colors"
          value={style.fontFamily}
          onChange={(e) => onStyleChange({ fontFamily: e.target.value })}
          title="Font Family"
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font}>
              {font.split(',')[0]}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded border hover:border-blue-300 transition-colors"
          value={style.fontSize}
          onChange={(e) => onStyleChange({ fontSize: e.target.value })}
          title="Font Size"
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
