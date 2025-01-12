import React, { useState } from 'react';
import { 
  ChevronRight, 
  Share2, 
  GitBranch, 
  Network
} from 'lucide-react';

const templateStyles = {
  mindmap: {
    backgroundColor: '#ffffff',
    borderColor: '#93c5fd',
    borderRadius: '8px',
    borderStyle: 'solid',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
  },
  flowchart: {
    backgroundColor: '#f8fafc',
    borderColor: '#64748b',
    borderRadius: '12px',
    borderStyle: 'solid',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
  },
  orgChart: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
    borderRadius: '16px',
    borderStyle: 'solid',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
  }
};

const templates = {
  mindmap: {
    name: "Mind Map",
    icon: Share2,
    nodes: [
      {
        id: '1',
        type: 'custom',
        data: { 
          label: 'Central Idea',
          style: templateStyles.mindmap,
        },
        position: { x: 250, y: 200 },
      },
      {
        id: '2',
        type: 'custom',
        data: { 
          label: 'Branch 1',
          style: templateStyles.mindmap,
        },
        position: { x: -250, y: 200 },
        sourcePosition: 'right',
        targetPosition: 'left',
      },
      {
        id: '3',
        type: 'custom',
        data: { 
          label: 'Branch 2',
          style: templateStyles.mindmap,
        },
        position: { x: 750, y: 200 },
        sourcePosition: 'left',
        targetPosition: 'right',
      },
      {
        id: '4',
        type: 'custom',
        data: { 
          label: 'Branch 3',
          style: templateStyles.mindmap,
        },
        position: { x: 50, y: 400 },
        sourcePosition: 'right',
        targetPosition: 'top',
      },
      {
        id: '5',
        type: 'custom',
        data: { 
          label: 'Branch 4',
          style: templateStyles.mindmap,
        },
        position: { x: 450, y: 400 },
        sourcePosition: 'left',
        targetPosition: 'top',
      }
    ],
    edges: [
      { 
        id: 'e1-2', 
        source: '1', 
        target: '2',
        sourceHandle: 'left',
        targetHandle: 'right'
      },
      { 
        id: 'e1-3', 
        source: '1', 
        target: '3',
        sourceHandle: 'right',
        targetHandle: 'left'
      },
      { 
        id: 'e1-4', 
        source: '1', 
        target: '4',
        sourceHandle: 'bottom',
        targetHandle: 'top'
      },
      { 
        id: 'e1-5', 
        source: '1', 
        target: '5',
        sourceHandle: 'bottom',
        targetHandle: 'top'
      }
    ],
  },
  flowchart: {
    name: "Flow Chart",
    icon: Network,
    nodes: [
      {
        id: '1',
        type: 'custom',
        data: { 
          label: 'Start',
          style: templateStyles.flowchart,
        },
        position: { x: 250, y: 50 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '2',
        type: 'custom',
        data: { 
          label: 'Process 1',
          style: templateStyles.flowchart,
        },
        position: { x: 250, y: 150 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '3',
        type: 'custom',
        data: { 
          label: 'Decision',
          style: templateStyles.flowchart,
        },
        position: { x: 250, y: 250 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '4',
        type: 'custom',
        data: { 
          label: 'Process 2A',
          style: templateStyles.flowchart,
        },
        position: { x: 100, y: 350 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '5',
        type: 'custom',
        data: { 
          label: 'Process 2B',
          style: templateStyles.flowchart,
        },
        position: { x: 400, y: 350 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '6',
        type: 'custom',
        data: { 
          label: 'End',
          style: templateStyles.flowchart,
        },
        position: { x: 250, y: 450 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      }
    ],
    edges: [
      { 
        id: 'e1-2', 
        source: '1', 
        target: '2',
        sourceHandle: 'bottom',
        targetHandle: 'top',
      },
      { 
        id: 'e2-3', 
        source: '2', 
        target: '3',
        sourceHandle: 'bottom',
        targetHandle: 'top',
      },
      { 
        id: 'e3-4', 
        source: '3', 
        target: '4',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        label: 'Yes'
      },
      { 
        id: 'e3-5', 
        source: '3', 
        target: '5',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        label: 'No'
      },
      { 
        id: 'e4-6', 
        source: '4', 
        target: '6',
        sourceHandle: 'bottom',
        targetHandle: 'top',
      },
      { 
        id: 'e5-6', 
        source: '5', 
        target: '6',
        sourceHandle: 'bottom',
        targetHandle: 'top',
      }
    ],
  },
  orgChart: {
    name: "Org Chart",
    icon: GitBranch,
    nodes: [
      {
        id: '1',
        type: 'custom',
        data: { 
          label: 'CEO',
          style: templateStyles.orgChart,
        },
        position: { x: 250, y: 50 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '2',
        type: 'custom',
        data: { 
          label: 'Manager 1',
          style: templateStyles.orgChart,
        },
        position: { x: -50, y: 150 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '3',
        type: 'custom',
        data: { 
          label: 'Manager 2',
          style: templateStyles.orgChart,
        },
        position: { x: 550, y: 150 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '4',
        type: 'custom',
        data: { 
          label: 'Team Member 1',
          style: templateStyles.orgChart,
        },
        position: { x: -350, y: 450 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '5',
        type: 'custom',
        data: { 
          label: 'Team Member 2',
          style: templateStyles.orgChart,
        },
        position: { x: 200, y: 450 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '6',
        type: 'custom',
        data: { 
          label: 'Team Member 3',
          style: templateStyles.orgChart,
        },
        position: { x: 300, y: 250 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      },
      {
        id: '7',
        type: 'custom',
        data: { 
          label: 'Team Member 4',
          style: templateStyles.orgChart,
        },
        position: { x: 750, y: 250 },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      }
    ],
    edges: [
      { 
        id: 'e1-2', 
        source: '1', 
        target: '2',
        sourceHandle: 'bottom',
        targetHandle: 'top'
      },
      { 
        id: 'e1-3', 
        source: '1', 
        target: '3',
        sourceHandle: 'bottom',
        targetHandle: 'top'
      },
      { 
        id: 'e2-4', 
        source: '2', 
        target: '4',
        sourceHandle: 'bottom',
        targetHandle: 'top'
      },
      { 
        id: 'e2-5', 
        source: '2', 
        target: '5',
        sourceHandle: 'bottom',
        targetHandle: 'top'
      },
      { 
        id: 'e3-6', 
        source: '3', 
        target: '6',
        sourceHandle: 'bottom',
        targetHandle: 'top'
      },
      { 
        id: 'e3-7', 
        source: '3', 
        target: '7',
        sourceHandle: 'bottom',
        targetHandle: 'top'
      }
    ],
  },
};

// Rest of the TemplateSelector component remains the same
const TemplateSelector = ({ onSelect, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (templateKey) => {
    setSelectedTemplate(templateKey);
  };

  const handleConfirm = () => {
    if (selectedTemplate) {
      onSelect(templates[selectedTemplate].nodes, templates[selectedTemplate].edges);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(templates).map(([key, template]) => {
            const Icon = template.icon;
            return (
              <button
                key={key}
                onClick={() => handleTemplateSelect(key)}
                className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                  selectedTemplate === key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-6 h-6 text-blue-600" />
                  <span className="font-medium">{template.name}</span>
                </div>
                <p className="text-sm text-gray-600 text-left">
                  {`${template.nodes.length} nodes, ${template.edges.length} connections`}
                </p>
              </button>
            );
          })}
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedTemplate}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
              selectedTemplate
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Use Template</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;