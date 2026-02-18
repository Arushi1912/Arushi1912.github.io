const Work = () => {
  const projects = [
    {
      title: 'MIT Event Booking Portal',
      description: 'A progressive web application that digitizes the room booking process for student clubs at MIT, Manipal. Replaced the traditional 3-step pen-paper procedure with an automated system for booking classrooms, auditoriums, and lecture halls. Features real-time availability checking, automated approval workflows, and comprehensive event management.',
      tech: ['React', 'Redux', 'JavaScript', 'Firebase', 'AWS', 'Progressive Web App'],
      github: 'https://github.com/cribbl/miteb-frontend',
      live: 'https://prod.cribblservices.com',
      icon: (
        <svg className="w-16 h-16 text-slate-blue" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
    },
    {
      title: 'Research Portal',
      description: 'A collaborative platform connecting teachers with students for research projects and academic papers at Manipal Institute of Technology. Features project matching, collaboration tools, and academic workflow management to streamline research partnerships between faculty and students.',
      tech: ['Angular', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Arushi1912/ResearchPortal',
      live: null,
      icon: (
        <svg className="w-16 h-16 text-slate-blue" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6zM6.5 12.5v4.94L12 19.94l5.5-2.5V12.5L12 15l-5.5-2.5z"/>
        </svg>
      ),
    },
    {
      title: 'Managers, This One Is For You',
      description: 'Exploratory data analysis of the Mental Health in Tech Survey (OSMI) providing actionable insights for managers. Analyzes workplace mental health patterns, employee attitudes toward disclosure, and the impact of anonymity and support systems on tech worker well-being. Delivers data-driven recommendations for creating supportive work environments.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter Notebook', 'Statistical Analysis'],
      github: null,
      live: 'https://www.kaggle.com/code/arushinigam/managers-this-one-is-for-you',
      icon: (
        <svg className="w-16 h-16 text-slate-blue" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
    },
  ];

  const skills = [
    'Java', 'Python', 'Ruby on Rails', 'JavaScript', 'TypeScript',
    'React', 'Angular', 'Node.js', 'Full Stack Development',
    'RESTful APIs', 'Microservices', 'SQL', 'PostgreSQL', 'MongoDB',
    'Machine Learning', 'Data Science', 'AWS', 'Docker',
    'Agile Development', 'Design Thinking', 'User Experience',
  ];

  return (
    <div className="min-h-screen bg-beige pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-blue mb-6">
            Work
          </h1>
          <div className="h-1 w-24 bg-gold-muted mb-6"></div>
          <p className="text-xl text-slate/70 leading-relaxed">
            Selected projects and technologies I work with
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-12 mb-24">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-beige border border-sage/20 overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/4 flex items-center justify-center p-8 bg-cream/30">
                  {project.icon}
                </div>
                <div className="p-8 md:p-10 md:w-3/4">
                  <h3 className="text-3xl font-semibold text-slate mb-4">
                    {project.title}
                  </h3>
                  <p className="text-slate/70 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-cream text-slate/70 text-sm font-medium border border-sage/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate text-white font-medium hover:bg-slate/90 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        <span>Code</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald text-white font-medium hover:bg-emerald-dark transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-3xl font-semibold text-slate text-center mb-12">
            Technologies & Tools
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-beige text-slate/80 font-medium border border-sage/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;