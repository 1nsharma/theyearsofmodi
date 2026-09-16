import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '10+', label: 'Years of Leadership', icon: '📅' },
  { value: '₹400L Cr', label: 'Infrastructure Investment', icon: '🏗️' },
  { value: '500M+', label: 'Digital Citizens Connected', icon: '📱' },
  { value: '150+', label: 'Nations in Vaccine Maitri', icon: '💉' },
  { value: '3rd', label: 'Largest Economy by 2027', icon: '📈' },
  { value: '🌙', label: 'First at Lunar South Pole', icon: '' },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-4 relative overflow-hidden"
      aria-label="Key achievements"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF993305] to-transparent" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            A Decade in Numbers
          </h2>
          <p className="text-white/40 text-sm">
            Key milestones that defined an era
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/[0.05] hover:border-[#FF9933]/20 transition-all duration-500 group-hover:bg-white/[0.04]">
                <div className="text-2xl md:text-3xl mb-2">{stat.icon || stat.value}</div>
                <div className="text-xl md:text-2xl font-bold text-white mb-1">
                  {stat.icon ? '' : stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/40">
                  {stat.label}
                </div>
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 153, 51, 0.05), transparent 70%)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
