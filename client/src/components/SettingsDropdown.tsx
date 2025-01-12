import React from 'react';
import { Share2, Pencil, Trash2, X } from 'lucide-react';
import ReactDOM from 'react-dom';

const SettingsDropdown = ({ file, onEdit, onDelete, onShare, onClose }) => {
  return ReactDOM.createPortal(
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-10">
      <button
        onClick={onShare}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <Share2 className="h-4 w-4 mr-3 text-gray-500" />
        Give Access
      </button>
      <button
        onClick={onEdit}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <Pencil className="h-4 w-4 mr-3 text-gray-500" />
        Edit
      </button>
      <button
        onClick={onDelete}
        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
      >
        <Trash2 className="h-4 w-4 mr-3" />
        Delete
      </button>
      <button
        onClick={onClose}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <X className="h-4 w-4 mr-3" />
        Close
      </button>
    </div>,
    document.body // Render the dropdown in the body
  );
};

export default SettingsDropdown;