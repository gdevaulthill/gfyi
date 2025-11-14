'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'

function Parallax({
  children,
  start = 0,
  end = -100,
}: {
  children: React.ReactNode
  start?: number
  end?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [start, end])
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

// Header enter animation (slides down from above)
const headerEnter = {
  hidden: { opacity: 0, y: -40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// Line-level animation with blur-to-crisp effect
const lineVariant = {
  hidden: { opacity: 0, y: 8, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } },
}

// Delay hero headline so header can enter first (set to 0 when sequencing via header completion)
const HERO_HEADLINE_DELAY_S = 0

const heroTitleVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25, delayChildren: HERO_HEADLINE_DELAY_S } },
}

const sectionFade = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// Single knob to tweak the delay between the last headline word and video reveal
const VIDEO_AFTER_DIRECTION_MS = 900

// Controls stagger between lines in AnimatedBlock sections (body copy)
const BODY_LINE_STAGGER = 0

const EXPERIENCE_ENTRIES = [
  { year: '2025', detail: 'Independent, LA' },
  { year: '2023', detail: 'Meta Reality Labs, LA' },
  { year: '2019', detail: 'Messenger & IGD, SF' },
  { year: '2016', detail: 'Independent, NYC' },
  { year: '2015', detail: 'Oppermanweiss, NYC' },
  { year: '2014', detail: 'Deeplocal, PGH' },
  { year: '2007', detail: 'Independent, NYC' },
  { year: '2005', detail: 'Prologue Films' },
  { year: '2004', detail: 'SKDP, LA' },
  { year: '2003', detail: 'Nike, PDX' },
]

function AnimatedBlock({
  lines,
  className = '',
  delay = 0,
}: {
  lines: Array<React.ReactNode | 'gap'>
  className?: string
  delay?: number
}) {
  const parentVariants = {
    hidden: {},
    show: { transition: { staggerChildren: BODY_LINE_STAGGER, delayChildren: delay } },
  }
  const baseClasses = 'text-[28px] md:text-[48px] leading-[1.3] text-neutral-300'
  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15% 0px -15% 0px', amount: 0.01 }}
    >
      {lines.map((text, idx) =>
        text === 'gap' ? (
          <div key={idx} className="h-6" />
        ) : (
          <motion.p key={idx} variants={lineVariant}>
            {text}
          </motion.p>
        ),
      )}
    </motion.div>
  )
}

export default function Page() {
  const videoControls = useAnimation()
  const heroControls = useAnimation()

  return (
    <main className="bg-[#000000] text-white min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <motion.div
          className="w-full px-[17px] md:px-20 py-4 md:py-6 flex items-center justify-between"
          variants={headerEnter}
          initial="hidden"
          animate="show"
          onAnimationComplete={() => {
            heroControls.start('show')
          }}
        >
          <nav className="flex items-center gap-6 md:gap-10 text-[12px] uppercase tracking-[0.05em]">
            <a href="#top" className="font-medium hover:opacity-80">GRAHAM D. HILL</a>
          </nav>
          <div className="flex items-center gap-6 md:gap-8 text-xl">
            <a
              aria-label="TikTok"
              href="https://www.tiktok.com/@graham.fyi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Image src="/Tiktok.svg" alt="TikTok" width={64} height={64} className="h-4 md:h-4 w-auto" />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/graham.fyi/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Image src="/IG.svg" alt="Instagram" width={64} height={64} className="h-4 md:h-4 w-auto" />
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/gdevaulthill/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Image src="/LinkedIn.svg" alt="LinkedIn" width={64} height={64} className="h-4 md:h-4 w-auto" />
            </a>
            <a aria-label="Email" href="mailto:graham@graham.fyi" className="hover:opacity-80">
              <Image src="/Mail.svg" alt="Email" width={64} height={64} className="h-4 md:h-4 w-auto" />
            </a>
          </div>
        </motion.div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="pt-[170px] pb-12 md:pt-[170px] md:pb-0">
          <Parallax start={0} end={-80}>
            <div className="relative">
              {/* Text positioned above media */}
              <div className="px-[17px] md:px-20">
                <motion.h1
                  className="leading-[1.1] font-normal tracking-tight text-white"
                  variants={heroTitleVariants}
                  initial="hidden"
                  animate={heroControls}
                  onAnimationComplete={() => videoControls.start('show')}
                >
                  <motion.span className="block text-left text-[44px] md:text-[72px]" variants={lineVariant}>
                    <span className="text-red-500">Graham Hill</span>
                    <span> is a</span>
                  </motion.span>
                  <motion.span className="block text-left text-[44px] md:text-[72px]" variants={lineVariant}>
                    Design & Creative
                  </motion.span>
                  <motion.span className="block text-left text-[44px] md:text-[72px]" variants={lineVariant}>
                    Director
                  </motion.span>
                </motion.h1>
              </div>

              {/* Media container */}
              <motion.div
                className="px-[17px] md:px-20 mt-10 md:mt-10 relative z-0"
                variants={lineVariant}
                initial="hidden"
                animate={videoControls}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="w-full rounded-[30px] md:rounded-[40px] bg-white/5 ring-1 ring-white/10 overflow-hidden shadow-2xl z-0"
                  variants={lineVariant}
                  initial="hidden"
                  animate={videoControls}
                >
                  <Image
                    src="/header.png"
                    alt="Project preview placeholder"
                    width={1920}
                    height={1080}
                    className="block w-full h-auto aspect-[16/9] object-cover"
                    priority
                  />
                </motion.div>

                {/* DIRECTION is part of the headline spacing; no extra overlay */}
              </motion.div>
            </div>
          </Parallax>
        </div>
      </section>

      {/* Intro paragraph */}
      <section className="px-[17px] md:px-20 mt-10 md:mt-0 md:h-[550px]">
        <div className="flex flex-col md:flex-row items-center md:items-center md:justify-between gap-8 md:gap-0 h-full bp-max1040:flex-col bp-max1040:items-center">
          <motion.div
            className="w-full md:flex-1 flex justify-center md:justify-center md:px-10 lg:px-16 bp-max1040:justify-center bp-min1041:justify-center"
            variants={lineVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <video
              src="/logo_sequence_03.mp4"
              className="h-[236px] w-[180px] md:h-[320px] md:w-[220px] rounded-[24px] md:rounded-[40px] object-contain bg-black"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </motion.div>
          <AnimatedBlock
            className="mt-8 md:mt-0 w-full max-w-[328px] md:max-w-none md:w-[642px] md:flex-none md:basis-[642px] text-left"
            lines={['A hands-on creative leader with over 20 years experience working at the intersection of product and brand.']}
          />
        </div>
      </section>

      {/* Experience banner with overlaid title */}
      <section id="experience" className="mt-12 md:mt-0 w-full md:h-[879px]">
        <div className="md:relative md:h-full">
          <Image
            src="/experience2.png"
            alt="Experience section background placeholder"
            width={1920}
            height={1080}
            className="block w-full h-auto object-cover md:absolute md:inset-0 md:h-full md:w-full"
            priority
          />
          <div className="px-[17px] md:px-20 lg:px-20 py-0 md:py-0 bg-black md:bg-transparent md:relative md:h-full">
            <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-12 md:h-full pt-16 md:pt-[210px] md:pb-24">
              <h2 className="text-[28px] md:text-[48px] leading-tight max-w-[360px] md:max-w-[420px]">
                <span className="text-red-500 block">My Experience,</span>
                <span className="text-white block">In Short.</span>
              </h2>
              <div className="w-full mt-8 md:mt-0 flex flex-col gap-4 text-[8px] leading-[1.4] tracking-[0.15em] uppercase text-neutral-100 md:text-[12px] md:leading-[1.6] md:w-[642px] md:basis-[642px]">
                {EXPERIENCE_ENTRIES.map(({ year, detail }) => (
                  <div
                    key={year}
                    className="grid grid-cols-[25px_minmax(0,1fr)] md:grid-cols-[68px_minmax(0,1fr)] gap-x-[20px] md:gap-x-[36px] items-start"
                  >
                    <span className="text-right">{year}</span>
                    <span className="whitespace-pre-line text-left">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Translate section */}
      <section className="mt-12 md:mt-0 w-full">
        <div className="bp-min1170:relative">
          <Image
            src="/translate.png"
            alt="Translate background"
            width={1920}
            height={1080}
            className="block w-full h-auto object-cover bp-min1170:absolute bp-min1170:inset-0 bp-min1170:size-full"
          />
          <div className="px-[17px] md:px-20 py-16 md:py-32 bg-black bp-min1170:bg-transparent bp-min1170:relative">
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
              <p className="w-full text-[28px] md:text-[48px] leading-[1.25] text-white text-left max-w-[360px] md:max-w-[540px] bp-min1380:max-w-[647px] md:transform md:translate-y-1">
                Over the years, I’ve worked in so many different contexts and altitudes, I can now comfortably translate across them.
              </p>
              <div className="w-full text-white text-[12px] md:text-[18px] leading-[1.5] tracking-[0.05em] md:max-w-[400px] md:ml-auto mt-8 md:mt-0 max-w-[261px]">
                <p>
                  I’m a high-craft, conceptually-oriented, problem-motivated, user-centric creative director working at the intersection of product, creative, and brand.
                </p>
                <p className="mt-4">
                  I’ve built orgs, launched features, shipped campaigns, defined vision and aligned executive stakeholders around them.
                </p>
                <p className="mt-4">
                  But hey, if that just seemed like a handful of buzzwords crammed together into a couple sentences, try this instead: I lead creative teams in shipping new things that make people feel something and drive business impact at scale.
                </p>
                <p className="mt-4">Better?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-[17px] md:px-20 mt-20 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="md:col-span-2 md:max-w-[640px]">
            <h3 className="text-[48px] md:text-5xl leading-[1.2] tracking-[0.48px] max-w-[360px] md:max-w-none">
              Want to work<br className="hidden md:block" /> on something<br className="hidden md:block" /> together?
            </h3>
            <a
              href="mailto:hello@example.com"
              className="mt-6 inline-block text-[32px] md:text-5xl leading-[1.2] tracking-[0.32px] text-red-500 hover:opacity-80"
            >
              Let’s Chat.
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="pl-[17px] md:pl-20 pr-[17px] md:pr-20 py-5 md:py-36 text-left text-[12px] text-neutral-400 uppercase tracking-[0.05em]">
        <motion.div variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          © {new Date().getFullYear()} GRAHAM HILL. ALL RIGHTS RESERVED.
        </motion.div>
      </footer>
    </main>
  )
}