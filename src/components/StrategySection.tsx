'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timelineSteps = [
  {
    phase: 'Discovery',
    month: 'Month 1-2',
    title: 'Research & Strategy',
    description: 'Deep dive into your brand, audience, and market positioning.',
    items: ['Brand Audit', 'Competitor Analysis', 'Target Audience Research', 'Content Strategy']
  },
  {
    phase: 'Foundation',
    month: 'Month 2-3',
    title: 'Content Creation',
    description: 'Building your visual and content library.',
    items: ['Brand Shoots', 'Video Production', 'Social Templates', 'Website Design']
  },
  {
    phase: 'Launch',
    month: 'Month 3-4',
    title: 'Implementation',
    description: 'Rolling out your digital presence across all channels.',
    items: ['Social Media Launch', 'Website Go-Live', 'SEO Implementation', 'Paid Campaigns']
  },
  {
    phase: 'Growth',
    month: 'Month 4-12',
    title: 'Scale & Optimize',
    description: 'Continuous improvement and growth acceleration.',
    items: ['Performance Analytics', 'A/B Testing', 'Content Calendar', 'Quarterly Reviews']
  }
]

export default function StrategySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    const timeline = timelineRef.current
    if (!section || !timeline) return
    
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo('.strategy-title',
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
      
      // Animate timeline line drawing
      gsap.fromTo('.timeline-progress',
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 1
          }
        }
      )
      
      // Animate each timeline step
      gsap.utils.toArray('.timeline-step').forEach((step: any, i) => {
        gsap.fromTo(step,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: step,
              start: 'top 70%',
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
      className="section min-h-screen relative bg-coffee py-20"
      id="strategy"
    >
      <div className="container mx-auto px-10 md:px-20">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="font-mono text-taupe text-sm tracking-widest">03</span>
          <h2 className="strategy-title kinetic-text text-5xl md:text-7xl text-bone mt-2">
            THE PROCESS
          </h2>
          <p className="strategy-title font-mono text-taupe text-sm mt-4 max-w-xl mx-auto">
            Your yearly content calendar and end-to-end digital transformation journey.
          </p>
        </div>
        
        {/* Timeline */}
        <div 
          ref={timelineRef}
          className="relative max-w-5xl mx-auto"
        >
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-taupe/20 -translate-x-1/2">
            <div className="timeline-progress absolute top-0 left-0 w-full bg-gradient-to-b from-electric-orange via-terracotta to-taupe" />
          </div>
          
          {/* Timeline steps */}
          {timelineSteps.map((step, index) => (
            <div 
              key={index}
              className={`timeline-step relative flex items-center mb-20 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <div className="glass-card p-6 hover:border-electric-orange/50 transition-all duration-500">
                  <span className="font-mono text-electric-orange text-xs tracking-widest">
                    {step.phase.toUpperCase()}
                  </span>
                  <span className="font-mono text-taupe text-xs block mt-1">
                    {step.month}
                  </span>
                  <h3 className="kinetic-text text-xl text-bone mt-3 mb-2">
                    {step.title}
                  </h3>
                  <p className="font-mono text-taupe text-xs mb-4">
                    {step.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    {step.items.map((item, i) => (
                      <span 
                        key={i}
                        className="font-mono text-xs px-2 py-1 rounded bg-taupe/10 text-taupe"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Center dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-coffee border-2 border-electric-orange z-10">
                <div className="absolute inset-0 rounded-full bg-electric-orange animate-ping opacity-50" />
              </div>
              
              {/* Empty space for other side */}
              <div className="w-5/12" />
            </div>
          ))}
        </div>
        
        {/* Yearly calendar indicator */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 glass-card px-8 py-4">
            <span className="font-mono text-taupe text-sm">YEARLY CONTENT CALENDAR</span>
            <div className="flex gap-1">
              {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((month, i) => (
                <div 
                  key={i}
                  className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs ${
                    i < 4 ? 'bg-electric-orange/30 text-electric-orange' : 
                    i < 8 ? 'bg-terracotta/30 text-terracotta' : 
                    'bg-taupe/30 text-taupe'
                  }`}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
