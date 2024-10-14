import React, { useState, useCallback } from "react";
import { toPng } from 'html-to-image';

import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { PlusCircle } from "lucide-react";
import { Handle } from "reactflow";
import Toolbar from "../components/Toolbar";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: { label: "Main Idea" },
    position: { x: 0, y: 0 },
  },
];

const initialEdges = [];
const buttonPressed = [];

function CustomNode({ id, data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const [showButtons, setShowButtons] = useState(false); // State to show/hide buttons

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

  return (
    <div
      className="relative px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"
      style={{ width: "250px", height: "auto" }} // Ensure fixed width for the node
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
              className="bg-white border-2 border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              style={{ width: "100%" }} // Ensure the input field has a fixed width
              autoFocus
            />
          ) : (
            <div
              className="text-lg font-bold w-full cursor-pointer"
              onDoubleClick={handleDoubleClick}
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }} // Prevent content overflow
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
            className="absolute -top-7 left-1/2 transform -translate-x-1/2 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            onClick={() => {
              buttonPressed.push("top");
              data.onAddChild(id);
            }}
            aria-label="Add connected node top"
          >
            <PlusCircle className="w-5 h-5 text-blue-500" />
          </button>
          <button
            className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            onClick={() => {
              buttonPressed.push("bottom");
              data.onAddChild(id);
            }}
            aria-label="Add connected node bottom"
          >
            <PlusCircle className="w-5 h-5 text-blue-500" />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            onClick={() => {
              buttonPressed.push("right");
              data.onAddChild(id);
            }}
            aria-label="Add connected node right"
          >
            <PlusCircle className="w-5 h-5 text-blue-500" />
          </button>
          <button
            className="absolute -left-7 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            onClick={() => {
              buttonPressed.push("left");
              data.onAddChild(id);
            }}
            aria-label="Add connected node left"
          >
            <PlusCircle className="w-5 h-5 text-blue-500" />
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
  );
}

const nodeTypes = {
  custom: CustomNode,
};

export default function CanvasPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      console.log("Connecting:", params);
      setEdges((eds) => addEdge({ ...params }, eds));
    },
    [setEdges]
  );

  const addChildNode = useCallback(
    (parentId) => {
      const parentNode = nodes.find((node) => node.id === parentId);
      if (!parentNode) return;
  
      const newNodeId = (nodes.length + 1).toString();
      const nodeSpacingX = 300; // Horizontal spacing for new nodes
      const baseNodeSpacingY = 200; // Vertical spacing for nodes
  
      const direction = buttonPressed.pop();
      let newNodePosition;
      let sourcePosition = Position.Right; // Default for the new node
      let targetPosition = Position.Left; // Default for the parent node
      let sourceHandle = 'right'; // Default source handle
      let targetHandle = 'left'; // Default target handle
  
      // Adjust the position and handles based on the direction
      if (direction === "top") {
        newNodePosition = {
          x: parentNode.position.x,
          y: parentNode.position.y - baseNodeSpacingY,
        };
        sourcePosition = Position.Bottom;
        targetPosition = Position.Top;
        sourceHandle = 'top';
        targetHandle = 'bottom';
      } else if (direction === "bottom") {
        newNodePosition = {
          x: parentNode.position.x,
          y: parentNode.position.y + baseNodeSpacingY,
        };
        sourcePosition = Position.Top;
        targetPosition = Position.Bottom;
        sourceHandle = 'bottom';
        targetHandle = 'top';
      } else if (direction === "left") {
        newNodePosition = {
          x: parentNode.position.x - nodeSpacingX,
          y: parentNode.position.y,
        };
        sourcePosition = Position.Right;
        targetPosition = Position.Left;
        sourceHandle = 'left';
        targetHandle = 'right';
      } else {
        // Default is right
        newNodePosition = {
          x: parentNode.position.x + nodeSpacingX,
          y: parentNode.position.y,
        };
        sourcePosition = Position.Left;
        targetPosition = Position.Right;
        sourceHandle = 'right';
        targetHandle = 'left';
      }
  
      const newNode = {
        id: newNodeId,
        type: "custom",
        data: { label: `Node ${newNodeId}` },
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
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
  }, [nodes, edges]);

  const onLabelChange = useCallback(
    (nodeId, newLabel) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
        )
      );
    },
    [setNodes]
  );



  return (
    <div id="reactflow-wrapper"className="w-full h-screen">
      <Toolbar onDelete={onDelete} onAddNode={onAddNode} onSave={onSave}  onExport={onExport} />

      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: { ...node.data, onAddChild: addChildNode, onLabelChange },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
