import React from 'react';
import { 
  PlusCircle, 
  Trash2, 
  Save, 
  Download, 
  Bot, 
  StickyNote, 
  Type,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ToolbarButton = ({ onClick, icon: Icon, label, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors
      ${disabled 
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'} 
      rounded-md border border-gray-200`}
    aria-label={label}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

const Toolbar = ({ onAddNode, onDelete, onSave, onExport, onGenerateAI, onAddStickyNote, onAddTextNode }) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-white/95 shadow-sm border-b border-gray-200 backdrop-blur-sm z-10">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md border border-gray-200 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Dashboard</span>
      </Link>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-md border border-gray-200">
          <ToolbarButton onClick={onAddNode} icon={PlusCircle} label="Flow Node" />
          <ToolbarButton onClick={onAddStickyNote} icon={StickyNote} label="Sticky Note" />
          <ToolbarButton onClick={onAddTextNode} icon={Type} label="Text" />
        </div>
        
        <div className="flex items-center gap-2">
          <ToolbarButton onClick={onDelete} icon={Trash2} label="Delete" />
          <ToolbarButton onClick={onGenerateAI} icon={Bot} label="AI Generate"  />
          <ToolbarButton onClick={onSave} icon={Save} label="Save" />
          <ToolbarButton onClick={onExport} icon={Download} label="Export" />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;