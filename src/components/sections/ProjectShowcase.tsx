"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowLeft } from "lucide-react";
import projects from "@/data/projects.json";

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="relative py-32 bg-black">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Selected Works</h2>
            <div className="w-24 h-1 bg-neon-blue box-glow rounded-full" />
          </div>
          <button className="hidden md:block interactive text-neon-blue uppercase tracking-widest text-sm hover:text-glow">
            View All Projects
          </button>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              onClick={() => setSelectedProject(project)}
              className={`interactive group relative overflow-hidden rounded-2xl cursor-pointer ${project.colSpan}`}
            >
              {/* Image */}
              <motion.div 
                layoutId={`img-${project.id}`}
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.img})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-neon-blue/20 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.span layoutId={`category-${project.id}`} className="text-neon-cyan uppercase tracking-widest text-xs font-bold mb-2 block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {project.category}
                </motion.span>
                <motion.h3 layoutId={`title-${project.id}`} className="text-2xl md:text-3xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-[200] bg-black overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-50 p-6 md:p-12 flex justify-between items-center mix-blend-difference">
              <button 
                onClick={() => setSelectedProject(null)}
                className="interactive group flex items-center gap-2 text-white"
              >
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                  <ArrowLeft size={20} />
                </div>
                <span className="uppercase tracking-widest text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">Back</span>
              </button>
            </div>

            {/* Hero Image */}
            <motion.div 
              layoutId={`img-${selectedProject.id}`}
              className="w-full h-[60vh] md:h-[80vh] bg-cover bg-center absolute top-0 left-0"
              style={{ backgroundImage: `url(${selectedProject.img})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 mt-[40vh] md:mt-[60vh] pb-32">
              <div className="max-w-4xl">
                <motion.span 
                  layoutId={`category-${selectedProject.id}`}
                  className="text-neon-cyan uppercase tracking-widest text-sm font-bold mb-4 block"
                >
                  {selectedProject.category}
                </motion.span>
                
                <motion.h2 
                  layoutId={`title-${selectedProject.id}`}
                  className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight"
                >
                  {selectedProject.title}
                </motion.h2>

                <div className="flex flex-wrap gap-4 mb-12">
                  {selectedProject.tech.split(", ").map(t => (
                    <span key={t} className="px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm font-mono backdrop-blur-md">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                  <p className="text-white/60 font-light whitespace-pre-wrap">
                    {selectedProject.longDescription}
                  </p>
                </div>
                
                {selectedProject.link && selectedProject.link !== "#" ? (
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="inline-flex interactive mt-16 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neon-blue hover:text-black hover:box-glow transition-all rounded-full items-center gap-2">
                    Launch Project <ExternalLink size={18} />
                  </a>
                ) : (
                  <button className="interactive mt-16 px-8 py-4 bg-white/20 text-white/50 font-bold uppercase tracking-widest cursor-not-allowed rounded-full flex items-center gap-2">
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
