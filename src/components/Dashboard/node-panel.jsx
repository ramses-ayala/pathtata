import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, CheckCircle2, Circle, Loader, Book, Award, Target, ChevronDown, PlayCircle, FileText, BookOpen, Code2, CheckSquare, Square } from 'lucide-react';
import { useState } from 'react';

const statusIcons = {
  locked: Lock,
  available: Circle,
  'in-progress': Loader,
  completed: CheckCircle2
};

const statusLabels = {
  locked: 'Bloqueado',
  available: 'Disponible',
  'in-progress': 'En Progreso',
  completed: 'Completado'
};

const statusColors = {
  locked: 'text-slate-400',
  available: 'text-blue-400',
  'in-progress': 'text-purple-400',
  completed: 'text-emerald-400'
};

// Iconos para tipos de sub-recursos
const subResourceIcons = {
  video: PlayCircle,
  documentation: FileText,
  article: BookOpen,
  exercise: Code2
};

const subResourceColors = {
  video: 'text-red-400',
  documentation: 'text-blue-400',
  article: 'text-green-400',
  exercise: 'text-purple-400'
};

export function NodePanel({ node, isOpen, onClose, onComplete, onStart, onUpdateProgress }) {
  if (!node) return null;

  const StatusIcon = statusIcons[node.status];

  return (
    <>
      {/* Overlay para móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Panel Desktop (lado derecho) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden md:block fixed right-0 top-0 bottom-0 w-96 bg-slate-800 border-l border-slate-700 shadow-2xl z-40 overflow-y-auto"
          >
            <PanelContent 
              node={node} 
              onClose={onClose} 
              StatusIcon={StatusIcon}
              statusLabel={statusLabels[node.status]}
              statusColor={statusColors[node.status]}
              onComplete={onComplete}
              onStart={onStart}
              onUpdateProgress={onUpdateProgress}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel Móvil (inferior deslizable) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
            className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 rounded-t-3xl border-t border-slate-700 shadow-2xl z-40 max-h-[85vh] overflow-y-auto"
          >
            {/* Indicador de arrastre */}
            <div className="sticky top-0 bg-slate-800 pt-2 pb-3 flex justify-center">
              <div className="w-12 h-1.5 bg-slate-600 rounded-full" />
            </div>

            <PanelContent 
              node={node} 
              onClose={onClose} 
              StatusIcon={StatusIcon}
              statusLabel={statusLabels[node.status]}
              statusColor={statusColors[node.status]}
              onComplete={onComplete}
              onStart={onStart}
              onUpdateProgress={onUpdateProgress}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PanelContent({ 
  node, 
  onClose, 
  StatusIcon, 
  statusLabel, 
  statusColor,
  onComplete,
  onStart,
  onUpdateProgress
}) {
  const [expandedResources, setExpandedResources] = useState(new Set());
  
  // Obtener IDs válidos de sub-recursos del nodo actual
  const validSubResourceIds = new Set(
    node.resources.flatMap(r => r.subResources.map(sr => sr.id))
  );
  
  // Inicializar solo con sub-recursos completados que existen en el nodo actual
  const [completedSubResources, setCompletedSubResources] = useState(() => {
    const completed = node.resources
      .flatMap(r => r.subResources)
      .filter(sr => sr.completed)
      .map(sr => sr.id);
    return new Set(completed);
  });

  const toggleResource = (resourceId) => {
    const newExpanded = new Set(expandedResources);
    if (newExpanded.has(resourceId)) {
      newExpanded.delete(resourceId);
    } else {
      newExpanded.add(resourceId);
    }
    setExpandedResources(newExpanded);
  };

  const toggleSubResource = (subResourceId) => {
    const newCompleted = new Set(completedSubResources);
    if (newCompleted.has(subResourceId)) {
      newCompleted.delete(subResourceId);
    } else {
      newCompleted.add(subResourceId);
    }
    setCompletedSubResources(newCompleted);

    // Actualizar progreso
    if (onUpdateProgress) {
      onUpdateProgress(node.id, Array.from(newCompleted));
    }
  };

  // Calcular progreso basado SOLO en sub-recursos válidos del nodo actual
  const totalSubResources = node.resources.reduce((acc, r) => acc + r.subResources.length, 0);
  const completedCount = Array.from(completedSubResources).filter(id => validSubResourceIds.has(id)).length;
  const calculatedProgress = totalSubResources > 0 ? Math.min(Math.round((completedCount / totalSubResources) * 100), 100) : 0;

  return (
    <div className="p-6 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className={`flex items-center gap-2 ${statusColor} mb-2`}>
            <StatusIcon className={`w-5 h-5 ${node.status === 'in-progress' ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">{statusLabel}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{node.title}</h2>
          <p className="text-slate-400 text-sm">{node.description}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Etapa */}
      <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
        <div className="flex items-center gap-2 text-blue-400 mb-2">
          <Award className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wide">Etapa</span>
        </div>
        <p className="text-white font-medium">{node.stage}</p>
      </div>

      {/* Progreso */}
      {(node.status === 'in-progress' || node.status === 'completed') && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-purple-400">
              <Target className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Progreso</span>
            </div>
            <span className="text-white font-bold">{calculatedProgress}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${calculatedProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {completedCount} de {totalSubResources} recursos completados
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Book className="w-4 h-4 text-slate-400" />
          Descripción
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">{node.content}</p>
      </div>

      {/* Recursos con toggle */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">Recursos de Aprendizaje</h3>
        <div className="space-y-2">
          {node.resources.map((resource, index) => {
            const isExpanded = expandedResources.has(resource.id);
            const resourceCompletedCount = resource.subResources.filter(sr => 
              completedSubResources.has(sr.id)
            ).length;
            const resourceProgress = resource.subResources.length > 0 
              ? Math.round((resourceCompletedCount / resource.subResources.length) * 100)
              : 0;

            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-900/30 rounded-lg border border-slate-700/30 overflow-hidden"
              >
                {/* Header del recurso */}
                <button
                  onClick={() => toggleResource(resource.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-slate-700/20 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </motion.div>
                    <span className="text-slate-200 text-sm font-medium text-left">{resource.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      {resourceCompletedCount}/{resource.subResources.length}
                    </span>
                    {resourceProgress === 100 && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                </button>

                {/* Sub-recursos */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 space-y-2">
                        {resource.subResources.map((subResource, srIndex) => {
                          const SubIcon = subResourceIcons[subResource.type];
                          const iconColor = subResourceColors[subResource.type];
                          const isCompleted = completedSubResources.has(subResource.id);

                          return (
                            <motion.div
                              key={subResource.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: srIndex * 0.05 }}
                              className={`
                                flex items-start gap-3 p-2.5 rounded-md 
                                border transition-all cursor-pointer
                                ${isCompleted 
                                  ? 'bg-slate-800/50 border-emerald-500/30' 
                                  : 'bg-slate-800/30 border-slate-700/20 hover:border-slate-600/40'
                                }
                              `}
                              onClick={() => toggleSubResource(subResource.id)}
                            >
                              {/* Checkbox */}
                              <button className="mt-0.5">
                                {isCompleted ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-500" />
                                )}
                              </button>

                              {/* Icono del tipo */}
                              <SubIcon className={`w-4 h-4 ${iconColor} mt-0.5 flex-shrink-0`} />

                              {/* Contenido */}
                              <div className="flex-1 min-w-0">
                                <div className={`text-sm ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                                  {subResource.title}
                                </div>
                                {subResource.duration && (
                                  <div className="text-xs text-slate-500 mt-0.5">
                                    {subResource.duration}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Acciones */}
      <div className="space-y-3 pt-4 border-t border-slate-700">
        {node.status === 'available' && (
          <button 
            onClick={onStart}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Circle className="w-4 h-4" />
            Comenzar este módulo
          </button>
        )}

        {node.status === 'in-progress' && (
          <button 
            onClick={onComplete}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Marcar como completado
          </button>
        )}

        {node.status === 'completed' && (
          <div className="w-full py-3 px-4 bg-emerald-900/30 text-emerald-400 font-semibold rounded-lg border border-emerald-500/50 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Módulo completado
          </div>
        )}

        {node.status === 'locked' && (
          <div className="w-full py-3 px-4 bg-slate-900/50 text-slate-400 font-medium rounded-lg border border-slate-700 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Completa las dependencias primero
          </div>
        )}
      </div>
    </div>
  );
}
