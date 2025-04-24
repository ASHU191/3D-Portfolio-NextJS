"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  github: string
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 transform perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          z: isHovered ? 10 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="aspect-video overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-300 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-slate-700/50 text-purple-300 border-slate-600">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700" asChild>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button variant="outline" size="sm" className="border-slate-600 text-zinc-300 hover:bg-slate-700" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Code
              </a>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* 3D shadow effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          transform: "translateZ(-10px)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  )
}
