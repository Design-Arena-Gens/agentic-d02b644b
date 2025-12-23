'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ServicesSectionProps {
  onServiceHover: (color: string | null) => void
}

const services = [
  {
    title: 'Social Media Handling',
    description: 'Strategic content creation and community management that builds authentic connections.',
    icon: '📱',
    color: '#ff3300',
    keywords: ['Content Strategy', 'Community Growth', 'Engagement']
  },
  {
    title: 'Brand Shoots',
    description: 'Cinematic brand photography and videography that tells your unique story.',
    icon: '📸',
    color: '#d97d54',
    keywords: ['Product Photography', 'Lifestyle Shoots', 'Commercial']
  },
  {
    title: 'Web Design',
    description: 'Stunning, conversion-focused websites built with cutting-edge technology.',
    icon: '💻',
    color: '#a89085',
    keywords: ['UI/UX Design', 'Development', 'E-commerce']
  },
  {
    title: 'End-to-End Process',
    description: 'Complete digital transformation from strategy to execution and beyond.',
    icon: '🚀',
    color: '#ff3300',
    keywords: ['SEO', 'Digital Marketing', 'Analytics']
  }
]

export default function ServicesSection({ onServiceHover }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    
    if (!section || !container) return
    
    const ctx = gsap.context(() => {
      // Calculate the scroll distance
      const scrollWidth = container.scrollWidth - window.innerWidth
      
      // Horizontal scroll on vertical movement
      gsap.to(container, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      })
      
      // Animate cards as they come into view
      gsap.utils.toArray('.service-card').forEach((card: any, i) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById('horizontalScroll') as any,
              start: 'left 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section 
      ref={sectionRef}
      className="section relative overflow-hidden bg-coffee"
      id="services"
    >
      {/* Section header */}
      <div className="absolute top-10 left-10 z-10">
        <span className="font-mono text-taupe text-sm tracking-widest">01</span>
        <h2 className="kinetic-text text-4xl md:text-5xl text-bone mt-2">SERVICES</h2>
      </div>
      
      {/* Horizontal scrolling container */}
      <div 
        ref={containerRef}
        className="horizontal-scroll-container h-screen items-center pl-20 md:pl-40"
        style={{ width: 'fit-content' }}
      >
        {/* Intro text */}
        <div className="flex-shrink-0 w-screen h-full flex items-center">
          <div className="max-w-xl px-10">
            <h3 className="kinetic-text text-3xl md:text-4xl text-bone mb-6">
              What We <span className="text-electric-orange">Create</span>
            </h3>
            <p className="font-mono text-taupe text-sm leading-relaxed">
              From social media dominance to cinematic brand stories, 
              we craft digital experiences that make your brand impossible to ignore.
            </p>
          </div>
        </div>
        
        {/* Service cards */}
        {services.map((service, index) => (
          <div 
            key={index}
            className="service-card flex-shrink-0 w-[400px] h-[500px] mx-8 glass-card p-8 flex flex-col justify-between cursor-pointer transition-all duration-500"
            onMouseEnter={() => onServiceHover(service.color)}
            onMouseLeave={() => onServiceHover(null)}
          >
            <div>
              <span className="text-5xl mb-6 block">{service.icon}</span>
              <span className="font-mono text-taupe text-xs tracking-widest">0{index + 1}</span>
              <h4 
                className="kinetic-text text-2xl text-bone mt-2 mb-4"
                style={{ color: service.color }}
              >
                {service.title}
              </h4>
              <p className="font-mono text-taupe text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {service.keywords.map((keyword, i) => (
                <span 
                  key={i}
                  className="font-mono text-xs px-3 py-1 rounded-full border border-taupe/30 text-taupe"
                >
                  {keyword}
                </span>
              ))}
            </div>
            
            {/* Hover indicator */}
            <div className="mt-6 flex items-center gap-2 group">
              <span className="font-mono text-xs text-bone/50 group-hover:text-electric-orange transition-colors">
                LEARN MORE
              </span>
              <svg 
                className="w-4 h-4 text-bone/50 group-hover:text-electric-orange group-hover:translate-x-2 transition-all" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
        
        {/* End spacer */}
        <div className="flex-shrink-0 w-[200px]" />
      </div>
    </section>
  )
}
