"use client";

import { motion } from "framer-motion";

export default function SectionWrapper({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
