import React from 'react';
import { HexColorPicker } from 'react-colorful';
import * as Popover from '@radix-ui/react-popover';
import { Palette, Type, Square, Frame } from 'lucide-react';

interface NodeStyle {
  backgroundColor: string;
  borderColor: string;
  borderRadius: string;
  borderStyle: string;
  fontFamily: string;
  fontSize: string;
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

const borderStyles = ['solid', 'dashed', 'dotted', 'double'];
const borderRadii = ['4px', '8px', '12px', '16px', '24px'];
const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];

export default function NodeCustomizer({ style, onStyleChange }: NodeCustomizerProps) {
  return (
    <div className="flex gap-2 items-center">
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
  );
}