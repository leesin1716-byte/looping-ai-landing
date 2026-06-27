"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

const heights = [45, 72, 52, 92, 63, 80];

/** Tiny bar chart that grows in when scrolled into view (used in the
 *  Capabilities dashboard mockup). Static under reduced motion. */
export default function AnimatedBars() {
  const reduced = useReducedMotion();
  return (
    <div className="flex flex-1 items-end gap-1.5 rounded-md bg-white/[0.03] p-2">
      {heights.map((h, i) =>
        reduced ? (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-sm bg-gradient-to-t from-violet to-cyan"
          />
        ) : (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: "easeOut" }}
            className="flex-1 rounded-sm bg-gradient-to-t from-violet to-cyan"
          />
        ),
      )}
    </div>
  );
}
