import React, { useState, useCallback, useEffect } from "react";
import { toPng } from "html-to-image";

import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { PlusCircle, Settings } from "lucide-react";
import { Handle } from "reactflow";
import Toolbar from "../components/Toolbar";
import NodeCustomizer from "../components/NodeCustomizer"
import { useParams } from "react-router-dom";
import { getFlowchartById,
  createFlowchart,
  updateFlowChartbyId
} from "../api/flowcharts"; 
import SaveModal from "../components/SaveModal";
import AIGenerateModal from "../components/AIGenerateModal";
import  StickyNote  from '../components/StickyNote';
import  TextNode  from '../components/TextNode';


const defaultNodeStyle = {
  backgroundColor: '#ffffff',
  borderColor: '#93c5fd',
  borderRadius: '8px',
  borderStyle: 'solid',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { 
      label: 'Main Idea',
      style: defaultNodeStyle,
    },
    position: { x: 0, y: 0 },
  },
];


const initialEdges = [];
const buttonPressed = [];

interface NodeData {
  label: string;
  onLabelChange: (id: string, label: string) => void;
  onAddChild: (id: string) => void;
  style: {
    backgroundColor: string;
    borderColor: string;
    borderRadius: string;
    borderStyle: string;
    fontFamily: string;
    fontSize: string;
  };
  onStyleChange: (id: string, style: any) => void;
}

interface CustomNodeProps {
  id: string;
  data: NodeData;
}

function CustomNode({ id, data }: CustomNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const [showButtons, setShowButtons] = useState(false); // State to show/hide buttons
  const [showCustomizer, setShowCustomizer] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    data.onLabelChange(id, label);
  };

  const handleInputChange = (event) => {
    setLabel(event.target.value);
  };

  const handleClick = () => {
    setShowButtons(!showButtons); // Toggle buttons visibility
  };

  const handleStyleChange = (newStyle: Partial<typeof data.style>) => {
    data.onStyleChange(id, { ...data.style, ...newStyle });
  };

  return (
    <>
      <div
        className="relative px-6 py-3 shadow-lg rounded-lg bg-white/95 border-2 border-blue-200 
  hover:border-blue-400 transition-all duration-200 backdrop-blur-sm"
        style={{
          width: '280px',
          minHeight: '60px',
          backgroundColor: data.style.backgroundColor,
          borderColor: data.style.borderColor,
          borderRadius: data.style.borderRadius,
          borderStyle: data.style.borderStyle,
        }}
        onClick={handleClick}
      >
        <div className="flex items-center">
          <div className="ml-2 w-full">
            {isEditing ? (
              <input
                type="text"
                value={label}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="w-full px-3 py-2 bg-white/50 border-2 border-blue-200 rounded-md 
  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
  transition-all duration-200"
                style={{
                  fontFamily: data.style.fontFamily,
                  fontSize: data.style.fontSize,
                }}
                autoFocus
              />
            ) : (
              <div
                className="text-lg font-semibold text-gray-700 w-full cursor-pointer 
  transition-colors duration-200 hover:text-blue-600 truncate"
                style={{
                  fontFamily: data.style.fontFamily,
                  fontSize: data.style.fontSize,
                }}
                onDoubleClick={handleDoubleClick}
              >
                {label}
              </div>
            )}
          </div>
        </div>

        {/* Conditional rendering of buttons */}
        {showButtons && (
          <>
            <button
              className="absolute -top-12 -left-2 transform -translate-x-1/2 p-2 
  rounded-full bg-white/90 hover:bg-blue-50 shadow-md transition-all 
  duration-200 hover:scale-110 focus:outline-none group"
              onClick={() => setShowCustomizer(!showCustomizer)}
              aria-label="Customize Node on Click"
            >
              <Settings className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
            </button>
            <button
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 p-2 
  rounded-full bg-white/90 hover:bg-blue-50 shadow-md transition-all 
  duration-200 hover:scale-110 focus:outline-none group"
              onClick={() => {
                buttonPressed.push("top");
                data.onAddChild(id);
              }}
              aria-label="Add connected node top"
            >
              <PlusCircle className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
            </button>
            <button
              className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-white/90 hover:bg-blue-50 shadow-md transition-all 
  duration-200 hover:scale-110 focus:outline-none group"
              onClick={() => {
                buttonPressed.push("bottom");
                data.onAddChild(id);
              }}
              aria-label="Add connected node bottom"
            >
              <PlusCircle className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2  p-2 rounded-full bg-white/90 hover:bg-blue-50 shadow-md transition-all "
              onClick={() => {
                buttonPressed.push("right");
                data.onAddChild(id);
              }}
              aria-label="Add connected node right"
            >
              <PlusCircle className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
            </button>
            <button
              className="absolute -left-7 top-1/2 transform -translate-y-1/2   duration-200 hover:scale-110 focus:outline-none group"
              onClick={() => {
                buttonPressed.push("left");
                data.onAddChild(id);
              }}
              aria-label="Add connected node left"
            >
              <PlusCircle className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
            </button>
          </>
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
      {showCustomizer && (
        <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-xl z-50">
          <NodeCustomizer style={data.style} onStyleChange={handleStyleChange} />
        </div>
      )}
    </>
  );
}

const nodeTypes = {
  custom: CustomNode,
  stickyNote: StickyNote,
  textNode: TextNode,
};

export default function CanvasPage() {
  const { id } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewer, setIsViewer] = useState(true);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedNodeType, setSelectedNodeType] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // State to store mouse position


  const onConnect = useCallback(
    (params) => {
      // if(isViewer) return;
      console.log("Connecting:", params);
      setEdges((eds) => addEdge({ ...params }, eds));
    },
    [setEdges]
  );

  const handleCanvasClick = (event) => {
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - reactFlowBounds.left; // X position relative to the canvas
    const y = event.clientY - reactFlowBounds.top;  // Y position relative to the canvas
    setMousePosition({ x, y });

    // Create a new node if a node type is selected
    if (selectedNodeType) {
      const newNodeId = (nodes.length + 1).toString();
      const newNode = {
        id: newNodeId,
        type: selectedNodeType,
        data: { label: selectedNodeType === 'stickyNote' ? 'New note...' : 'Text...' },
        position: { x, y },
      };
      setNodes((nds) => nds.concat(newNode));
      setSelectedNodeType(null); // Reset selected node type after creating the node
    }
  };

  const addChildNode = useCallback(
    (parentId) => {
      // if(isViewer) return;
      const parentNode = nodes.find((node) => node.id === parentId);
      if (!parentNode) return;

      const newNodeId = (nodes.length + 1).toString();
      const nodeSpacingX = 300; // Horizontal spacing for new nodes
      const baseNodeSpacingY = 200; // Vertical spacing for nodes

      const direction = buttonPressed.pop();
      let newNodePosition;
      let sourcePosition = Position.Right; // Default for the new node
      let targetPosition = Position.Left; // Default for the parent node
      let sourceHandle = "right"; // Default source handle
      let targetHandle = "left"; // Default target handle

      // Adjust the position and handles based on the direction
      if (direction === "top") {
        newNodePosition = {
          x: parentNode.position.x,
          y: parentNode.position.y - baseNodeSpacingY,
        };
        sourcePosition = Position.Bottom;
        targetPosition = Position.Top;
        sourceHandle = "top";
        targetHandle = "bottom";
      } else if (direction === "bottom") {
        newNodePosition = {
          x: parentNode.position.x,
          y: parentNode.position.y + baseNodeSpacingY,
        };
        sourcePosition = Position.Top;
        targetPosition = Position.Bottom;
        sourceHandle = "bottom";
        targetHandle = "top";
      } else if (direction === "left") {
        newNodePosition = {
          x: parentNode.position.x - nodeSpacingX,
          y: parentNode.position.y,
        };
        sourcePosition = Position.Right;
        targetPosition = Position.Left;
        sourceHandle = "left";
        targetHandle = "right";
      } else {
        // Default is right
        newNodePosition = {
          x: parentNode.position.x + nodeSpacingX,
          y: parentNode.position.y,
        };
        sourcePosition = Position.Left;
        targetPosition = Position.Right;
        sourceHandle = "right";
        targetHandle = "left";
      }

      const newNode = {
        id: newNodeId,
        type: "custom",
        data: { label: `Node ${newNodeId}`, style: defaultNodeStyle},
        position: newNodePosition,
        sourcePosition,
        targetPosition,
      };

      const newEdge = {
        id: `e${parentId}-${newNodeId}`,
        source: parentId,
        target: newNodeId,
        sourceHandle, // Correctly set source handle
        targetHandle, // Correctly set target handle
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
    },
    [nodes, edges, setNodes, setEdges]
  );

  // Function to download the current graph as a png image
  const onExport = useCallback(() => {
    const reactFlowWrapper = document.getElementById("reactflow-wrapper");

    if (reactFlowWrapper) {
      toPng(reactFlowWrapper)
        .then((dataUrl) => {
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = "graph.png";
          a.click();
        })
        .catch((error) => {
          console.error("Error exporting image:", error);
        });
    } else {
      console.error("React Flow wrapper not found!");
    }
  }, []);

  // Function to delete any node / edge which is selected
  const onDelete = useCallback(() => {
    if(isViewer) return;
    const selectedNodes = nodes.filter((node) => node.selected);
    const selectedEdges = edges.filter((edge) => edge.selected);

    if (selectedNodes.length > 0) {
      setNodes((nds) => nds.filter((node) => !node.selected));
    }

    if (selectedEdges.length > 0) {
      setEdges((eds) => eds.filter((edge) => !edge.selected));
    }
  }, [nodes, edges, setNodes, setEdges]);

  // Function to add new node on clicking the add node button
  const onAddNode = useCallback(() => {
    if(isViewer) return;
    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      type: "custom",
      data: { label: `Node ${newNodeId}` },
      position: { x: 0, y: 0 },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  // Function to save the current graph to local storage
  const onSave = useCallback(() => {
    setIsModalOpen(true);
  },[])
;
  const onSaveInternal = useCallback(
    async (newTitle, nodes, edges) => {
      try {
        console.log("Saving flowchart with title:", newTitle);
        console.log("Nodes:", nodes);
        console.log("Edges:", edges);
        
        if (id === 'new') {
          await createFlowchart({ title: newTitle, nodes, edges });
          alert("Flowchart created successfully!");
        } else {
          await updateFlowChartbyId(id, { title: newTitle, nodes, edges });
          alert("Flowchart updated successfully!");
        }
      } catch (error) {
        console.error("Error saving flowchart:", error);
        alert("Failed to save the flowchart.");
      }
    },
    [id]
  );

  useEffect(() => {
    const fetchFlowchart = async () => {
      try {
        setLoading(true);
        setError(null);
        if(id==="new") {
          setTitle('New Flowchart')
        } else {
          const res  = await getFlowchartById(id)
          const {nodes: fetchedNodes, edges: fetchedEdges, title: flowChartTitle} = res?.flowchart;        
          setNodes(fetchedNodes);
          setEdges(fetchedEdges);
          setTitle(flowChartTitle);
          setIsViewer(res?.role==='viewer')
        }
      } catch (err) {
        setError("Failed to load flowchart.");
      } finally {
        setLoading(false);
      }
    };
    fetchFlowchart();
  }, [id, setNodes, setEdges]);

  const onStyleChange = useCallback(
    (nodeId, newStyle) => {
      // if(isViewer) return;
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, style: newStyle } }
            : node
        )
      );
    },
    [setNodes]
  );

  const onLabelChange = useCallback(
    (nodeId, newLabel) => {
      // if(isViewer) return;
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    },
    [setNodes]
  );
  
  const onAddStickyNote = () => {
    setSelectedNodeType('stickyNote'); // Set selected node type to Sticky Note
  };

  const onAddTextNode = () => {
    setSelectedNodeType('textNode'); // Set selected node type to Text Node
  };

  
  const handleAIGenerate = useCallback((prompt: string) => {
    // Demo implementation - creates a simple mindmap structure
    const demoNodes = [
      {
        id: 'ai-1',
        type: 'custom',
        data: { label: prompt, style: defaultNodeStyle },
        position: { x: 250, y: 250 },
      },
      {
        id: 'ai-2',
        type: 'custom',
        data: { label: 'Demo Subtopic 1', style: defaultNodeStyle },
        position: { x: 500, y: 150 },
      },
      {
        id: 'ai-3',
        type: 'custom',
        data: { label: 'Demo Subtopic 2', style: defaultNodeStyle },
        position: { x: 500, y: 350 },
      },
    ];
  
    const demoEdges = [
      { id: 'e-ai-1-2', source: 'ai-1', target: 'ai-2' },
      { id: 'e-ai-1-3', source: 'ai-1', target: 'ai-3' },
    ];
  
    setNodes((nds) => [...nds, ...demoNodes]);
    setEdges((eds) => [...eds, ...demoEdges]);
  }, [setNodes, setEdges]);


  return (
    <div
      id="reactflow-wrapper"
      className="w-full h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50"
      onClick={handleCanvasClick} 
    >
      <Toolbar
        onDelete={onDelete}
        onAddNode={onAddNode}
        onSave={onSave}
        onExport={onExport}
        onGenerateAI={() => setShowAIModal(true)}
        onAddStickyNote={onAddStickyNote}
        onAddTextNode={onAddTextNode}
      />

      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: { ...node.data, onAddChild: addChildNode, onLabelChange ,   onStyleChange},
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}

        fitView
        className="bg-gray-50"
      >
        <Background className="opacity-10" color="#93c5fd" gap={20} size={1} />
        <Controls className="bg-white/90 shadow-lg rounded-lg border border-blue-100" />{" "}
      </ReactFlow>
      {title && (
        <SaveModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          nodes={nodes}
          edges={edges}
          onSave={onSaveInternal}
        />
      )}
      <AIGenerateModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onGenerate={handleAIGenerate}
      />
    </div>
  );
}