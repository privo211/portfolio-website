"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { AnimatedBackground } from "@/components/animated-background";
import {
  ArrowUp,
  Mail,
  Download,
  MapPin,
  Code2,
  Layers,
  Box,
  Briefcase,
  GraduationCap,
  Quote,
  Star,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { experiences } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { education } from "@/data/education";
import { honors } from "@/data/honors";
import { testimonials } from "@/data/testimonials";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [expandedTech, setExpandedTech] = useState<Record<string, boolean>>({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setModalOpen(false); setSelectedProject(null); }
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  return (
    <div
      ref={containerRef}
      className="relative bg-background text-foreground selection:bg-purple-500/30"
    >
      {/* ─── FIXED NAVIGATION ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference text-white">
        <div className="text-2xl font-light tracking-tighter hover:opacity-70 transition-opacity cursor-pointer">
          PV
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-tight">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:opacity-60 transition-opacity duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-12 px-6 md:px-12 overflow-hidden">
        <AnimatedBackground />

        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-foreground/[0.03] to-transparent blur-3xl animate-float" />
          <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-foreground/[0.02] to-transparent blur-3xl animate-float-delayed" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <div className="flex justify-end mb-8 md:mb-12">
            <p className="hidden md:block max-w-sm text-sm leading-relaxed text-muted-foreground text-right">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="text-[10vw] md:text-[8vw] leading-[0.85] font-light tracking-[-0.04em] text-foreground mb-4"
          >
            {SITE_CONFIG.name.toUpperCase()}
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 font-light tracking-wide"
          >
            {SITE_CONFIG.role}
          </motion.p>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <GlassButton
                size="lg"
                contentClassName="flex items-center gap-3"
                className="group"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <a href="/Priyanshu%20Vora.pdf" download="Priyanshu_Vora_Resume.pdf">
                  Download Resume
                </a>
              </GlassButton>

              <GlassButton
                size="lg"
                contentClassName="flex items-center gap-3"
                className="group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <a href={`mailto:${SITE_CONFIG.email}`} target="_blank" rel="noopener noreferrer">Get In Touch</a>
              </GlassButton>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground/60">
              <a
                href="https://github.com/privo211"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-foreground transition-colors cursor-pointer"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/priyanshuvora/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-foreground transition-colors cursor-pointer"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 hover:text-foreground transition-colors cursor-pointer" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground/60">
            <MapPin size={14} />
            <span>{SITE_CONFIG.location}</span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              Open to full-time roles
            </span>
          </div>

          <div className="mt-12 h-1.5 w-full bg-gradient-to-r from-cyan-500 via-emerald-500 via-yellow-500 to-orange-500 rounded-full" />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative bg-[#f3ede1] text-[#1a1a1a] py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-light tracking-tighter mb-16 md:mb-24"
          >
            About
          </motion.h2>

          <div className="flex flex-col md:flex-row items-start gap-10">
            <div className="shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/data/Priyanshu_Profile.png"
                  alt="Priyanshu Vora, software engineer"
                  className="w-44 h-44 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover grayscale contrast-125 rounded-2xl ring-1 ring-foreground/20"
                />
              </motion.div>
            </div>
            <div className="grid md:grid-cols-3 gap-12 md:gap-16 flex-1">
            {[
              {
                title: "AI-First Engineering",
                text: "Building AI-powered automation that eliminates bottlenecks and saves thousands of hours. From OCR invoice processing to intelligent document pipelines, I engineer systems that transform manual workflows into scalable, self-running operations.",
              },
              {
                title: "Forward Deployed Mindset",
                text: "Embedding into teams to understand pain points firsthand, then solving across organizational boundaries. I bridge the gap between business needs and technical execution, whether at Stokes Seeds or the Ontario government.",
              },
              {
                title: "Production Impact",
                text: "Shipping to production, not just prototypes. Real metrics, real systems — 87% faster invoice processing, 94% error reduction across 30+ ERP extensions, and CI/CD pipelines deployed to government infrastructure.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70 max-w-sm">
                  {item.text}
                </p>
              </motion.div>
            ))}
              </div>
            </div>
          </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="relative bg-background py-24 md:py-32 px-6 md:px-12 border-t border-foreground/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-light tracking-tighter mb-16"
          >
            Experience
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-foreground/10 hidden md:block" />

            <div className="flex flex-col gap-16">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative md:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-7 top-1.5 w-2.5 h-2.5 rounded-full bg-foreground/20 border border-foreground/40" />

                  <div className="rounded-2xl bg-foreground/5 border border-foreground/10 p-6 md:p-8 hover:border-foreground/25 transition-colors duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-medium tracking-tight">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase className="w-3.5 h-3.5 text-muted-foreground/60" />
                          <span className="text-sm text-muted-foreground">
                            {exp.company}
                          </span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-sm text-muted-foreground/60">
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground/60 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {exp.description.map((bullet, bi) => (
                        <li key={bi} className="text-sm leading-relaxed text-muted-foreground/80 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-foreground/20">
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] px-2 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORK ─── */}
      <section id="work" className="relative bg-background py-24 md:py-32 px-6 md:px-12 border-t border-foreground/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-light tracking-tighter mb-16"
          >
            Work
          </motion.h2>
        </div>

        <div className="px-6 md:px-12 mt-16 max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                onClick={() => { setSelectedProject(project); setCarouselIndex(0); setModalOpen(true); }}
                className="rounded-2xl bg-foreground/5 border border-foreground/10 overflow-hidden flex flex-col group hover:border-foreground/25 transition-colors duration-300 cursor-pointer"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-medium tracking-tight mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground/80 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[11px] px-2 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[11px] px-2 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-muted-foreground/60">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto pt-3 border-t border-foreground/5 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground/60">See Details</span>
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-foreground transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-foreground transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                      )}
                      {project.youtubeEmbed && (
                        <span className="text-muted-foreground/60">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {modalOpen && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setModalOpen(false); setSelectedProject(null); }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-foreground/10 shadow-2xl"
              >
                <button
                  onClick={() => { setModalOpen(false); setSelectedProject(null); }}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-foreground/10 border border-foreground/20 flex items-center justify-center hover:bg-foreground/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Carousel */}
                {(selectedProject.gallery && selectedProject.gallery.length > 0) ? (
                  <div className="relative w-full aspect-video bg-black/40 overflow-hidden">
                    <img
                      src={selectedProject.gallery[carouselIndex]}
                      alt={`${selectedProject.title} screenshot ${carouselIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                    {selectedProject.gallery.length > 1 && (
                      <>
                        <button
                          onClick={() => setCarouselIndex((prev) => prev === 0 ? selectedProject.gallery!.length - 1 : prev - 1)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={() => setCarouselIndex((prev) => prev === selectedProject.gallery!.length - 1 ? 0 : prev + 1)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProject.gallery.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCarouselIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-colors ${idx === carouselIndex ? "bg-white" : "bg-white/40"}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : selectedProject.image ? (
                  <div className="relative w-full aspect-video bg-black/40 overflow-hidden">
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain" />
                  </div>
                ) : null}

                <div className="p-6 md:p-10 space-y-6">
                  <div>
                    <h2 className="text-3xl font-light tracking-tighter mb-2">{selectedProject.title}</h2>
                    <p className="text-muted-foreground">{selectedProject.subtitle}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground/90">{selectedProject.description}</p>

                  {selectedProject.highlights.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Highlights</h3>
                      <ul className="space-y-2">
                        {selectedProject.highlights.map((h, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground/80 flex gap-2">
                            <span className="text-foreground/30 mt-1.5 shrink-0">&#x2022;</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProject.id === "invoice-ocr" && (
                    <>
                      {selectedProject.architecture && selectedProject.architecture.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Architecture</h3>
                          <ul className="space-y-1.5">
                            {selectedProject.architecture.map((a, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground/80 flex gap-2">
                                <span className="text-foreground/30 mt-1.5 shrink-0">&#x2022;</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedProject.pipeline && selectedProject.pipeline.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Pipeline</h3>
                          <ul className="space-y-1.5">
                            {selectedProject.pipeline.map((p, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground/80 flex gap-2">
                                <span className="text-foreground/30 mt-1.5 shrink-0">&#x2022;</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedProject.outcomes && selectedProject.outcomes.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Outcomes</h3>
                          <ul className="space-y-1.5">
                            {selectedProject.outcomes.map((o, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground/80 flex gap-2">
                                <span className="text-foreground/30 mt-1.5 shrink-0">&#x2022;</span>
                                <span>{o}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                  {selectedProject.youtubeEmbed && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Demo</h3>
                      <div className="aspect-video rounded-xl overflow-hidden bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${selectedProject.youtubeEmbed}`}
                          title={`${selectedProject.title} demo`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 text-sm hover:bg-foreground/10 hover:border-foreground/30 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        GitHub
                      </a>
                    )}
                    {selectedProject.live && (
                      <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 text-sm hover:bg-foreground/10 hover:border-foreground/30 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Live Demo
                      </a>
                    )}
                    {selectedProject.youtubeEmbed && (
                      <a href={`https://www.youtube.com/watch?v=${selectedProject.youtubeEmbed}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 text-sm hover:bg-foreground/10 hover:border-foreground/30 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                        Watch Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="relative bg-background py-24 md:py-32 px-6 md:px-12 border-t border-foreground/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-light tracking-tighter mb-16"
          >
            Skills
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-md text-sm text-muted-foreground mb-12 leading-relaxed"
          >
            Rare combination of enterprise ERP expertise (Dynamics 365
            Business Central / AL), AI engineering (Azure AI / Python), and
            modern full-stack development (Next.js / TypeScript).
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
                title: "Backend & Automation",
                icon: <Code2 className="w-6 h-6" />,
              },
              {
                src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
                title: "AI & Enterprise Systems",
                icon: <Layers className="w-6 h-6" />,
              },
              {
                src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
                title: "Full-Stack Engineering",
                icon: <Box className="w-6 h-6" />,
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-foreground/5 border border-foreground/10 cursor-pointer"
              >
                <img
                  src={service.src}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center gap-3">
                  <div className="text-white/80">{service.icon}</div>
                  <h3 className="text-white font-medium tracking-tight">
                    {service.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skill Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skillCategories.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-foreground/5 border border-foreground/10 p-5"
              >
                <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                  {category.name}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`text-[11px] px-2 py-0.5 rounded-md border ${
                        skill.level === "expert"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : skill.level === "proficient"
                          ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                          : "bg-foreground/5 border-foreground/10 text-muted-foreground"
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section id="education" className="relative bg-background py-24 md:py-32 px-6 md:px-12 border-t border-foreground/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-light tracking-tighter mb-16"
          >
            Education
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-foreground/5 border border-foreground/10 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium tracking-tight">
                    {education.school}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {education.location}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-light tracking-tight mb-1">
                  {education.degree}
                </h4>
                <p className="text-sm text-muted-foreground/60">
                  {education.period}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>GPA: {education.gpa}</span>
                </div>
                {education.honors.map((honor, hi) => (
                  <div
                    key={hi}
                    className="flex items-center gap-2 text-sm bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-lg"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{honor}</span>
                  </div>
                ))}
              </div>

              <div>
                <h5 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                  Relevant Coursework
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.map((course) => (
                    <span
                      key={course}
                      className="text-[11px] px-2 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-muted-foreground"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Honors Card */}
            <div className="flex flex-col gap-4">
              {honors.map((honor, i) => (
                <motion.div
                  key={honor.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  className={`rounded-2xl bg-foreground/5 border p-6 md:p-8 ${
                    honor.tier === "platinum"
                      ? "border-cyan-500/30"
                      : honor.tier === "gold"
                      ? "border-amber-500/30"
                      : "border-foreground/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Star
                      className={`w-4 h-4 fill-current ${
                        honor.tier === "platinum"
                          ? "text-cyan-400"
                          : honor.tier === "gold"
                          ? "text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                    <h4 className="text-lg font-medium tracking-tight">
                      {honor.title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {honor.issuer}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mb-3">
                    {honor.date}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground/80">
                    {honor.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="relative bg-background py-24 md:py-32 px-6 md:px-12 border-t border-foreground/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-light tracking-tighter mb-16"
          >
            Testimonials
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => {
              const isFeatured = t.featured;

              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`rounded-2xl border p-6 md:p-8 flex flex-col ${
                    isFeatured
                      ? "md:col-span-2 bg-emerald-500/5 border-emerald-500/20"
                      : "bg-foreground/5 border-foreground/10"
                  }`}
                >
                  <Quote
                    className={`w-6 h-6 mb-4 ${
                      isFeatured ? "text-emerald-400" : "text-muted-foreground/30"
                    }`}
                  />

                  <blockquote
                    className={`text-sm leading-relaxed mb-6 flex-1 ${
                      isFeatured
                        ? "text-foreground/90 md:text-base"
                        : "text-muted-foreground/80"
                    }`}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium tracking-tight">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground/60">
                        {t.role}, {t.company}
                      </p>
                    </div>
                    {t.rating && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
                        <Star
                          className={`w-3 h-3 fill-current ${
                            isFeatured ? "text-emerald-400" : "text-amber-400"
                          }`}
                        />
                        <span>{t.rating}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTACT / FOOTER ─── */}
      <section id="contact" className="relative min-h-[80vh] flex flex-col justify-end pb-12 px-6 md:px-12 bg-background overflow-hidden">
        <AnimatedBackground />

        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-foreground/[0.02] to-transparent blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-[8vw] md:text-[6vw] leading-[0.85] font-light tracking-[-0.04em] text-foreground mb-12 md:mb-16"
          >
            LET&apos;S WORK
          </motion.h2>

          <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-emerald-500 via-yellow-500 to-orange-500 rounded-full mb-12 md:mb-16" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="text-3xl font-light tracking-tighter text-foreground/80">
              PV
            </div>

            <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <GlassButton
              size="lg"
              contentClassName="flex items-center gap-3"
              className="group"
              onClick={() => (window.location.href = `mailto:${SITE_CONFIG.email}`)}
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{SITE_CONFIG.email}</span>
            </GlassButton>
          </div>

          <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60">
            <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="https://github.com/privo211"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted-foreground transition-colors cursor-pointer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/priyanshuvora/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted-foreground transition-colors cursor-pointer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCROLL TO TOP ─── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-foreground/10 border border-foreground/20 hover:bg-foreground/20 backdrop-blur-sm w-12 h-12 flex items-center justify-center transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
