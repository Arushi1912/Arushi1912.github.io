import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getWritingPiece } from '../utils/content';

const WritingPiece = () => {
  const { slug } = useParams();
  const piece = getWritingPiece(slug);

  if (!piece) {
    return (
      <div className="min-h-screen bg-cream pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-slate">
            Piece not found
          </h1>
          <Link to="/writing" className="text-emerald hover:text-emerald-dark">
            Back to Writing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige pt-32 pb-24">
      <article className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Back button */}
        <Link
          to="/writing"
          className="inline-flex items-center gap-2 text-slate/60 hover:text-emerald-deep mb-12 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Writing</span>
        </Link>

        {/* Article header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-sm text-slate/60">
            <span>{new Date(piece.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span className="capitalize">{piece.category}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-blue leading-tight">
            {piece.title}
          </h1>
          <div className="h-1 w-24 bg-gold-muted"></div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-cream p-10 md:p-12 border border-gold-muted/40 whitespace-pre-line leading-relaxed text-slate/80 text-lg">
            <ReactMarkdown>
              {piece.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gold-muted/30">
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 text-emerald-deep hover:text-emerald font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View all writing
          </Link>
        </div>
      </article>
    </div>
  );
};

export default WritingPiece;
