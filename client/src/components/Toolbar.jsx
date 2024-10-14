import React from 'react';
import { PlusCircle, Trash2, Save, Download, Bot } from 'lucide-react';

const Toolbar = ({ onAddNode, onDelete , onSave, onExport, onGenerateAI }) => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex space-x-4 p-4 bg-white shadow-md rounded-b-lg z-10">
      <button
        onClick={onAddNode}
        className="flex items-center p-2 hover:bg-gray-100 rounded border border-gray-300"
        aria-label="Add Node"
      >
        <PlusCircle className="w-5 h-5" />
      </button>
      <button
        className="flex items-center p-2 hover:bg-gray-100 rounded border border-gray-300"
        onClick={onDelete}
        aria-label="Delete selected node or edge"
      >
        <Trash2 className="w-5 h-5" />
      </button>
      <button
        onClick={onGenerateAI}
        className="flex items-center p-2 hover:bg-gray-100 rounded border border-gray-300"
        aria-label="Generate AI Node"
      >
        <Bot className="w-5 h-5" />
      </button>
      <button
        onClick={onSave}
        className="flex items-center p-2 hover:bg-gray-100 rounded border border-gray-300"
        aria-label="Save"
      >
        <Save className="w-5 h-5" />
      </button>
      <button
        onClick={onExport}
        className="flex items-center p-2 hover:bg-gray-100 rounded border border-gray-300"
        aria-label="Export"
      >
        <Download className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toolbar;