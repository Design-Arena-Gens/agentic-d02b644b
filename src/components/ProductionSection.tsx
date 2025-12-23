'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProductionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const flashlightRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePos({ x, y })
    }
    
    section.addEventListener('mousemove', handleMouseMove)
    
    const ctx = gsap.context(() => {
      // Fade in elements on scroll
      gsap.fromTo('.production-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      gsap.fromTo('.production-item',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.production-list',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)
    
    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      ctx.revert()
    }
  }, [])
  
  const productionServices = [
    { title: 'Videography', desc: 'Cinematic video production for brands' },
    { title: 'Editing', desc: 'Post-production that tells your story' },
    { title: 'Cinematography', desc: 'Visual storytelling at its finest' },
    { title: 'Motion Graphics', desc: 'Dynamic animations and effects' }
  ]
  
  return (
    <section 
      ref={sectionRef}
      className="section min-h-screen relative overflow-hidden bg-coffee"
      id="production"
    >
      {/* Video background with grayscale */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Placeholder gradient for video - in production this would be a video */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-coffee via-[#1a0a08] to-coffee"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, 
                rgba(255, 51, 0, 0.15) 0%, 
                rgba(43, 15, 11, 0) 50%),
              linear-gradient(135deg, #2b0f0b 0%, #1a0a08 50%, #2b0f0b 100%)
            `
          }}
        />
        
        {/* Animated film grain effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      
      {/* Flashlight reveal effect */}
      <div 
        ref={flashlightRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, 
            rgba(255, 51, 0, 0.3) 0%, 
            rgba(217, 125, 84, 0.1) 30%,
            transparent 70%)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-10 md:px-20 py-20">
          {/* Section header */}
          <div className="mb-16">
            <span className="font-mono text-taupe text-sm tracking-widest">02</span>
            <h2 className="production-title kinetic-text text-5xl md:text-7xl text-bone mt-2">
              PRODUCTION
            </h2>
            <p className="production-title font-mono text-taupe text-sm mt-4 max-w-xl">
              Our filmmaking roots run deep. We bring cinematic quality to every project, 
              turning your brand story into visual poetry.
            </p>
          </div>
          
          {/* Production services grid */}
          <div className="production-list grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {productionServices.map((service, index) => (
              <div 
                key={index}
                className="production-item group flex items-start gap-6 p-6 border border-taupe/20 rounded-lg hover:border-electric-orange/50 transition-all duration-500"
              >
                <span className="font-mono text-electric-orange text-4xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="kinetic-text text-2xl text-bone group-hover:text-electric-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-mono text-taupe text-sm mt-2">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Film strip decoration */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="w-20 h-96 border-2 border-taupe/20 rounded-lg flex flex-col gap-4 p-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-1 bg-taupe/10 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coffee to-transparent" />
    </section>
  )
}
