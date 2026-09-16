import { motion } from 'framer-motion';

const quotes = [
  {
    text: "Each one of us has the power to change the destiny of our nation. If you contribute your bit, 130 crore Indians can take India to new heights.",
    context: "— On collective responsibility",
  },
  {
    text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
    context: "— On the power of vision",
  },
  {
    text: "India's strength is in its diversity. Our unity in diversity is our greatest asset.",
    context: "— On national unity",
  },
];

export default function QuoteSection() {
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#13880805] to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="space-y-16 md:space-y-24">
          {quotes.map((quote, i) => (
            <motion.blockquote
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="text-[#FF9933]/30 text-4xl md:text-5xl mb-4">"</div>
              <p className="text-lg md:text-2xl lg:text-3xl font-light text-white/80 leading-relaxed italic">
                {quote.text}
              </p>
              <footer className="mt-4 text-sm text-white/30">
                {quote.context}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
