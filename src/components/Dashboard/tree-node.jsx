import { motion } from 'motion/react';
import { Lock, CheckCircle2, Circle, Loader, Code, Database, Layers, Boxes, Cpu, Globe, Puzzle, Building, Zap } from 'lucide-react';

/**
 * @typedef {'locked' | 'available' | 'in-progress' | 'completed'} NodeStatus
 */

/**
 * @typedef {Object} TreeNode
 * @property {string} id
 * @property {string} title
 * @property {string} stage
 * @property {NodeStatus} status
 * @property {number} progress
 * @property {{x: number, y: number}} position
 */

/**
 * @typedef {Object} TreeNodeProps
 * @property {TreeNode} node
 * @property {boolean} isSelected
 * @property {() => void} onClick
 * @property {number} [delay]
 */

const statusConfig = {
  locked: {
    icon: Lock,
    bgColor: 'bg-slate-800/50',
    borderColor: 'border-slate-600',
    iconColor: 'text-slate-500',
    textColor: 'text-slate-400',
    glowColor: 'shadow-slate-700/50'
  },
  available: {
    icon: Circle,
    bgColor: 'bg-blue-900/30',
    borderColor: 'border-blue-500/50',
    iconColor: 'text-blue-400',
    textColor: 'text-blue-100',
    glowColor: 'shadow-blue-500/30'
  },
  'in-progress': {
    icon: Loader,
    bgColor: 'bg-purple-900/30',
    borderColor: 'border-purple-500/50',
    iconColor: 'text-purple-400',
    textColor: 'text-purple-100',
    glowColor: 'shadow-purple-500/30'
  },
  completed: {
    icon: CheckCircle2,
    bgColor: 'bg-emerald-900/30',
    borderColor: 'border-emerald-500/50',
    iconColor: 'text-emerald-400',
    textColor: 'text-emerald-100',
    glowColor: 'shadow-emerald-500/30'
  }
};

// Iconos de contenido por nodo
const contentIcons = {
  '1': Code,
  '2': Database,
  '3': Cpu,
  '4': Boxes,
  '5': Layers,
  '6': Globe,
  '7': Puzzle,
  '8': Building,
  '9': Zap
};

export function TreeNodeComponent({ node, isSelected, onClick, delay = 0 }) {
  const config = statusConfig[node.status];
  const Icon = config.icon;
  const ContentIcon = contentIcons[node.id] || Code;

  return (
    <motion.div
      className="tree-node absolute"
      style={{
        left: node.position.x,
        top: node.position.y,
        x: '-50%',
        y: '-50%'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isSelected ? 1.1 : 1
      }}
      transition={{ 
        delay,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col items-center gap-2">
        {/* Nodo circular */}
        <motion.button
          onClick={onClick}
          className={`
            relative rounded-full
            ${config.bgColor} ${config.borderColor} border-3
            backdrop-blur-sm transition-all cursor-pointer
            w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
            flex items-center justify-center
            ${isSelected ? `ring-4 ring-white/30 ${config.glowColor} shadow-2xl` : 'shadow-lg'}
          `}
        >
          {/* Icono de contenido en el centro */}
          <ContentIcon className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${config.iconColor}`} />
          
          {/* Indicador de estado en esquina superior derecha */}
          <div className={`
            absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full 
            flex items-center justify-center
            ${config.bgColor} ${config.borderColor} border-2
          `}>
            <Icon className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 ${config.iconColor} ${node.status === 'in-progress' ? 'animate-spin' : ''}`} />
          </div>

          {/* Barra de progreso circular para nodos en progreso */}
          {node.status === 'in-progress' && node.progress > 0 && (
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="30"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className="text-slate-700/50"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="30"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                className="text-purple-500"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: node.progress / 100 }}
                transition={{ duration: 1, delay: delay + 0.3 }}
                strokeLinecap="round"
                strokeDasharray="1 1"
              />
            </svg>
          )}
        </motion.button>

        {/* Título y nivel debajo del nodo */}
        <div className="flex flex-col items-center gap-1 max-w-[100px] sm:max-w-[120px] md:max-w-[140px]">
          <div className={`text-[10px] sm:text-xs md:text-sm font-semibold text-center ${config.textColor} line-clamp-2`}>
            {node.title}
          </div>
          <div className="bg-slate-700/80 text-slate-300 text-[9px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border border-slate-600 whitespace-nowrap">
            {node.stage}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
