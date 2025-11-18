'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const lineVariant = {
  hidden: { opacity: 0, y: 8, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } },
}

const headerEnter = {
  hidden: { opacity: 0, y: -40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const heroTitleVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25 } },
}

const sectionFade = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const BODY_LINE_STAGGER = 0

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

  return (
    <motion.div
      className={`text-[28px] md:text-[48px] leading-[1.2] text-white ${className}`}
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
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
  const experienceEntries = [
    { year: '2025', title: 'CREATIVE DIRECTOR', company: 'INDEPENDENT, LA' },
    { year: '2023', title: 'DIRECTOR, PRODUCT CREATIVE', company: 'META REALITY LABS, LA' },
    { year: '2019', title: 'DIRECTOR, PRODUCT CREATIVE', company: 'MESSENGER & IGD, SF' },
    { year: '2016', title: 'CREATIVE DIRECTOR', company: 'INDEPENDENT, NYC' },
    { year: '2015', title: 'CREATIVE DIRECTOR', company: 'OPPERMANWEISS, NYC' },
    { year: '2014', title: 'CREATIVE DIRECTOR', company: 'DEEPLOCAL, PGH' },
    { year: '2007', title: 'CREATIVE DIRECTOR', company: 'INDEPENDENT, NYC' },
    { year: '2005', title: 'ART DIRECTOR', company: 'PROLOGUE FILMS' },
    { year: '2004', title: 'DESIGNER', company: 'SKDP, LA' },
    { year: '2003', title: 'DESIGNER', company: 'NIKE BRAND DESIGN, PDX' },
  ]

  return (
    <main className="bg-[#000000] text-white min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <motion.div
          className="w-full px-[34px] md:px-20 py-4 md:py-6 flex items-center justify-between"
          variants={headerEnter}
          initial="hidden"
          animate="show"
        >
          <nav className="flex items-center gap-6 md:gap-10 text-[12px] uppercase tracking-[0.05em]">
            <a href="#top" className="font-medium hover:opacity-80">GRAHAM D. HILL</a>
          </nav>
          <div className="flex items-center gap-6 md:gap-8 text-xl">
            <a aria-label="TikTok" href="https://www.tiktok.com/@graham.fyi" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <Image src="/Tiktok.svg" alt="TikTok" width={64} height={64} className="h-4 md:h-4 w-auto" />
            </a>
            <a aria-label="Instagram" href="https://www.instagram.com/graham.fyi/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <Image src="/IG.svg" alt="Instagram" width={64} height={64} className="h-4 md:h-4 w-auto" />
            </a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/gdevaulthill/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
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
        <div className="pt-[80px] md:pt-[170px] pb-0 md:pb-0">
          <div className="relative">
            {/* Headline */}
            <div className="px-[34px] md:px-20">
              <motion.h1
                className="leading-[1.1] font-normal tracking-tight text-white"
                variants={heroTitleVariants}
                initial="hidden"
                animate="show"
              >
                <motion.span className="block text-left text-[44px] md:text-[72px]" variants={lineVariant}>
                  <span className="text-red-500">Graham Hill</span>
                </motion.span>
                <motion.span className="block text-left text-[44px] md:text-[72px]" variants={lineVariant}>
                  is a Creative Director.
                </motion.span>
              </motion.h1>
            </div>

            {/* Media */}
            <motion.div
              className="mt-10 md:mt-10 relative z-0"
              variants={lineVariant}
              initial="hidden"
              animate="show"
            >
              <Image
                src="/header3.png"
                alt="Header visual"
                width={1920}
                height={1080}
                className="block w-full h-[320px] md:h-auto object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro paragraph with IG mark */}
      <section className="px-[34px] md:px-20 mt-0 md:mt-0 pb-[20px] lg:pb-0 lg:py-20">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-8 md:gap-0 h-full bp-max1040:flex-col bp-max1040:items-start"
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            className="w-full md:flex-1 flex justify-center md:justify-center md:pr-10 lg:pr-16 md:transform md:-translate-y-[44px] bp-max1040:justify-center bp-min1041:justify-center pt-[30px]"
            variants={lineVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <video
              src="/logo_sequence_06.mp4"
              className="h-[250px] w-[270px] md:h-[250px] md:w-[330px] rounded-[24px] md:rounded-[40px] object-contain bg-black"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </motion.div>
          <AnimatedBlock
            className="mt-0 md:mt-0 md:transform md:-translate-y-10 w-full max-w-[328px] md:max-w-[642px] md:w-full text-left"
            lines={['A hands-on creative leader with over 20 years experience working at the intersection of product and brand.']}
          />
        </motion.div>
      </section>

      {/* Experience banner */}
      <section id="experience" className="mt-12 md:mt-0 w-full md:h-[879px]">
        <div className="md:relative md:h-full">
          <Image
            src="/experience2.png"
            alt="Experience background"
            width={1920}
            height={1080}
            className="block w-full h-auto object-cover md:absolute md:inset-0 md:h-full md:w-full"
            priority
          />
          <div className="px-[34px] md:px-20 lg:px-20 py-0 md:py-0 bg-black md:bg-transparent md:relative md:h-full">
            <motion.div
              className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16 md:h-full pt-16 md:pt-[210px] md:pb-24"
              variants={sectionFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="text-left max-w-[250px] md:max-w-[360px]" variants={lineVariant}>
                <motion.h2 className="text-[28px] md:text-[48px] leading-tight" variants={lineVariant}>
                  <span className="text-red-500 block">My Experience,</span>
                  <span className="text-white block">In Short.</span>
                </motion.h2>
                <motion.p
                  className="mt-6 text-[12px] md:text-[16px] leading-[24px] md:leading-[32px] tracking-[0.05em] text-neutral-100 max-w-[320px]"
                  variants={lineVariant}
                >
                  Built orgs, launched features, shipped campaigns, built experiences, defined vision and aligned executive stakeholders around them.
                </motion.p>
              </motion.div>
              <motion.div
                className="w-full md:max-w-[520px] mt-4 md:mt-0 md:ml-auto flex flex-col gap-5 text-[10px] md:text-[12px] leading-[16px] md:leading-[18px] text-neutral-100"
                variants={lineVariant}
              >
                {experienceEntries.map(({ year, title, company }) => (
                  <motion.div
                    key={`${year}-${title}`}
                    className="grid grid-cols-[32px_minmax(0,1fr)] md:grid-cols-[72px_minmax(0,1fr)] gap-x-[16px] md:gap-x-[24px] items-start"
                    variants={lineVariant}
                  >
                    <span className="text-right font-medium text-neutral-200 uppercase tracking-[0.15em]">{year}</span>
                    <div className="flex flex-col gap-[2px] uppercase tracking-[0.15em] leading-[16px] md:leading-[18px]">
                      <span className="text-white">{title}</span>
                      <span className="text-neutral-400">{company}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
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
          <div className="px-[34px] md:px-20 py-16 md:py-24 bg-black bp-min1170:bg-transparent bp-min1170:relative">
            <motion.div
              className="flex flex-col md:flex-row items-start gap-0 md:gap-0"
              variants={sectionFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p
                className="w-full text-[28px] md:text-[48px] leading-[1.25] text-white text-left max-w-[360px] md:max-w-[540px] bp-min1380:max-w-[647px] md:transform md:translate-y-1"
                variants={lineVariant}
              >
                My Approach.
              </motion.p>
              <motion.div
                className="w-full text-white text-[12px] md:text-[18px] leading-[1.5] tracking-[0.05em] md:max-w-[400px] md:ml-[calc(50%-321px)] md:-translate-x-[20px] mt-8 md:mt-0 max-w-[261px]"
                variants={lineVariant}
              >
                <p>High-craft, conceptually-oriented, problem-motivated, user-centric.</p>
                <p className="mt-4">People, process, product — in that order.</p>
                <p className="mt-4">Set vision, explain the why, point the way forward, clear the path, and execute.</p>
                <p className="mt-4">Differentiation matters.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-[34px] md:px-20 mt-20 md:mt-32">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="md:col-span-2 md:max-w-[640px]">
            <motion.h3 className="text-[28px] md:text-5xl leading-[1.2] tracking-[0.48px] max-w-[360px] md:max-w-none" variants={lineVariant}>
              Want to work<br className="hidden md:block" /> on something<br className="hidden md:block" /> together?
            </motion.h3>
            <motion.a
              href="mailto:graham@graham.fyi"
              className="mt-6 inline-block text-[28px] md:text-5xl leading-[1.2] tracking-[0.32px] text-red-500 hover:opacity-80"
              variants={lineVariant}
            >
              Let’s Chat.
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="about" className="px-[34px] md:px-20 py-5 md:py-36 text-left text-[8px] md:text-[12px] text-neutral-400 uppercase tracking-[0.15em]">
        <motion.div variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          © {new Date().getFullYear()} GRAHAM HILL. ALL RIGHTS RESERVED.
        </motion.div>
      </footer>
    </main>
  )
}
