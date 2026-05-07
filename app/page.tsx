"use client";

import { CustomCursor } from "@/components/ui/cursor";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/layout/preloader";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Honors } from "@/components/sections/honors";
import { Testimonials } from "@/components/sections/testimonials";
import { Skills } from "@/components/sections/skills";
import { ResumeViewer } from "@/components/sections/resume-viewer";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Honors />
        <Testimonials />
        <Skills />
        <ResumeViewer />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
