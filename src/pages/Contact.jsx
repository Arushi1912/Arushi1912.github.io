const Contact = () => {
  const socialLinks = [
    {
      name: 'Email',
      url: 'mailto:an452@cornell.edu',
      description: '',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Arushi1912',
      description: 'github.com/yourusername',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/arushi-nigam/',
      description: 'linkedin.com/in/yourusername',
    }
  ];

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 flex items-center">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-slate mb-6">
            Let's Connect
          </h1>
          <div className="h-1 w-24 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-slate/70 leading-relaxed max-w-2xl mx-auto">
            I'm always open to interesting conversations, collaborations, or just a friendly hello.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-beige p-8 border border-sage/20 hover:border-emerald/40 transition-all"
            >
              <h3 className="text-2xl font-semibold text-slate mb-2 group-hover:text-emerald transition-colors">
                {link.name}
              </h3>
              <p className="text-slate/60 text-sm">
                {link.description}
              </p>
              <div className="mt-4 flex items-center text-emerald text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Connect</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Additional note */}
        <div className="bg-beige p-10 border border-sage/20 text-center">
          <p className="text-slate/70 leading-relaxed max-w-lg mx-auto">
            Whether you want to discuss a project, share ideas, or just chat about books and code, I'd love to hear from you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
