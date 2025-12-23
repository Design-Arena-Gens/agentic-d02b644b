'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface HeroSectionProps {
  mousePosition: { x: number; y: number }
}

export default function HeroSection({ mousePosition }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate letters on load
      gsap.fromTo('.hero-letter', 
        { 
          y: 100, 
          opacity: 0,
          rotateX: -90
        },
        { 
          y: 0, 
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          delay: 0.3
        }
      )
      
      // Animate subtitle
      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: 'power3.out' }
      )
      
      // Animate scroll indicator
      gsap.fromTo('.scroll-indicator',
        { y: 0, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.8, ease: 'power3.out' }
      )
      
      // Pulsing scroll indicator
      gsap.to('.scroll-dot', {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])
  
  // Kinetic text effect based on mouse
  useEffect(() => {
    if (!textRef.current) return
    
    const letters = textRef.current.querySelectorAll('.hero-letter')
    letters.forEach((letter, i) => {
      const offsetX = mousePosition.x * 20 * (i % 2 === 0 ? 1 : -1)
      const offsetY = mousePosition.y * 10 * (i % 2 === 0 ? -1 : 1)
      gsap.to(letter, {
        x: offsetX,
        y: offsetY,
        duration: 0.5,
        ease: 'power2.out'
      })
    })
  }, [mousePosition])
  
  const heroText = "BE FOUND."
  
  return (
    <section 
      ref={containerRef}
      className="section min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      id="hero"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee via-coffee to-transparent opacity-80" />
      
      {/* Main headline */}
      <div className="relative z-20 text-center px-4">
        <h1 
          ref={textRef}
          className="kinetic-text text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none mb-4 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {heroText.split('').map((char, i) => (
            <span 
              key={i} 
              className={`hero-letter inline-block ${char === ' ' ? 'mx-4' : ''} ${char === 'V' ? 'text-electric-orange glow' : 'text-bone'}`}
              style={{ 
                display: 'inline-block',
                transformStyle: 'preserve-3d'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-mono text-taupe text-sm md:text-base max-w-xl mx-auto tracking-wider"
        >
          PREMIUM DIGITAL MARKETING & CINEMATIC PRODUCTION
        </p>
        
        <p className="font-mono text-bone/50 text-xs mt-4 tracking-widest">
          BANGALORE • CINEMATIC BRANDING • CONTENT STRATEGY
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-taupe text-xs tracking-widest">SCROLL TO EXPLORE</span>
        <div className="w-6 h-10 border-2 border-taupe rounded-full flex justify-center pt-2">
          <div className="scroll-dot w-1.5 h-1.5 bg-electric-orange rounded-full" />
        </div>
      </div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-taupe/30" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-taupe/30" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-taupe/30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-taupe/30" />
    </section>
  )
}
