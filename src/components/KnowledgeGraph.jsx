import React, { useEffect, useRef, useState } from 'react';
import { simulateForces, RELATIONSHIP_TYPES } from '../lib/graph.js';

export const KnowledgeGraph = ({
  data,
  onNodeClick,
  selectedNode,
  width = 1200,
  height = 800,
}) => {
  const svgRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showNodeLabels, setShowNodeLabels] = useState(true);
  const [showRelationshipTypes, setShowRelationshipTypes] = useState({
    [RELATIONSHIP_TYPES.DEPENDS_ON]: false,
    [RELATIONSHIP_TYPES.USED_BY]: false,
    [RELATIONSHIP_TYPES.SAME_CATEGORY]: false,
    [RELATIONSHIP_TYPES.SAME_DEPARTMENT]: false,
    [RELATIONSHIP_TYPES.COMMON_TAGS]: false,
  });

  // Enhanced force-directed layout simulation
  useEffect(() => {
    if (!data.nodes.length) return;

    // Filter links based on enabled relationship types
    const filteredLinks = data.links.filter(link => 
      showRelationshipTypes[link.type]
    );

    // Use the enhanced force simulation
    const simulatedNodes = simulateForces(
      data.nodes, 
      filteredLinks, 
      width, 
      height, 
      200 // iterations
    );

    setNodes(simulatedNodes);
  }, [data.nodes, data.links, width, height, showRelationshipTypes]);

  const handleNodeClick = (node) => {
    console.log('Node clicked:', node); // Debug log
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  const getNodeColor = (type) => {
    switch (type) {
      case 'REST_API':
        return '#3b82f6'; // Blue
      case 'JAVA_API':
        return '#ef4444'; // Red
      case 'ORACLE_API':
        return '#f59e0b'; // Yellow
      default:
        return '#6b7280'; // Gray
    }
  };

  const getNodeSize = (node) => {
    return node.size || 35;
  };

  // Helper function to fit text within circle
  const getNodeTextProps = (node) => {
    const radius = getNodeSize(node);
    const name = node.name || node.label || 'API';
    
    // Calculate appropriate font size based on circle radius
    // Use 1.4 instead of 1.6 for more conservative text width
    const maxTextWidth = radius * 1.4; 
    const baseSize = Math.max(7, Math.min(14, radius / 2.2));
    
    // Estimate character width (more accurate approximation)
    const avgCharWidth = baseSize * 0.55;
    const maxChars = Math.floor(maxTextWidth / avgCharWidth);
    
    let displayText = name;
    let fontSize = baseSize;
    
    // For very small nodes, just show initials
    if (radius < 12) {
      const words = name.split(' ');
      if (words.length > 1) {
        displayText = words.map(word => word.charAt(0).toUpperCase()).join('');
        if (displayText.length > 3) {
          displayText = displayText.substring(0, 3);
        }
      } else {
        displayText = name.substring(0, 2).toUpperCase();
      }
      fontSize = Math.max(6, radius / 1.8);
    }
    // For medium nodes, use smart truncation
    else if (name.length * avgCharWidth > maxTextWidth) {
      fontSize = Math.max(6, fontSize * 0.85);
      const adjustedCharWidth = fontSize * 0.55;
      const adjustedMaxChars = Math.floor(maxTextWidth / adjustedCharWidth);
      
      if (name.length > adjustedMaxChars) {
        displayText = name.substring(0, Math.max(1, adjustedMaxChars - 3)) + '...';
      }
    }
    
    return {
      text: displayText,
      fontSize: fontSize,
      dy: 0 // Center vertically
    };
  };

  const getRelationshipLabel = (type) => {
    switch (type) {
      case RELATIONSHIP_TYPES.DEPENDS_ON:
        return 'Dependencies';
      case RELATIONSHIP_TYPES.USED_BY:
        return 'Usage';
      case RELATIONSHIP_TYPES.SAME_CATEGORY:
        return 'Same Category';
      case RELATIONSHIP_TYPES.SAME_DEPARTMENT:
        return 'Same Department';
      case RELATIONSHIP_TYPES.COMMON_TAGS:
        return 'Common Tags';
      default:
        return 'Unknown';
    }
  };

  const toggleRelationshipType = (type) => {
    setShowRelationshipTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!data.nodes.length) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Graph Data</h3>
          <p className="text-gray-500">No API relationships to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-auto max-w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Arrow markers for directed relationships */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#6b7280"
            />
          </marker>
        </defs>

        {/* Links */}
        <g className="links">
          {data.links
            .filter(link => showRelationshipTypes[link.type])
            .map((link) => {
              const sourceNode = nodes.find(n => n.id === link.source);
              const targetNode = nodes.find(n => n.id === link.target);
              
              if (!sourceNode || !targetNode) return null;
              
              const isHovered = hoveredLink === link.id;
              const isDirected = link.type === RELATIONSHIP_TYPES.DEPENDS_ON || 
                               link.type === RELATIONSHIP_TYPES.USED_BY;
              
              return (
                <g key={link.id}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={link.color}
                    strokeWidth={link.strokeWidth || 2}
                    strokeDasharray={link.strokeDasharray || null}
                    opacity={isHovered ? 0.9 : 0.6}
                    markerEnd={isDirected ? "url(#arrowhead)" : null}
                    className="cursor-pointer transition-opacity"
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                  />
                  
                  {/* Link label on hover */}
                  {isHovered && (
                    <g>
                      {/* Background rectangle for better readability */}
                      <rect
                        x={(sourceNode.x + targetNode.x) / 2 - link.label.length * 3.5}
                        y={(sourceNode.y + targetNode.y) / 2 - 18}
                        width={link.label.length * 7}
                        height={20}
                        fill="white"
                        fillOpacity="0.9"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        rx="3"
                      />
                      <text
                        x={(sourceNode.x + targetNode.x) / 2}
                        y={(sourceNode.y + targetNode.y) / 2 - 5}
                        textAnchor="middle"
                        className="text-xs font-semibold fill-gray-800 pointer-events-none"
                        style={{ fontSize: '13px' }}
                      >
                        {link.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
        </g>

        {/* Nodes */}
        <g className="nodes">
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={getNodeSize(node)}
                fill={getNodeColor(node.type)}
                stroke={selectedNode === node.id ? '#1f2937' : '#fff'}
                strokeWidth={selectedNode === node.id ? 3 : 2}
                className="cursor-pointer transition-all duration-200 hover:opacity-80"
                style={{
                  filter: hoveredNode === node.id ? 'brightness(1.1) drop-shadow(2px 2px 8px rgba(0,0,0,0.4))' : 'none',
                  transform: hoveredNode === node.id ? 'scale(1.1)' : 'scale(1)',
                  transformOrigin: `${node.x}px ${node.y}px`
                }}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              />
              
              {/* Node labels */}
              {showNodeLabels && (() => {
                const textProps = getNodeTextProps(node);
                return (
                  <g>
                    {/* Text shadow for better readability */}
                    <text
                      x={node.x}
                      y={node.y + textProps.dy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none select-none"
                      style={{ 
                        fontSize: `${textProps.fontSize}px`,
                        fontWeight: '600',
                        fill: 'rgba(0,0,0,0.3)',
                        stroke: 'rgba(0,0,0,0.3)',
                        strokeWidth: '0.5px'
                      }}
                    >
                      {textProps.text}
                    </text>
                    {/* Main text */}
                    <text
                      x={node.x}
                      y={node.y + textProps.dy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="font-medium fill-white pointer-events-none select-none"
                      style={{ 
                        fontSize: `${textProps.fontSize}px`,
                        fontWeight: '600'
                      }}
                    >
                      {textProps.text}
                    </text>
                  </g>
                );
              })()}
            </g>
          ))}
        </g>

        {/* Hover tooltips - render after nodes so they appear on top */}
        <g className="tooltips">
          {nodes.filter(node => hoveredNode === node.id).map((node) => {
            const nodeSize = getNodeSize(node);
            const tooltipWidth = 200;
            const tooltipHeight = 90;
            
            // Smart positioning to keep tooltip within bounds
            let tooltipX = node.x + nodeSize + 10;
            let tooltipY = node.y - 35;
            
            // Adjust if tooltip would go outside right edge
            if (tooltipX + tooltipWidth > width - 10) {
              tooltipX = node.x - nodeSize - tooltipWidth - 10;
            }
            
            // Adjust if tooltip would go outside top edge
            if (tooltipY < 10) {
              tooltipY = 10;
            }
            
            // Adjust if tooltip would go outside bottom edge
            if (tooltipY + tooltipHeight > height - 10) {
              tooltipY = height - tooltipHeight - 10;
            }
            
            return (
              <g key={`tooltip-${node.id}`}>
                {/* Tooltip background with shadow effect */}
                <rect
                  x={tooltipX - 2}
                  y={tooltipY - 2}
                  width={tooltipWidth + 4}
                  height={tooltipHeight + 4}
                  fill="rgba(0,0,0,0.1)"
                  rx="6"
                />
                <rect
                  x={tooltipX}
                  y={tooltipY}
                  width={tooltipWidth}
                  height={tooltipHeight}
                  fill="white"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x={tooltipX + 10}
                  y={tooltipY + 20}
                  className="text-sm font-semibold fill-gray-900"
                  style={{ fontSize: '14px', fontWeight: 'bold' }}
                >
                  {node.name.length > 22 ? node.name.substring(0, 22) + '...' : node.name}
                </text>
                <text
                  x={tooltipX + 10}
                  y={tooltipY + 40}
                  className="text-xs fill-gray-600"
                  style={{ fontSize: '12px' }}
                >
                  Type: {node.type.replace('_', ' ')}
                </text>
                <text
                  x={tooltipX + 10}
                  y={tooltipY + 58}
                  className="text-xs fill-gray-600"
                  style={{ fontSize: '12px' }}
                >
                  Dept: {node.department.length > 20 ? node.department.substring(0, 20) + '...' : node.department}
                </text>
                <text
                  x={tooltipX + 10}
                  y={tooltipY + 76}
                  className="text-xs fill-gray-600"
                  style={{ fontSize: '12px' }}
                >
                  Usage: {node.usage.toLocaleString()}/day
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Controls */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 border border-gray-200 max-w-xs">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Display Options</h4>
        <div className="space-y-2 text-xs mb-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showNodeLabels}
              onChange={() => setShowNodeLabels(!showNodeLabels)}
              className="w-3 h-3 text-blue-600 rounded"
            />
            <span className={showNodeLabels ? 'text-gray-900' : 'text-gray-500'}>
              Show Node Labels
            </span>
          </label>
        </div>
        
        <h4 className="text-sm font-medium text-gray-900 mb-2">Relationships</h4>
        <div className="space-y-2 text-xs">
          {Object.entries(showRelationshipTypes).map(([type, enabled]) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => toggleRelationshipType(type)}
                className="w-3 h-3 text-blue-600 rounded"
              />
              <span className={enabled ? 'text-gray-900' : 'text-gray-500'}>
                {getRelationshipLabel(type)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">API Types</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>REST API</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Java API</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Oracle API</span>
          </div>
        </div>
        
        <h4 className="text-sm font-medium text-gray-900 mb-2 mt-4">Relationships</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0.5 bg-red-500"></div>
            <span>Dependencies</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0.5 bg-green-500"></div>
            <span>Usage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0.5 bg-purple-400" style={{backgroundImage: 'repeating-linear-gradient(to right, #a78bfa 0, #a78bfa 3px, transparent 3px, transparent 6px)'}}></div>
            <span>Category</span>
          </div>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Graph Stats</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <div>APIs: {data.nodes.length}</div>
          <div>Total Links: {data.links.length}</div>
          <div>Visible Links: {data.links.filter(l => showRelationshipTypes[l.type]).length}</div>
          {data.stats && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div>Dependencies: {data.stats.relationshipTypes.dependencies}</div>
              <div>Usage Links: {data.stats.relationshipTypes.usage}</div>
              <div>Category Links: {data.stats.relationshipTypes.categories}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};