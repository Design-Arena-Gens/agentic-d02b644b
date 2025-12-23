'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import ProductionSection from '@/components/ProductionSection'
import StrategySection from '@/components/StrategySection'
import FooterSection from '@/components/FooterSection'

// Dynamically import Scene3D to avoid SSR issues with Three.js
const Scene3D = dynamic(() => import('@/components/Scene3D'), { 
  ssr: false,
  loading: () => <div className="canvas-container" />
})

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState(0)
  const [serviceHoverColor, setServiceHoverColor] = useState<string | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })
    
    lenisRef.current = lenis
    
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
    
    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)
    
    // Make ScrollTrigger work with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0)
    
    return () => {
      lenis.destroy()
    }
  }, [])
  
  // Track scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollY / docHeight
      setScrollProgress(progress)
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section')
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index)
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Track mouse position for kinetic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])
  
  // Handle service hover for 3D element color change
  const handleServiceHover = useCallback((color: string | null) => {
    setServiceHoverColor(color || undefined)
  }, [])
  
  // Handle CTA click - trigger 3D explosion
  const handleCTAClick = useCallback(() => {
    // The 3D explosion is handled in the VoxelLens component
    console.log('CTA clicked - triggering explosion animation')
  }, [])
  
  return (
    <main ref={mainRef} className="relative">
      {/* Loading screen */}
      <div 
        className={`fixed inset-0 bg-coffee z-50 flex items-center justify-center transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center">
          <div className="kinetic-text text-4xl text-bone mb-4">
            BE FOUND<span className="text-electric-orange">.</span>
          </div>
          <div className="w-48 h-1 bg-taupe/20 rounded-full overflow-hidden">
            <div className="h-full bg-electric-orange rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
      
      {/* 3D Scene - persists across all sections */}
      <Scene3D 
        scrollProgress={scrollProgress}
        mousePosition={mousePosition}
        activeSection={activeSection}
        serviceHoverColor={serviceHoverColor}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex items-center justify-between mix-blend-difference">
        <div className="kinetic-text text-xl text-bone">
          BE FOUND<span className="text-electric-orange">.</span> V
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Production', 'Process', 'Contact'].map((item, i) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-mono text-xs tracking-wider transition-colors ${
                activeSection === i + 1 ? 'text-electric-orange' : 'text-bone/70 hover:text-bone'
              }`}
            >
              {item.toUpperCase()}
            </a>
          ))}
        </div>
        <button className="font-mono text-xs text-bone border border-bone/30 px-4 py-2 rounded-full hover:border-electric-orange hover:text-electric-orange transition-colors">
          GET IN TOUCH
        </button>
      </nav>
      
      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === i 
                ? 'bg-electric-orange scale-150' 
                : 'bg-taupe/30 hover:bg-taupe/50'
            }`}
          />
        ))}
      </div>
      
      {/* Sections */}
      <HeroSection mousePosition={mousePosition} />
      <ServicesSection onServiceHover={handleServiceHover} />
      <ProductionSection />
      <StrategySection />
      <FooterSection onCTAClick={handleCTAClick} />
    </main>
  )
}
