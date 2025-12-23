'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FooterSectionProps {
  onCTAClick: () => void
}

export default function FooterSection({ onCTAClick }: FooterSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isExploding, setIsExploding] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  
  // Magnetic button effect
  useEffect(() => {
    const button = buttonRef.current
    if (!button) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
    
    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }
    
    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  // Scroll animations
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-title',
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
      
      gsap.fromTo('.footer-cta',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])
  
  const handleClick = () => {
    setIsExploding(true)
    
    // Create confetti particles
    const colors = ['#ff3300', '#d97d54', '#a89085', '#f2e8d5']
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setParticles(newParticles)
    
    // Call parent handler
    onCTAClick()
    
    // Reset after animation
    setTimeout(() => {
      setIsExploding(false)
      setParticles([])
    }, 1500)
  }
  
  return (
    <section 
      ref={sectionRef}
      className="section min-h-screen relative bg-coffee flex items-center justify-center overflow-hidden"
      id="contact"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a08] via-coffee to-coffee" />
      
      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-taupe/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: '10%',
              right: '10%',
              transform: `rotate(${i * 2 - 4}deg)`
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <span className="font-mono text-taupe text-sm tracking-widest">04</span>
        
        <h2 className="footer-title kinetic-text text-5xl md:text-7xl lg:text-8xl text-bone mt-4 mb-8">
          Ready to be <span className="text-electric-orange">seen</span>?
        </h2>
        
        <p className="footer-title font-mono text-taupe text-sm max-w-xl mx-auto mb-12">
          Let&apos;s create something extraordinary together. Your brand deserves 
          to stand out in the digital landscape.
        </p>
        
        {/* Magnetic CTA Button */}
        <div className="footer-cta relative inline-block">
          <button
            ref={buttonRef}
            onClick={handleClick}
            className="magnetic-btn relative px-16 py-6 rounded-full border-2 border-electric-orange text-bone font-mono text-lg tracking-wider overflow-hidden group"
          >
            <span className="relative z-10 group-hover:text-coffee transition-colors duration-300">
              START PROJECT
            </span>
          </button>
          
          {/* Confetti particles */}
          {isExploding && (
            <div className="absolute top-1/2 left-1/2 pointer-events-none">
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="confetti-particle"
                  style={{
                    backgroundColor: particle.color,
                    transform: `translate(${particle.x}px, ${particle.y}px)`,
                    animationDelay: `${Math.random() * 0.3}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Contact info */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <a href="mailto:hello@befoundv.com" className="font-mono text-taupe text-sm hover:text-electric-orange transition-colors">
            hello@befoundv.com
          </a>
          <a href="tel:+919876543210" className="font-mono text-taupe text-sm hover:text-electric-orange transition-colors">
            +91 98765 43210
          </a>
          <span className="font-mono text-taupe text-sm">
            Bangalore, India
          </span>
        </div>
        
        {/* Social links */}
        <div className="mt-12 flex items-center justify-center gap-6">
          {['Instagram', 'LinkedIn', 'Behance', 'YouTube'].map((social) => (
            <a 
              key={social}
              href="#"
              className="font-mono text-xs text-taupe hover:text-electric-orange transition-colors tracking-wider"
            >
              {social.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
      
      {/* Footer bottom */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="font-mono text-taupe/50 text-xs">
          © 2024 Be Found. V — All rights reserved
        </p>
        <p className="font-mono text-taupe/30 text-xs mt-2">
          Digital Marketing Agency Bangalore • Cinematic Branding • SEO • Video Production
        </p>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-taupe/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-taupe/20" />
    </section>
  )
}
