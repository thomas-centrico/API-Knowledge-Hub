// Color mappings for different API types and categories
export const TYPE_COLORS = {
  REST_API: '#3b82f6',    // Blue
  JAVA_API: '#f59e0b',    // Amber
  ORACLE_API: '#ef4444',  // Red
};

export const CATEGORY_COLORS = {
  authentication: '#8b5cf6',  // Purple
  payment: '#10b981',         // Emerald
  analytics: '#f59e0b',       // Amber
  storage: '#6b7280',         // Gray
  communication: '#06b6d4',   // Cyan
  security: '#dc2626',        // Red
  database: '#7c3aed',        // Violet
  messaging: '#059669',       // Emerald
  utilities: '#4b5563',       // Gray
  integration: '#2563eb',     // Blue
};

export const STATUS_COLORS = {
  active: '#10b981',      // Green
  deprecated: '#ef4444',  // Red
  beta: '#f59e0b',       // Amber
  maintenance: '#6b7280', // Gray
};

export const RELATIONSHIP_TYPES = {
  DEPENDS_ON: 'depends_on',
  USED_BY: 'used_by',
  SAME_CATEGORY: 'same_category',
  SAME_DEPARTMENT: 'same_department',
  COMMON_TAGS: 'common_tags',
  API_CHAIN: 'api_chain'
};

/**
 * Convert API data to graph nodes
 */
export const createGraphNodes = (apis) => {
  return apis.map(api => ({
    id: api.id,
    label: api.name,
    name: api.name,
    type: api.type,
    category: api.category,
    status: api.status,
    department: api.department,
    tags: api.tags || [],
    usage: api.usage?.requestsPerDay || 0,
    size: Math.max(15, Math.min(40, (api.usage?.requestsPerDay || 1000) / 3000)),
    color: TYPE_COLORS[api.type] || '#6b7280',
    owner: api.owner,
    version: api.version,
  }));
};

/**
 * Create enhanced graph links with detailed relationship types
 */
export const createGraphLinks = (apis) => {
  const links = [];
  
  apis.forEach(api => {
    // 1. Direct dependency relationships (strongest)
    const dependencies = api.dependencies || [];
    dependencies.forEach(depId => {
      const dependency = apis.find(a => a.id === depId);
      if (dependency) {
        links.push({
          id: `dep_${depId}_${api.id}`,
          source: depId,
          target: api.id,
          type: RELATIONSHIP_TYPES.DEPENDS_ON,
          label: 'depends on',
          strength: 1.0,
          color: '#ef4444', // Red for dependencies
          strokeWidth: 3,
          strokeDasharray: null,
        });
      }
    });

    // 2. Dependent relationships (reverse dependencies)
    const dependents = api.dependents || [];
    dependents.forEach(depId => {
      const dependent = apis.find(a => a.id === depId);
      if (dependent) {
        // Check if we already have a dependency link for this relationship
        const existingLink = links.find(
          link => link.source === api.id && link.target === depId && 
          link.type === RELATIONSHIP_TYPES.DEPENDS_ON
        );
        
        if (!existingLink) {
          links.push({
            id: `used_${api.id}_${depId}`,
            source: api.id,
            target: depId,
            type: RELATIONSHIP_TYPES.USED_BY,
            label: 'used by',
            strength: 0.8,
            color: '#10b981', // Green for usage
            strokeWidth: 2,
            strokeDasharray: null,
          });
        }
      }
    });

    // 3. Same category relationships (medium strength)
    apis
      .filter(other => 
        other.id !== api.id && 
        other.category === api.category &&
        api.id < other.id // Avoid duplicates
      )
      .forEach(other => {
        links.push({
          id: `cat_${api.id}_${other.id}`,
          source: api.id,
          target: other.id,
          type: RELATIONSHIP_TYPES.SAME_CATEGORY,
          label: `same category (${api.category})`,
          strength: 0.4,
          color: CATEGORY_COLORS[api.category] || '#6b7280',
          strokeWidth: 1,
          strokeDasharray: '5,5',
        });
      });

    // 4. Same department relationships (weaker)
    apis
      .filter(other => 
        other.id !== api.id && 
        other.department === api.department &&
        other.category !== api.category && // Don't duplicate category links
        api.id < other.id // Avoid duplicates
      )
      .forEach(other => {
        links.push({
          id: `dept_${api.id}_${other.id}`,
          source: api.id,
          target: other.id,
          type: RELATIONSHIP_TYPES.SAME_DEPARTMENT,
          label: `same department (${api.department})`,
          strength: 0.3,
          color: '#94a3b8', // Light gray
          strokeWidth: 1,
          strokeDasharray: '3,3',
        });
      });

    // 5. Common tags relationships (weak)
    const apiTags = api.tags || [];
    apis
      .filter(other => {
        if (other.id === api.id || api.id >= other.id) return false;
        const otherTags = other.tags || [];
        const commonTags = apiTags.filter(tag => otherTags.includes(tag));
        return commonTags.length >= 2; // At least 2 common tags
      })
      .forEach(other => {
        const otherTags = other.tags || [];
        const commonTags = apiTags.filter(tag => otherTags.includes(tag));
        links.push({
          id: `tags_${api.id}_${other.id}`,
          source: api.id,
          target: other.id,
          type: RELATIONSHIP_TYPES.COMMON_TAGS,
          label: `shared tags (${commonTags.join(', ')})`,
          strength: 0.2,
          color: '#a78bfa', // Light purple
          strokeWidth: 1,
          strokeDasharray: '2,2',
        });
      });
  });

  return links;
};

/**
 * Create complete graph data from APIs with enhanced relationships
 */
export const createGraphData = (apis) => {
  const nodes = createGraphNodes(apis);
  const links = createGraphLinks(apis);
  
  return { 
    nodes, 
    links,
    stats: {
      totalNodes: nodes.length,
      totalLinks: links.length,
      relationshipTypes: {
        dependencies: links.filter(l => l.type === RELATIONSHIP_TYPES.DEPENDS_ON).length,
        usage: links.filter(l => l.type === RELATIONSHIP_TYPES.USED_BY).length,
        categories: links.filter(l => l.type === RELATIONSHIP_TYPES.SAME_CATEGORY).length,
        departments: links.filter(l => l.type === RELATIONSHIP_TYPES.SAME_DEPARTMENT).length,
        commonTags: links.filter(l => l.type === RELATIONSHIP_TYPES.COMMON_TAGS).length,
      }
    }
  };
};

/**
 * Enhanced force simulation for better node positioning
 */
export const simulateForces = (nodes, links, width, height, iterations = 300) => {
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Initialize positions if not set - use more of the available space
  const simulatedNodes = nodes.map((node, index) => ({
    ...node,
    x: node.x || centerX + (Math.random() - 0.5) * width * 0.9,
    y: node.y || centerY + (Math.random() - 0.5) * height * 0.9,
    vx: 0,
    vy: 0,
  }));

  for (let i = 0; i < iterations; i++) {
    const alpha = Math.max(0.01, 0.9 * (1 - i / iterations));
    
    // Apply forces
    simulatedNodes.forEach(node => {
      // Center force
      const centerForce = 0.01;
      node.vx += (centerX - node.x) * centerForce * alpha;
      node.vy += (centerY - node.y) * centerForce * alpha;
      
      // Collision detection with other nodes
      simulatedNodes.forEach(other => {
        if (node.id === other.id) return;
        
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = node.size + other.size + 60; // Increased from 20 to 60 for more spacing
        
        if (distance < minDistance && distance > 0) {
          const force = (minDistance - distance) / distance * 0.8; // Increased force
          const fx = dx * force;
          const fy = dy * force;
          
          node.vx -= fx * alpha;
          node.vy -= fy * alpha;
          other.vx += fx * alpha;
          other.vy += fy * alpha;
        }
      });
    });
    
    // Link forces
    links.forEach(link => {
      const source = simulatedNodes.find(n => n.id === link.source);
      const target = simulatedNodes.find(n => n.id === link.target);
      
      if (!source || !target) return;
      
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const idealDistance = 150 + (1 - link.strength) * 100; // Increased ideal distance for more spread
      
      if (distance > 0) {
        const force = (distance - idealDistance) * link.strength * 0.08; // Slightly reduced force
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        
        source.vx += fx * alpha;
        source.vy += fy * alpha;
        target.vx -= fx * alpha;
        target.vy -= fy * alpha;
      }
    });
    
    // Apply velocities with damping
    simulatedNodes.forEach(node => {
      node.vx *= 0.9;
      node.vy *= 0.9;
      node.x += node.vx;
      node.y += node.vy;
      
      // Keep nodes within bounds
      const margin = node.size + 10;
      node.x = Math.max(margin, Math.min(width - margin, node.x));
      node.y = Math.max(margin, Math.min(height - margin, node.y));
    });
  }
  
  return simulatedNodes;
};

/**
 * Filter graph data based on relationship types
 */
export const filterGraphByRelationships = (graphData, enabledTypes) => {
  const filteredLinks = graphData.links.filter(link => 
    enabledTypes.includes(link.type)
  );
  
  // Only include nodes that have at least one connection
  const connectedNodeIds = new Set();
  filteredLinks.forEach(link => {
    connectedNodeIds.add(link.source);
    connectedNodeIds.add(link.target);
  });
  
  const filteredNodes = graphData.nodes.filter(node => 
    connectedNodeIds.has(node.id) || graphData.nodes.length <= 5
  );
  
  return {
    ...graphData,
    nodes: filteredNodes,
    links: filteredLinks,
  };
};

/**
 * Get relationship statistics
 */
export const getRelationshipStats = (graphData) => {
  const stats = {};
  
  graphData.links.forEach(link => {
    stats[link.type] = (stats[link.type] || 0) + 1;
  });
  
  return stats;
};