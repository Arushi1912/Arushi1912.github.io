import { Link } from 'react-router-dom';
import { getWritingPieces } from '../utils/content';

const Writing = () => {
  const pieces = getWritingPieces();

  return (
    <div className="min-h-screen bg-beige pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-blue mb-6">
            Writing
          </h1>
          <div className="h-1 w-24 bg-gold-muted mb-6"></div>
          <p className="text-xl text-slate/70 leading-relaxed">
            Poetry and prose. 
          </p>
        </div>

        {/* Pieces list */}
        <div className="space-y-8">
          {pieces.map((piece) => (
            <Link
              key={piece.slug}
              to={`/writing/${piece.slug}`}
              className="group block bg-cream p-8 md:p-10 border border-gold-muted/40 hover:border-gold-muted transition-all"
            >
              <div className="flex items-center gap-4 mb-4 text-sm text-slate/60">
                <span>{new Date(piece.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span className="capitalize">{piece.category}</span>
              </div>

              <h2 className="text-3xl font-serif font-semibold text-slate mb-4 group-hover:text-emerald-deep transition-colors">
                {piece.title}
              </h2>

              <p className="text-slate/70 leading-relaxed mb-4">
                {piece.excerpt}
              </p>

              <div className="flex items-center text-emerald-deep text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Read more</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Writing;
