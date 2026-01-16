import { useState } from 'react';
import { LearningTree } from './learning-tree';
import { NodePanel } from './node-panel';
import "../../index.css";

// Datos de ejemplo para el árbol de aprendizaje
const learningTreeData = [
  {
    id: '1',
    title: 'Fundamentos de Programación',
    description: 'Conceptos básicos de programación y lógica',
    status: 'completed',
    level: 0,
    position: { x: 0, y: 0 },
    dependencies: [],
    stage: 'Nivel Básico',
    resources: [
      {
        id: 'r1-1',
        title: 'Variables y tipos de datos',
        subResources: [
          { id: 'sr1-1-1', title: 'Introducción a variables', type: 'video', duration: '15 min', completed: true },
          { id: 'sr1-1-2', title: 'Tipos de datos primitivos', type: 'video', duration: '20 min', completed: true },
          { id: 'sr1-1-3', title: 'Documentación sobre tipos', type: 'documentation', completed: true }
        ]
      },
      {
        id: 'r1-2',
        title: 'Estructuras de control',
        subResources: [
          { id: 'sr1-2-1', title: 'Condicionales if/else', type: 'video', duration: '18 min', completed: true },
          { id: 'sr1-2-2', title: 'Bucles for y while', type: 'video', duration: '25 min', completed: true },
          { id: 'sr1-2-3', title: 'Ejercicios prácticos', type: 'exercise', completed: true }
        ]
      },
      {
        id: 'r1-3',
        title: 'Funciones básicas',
        subResources: [
          { id: 'sr1-3-1', title: 'Definir funciones', type: 'video', duration: '12 min', completed: true },
          { id: 'sr1-3-2', title: 'Parámetros y retorno', type: 'video', duration: '15 min', completed: true },
          { id: 'sr1-3-3', title: 'Guía de buenas prácticas', type: 'article', completed: true }
        ]
      }
    ],
    progress: 100,
    content: 'Domina los conceptos fundamentales de la programación. Aprende sobre variables, condicionales, bucles y funciones.'
  },
  {
    id: '2',
    title: 'Estructuras de Datos',
    description: 'Arrays, listas, pilas y colas',
    status: 'in-progress',
    level: 1,
    position: { x: -300, y: -250 },
    dependencies: ['1'],
    stage: 'Nivel Intermedio',
    resources: [
      {
        id: 'r2-1',
        title: 'Arrays y matrices',
        subResources: [
          { id: 'sr2-1-1', title: 'Arrays unidimensionales', type: 'video', duration: '20 min', completed: true },
          { id: 'sr2-1-2', title: 'Matrices multidimensionales', type: 'video', duration: '25 min', completed: true },
          { id: 'sr2-1-3', title: 'Operaciones con arrays', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r2-2',
        title: 'Listas enlazadas',
        subResources: [
          { id: 'sr2-2-1', title: 'Listas simples', type: 'video', duration: '30 min', completed: true },
          { id: 'sr2-2-2', title: 'Listas dobles', type: 'video', duration: '28 min', completed: false },
          { id: 'sr2-2-3', title: 'Implementación práctica', type: 'exercise', completed: false }
        ]
      },
      {
        id: 'r2-3',
        title: 'Pilas y colas',
        subResources: [
          { id: 'sr2-3-1', title: 'Estructura de pila (Stack)', type: 'video', duration: '22 min', completed: true },
          { id: 'sr2-3-2', title: 'Estructura de cola (Queue)', type: 'video', duration: '20 min', completed: false },
          { id: 'sr2-3-3', title: 'Casos de uso', type: 'article', completed: false }
        ]
      },
      {
        id: 'r2-4',
        title: 'Hash tables',
        subResources: [
          { id: 'sr2-4-1', title: 'Conceptos de hashing', type: 'video', duration: '25 min', completed: false },
          { id: 'sr2-4-2', title: 'Colisiones y resolución', type: 'video', duration: '18 min', completed: false },
          { id: 'sr2-4-3', title: 'Ejercicios hash tables', type: 'exercise', completed: false }
        ]
      }
    ],
    progress: 65,
    content: 'Comprende las estructuras de datos fundamentales y cuándo usar cada una para resolver problemas eficientemente.'
  },
  {
    id: '3',
    title: 'Algoritmos Básicos',
    description: 'Ordenamiento y búsqueda',
    status: 'in-progress',
    level: 1,
    position: { x: 300, y: -250 },
    dependencies: ['1'],
    stage: 'Nivel Intermedio',
    resources: [
      {
        id: 'r3-1',
        title: 'Búsqueda binaria',
        subResources: [
          { id: 'sr3-1-1', title: 'Concepto de búsqueda binaria', type: 'video', duration: '18 min', completed: true },
          { id: 'sr3-1-2', title: 'Implementación', type: 'video', duration: '22 min', completed: true },
          { id: 'sr3-1-3', title: 'Análisis de complejidad', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r3-2',
        title: 'Bubble sort',
        subResources: [
          { id: 'sr3-2-1', title: 'Algoritmo bubble sort', type: 'video', duration: '15 min', completed: true },
          { id: 'sr3-2-2', title: 'Optimizaciones', type: 'video', duration: '12 min', completed: false },
          { id: 'sr3-2-3', title: 'Ejercicios prácticos', type: 'exercise', completed: false }
        ]
      },
      {
        id: 'r3-3',
        title: 'Quick sort',
        subResources: [
          { id: 'sr3-3-1', title: 'Fundamentos de quicksort', type: 'video', duration: '28 min', completed: false },
          { id: 'sr3-3-2', title: 'Particionamiento', type: 'video', duration: '20 min', completed: false },
          { id: 'sr3-3-3', title: 'Guía completa', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r3-4',
        title: 'Merge sort',
        subResources: [
          { id: 'sr3-4-1', title: 'Divide y conquista', type: 'video', duration: '25 min', completed: false },
          { id: 'sr3-4-2', title: 'Implementación merge sort', type: 'video', duration: '30 min', completed: false },
          { id: 'sr3-4-3', title: 'Comparación de algoritmos', type: 'article', completed: false }
        ]
      }
    ],
    progress: 40,
    content: 'Aprende algoritmos esenciales de ordenamiento y búsqueda, y analiza su complejidad temporal.'
  },
  {
    id: '4',
    title: 'Programación Orientada a Objetos',
    description: 'Clases, objetos, herencia y polimorfismo',
    status: 'available',
    level: 2,
    position: { x: -450, y: -500 },
    dependencies: ['2'],
    stage: 'Nivel Intermedio-Avanzado',
    resources: [
      {
        id: 'r4-1',
        title: 'Clases y objetos',
        subResources: [
          { id: 'sr4-1-1', title: 'Introducción a POO', type: 'video', duration: '25 min', completed: false },
          { id: 'sr4-1-2', title: 'Crear clases', type: 'video', duration: '20 min', completed: false },
          { id: 'sr4-1-3', title: 'Instanciar objetos', type: 'exercise', completed: false }
        ]
      },
      {
        id: 'r4-2',
        title: 'Herencia',
        subResources: [
          { id: 'sr4-2-1', title: 'Conceptos de herencia', type: 'video', duration: '22 min', completed: false },
          { id: 'sr4-2-2', title: 'Herencia múltiple', type: 'video', duration: '18 min', completed: false },
          { id: 'sr4-2-3', title: 'Guía de herencia', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r4-3',
        title: 'Polimorfismo',
        subResources: [
          { id: 'sr4-3-1', title: 'Polimorfismo explicado', type: 'video', duration: '20 min', completed: false },
          { id: 'sr4-3-2', title: 'Sobrecarga de métodos', type: 'video', duration: '15 min', completed: false }
        ]
      },
      {
        id: 'r4-4',
        title: 'Encapsulación',
        subResources: [
          { id: 'sr4-4-1', title: 'Principios de encapsulación', type: 'video', duration: '18 min', completed: false },
          { id: 'sr4-4-2', title: 'Modificadores de acceso', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r4-5',
        title: 'Abstracción',
        subResources: [
          { id: 'sr4-5-1', title: 'Clases abstractas', type: 'video', duration: '22 min', completed: false },
          { id: 'sr4-5-2', title: 'Interfaces', type: 'video', duration: '20 min', completed: false },
          { id: 'sr4-5-3', title: 'Ejercicios de POO', type: 'exercise', completed: false }
        ]
      }
    ],
    progress: 0,
    content: 'Domina los principios de la programación orientada a objetos para escribir código más mantenible y escalable.'
  },
  {
    id: '5',
    title: 'Algoritmos Avanzados',
    description: 'Grafos, árboles y programación dinámica',
    status: 'available',
    level: 2,
    position: { x: 0, y: -500 },
    dependencies: ['2', '3'],
    stage: 'Nivel Avanzado',
    resources: [
      {
        id: 'r5-1',
        title: 'Árboles binarios',
        subResources: [
          { id: 'sr5-1-1', title: 'Estructura de árbol', type: 'video', duration: '30 min', completed: false },
          { id: 'sr5-1-2', title: 'Recorridos de árboles', type: 'video', duration: '25 min', completed: false },
          { id: 'sr5-1-3', title: 'BST y AVL', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r5-2',
        title: 'Grafos',
        subResources: [
          { id: 'sr5-2-1', title: 'Representación de grafos', type: 'video', duration: '22 min', completed: false },
          { id: 'sr5-2-2', title: 'Grafos dirigidos y no dirigidos', type: 'video', duration: '18 min', completed: false }
        ]
      },
      {
        id: 'r5-3',
        title: 'DFS y BFS',
        subResources: [
          { id: 'sr5-3-1', title: 'Búsqueda en profundidad', type: 'video', duration: '28 min', completed: false },
          { id: 'sr5-3-2', title: 'Búsqueda en anchura', type: 'video', duration: '26 min', completed: false },
          { id: 'sr5-3-3', title: 'Ejercicios de grafos', type: 'exercise', completed: false }
        ]
      },
      {
        id: 'r5-4',
        title: 'Programación dinámica',
        subResources: [
          { id: 'sr5-4-1', title: 'Introducción a DP', type: 'video', duration: '35 min', completed: false },
          { id: 'sr5-4-2', title: 'Memoización', type: 'video', duration: '22 min', completed: false },
          { id: 'sr5-4-3', title: 'Problemas clásicos', type: 'article', completed: false }
        ]
      }
    ],
    progress: 0,
    content: 'Explora algoritmos complejos utilizados en problemas del mundo real y entrevistas técnicas.'
  },
  {
    id: '6',
    title: 'Desarrollo Web Frontend',
    description: 'HTML, CSS, JavaScript y frameworks modernos',
    status: 'available',
    level: 2,
    position: { x: 450, y: -500 },
    dependencies: ['1'],
    stage: 'Nivel Intermedio',
    resources: [
      {
        id: 'r6-1',
        title: 'HTML5 semántico',
        subResources: [
          { id: 'sr6-1-1', title: 'Estructura HTML', type: 'video', duration: '20 min', completed: false },
          { id: 'sr6-1-2', title: 'Etiquetas semánticas', type: 'video', duration: '18 min', completed: false },
          { id: 'sr6-1-3', title: 'Guía de HTML5', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r6-2',
        title: 'CSS3 y Flexbox/Grid',
        subResources: [
          { id: 'sr6-2-1', title: 'Fundamentos de CSS', type: 'video', duration: '25 min', completed: false },
          { id: 'sr6-2-2', title: 'Flexbox layout', type: 'video', duration: '22 min', completed: false },
          { id: 'sr6-2-3', title: 'CSS Grid', type: 'video', duration: '28 min', completed: false },
          { id: 'sr6-2-4', title: 'Ejercicios de maquetación', type: 'exercise', completed: false }
        ]
      },
      {
        id: 'r6-3',
        title: 'JavaScript ES6+',
        subResources: [
          { id: 'sr6-3-1', title: 'JavaScript moderno', type: 'video', duration: '30 min', completed: false },
          { id: 'sr6-3-2', title: 'Arrow functions y async/await', type: 'video', duration: '20 min', completed: false },
          { id: 'sr6-3-3', title: 'Guía ES6+', type: 'article', completed: false }
        ]
      },
      {
        id: 'r6-4',
        title: 'React/Vue',
        subResources: [
          { id: 'sr6-4-1', title: 'Introducción a React', type: 'video', duration: '35 min', completed: false },
          { id: 'sr6-4-2', title: 'Componentes y hooks', type: 'video', duration: '40 min', completed: false },
          { id: 'sr6-4-3', title: 'Proyecto práctico', type: 'exercise', completed: false }
        ]
      }
    ],
    progress: 0,
    content: 'Crea interfaces de usuario modernas y responsivas utilizando las tecnologías web actuales.'
  },
  {
    id: '7',
    title: 'Patrones de Diseño',
    description: 'Soluciones reutilizables a problemas comunes',
    status: 'locked',
    level: 3,
    position: { x: -450, y: -750 },
    dependencies: ['4'],
    stage: 'Nivel Avanzado',
    resources: [
      {
        id: 'r7-1',
        title: 'Singleton',
        subResources: [
          { id: 'sr7-1-1', title: 'Patrón Singleton', type: 'video', duration: '15 min', completed: false },
          { id: 'sr7-1-2', title: 'Implementación', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r7-2',
        title: 'Factory',
        subResources: [
          { id: 'sr7-2-1', title: 'Factory pattern', type: 'video', duration: '18 min', completed: false },
          { id: 'sr7-2-2', title: 'Casos de uso', type: 'article', completed: false }
        ]
      },
      {
        id: 'r7-3',
        title: 'Observer',
        subResources: [
          { id: 'sr7-3-1', title: 'Patrón Observer', type: 'video', duration: '20 min', completed: false },
          { id: 'sr7-3-2', title: 'Ejercicios', type: 'exercise', completed: false }
        ]
      },
      {
        id: 'r7-4',
        title: 'Strategy',
        subResources: [
          { id: 'sr7-4-1', title: 'Strategy pattern', type: 'video', duration: '16 min', completed: false },
          { id: 'sr7-4-2', title: 'Ejemplos prácticos', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r7-5',
        title: 'Decorator',
        subResources: [
          { id: 'sr7-5-1', title: 'Patrón Decorator', type: 'video', duration: '22 min', completed: false },
          { id: 'sr7-5-2', title: 'Implementación', type: 'video', duration: '18 min', completed: false }
        ]
      }
    ],
    progress: 0,
    content: 'Aprende patrones de diseño probados que mejoran la arquitectura de tu software.'
  },
  {
    id: '8',
    title: 'Arquitectura de Software',
    description: 'Diseño de sistemas escalables',
    status: 'locked',
    level: 3,
    position: { x: -150, y: -750 },
    dependencies: ['4', '5'],
    stage: 'Nivel Experto',
    resources: [
      {
        id: 'r8-1',
        title: 'Microservicios',
        subResources: [
          { id: 'sr8-1-1', title: 'Arquitectura de microservicios', type: 'video', duration: '40 min', completed: false },
          { id: 'sr8-1-2', title: 'Comunicación entre servicios', type: 'video', duration: '30 min', completed: false },
          { id: 'sr8-1-3', title: 'Guía completa', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r8-2',
        title: 'Clean Architecture',
        subResources: [
          { id: 'sr8-2-1', title: 'Principios de Clean Architecture', type: 'video', duration: '35 min', completed: false },
          { id: 'sr8-2-2', title: 'Capas y dependencias', type: 'article', completed: false }
        ]
      },
      {
        id: 'r8-3',
        title: 'SOLID',
        subResources: [
          { id: 'sr8-3-1', title: 'Principios SOLID', type: 'video', duration: '45 min', completed: false },
          { id: 'sr8-3-2', title: 'Aplicación práctica', type: 'exercise', completed: false }
        ]
      },
      {
        id: 'r8-4',
        title: 'DDD',
        subResources: [
          { id: 'sr8-4-1', title: 'Domain Driven Design', type: 'video', duration: '50 min', completed: false },
          { id: 'sr8-4-2', title: 'Bounded contexts', type: 'documentation', completed: false }
        ]
      }
    ],
    progress: 0,
    content: 'Diseña sistemas de software robustos, escalables y mantenibles a nivel empresarial.'
  },
  {
    id: '9',
    title: 'Aplicaciones Full Stack',
    description: 'Desarrollo completo frontend y backend',
    status: 'locked',
    level: 3,
    position: { x: 250, y: -750 },
    dependencies: ['6', '5'],
    stage: 'Nivel Avanzado',
    resources: [
      {
        id: 'r9-1',
        title: 'APIs RESTful',
        subResources: [
          { id: 'sr9-1-1', title: 'Fundamentos de REST', type: 'video', duration: '25 min', completed: false },
          { id: 'sr9-1-2', title: 'Diseño de APIs', type: 'video', duration: '30 min', completed: false },
          { id: 'sr9-1-3', title: 'Best practices', type: 'documentation', completed: false }
        ]
      },
      {
        id: 'r9-2',
        title: 'Bases de datos',
        subResources: [
          { id: 'sr9-2-1', title: 'SQL vs NoSQL', type: 'video', duration: '20 min', completed: false },
          { id: 'sr9-2-2', title: 'Diseño de esquemas', type: 'video', duration: '28 min', completed: false },
          { id: 'sr9-2-3', title: 'Optimización de queries', type: 'article', completed: false }
        ]
      },
      {
        id: 'r9-3',
        title: 'Autenticación',
        subResources: [
          { id: 'sr9-3-1', title: 'JWT y OAuth', type: 'video', duration: '30 min', completed: false },
          { id: 'sr9-3-2', title: 'Seguridad', type: 'documentation', completed: false },
          { id: 'sr9-3-3', title: 'Implementar auth', type: 'exercise', completed: false }
        ]
      },
      {
        id: 'r9-4',
        title: 'Deployment',
        subResources: [
          { id: 'sr9-4-1', title: 'CI/CD pipelines', type: 'video', duration: '35 min', completed: false },
          { id: 'sr9-4-2', title: 'Docker y Kubernetes', type: 'video', duration: '40 min', completed: false },
          { id: 'sr9-4-3', title: 'Proyecto final', type: 'exercise', completed: false }
        ]
      }
    ],
    progress: 0,
    content: 'Integra frontend y backend para crear aplicaciones web completas y funcionales.'
  }
];

export default function Dashboard() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [nodes, setNodes] = useState(learningTreeData);

  const handleNodeSelect = (node) => {
    const currentNode = nodes.find(n => n.id === node.id) || node;
    setSelectedNode(currentNode);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleUpdateNodeProgress = (nodeId, completedSubResourceIds) => {
    setNodes(prevNodes => {
      return prevNodes.map(node => {
        if (node.id === nodeId) {
          const totalSubResources = node.resources.reduce((acc, r) => acc + r.subResources.length, 0);
          
          // Filtrar solo IDs válidos que existen en el nodo
          const validCompletedIds = completedSubResourceIds.filter(id => 
            node.resources.some(r => r.subResources.some(sr => sr.id === id))
          );
          
          const newProgress = totalSubResources > 0 
            ? Math.min(Math.round((validCompletedIds.length / totalSubResources) * 100), 100)
            : 0;
          
          // Actualizar el estado de completado de los sub-recursos
          const updatedResources = node.resources.map(resource => ({
            ...resource,
            subResources: resource.subResources.map(sr => ({
              ...sr,
              completed: validCompletedIds.includes(sr.id)
            }))
          }));

          const updatedNode = {
            ...node,
            resources: updatedResources,
            progress: newProgress
          };

          // Actualizar el nodo seleccionado si es el mismo
          if (selectedNode?.id === nodeId) {
            setSelectedNode(updatedNode);
          }

          return updatedNode;
        }
        return node;
      });
    });
  };

  const handleCompleteNode = () => {
    if (selectedNode && selectedNode.status === 'in-progress') {
      // actualizar el estado
      console.log('Completando nodo:', selectedNode.id);
    }
  };

  const handleStartNode = () => {
    if (selectedNode && selectedNode.status === 'available') {
      // actualizar el estado
      console.log('Iniciando nodo:', selectedNode.id);
    }
  };

  return (
    <div className=" h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-20 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="px-3 py-3 sm:px-6 sm:py-4">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Árbol de Aprendizaje</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Avanza en tu camino de aprendizaje paso a paso</p>
        </div>
      </header>

      <div className="w-full h-full pt-16 sm:pt-20">
        <LearningTree 
          nodes={nodes} 
          selectedNodeId={selectedNode?.id}
          onNodeSelect={handleNodeSelect}
        />
      </div>

      <NodePanel
        node={selectedNode}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        onComplete={handleCompleteNode}
        onStart={handleStartNode}
        onUpdateProgress={handleUpdateNodeProgress}
      />
    </div>
  );
}
