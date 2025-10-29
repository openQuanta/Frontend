'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import {
  Caret,
  DashboardModel,
  CerficateIcon,
  FilelockIcon,
  TargetIcon,
  ConnectorArrow,
  Glasses,
  Microscope,
  circleTick,
} from '@/assets/images';
import { ScrollIndicator } from '../features/scroll-indicator';
import DynamicScrollCards from './dynamic-cards';
import Footer from '@/components/shared/footer';

// ---------------------------
// Framer Motion Variants
// ---------------------------
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};

// ---------------------------
// AnimatedSection Component
// ---------------------------
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: any;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  variants = fadeInUp,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`w-full ${className}`}
    >
      {children}
    </motion.section>
  );
};

// ---------------------------
// Section Data
// ---------------------------
const sections = [
  { id: 'upload', label: 'Upload' },
  { id: 'peerReview', label: 'Peer Review' },
  { id: 'reputation', label: 'Reputation' },
  { id: 'authorship', label: 'Authorship' },
  { id: 'researchSharing', label: 'Research Sharing' },
  { id: 'communityEngagement', label: 'Community Engagement' },
];

const sectionText = [
  {
    uploadTextA: `Easily upload your research files to our secure, decentralized storage platform. No gatekeeping, no barriers—just open access to scientific discovery.`,
    uploadTextB: `Version control and metadata tagging ensure your work stays organized and traceable.`,
  },
  {
    peerReviewTextA: `Invite peer reviewers or receive automatic review requests from our research network.`,
    peerReviewTextB: `Transparent review processes enhance credibility and accelerate scientific communication.`,
  },
  {
    reputationTextA: `Gain recognition through transparent contribution tracking and verified citations.`,
    reputationTextB: `Reputation points directly correlate with engagement, feedback, and collaboration quality.`,
  },
  {
    authorshipTextA: `Proof of authorship is immutably stored using blockchain-based timestamps.`,
    authorshipTextB: `Each revision, comment, and acknowledgment is permanently linked to your author profile.`,
  },
  {
    researchSharingTextA: `Share findings easily with the global community. Publish to multiple open-access channels at once.`,
    researchSharingTextB: `Boost visibility and encourage real-time feedback from fellow researchers.`,
  },
  {
    communityEngagementTextA: `Join topic-specific communities, follow experts, and contribute to open debates.`,
    communityEngagementTextB: `Collective knowledge thrives when collaboration meets transparency.`,
  },
];

// ---------------------------
// Main Component
// ---------------------------
const ResearchPublishing = () => {
  const [activeSection, setActiveSection] = useState(0);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollProgress = scrollTop / (scrollHeight - clientHeight);
      const sectionIndex = Math.floor(scrollProgress * sections.length);
      setActiveSection(sectionIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      {/* ------------------ Hero Section ------------------ */}
      <AnimatedSection
        className="min-h-screen flex flex-col justify-center items-center text-center px-6"
        variants={fadeIn}
      >
        <motion.div variants={fadeInUp}>
          <Image src={Caret} alt="caret" width={60} height={60} />
          <h1 className="text-5xl font-light mt-6 mb-4">Reimagining Research Publishing</h1>
          <p className="text-zinc-400 text-lg max-w-[680px] mx-auto mb-8">
            A transparent, community-driven publishing process that redefines how research is shared,
            reviewed, and rewarded.
          </p>
        </motion.div>

        <motion.div
          className="flex gap-6 justify-center items-center mt-4"
          variants={slideInRight}
        >
          <Image src={DashboardModel} alt="dashboard" className="rounded-xl" width={520} height={320} />
          <Image src={FilelockIcon} alt="file-lock" width={80} height={80} />
          <Image src={CerficateIcon} alt="certificate" width={80} height={80} />
        </motion.div>
      </AnimatedSection>

      {/* ------------------ Sticky Scroll Section ------------------ */}
      <div ref={stickyWrapperRef} className="relative flex">
        <div className="sticky top-0 h-screen w-[100px] flex items-center justify-center">
          <ScrollIndicator progress={activeSection / (sections.length - 1)} />
        </div>

        <div className="flex-1 snap-y snap-mandatory">
          {sections.map((section, i) => (
            <AnimatedSection
              key={section.id}
              variants={fadeInUp}
              className="h-screen flex items-center justify-start snap-start px-10"
            >
              <div className="max-w-[861px]">
                <h2 className="text-4xl font-light mb-6">{section.label}</h2>
                <p className="text-[20px] text-zinc-400 leading-relaxed">
                  {sectionText[i][`${section.id}TextA` as keyof typeof sectionText[i]]}
                </p>
                <p className="text-[20px] text-zinc-400 leading-relaxed mt-5">
                  {sectionText[i][`${section.id}TextB` as keyof typeof sectionText[i]]}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="sticky top-0 h-screen w-[400px] hidden lg:flex items-center justify-center">
          <DynamicScrollCards activeSection={activeSection} />
        </div>
      </div>

      {/* ------------------ Closing Section ------------------ */}
      <AnimatedSection
        className="h-screen flex flex-col justify-center items-center text-center bg-zinc-900"
        variants={fadeIn}
      >
        <h2 className="text-3xl font-light mb-4">The Future of Scientific Collaboration</h2>
        <p className="text-zinc-400 max-w-[600px] text-lg mb-10">
          Transparent research publishing powered by decentralized technology, rewarding
          contribution, collaboration, and community.
        </p>
        <Image src={circleTick} alt="tick" width={100} height={100} />
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default ResearchPublishing;