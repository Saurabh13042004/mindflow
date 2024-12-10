import React from "react";

function ForgotPassword() {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Remember your password?
              <a
                className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                href="/login"
              >
                Sign in here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div className="text-start">
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      aria-describedby="email-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;



// import React, { useCallback, useRef, useState, useEffect } from 'react';
// import {
//   ReactFlow,
//   Controls,
//   Panel,
//   useStoreApi,
//   useReactFlow,
//   ReactFlowProvider,
//   ConnectionLineType,
// } from '@xyflow/react';
// import { shallow } from 'zustand/shallow';

// import useStore from '../hooks/store';
// import MindMapNode from '../components/MindMapNode';
// import MindMapEdge from '../components/MindMapEdge';

// import '@xyflow/react/dist/style.css';

// const selector = (state) => ({
//   nodes: state.nodes,
//   edges: state.edges,
//   onNodesChange: state.onNodesChange,
//   onEdgesChange: state.onEdgesChange,
//   addChildNode: state.addChildNode,
// });

// const nodeTypes = {
//   mindmap: MindMapNode,
// };

// const edgeTypes = {
//   mindmap: MindMapEdge,
// };

// const nodeOrigin = [0.5, 0.5];
// const connectionLineStyle = { stroke: '#F6AD55', strokeWidth: 3 };
// const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };

// function CanvasPage() {
//   const { nodes, edges, onNodesChange, onEdgesChange, addChildNode } = useStore(
//     selector,
//     shallow
//   );
//   const connectingNodeId = useRef(null);
//   const store = useStoreApi();
//   const { screenToFlowPosition, getIntersectingNodes } = useReactFlow();
//   const [targetNode, setTargetNode] = useState(null);

//   const getChildNodePosition = (event, parentNode) => {
//     const { domNode } = store.getState();

//     if (!domNode || !parentNode?.internals?.positionAbsolute || !parentNode?.measured?.width || !parentNode?.measured?.height) {
//       return;
//     }

//     const isTouchEvent = 'touches' in event;
//     const x = isTouchEvent ? event.touches[0].clientX : event.clientX;
//     const y = isTouchEvent ? event.touches[0].clientY : event.clientY;
//     const panePosition = screenToFlowPosition({ x, y });

//     return {
//       x: panePosition.x - parentNode.internals.positionAbsolute.x + parentNode.measured.width / 2,
//       y: panePosition.y - parentNode.internals.positionAbsolute.y + parentNode.measured.height / 2,
//     };
//   };

//   const onConnectStart = useCallback((_, { nodeId }) => {
//     connectingNodeId.current = nodeId;
//   }, []);

//   const onConnectEnd = useCallback(
//     (event) => {
//       const { nodeLookup } = store.getState();
//       const targetIsPane = event.target.classList.contains('react-flow__pane');

//       if (targetIsPane && connectingNodeId.current) {
//         const parentNode = nodeLookup.get(connectingNodeId.current);
//         const childNodePosition = getChildNodePosition(event, parentNode);

//         if (parentNode && childNodePosition) {
//           addChildNode(parentNode, childNodePosition);
//         }
//       }
//     },
//     [getChildNodePosition]
//   );

//   // Collision detection on node drag
//   const onNodeDrag = (event, node) => {
//     const intersectingNodes = getIntersectingNodes(node);
//     setTargetNode(intersectingNodes.length > 0 ? intersectingNodes[0] : null);
//   };

//   useEffect(() => {
//     if (targetNode) {
//       // Handle collision logic (like snapping back, etc.)
//       console.log('Collision detected with node:', targetNode.id);
//     }
//   }, [targetNode]);

//   return (
//     <div className='h-screen w-screen'>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         connectionMode={ConnectionLineType.SmoothStep}
//         edgeTypes={edgeTypes}
//         onConnectStart={onConnectStart}
//         onConnectEnd={onConnectEnd}
//         onNodeDrag={onNodeDrag} // Collision detection during drag
//         nodeOrigin={nodeOrigin}
//         // connectionLineStyle={connectionLineStyle}
//         defaultEdgeOptions={defaultEdgeOptions}
//         connectionLineType={ConnectionLineType.Straight}
        
//       >
//         <Controls showInteractive={false} />
//         <Panel position="top-left" className="header">
//           Welcome To Wisemapping
//         </Panel>
//       </ReactFlow>
//     </div>
//   );
// }

// export default CanvasPage;
