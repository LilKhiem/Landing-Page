import { motion } from "motion/react";
import { PenTool, Beaker, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  { 
    icon: PenTool, 
    title: "1. Prompt", 
    desc: "Describe your strategy in plain English.",
    time: "30s"
  },
  { 
    icon: Beaker, 
    title: "2. Validate", 
    desc: "NEXUS runs 5-layer institutional stress tests.",
    time: "2m"
  },
  { 
    icon: CheckCircle, 
    title: "3. Certify", 
    desc: "Get a deployment-ready, certified strategy.",
    time: "30s"
  }
];

const FlowBox = ({ text, active = false }: { text: string, active?: boolean }) => (
  <div className={`px-4 py-2 rounded border font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest transition-all duration-500 ${active ? 'border-[#F0B429] bg-[#F0B429]/10 text-[#F0B429] shadow-[0_0_15px_rgba(240,180,41,0.2)]' : 'border-[#1A2333] bg-[#0A101A] text-[#4A5568]'}`}>
    {text}
  </div>
);

const FlowArrow = () => (
  <div className="flex items-center gap-1">
    <motion.div 
      animate={{ x: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="text-[#F0B429]/30"
    >
      <ArrowRight className="w-3 h-3" />
    </motion.div>
  </div>
);

export const HowItWorks = () => (
  <section className="py-24 px-10 bg-black overflow-hidden">
    <div className="max-w-6xl mx-auto text-center">
      <div className="mb-20">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">HOW IT WORKS</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-['Syne'] mb-6">From idea to alpha in 3 steps.</h3>
      </div>

      {/* Horizontal Timeline */}
      <div className="relative mb-32">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#1A2333] -translate-y-1/2"></div>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 h-[1px] bg-[#F0B429] -translate-y-1/2 z-10"
        ></motion.div>

        <div className="relative z-20 flex justify-between">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-black border-2 border-[#1A2333] flex items-center justify-center mb-6 group hover:border-[#F0B429] transition-colors relative bg-black">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.4 + 0.2 }}
                  className="absolute inset-0 rounded-full bg-[#F0B429]/10 blur-md"
                ></motion.div>
                <step.icon className="w-6 h-6 text-[#F0B429] relative z-10" />
              </div>
              <div className="max-w-[200px]">
                <h4 className="text-lg font-bold mb-2 font-['Syne']">{step.title}</h4>
                <p className="text-sm text-[#7A8BA0] leading-relaxed">{step.desc}</p>
                <div className="mt-2 text-[10px] font-bold text-[#F0B429] uppercase tracking-widest">{step.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mini Flow Diagram */}
      <div className="mt-20 flex flex-col items-center">
        <p className="text-[10px] font-bold text-[#4A5568] uppercase tracking-[0.3em] mb-8 font-['JetBrains_Mono']">THE GENERATE & KILL CYCLE</p>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          <FlowBox text="Prompt" active />
          <FlowArrow />
          <FlowBox text="Candidates (n=1,024)" />
          <FlowArrow />
          <FlowBox text="Validation Engine" active />
          <FlowArrow />
          <div className="flex flex-col gap-2">
            <div className="px-3 py-1 rounded border border-green-500/30 bg-green-500/10 text-green-500 font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest">Certified ✓</div>
            <div className="px-3 py-1 rounded border border-red-500/30 bg-red-500/10 text-red-500 font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest">Killed ✗</div>
          </div>
        </div>
        <p className="mt-8 max-w-md text-[11px] text-[#4A5568] leading-relaxed">
          NEXUS doesn't just build strategies. It aggressively kills weak ones. Only 3% of generated candidates survive the SYNTHESIS gate.
        </p>
      </div>
    </div>
  </section>
);
