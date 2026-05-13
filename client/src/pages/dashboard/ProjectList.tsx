import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Plus, Search, Filter, Calendar, MapPin, LayoutList, Columns as Timeline } from 'lucide-react';
import NewProjectModal from '../../components/dashboard/NewProjectModal';
import ProjectGantt from '../../components/dashboard/ProjectGantt';
import { projectService, Project } from '../../services/projectService';

const ProjectList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'timeline'>('list');

  useEffect(() => {
    const unsubscribe = projectService.subscribeProjects((data) => {
      setProjects(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-slate-500 text-sm">Manage and track your construction projects</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 mr-4">
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-primary text-secondary' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutList size={18} />
            </button>
            <button 
              onClick={() => setView('timeline')}
              className={`p-2 rounded-lg transition-all ${view === 'timeline' ? 'bg-primary text-secondary' : 'text-slate-400 hover:text-white'}`}
            >
              <Timeline size={18} />
            </button>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-gold flex items-center gap-2"
          >
            <Plus size={18} />
            Create New Project
          </button>
        </div>
      </div>

      <NewProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {view === 'list' ? (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full bg-secondary/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 glass rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
                <Filter size={16} />
                Filter
              </button>
              <button className="px-4 py-2 glass rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
                Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card hover:border-primary/20 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-secondary transition-all">
                      <span className="text-xl font-bold">{project.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{project.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={12} /> {project.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar size={12} /> Deadline: {project.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 max-w-xs">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Progress</span>
                      <span className="text-sm font-bold text-primary">{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_10px_rgba(200,155,60,0.5)]"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right hidden lg:block">
                      <div className="text-sm font-bold">{project.budget}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Budget</div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      project.status === 'Execution' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      project.status === 'Planning' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {project.status}
                    </div>

                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <ProjectGantt />
      )}
    </div>
  );
};

export default ProjectList;
