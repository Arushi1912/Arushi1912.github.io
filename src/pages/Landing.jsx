import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-beige pt-28 pb-12 px-6 flex items-center">
      <div className="w-full max-w-6xl mx-auto">
        {/* Hero Section with Image and Text Side by Side */}
        <div className="flex flex-col md:flex-row items-start gap-16 mb-16">
          {/* Image */}
          <div className="flex-shrink-0">
            <div className="w-80 h-80 rounded-3xl overflow-hidden bg-cream shadow-lg">
              <img
                src="/profile.png"
                alt="Arushi Nigam"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-blue mb-6 leading-tight">
              Hi there
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate/80 leading-relaxed mb-4">
                I'm a full-stack software engineer with expertise in building
                scalable systems and delightful user experiences.
              </p>

              <p className="text-lg text-slate/80 leading-relaxed mb-4">
                I graduated with a Master's degree in Computer Science from{" "}
                <span className="font-medium text-slate">Cornell Tech</span>,
                where I deepened my knowledge in Machine Learning and Data
                Science while also exploring Design Thinking and product
                development.
              </p>

              <p className="text-lg text-slate/80 leading-relaxed mb-4">
                Previously, I worked as a software engineer at{" "}
                <span className="font-medium text-slate">SAP</span> for two and
                a half years, where I cultivated strong full-stack engineering
                skills and an analytical problem-solving mindset. I also had the
                amazing opportunity to intern at{" "}
                <span className="font-medium text-slate">Cogoport</span>, a
                startup focussed on digitizing international logistics.
              </p>

              <p className="text-lg text-slate/80 leading-relaxed">
                I'm passionate about creating thoughtful, data-driven solutions
                that prioritize both technical excellence and user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
          <div className="absolute inset-0 flex justify-center -top-1">
            <div className="w-2 h-2 rounded-full bg-gold"></div>
          </div>
        </div>

        {/* What I'm Working On / Featured Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-serif font-semibold text-slate-blue mb-6">
            What I'm Exploring
          </h2>

          <div className="space-y-5 text-slate/80">
            <p className="text-lg leading-relaxed">
              Currently, I'm diving deep into the intersection of{" "}
              <Link
                to="/work"
                className="text-emerald-deep hover:text-emerald font-medium border-b border-emerald-deep/30 hover:border-emerald transition-colors"
              >
                machine learning applications
              </Link>{" "}
              and full-stack development, exploring how we can build intelligent
              systems that scale gracefully.
            </p>

            <p className="text-lg leading-relaxed">
              When I'm not coding, you'll find me{" "}
              <Link
                to="/writing"
                className="text-emerald-deep hover:text-emerald font-medium border-b border-emerald-deep/30 hover:border-emerald transition-colors"
              >
                writing poetry and prose
              </Link>
              , or curled up with a good{" "}
              <Link
                to="/bookshelf"
                className="text-emerald-deep hover:text-emerald font-medium border-b border-emerald-deep/30 hover:border-emerald transition-colors"
              >
                book
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="relative mb-8 mt-12">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
          <div className="absolute inset-0 flex justify-center -top-1">
            <div className="w-2 h-2 rounded-full bg-gold"></div>
          </div>
        </div>

        {/* Featured Quote - Footer */}
        <div className="max-w-3xl">
          <blockquote className="text-lg md:text-xl font-serif italic text-slate/60 leading-relaxed">
            "Where there is joy, there is creation; where there is no joy, no
            creation. Know the nature of joy"
          </blockquote>
          <p className="text-slate/40 text-sm mt-2">— Upanishad</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
