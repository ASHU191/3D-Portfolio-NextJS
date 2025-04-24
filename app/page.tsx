"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Code, Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Scene from "@/components/scene"
import ProjectCard from "@/components/project-card"
import SkillsSection from "@/components/skills-section"
import ContactForm from "@/components/contact-form"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const sectionsRef = useRef<Record<string, HTMLDivElement | null>>({
    home: null,
    about: null,
    skills: null,
    projects: null,
    contact: null,
  })

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Stripe, and Supabase",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "TypeScript", "Supabase", "Stripe"],
      link: "#",
      github: "#",
    },
    {
      title: "AI Content Generator",
      description: "An AI-powered content generation tool using OpenAI's API",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Node.js", "OpenAI", "MongoDB"],
      link: "#",
      github: "#",
    },
    {
      title: "Real-time Chat Application",
      description: "A real-time messaging platform with WebSockets and authentication",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Socket.io", "Prisma", "PostgreSQL"],
      link: "#",
      github: "#",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      Object.entries(sectionsRef.current).forEach(([section, ref]) => {
        if (!ref) return

        const { offsetTop, offsetHeight } = ref
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (section: string) => {
    setMobileMenuOpen(false)
    sectionsRef.current[section]?.scrollIntoView({ behavior: "smooth" })
  }

  const navItems = [
    { name: "Home", section: "home" },
    { name: "About", section: "about" },
    { name: "Skills", section: "skills" },
    { name: "Projects", section: "projects" },
    { name: "Contact", section: "contact" },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            <span className="text-purple-400">Dev</span>Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="hidden md:flex space-x-8"
          >
            {navItems.map((item) => (
              <motion.li key={item.section} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => scrollToSection(item.section)}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    activeSection === item.section ? "text-purple-400" : "text-zinc-400 hover:text-white",
                  )}
                >
                  {item.name}
                </button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-900/95 pt-20"
          >
            <div className="container mx-auto px-4">
              <ul className="flex flex-col space-y-6 items-center">
                {navItems.map((item) => (
                  <motion.li
                    key={item.section}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <button
                      onClick={() => scrollToSection(item.section)}
                      className={cn(
                        "text-xl font-medium w-full py-2 transition-colors",
                        activeSection === item.section ? "text-purple-400" : "text-zinc-400 hover:text-white",
                      )}
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        ref={(el) => (sectionsRef.current.home = el)}
        className="h-screen relative flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <color attach="background" args={["#0a0a16"]} />
            <PresentationControls
              global
              rotation={[0.13, 0.1, 0]}
              polar={[-0.4, 0.2]}
              azimuth={[-1, 0.75]}
              config={{ mass: 2, tension: 400 }}
              snap={{ mass: 4, tension: 400 }}
            >
              <Float rotationIntensity={0.4}>
                <Scene />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={4} />
              </Float>
            </PresentationControls>
            <Environment preset="city" />
          </Canvas>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="text-purple-400">Full Stack</span> Developer
              </h1>
              <p className="text-xl md:text-2xl text-zinc-300 mb-8">
                Building modern web experiences with cutting-edge technologies
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  size="lg"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  size="lg"
                >
                  Contact Me
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={(el) => (sectionsRef.current.about = el)} className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              About <span className="text-purple-400">Me</span>
            </h2>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-slate-700/50">
              <p className="text-lg text-zinc-300 mb-6">
                I'm a passionate Full Stack Developer specializing in building exceptional digital experiences. With a
                strong foundation in both frontend and backend technologies, I create scalable, performant, and
                user-friendly applications.
              </p>
              <p className="text-lg text-zinc-300 mb-6">
                My expertise includes modern JavaScript frameworks like React, along with backend technologies such as
                Node.js, Express, and various database systems. I'm committed to writing clean, maintainable code and
                staying current with the latest industry trends.
              </p>
              <p className="text-lg text-zinc-300">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={(el) => (sectionsRef.current.skills = el)} className="py-20 bg-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              My <span className="text-purple-400">Skills</span>
            </h2>
            <SkillsSection />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={(el) => (sectionsRef.current.projects = el)} className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Featured <span className="text-purple-400">Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={(el) => (sectionsRef.current.contact = el)} className="py-20 bg-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Get In <span className="text-purple-400">Touch</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <ContactForm />
              <div className="mt-12 flex justify-center space-x-6">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-slate-800 p-3 rounded-full text-purple-400 hover:bg-slate-700 transition-colors"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-slate-800 p-3 rounded-full text-purple-400 hover:bg-slate-700 transition-colors"
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="mailto:contact@example.com"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-slate-800 p-3 rounded-full text-purple-400 hover:bg-slate-700 transition-colors"
                >
                  <Mail size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-slate-800 p-3 rounded-full text-purple-400 hover:bg-slate-700 transition-colors"
                >
                  <Code size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-zinc-500 text-center">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} | Full Stack Developer Portfolio</p>
          <p className="text-sm mt-2">Built with React, Three.js, and Framer Motion</p>
        </div>
      </footer>
    </main>
  )
}
