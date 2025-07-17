import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import CustomNode from "../../components/nodes/CustomNode";
import StartNode from "../../components/nodes/StartNode";
import EndNode from "../../components/nodes/EndNode";
import Sidebar from "../../components/Sidebar";
import JsonModal from "../../components/JsonModal";
import NodeDetailsModal from "../../components/NodeDetailsModal";
import WorkflowCanvas from "../../components/WorkflowCanvas";

const initialNodes = [
  {
    id: "1",
    type: "startNode",
    position: { x: 250, y: 50 },
    data: {
      label: "Webhook",
      type: "TRIGGER",
      background: "#10b981",
      color: "white",
    },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 100, y: 200 },
    data: {
      label: "Email",
      type: "ACTION",
      background: "#3b82f6",
      color: "white",
    },
  },
];

const initialEdges = [];

function Dashboard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonContent, setJsonContent] = useState("");
  const [draggedNodeType, setDraggedNodeType] = useState(null);
  const [showNodeDetails, setShowNodeDetails] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const fileInputRef = useRef(null);
  const reactFlowWrapper = useRef(null);

  const nodeTypes = useMemo(
    () => ({
      customNode: CustomNode,
      startNode: StartNode,
      endNode: EndNode,
    }),
    []
  );

  const getNodeConfig = (nodeType) => {
    const configs = {
      Webhook: {
        type: "startNode",
        category: "TRIGGER",
        background: "#10b981",
        color: "white",
      },
      Email: {
        type: "customNode",
        category: "ACTION",
        background: "#3b82f6",
        color: "white",
      },
      Database: {
        type: "customNode",
        category: "ACTION",
        background: "#8b5cf6",
        color: "white",
      },
      API: {
        type: "customNode",
        category: "ACTION",
        background: "#f59e0b",
        color: "white",
      },
      Filter: {
        type: "customNode",
        category: "LOGIC",
        background: "#ef4444",
        color: "white",
      },
      Success: {
        type: "endNode",
        category: "END",
        background: "#10b981",
        color: "white",
      },
      Error: {
        type: "endNode",
        category: "END",
        background: "#ef4444",
        color: "white",
      },
    };
    return (
      configs[nodeType] || {
        type: "customNode",
        category: "ACTION",
        background: "#6b7280",
        color: "white",
      }
    );
  };

  const onConnect = useCallback(
    (params) => {
      if (params.source === params.target) return;

      const existingConnection = edges.find(
        (edge) => edge.source === params.source && edge.target === params.target
      );
      if (existingConnection) return;

      const sourceNode = nodes.find((node) => node.id === params.source);
      if (sourceNode?.type === "endNode") return;

      const targetNode = nodes.find((node) => node.id === params.target);
      if (targetNode?.type === "startNode") return;

      const newEdge = {
        ...params,
        animated: true,
        style: { stroke: "#4f46e5", strokeWidth: 2 },
        markerEnd: { type: "arrowclosed", color: "#4f46e5" },
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, edges, nodes]
  );

  const addNode = useCallback(
    (nodeType, position = null) => {
      const nodeConfig = getNodeConfig(nodeType);
      const defaultPosition = position || {
        x: Math.random() * 300 + 100,
        y: Math.random() * 300 + 100,
      };

      const newNode = {
        id: `node_${Date.now()}`,
        type: nodeConfig.type,
        position: defaultPosition,
        data: {
          label: nodeType,
          type: nodeConfig.category,
          background: nodeConfig.background,
          color: nodeConfig.color,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragStart = useCallback((event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    setDraggedNodeType(nodeType);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      addNode(type, position);
      setDraggedNodeType(null);
    },
    [addNode]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setShowNodeDetails(true);
  }, []);

  const autoArrange = useCallback(() => {
    const updatedNodes = nodes.map((node, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      return {
        ...node,
        position: { x: col * 250 + 100, y: row * 150 + 100 },
      };
    });
    setNodes(updatedNodes);
  }, [nodes, setNodes]);

  const exportWorkflow = useCallback(() => {
    const workflow = {
      nodes: nodes,
      edges: edges,
      timestamp: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(workflow, null, 2);
    setJsonContent(dataStr);
    setShowJsonModal(true);
  }, [nodes, edges]);

  const downloadJson = useCallback(() => {
    const dataBlob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "workflow.json";
    link.click();
    setShowJsonModal(false);
  }, [jsonContent]);

  const importWorkflow = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileUpload = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        alert("File too large (max 10MB)");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workflow = JSON.parse(e.target?.result);
          if (
            workflow.nodes &&
            workflow.edges &&
            Array.isArray(workflow.nodes) &&
            Array.isArray(workflow.edges)
          ) {
            setNodes(workflow.nodes);
            setEdges(workflow.edges);
            alert("Workflow imported successfully!");
          } else {
            throw new Error("Invalid workflow format");
          }
        } catch (error) {
          alert("Error: Invalid JSON file format");
        }
      };
      reader.onerror = () => alert("Error reading file");
      reader.readAsText(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [setNodes, setEdges]
  );

  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const updateNodeLabel = useCallback(
    (newLabel) => {
      const updatedNodes = nodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      );
      setNodes(updatedNodes);
      setSelectedNode({
        ...selectedNode,
        data: { ...selectedNode.data, label: newLabel },
      });
    },
    [nodes, selectedNode, setNodes]
  );

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.addEventListener("change", handleFileUpload);
    }
    return () => {
      if (fileInputRef.current) {
        fileInputRef.current.removeEventListener("change", handleFileUpload);
      }
    };
  }, [handleFileUpload]);

  return (
    <div className="w-full flex">
      <Sidebar
        onAddNode={addNode}
        onDragStart={onDragStart}
        draggedNodeType={draggedNodeType}
        onAutoArrange={autoArrange}
        onExport={exportWorkflow}
        onImport={importWorkflow}
        onClear={clearCanvas}
        fileInputRef={fileInputRef}
        nodes={nodes}
        edges={edges}
      />
      <WorkflowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        reactFlowWrapper={reactFlowWrapper}
      />
      <JsonModal
        show={showJsonModal}
        content={jsonContent}
        onClose={() => setShowJsonModal(false)}
        onDownload={downloadJson}
      />
      <NodeDetailsModal
        show={showNodeDetails}
        node={selectedNode}
        nodes={nodes}
        onClose={() => setShowNodeDetails(false)}
        onUpdateNode={updateNodeLabel}
      />
    </div>
  );
}

export default Dashboard;
