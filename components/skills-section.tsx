"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Database, Globe, Layout, Server, Cpu, Cloud, Terminal, GitBranch, Layers } from "lucide-react"

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("frontend")

  const categories = [
    { id: "frontend", label: "Frontend", icon: Layout },
    { id: "backend", label: "Backend", icon: Server },
    { id: "database", label: "Database", icon: Database },
    { id: "devops", label: "DevOps", icon: Cloud },
  ]

  const skills = {
    frontend: [
      { name: "React", icon: Code, level: 90 },
      { name: "TypeScript", icon: Code, level: 80 },
      { name: "Tailwind CSS", icon: Layout, level: 90 },
      { name: "Framer Motion", icon: Layers, level: 75 },
      { name: "Three.js", icon: Layers, level: 70 },
    ],
    backend: [
      { name: "Node.js", icon: Server, level: 85 },
      { name: "Express", icon: Server, level: 80 },
      { name: "GraphQL", icon: Code, level: 75 },
      { name: "REST APIs", icon: Globe, level: 90 },
      { name: "Serverless", icon: Cloud, level: 80 },
    ],
    database: [
      { name: "PostgreSQL", icon: Database, level: 85 },
      { name: "MongoDB", icon: Database, level: 80 },
      { name: "Supabase", icon: Database, level: 75 },
      { name: "Prisma", icon: Database, level: 85 },
      { name: "Redis", icon: Database, level: 70 },
    ],
    devops: [
      { name: "Git", icon: GitBranch, level: 90 },
      { name: "Docker", icon: Cpu, level: 75 },
      { name: "CI/CD", icon: Terminal, level: 80 },
      { name: "Vercel", icon: Cloud, level: 90 },
      { name: "AWS", icon: Cloud, level: 70 },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
                activeCategory === category.id
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800 text-zinc-300 hover:bg-slate-700"
              }`}
            >
              <Icon size={18} />
              <span>{category.label}</span>
            </motion.button>
          )
        })}
      </div>

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {skills[activeCategory as keyof typeof skills].map((skill, index) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-medium">{skill.name}</h3>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="bg-gradient-to-r from-purple-600 to-indigo-400 h-2.5 rounded-full"
                />
              </div>
              <div className="mt-2 text-right text-sm text-zinc-400">{skill.level}%</div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
