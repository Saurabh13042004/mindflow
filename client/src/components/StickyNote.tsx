import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

interface StickyNoteProps {
    id: string;
    data: {
        label: string;
        onLabelChange: (id: string, label: string) => void;
        style?: {
            backgroundColor?: string;
        };
    };
}

export default function StickyNote({ id, data }: StickyNoteProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(data.label);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        data.onLabelChange(id, label);
    };

    return (
        <div
            className="group relative min-w-[200px] min-h-[200px] p-4 bg-yellow-100 shadow-md rounded-sm transform rotate-2 transition-transform hover:rotate-0"
            style={{ backgroundColor: data.style?.backgroundColor || '#fef9c3' }}
        >
            {isEditing ? (
                <textarea
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onBlur={handleBlur}
                    className="w-full h-full p-2 bg-transparent border-none focus:outline-none resize-none font-handwriting text-gray-700"
                    autoFocus
                />
            ) : (
                <div
                    onDoubleClick={handleDoubleClick}
                    className="w-full h-full font-handwriting text-gray-700 whitespace-pre-wrap cursor-text"
                >
                    {label}
                </div>
            )}

            <Handle id="right" type="source" position={Position.Right} />
            <Handle id="right" type="target" position={Position.Right} />

            <Handle id="left" type="target" position={Position.Left} />
            <Handle id="left" type="source" position={Position.Left} />

            <Handle id="top" type="target" position={Position.Top} />
            <Handle id="top" type="source" position={Position.Top} />

            <Handle id="bottom" type="source" position={Position.Bottom} />
            <Handle id="bottom" type="target" position={Position.Bottom} />
        </div>
    );
}