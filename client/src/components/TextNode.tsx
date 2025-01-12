import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const TextNode = ({ id, data }) => {
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
        <div className="text-node">
            {isEditing ? (
                <textarea
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <div onDoubleClick={handleDoubleClick}>{label}</div>
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
};

export default TextNode;