"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";
import { Box, Monitor, Zap, Code, X, ArrowRight, CheckCircle2 } from "lucide-react";

const categories = [
  { id: "3d", title: "3D Modeling", icon: Box },
  { id: "web", title: "Web Design", icon: Monitor },
  { id: "interactive", title: "Interactive Websites", icon: Zap },
  { id: "creative", title: "Creative Development", icon: Code },
];

export default function StartProjectModal() {
  const { isOpen, closeModal } = useProjectModal();
  
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleClose = () => {
    closeModal();
    // Reset state after animation completes
    setTimeout(() => {
      setStep(1);
      setSelectedCategory(null);
      setProjectTitle("");
      setProjectDescription("");
    }, 500);
  };

  const handleNextStep = () => {
    if (step === 1 && selectedCategory) setStep(2);
    else if (step === 2 && projectTitle.trim() !== "") setStep(3);
    else if (step === 3 && projectDescription.trim() !== "") setStep(4);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#0a0a0f] border border-neon-blue/30 rounded-3xl p-8 md:p-16 w-full max-w-4xl relative shadow-[0_0_50px_rgba(51,187,255,0.1)] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-10"
            >
              <X size={24} />
            </button>

            {/* Step Indicators */}
            <div className="flex gap-2 mb-12">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                    i < step ? "bg-neon-blue" : i === step ? "bg-neon-blue/50 box-glow" : "bg-white/10"
                  }`} 
                />
              ))}
            </div>

            <div className="relative min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: CATEGORY */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                  >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">
                      What do you want to create?
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-auto mb-auto">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-300 ${
                              isSelected 
                                ? "border-neon-blue bg-neon-blue/10 box-glow text-white" 
                                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:border-white/30"
                            }`}
                          >
                            <Icon size={40} className={`mb-4 ${isSelected ? "text-neon-cyan" : ""}`} strokeWidth={1.5} />
                            <span className="text-xl font-bold">{cat.title}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end mt-8">
                      <button
                        onClick={handleNextStep}
                        disabled={!selectedCategory}
                        className={`px-8 py-3 rounded-full flex items-center gap-2 font-bold uppercase tracking-widest text-sm transition-all ${
                          selectedCategory 
                            ? "bg-white text-black hover:bg-neon-blue hover:box-glow" 
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        }`}
                      >
                        Next <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: TITLE */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full justify-center"
                  >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
                      What do you want to title it?
                    </h2>
                    
                    <div className="relative max-w-2xl mx-auto w-full">
                      <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g. Aevinte Masterpiece..."
                        className="w-full bg-transparent border-b-2 border-white/20 text-white text-3xl md:text-5xl py-4 focus:outline-none focus:border-neon-blue transition-colors text-center placeholder:text-white/20"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && projectTitle.trim() !== "") handleNextStep();
                        }}
                      />
                    </div>

                    <div className="flex justify-between items-center mt-20">
                      <button
                        onClick={() => setStep(1)}
                        className="text-white/50 hover:text-white font-bold uppercase tracking-widest text-sm transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        disabled={projectTitle.trim() === ""}
                        className={`px-8 py-3 rounded-full flex items-center gap-2 font-bold uppercase tracking-widest text-sm transition-all ${
                          projectTitle.trim() !== "" 
                            ? "bg-white text-black hover:bg-neon-blue hover:box-glow" 
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        }`}
                      >
                        Next <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: DESCRIPTION */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full justify-center"
                  >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
                      Give a detailed description
                    </h2>
                    
                    <div className="relative max-w-3xl mx-auto w-full">
                      <textarea
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Tell us about the features, goals, and vision of your project..."
                        className="w-full h-48 bg-white/5 border border-white/20 rounded-2xl text-white text-xl p-6 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-colors resize-none placeholder:text-white/30"
                        autoFocus
                      />
                    </div>

                    <div className="flex justify-between items-center mt-12">
                      <button
                        onClick={() => setStep(2)}
                        className="text-white/50 hover:text-white font-bold uppercase tracking-widest text-sm transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        disabled={projectDescription.trim() === ""}
                        className={`px-8 py-3 rounded-full flex items-center gap-2 font-bold uppercase tracking-widest text-sm transition-all ${
                          projectDescription.trim() !== "" 
                            ? "bg-neon-blue text-black box-glow hover:bg-white" 
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        }`}
                      >
                        Submit Project <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                      className="text-neon-cyan mb-8"
                    >
                      <CheckCircle2 size={80} strokeWidth={1} />
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                      Project Received!
                    </h2>
                    <p className="text-xl text-white/60 max-w-lg mb-12">
                      We've captured your idea for <strong className="text-neon-blue font-bold">{projectTitle}</strong>. Our team will prepare the initial concepts.
                    </p>

                    <button
                      onClick={handleClose}
                      className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-neon-blue hover:box-glow transition-all"
                    >
                      Return to Site
                    </button>
                  </motion.div>
                )}
                
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
