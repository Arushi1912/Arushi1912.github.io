import PinballGame from "../components/PinballGame";

const Landing = () => {
  return (
    <div className="min-h-screen bg-beige pt-28 pb-12 px-6">
      {/* ── Intro Section ── */}
      <div className="w-full max-w-5xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="flex-shrink-0">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden bg-cream shadow-lg">
              <img
                src="/profile.png"
                alt="Arushi Nigam"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-blue mb-5 leading-tight">
              Hi there
            </h1>
            <p className="text-lg text-slate/80 leading-relaxed mb-3">
              I'm a full-stack software engineer with a Master's in Computer
              Science from{" "}
              <span className="font-medium text-slate">Cornell Tech</span>,
              passionate about building scalable systems and delightful user
              experiences.
            </p>
            <p className="text-lg text-slate/80 leading-relaxed">
              Previously at <span className="font-medium text-slate">SAP</span>{" "}
              and <span className="font-medium text-slate">Cogoport</span>, I
              now work at{" "}
              <span className="font-medium text-slate"> CVS Health. </span>
              Currently, I'm enjoying exploring Agentic AI with a focus on
              thoughtful product design.
            </p>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="relative mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute inset-0 flex justify-center -top-1">
          <div className="w-2 h-2 rounded-full bg-gold" />
        </div>
      </div>

      {/* ── Pinball Section ── */}
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-blue mb-2 text-center">
          While you're here&hellip;
        </h2>
        <p className="text-lg text-slate/60 mb-8 text-center">
          let's make this fun.
        </p>

        <PinballGame />
      </div>

      {/* ── Footer Quote ── */}
      <div className="relative mb-8 mt-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute inset-0 flex justify-center -top-1">
          <div className="w-2 h-2 rounded-full bg-gold" />
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <blockquote className="text-lg md:text-xl font-serif italic text-slate/60 leading-relaxed">
          "Where there is joy, there is creation; where there is no joy, no
          creation. Know the nature of joy"
        </blockquote>
        <p className="text-slate/40 text-sm mt-2">— Upanishad</p>
      </div>
    </div>
  );
};

export default Landing;
