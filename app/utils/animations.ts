import type { GSAPTweenVars } from 'gsap'

export async function initScrollAnimations(targets: {
  fadeUp?: Element[]
  stagger?: Element[]
  parallax?: { el: Element; speed?: number }[]
}) {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Fade up animation for individual elements
  targets.fadeUp?.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // Stagger children animation
  targets.stagger?.forEach((container) => {
    gsap.fromTo(
      container.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // Parallax elements
  targets.parallax?.forEach(({ el, speed = 0.3 }) => {
    gsap.to(el, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

export async function killScrollTriggers() {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  ScrollTrigger.getAll().forEach(t => t.kill())
}
