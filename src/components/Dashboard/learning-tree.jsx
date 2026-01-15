import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TreeNodeComponent } from './tree-node';

export function LearningTree({ nodes, selectedNodeId, onNodeSelect }) {
  const containerRef = useRef(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  // Función para centrar el árbol
  const centerTree = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Centrar el árbol (nodo base está en 0, 0)
      const isMobile = window.innerWidth < 768;
      const initialScale = isMobile ? 0.5 : window.innerWidth < 1024 ? 0.7 : 0.85;
      
      setPanOffset({
        x: containerWidth / 2,
        y: containerHeight - 150 // Posicionar el nodo base cerca del bottom
      });
      setScale(initialScale);
      setIsInitialized(true);
    }
  };

  // Inicializar posición centrada en el primer renderizado
  useEffect(() => {
    centerTree();
  }, []);

  // Manejar redimensionamiento de ventana
  useEffect(() => {
    const handleResize = () => {
      if (isInitialized && !selectedNodeId) {
        centerTree();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isInitialized, selectedNodeId]);

  // Centrar en el nodo seleccionado
  useEffect(() => {
    if (selectedNodeId && containerRef.current) {
      const selectedNode = nodes.find(n => n.id === selectedNodeId);
      if (selectedNode) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Ajustar para desktop vs mobile
        const isMobile = window.innerWidth < 768;
        const offsetX = isMobile ? containerWidth / 2 : containerWidth / 2 - 200;
        
        setPanOffset({
          x: offsetX - selectedNode.position.x * scale,
          y: containerHeight / 2 - selectedNode.position.y * scale - 100
        });
      }
    }
  }, [selectedNodeId, nodes, scale]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.tree-node')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('.tree-node')) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPanOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.5, scale + delta), 1.5);
    setScale(newScale);
  };

  // Renderizar conexiones entre nodos
  /*const renderConnections = () => {
    const connections = [];
    
    nodes.forEach(node => {
      node.dependencies.forEach(depId => {
        const parentNode = nodes.find(n => n.id === depId);
        if (!parentNode) return;

        // Coordenadas simples - desde el nodo padre hasta el nodo hijo
        const x1 = parentNode.position.x;
        const y1 = parentNode.position.y;
        const x2 = node.position.x;
        const y2 = node.position.y;

        // Calcular el punto medio para la curva
        const midY = (y1 + y2) / 2;

        // Path simple con curva suave
        const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

        // Color según el estado del nodo hijo
        const getStrokeColor = () => {
          switch (node.status) {
            case 'completed': return '#10b981';
            case 'in-progress': return '#a855f7';
            case 'available': return '#3b82f6';
            default: return '#475569';
          }
        };

        const getOpacity = () => {
          switch (node.status) {
            case 'completed': return 0.6;
            case 'in-progress': return 0.5;
            case 'available': return 0.4;
            default: return 0.25;
          }
        };

        connections.push(
          <motion.path
            key={`connection-${depId}-to-${node.id}`}
            d={path}
            stroke={getStrokeColor()}
            strokeWidth={2.5}
            fill="none"
            opacity={getOpacity()}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        );
      });
    });

    return connections;
  };*/

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <motion.div
        className="absolute"
        style={{
          x: panOffset.x,
          y: panOffset.y,
          scale: scale
        }}
        animate={{
          x: panOffset.x,
          y: panOffset.y,
          scale: scale
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        {/* SVG para las conexiones - sin transformaciones adicionales */}
        

        {/* Nodos */}
        {nodes.map((node, index) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            isSelected={node.id === selectedNodeId}
            onClick={() => onNodeSelect(node)}
            delay={index * 0.1}
          />
        ))}
      </motion.div>

      {/* Indicador de zoom y nivel */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2">
        <div className="bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-slate-700/50">
          <div className="text-[10px] sm:text-xs text-slate-400">Zoom: {Math.round(scale * 100)}%</div>
        </div>
      </div>

      {/* Controles de zoom para móviles */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 md:hidden">
        <button
          onClick={() => setScale(prev => Math.min(prev + 0.1, 1.5))}
          className="bg-slate-800/90 backdrop-blur-sm p-2 rounded-lg border border-slate-700/50 text-slate-300 hover:bg-slate-700/90 transition-colors"
          aria-label="Zoom in"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
          className="bg-slate-800/90 backdrop-blur-sm p-2 rounded-lg border border-slate-700/50 text-slate-300 hover:bg-slate-700/90 transition-colors"
          aria-label="Zoom out"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>

      {/* Instrucciones */}
      <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-slate-700/50 max-w-[280px] sm:max-w-xs">
        <p className="text-[10px] sm:text-xs text-slate-300">
          <span className="hidden md:inline">Arrastra para navegar • Rueda del mouse para zoom • Click en un nodo para ver detalles</span>
          <span className="md:hidden">Arrastra para navegar • Toca un nodo para ver detalles • Usa los botones para zoom</span>
        </p>
      </div>
    </div>
  );
}
