const Bookshelf = () => {
  const currentYear = 2026;
  
  const currentlyReading = [
    {
      title: 'Just Add Water: My Swimming Life',
      author: 'Katie Ledecky',
      cover: 'https://images-na.ssl-images-amazon.com/images/P/1668060205.01.L.jpg',
      progress: 'Currently Reading',
      thoughts: 'If anyone wants to learn the art of self improvement, Katie Ledecky is your go to.',
    },
    {
      title: 'The Upanishads',
      author: 'Penguin Classics',
      cover: 'https://covers.openlibrary.org/b/isbn/9780140441635-M.jpg',
      progress: 'Currently Reading',
      thoughts: '',
    },
  ];

  const previouslyReadThisYear = [
    // Add any books you've finished in 2026 here
  ];

  const booksByYear = {
    2025: [
      {
        title: 'Becoming',
        author: 'Michelle Obama',
        cover: 'https://covers.openlibrary.org/b/isbn/9781524763138-M.jpg',
        rating: 5,
        thoughts: '',
      },
      {
        title: 'Why Not Me?',
        author: 'Mindy Kaling',
        cover: 'https://covers.openlibrary.org/b/isbn/9780804138161-M.jpg',
        rating: 5,
        thoughts: '',
      },
      {
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        cover: 'https://covers.openlibrary.org/b/isbn/9781585424337-M.jpg',
        rating: 4,
        thoughts: '',
      },
      {
        title: 'Deep Work',
        author: 'Cal Newport',
        cover: 'https://covers.openlibrary.org/b/isbn/9781455586691-M.jpg',
        rating: 5,
        thoughts: 'Transformed how I approach focused work and productivity. Essential reading for anyone in the knowledge economy.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-beige pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-blue mb-6">
            Bookshelf
          </h1>
          <div className="h-1 w-24 bg-gold-muted mb-6"></div>
          <p className="text-xl text-slate/70 leading-relaxed">
            Books that have shaped my thinking and kept me company
          </p>
        </div>

        {/* Currently Reading */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold text-slate mb-8">
            Currently Reading
          </h2>

          <div className="space-y-8">
            {currentlyReading.map((book, index) => (
              <div key={index} className="bg-beige border border-sage/20 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-10 md:w-3/4">
                    <h3 className="text-2xl font-semibold text-slate mb-2">
                      {book.title}
                    </h3>
                    <p className="text-lg text-slate/70 mb-4">
                      by {book.author}
                    </p>
                    <div className="inline-block bg-emerald/10 text-emerald px-4 py-2 text-sm font-medium mb-6 border border-emerald/20">
                      {book.progress}
                    </div>
                    {book.thoughts && (
                      <p className="text-slate/70 leading-relaxed">
                        <span className="font-medium">My thoughts:</span> {book.thoughts}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previously Read This Year */}
        {previouslyReadThisYear.length > 0 && (
          <div className="mb-24">
            <h2 className="text-3xl font-semibold text-slate mb-8">
              Previously Read
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {previouslyReadThisYear.map((book, index) => (
                <div
                  key={index}
                  className="bg-beige border border-sage/20"
                >
                  <div className="flex gap-6 p-6">
                    <div className="w-24 h-36 flex-shrink-0">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover shadow-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-slate/60 mb-2">
                        by {book.author}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < book.rating ? 'text-gold fill-gold' : 'text-sage/40'}`}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  {book.thoughts && (
                    <div className="px-6 pb-6">
                      <p className="text-slate/70 text-sm leading-relaxed">
                        <span className="font-medium">My thoughts:</span> {book.thoughts}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Books by Previous Years */}
        {Object.entries(booksByYear)
          .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort years in descending order
          .map(([year, books]) => (
            <div key={year} className="mb-16">
              <h2 className="text-3xl font-semibold text-slate mb-8">
                Previously Read in {year}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {books.map((book, index) => (
                  <div
                    key={index}
                    className="bg-beige border border-sage/20"
                  >
                    <div className="flex gap-6 p-6">
                      <div className="w-24 h-36 flex-shrink-0">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover shadow-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate mb-1">
                          {book.title}
                        </h3>
                        <p className="text-sm text-slate/60 mb-2">
                          by {book.author}
                        </p>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < book.rating ? 'text-gold fill-gold' : 'text-sage/40'}`}
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    {book.thoughts && (
                      <div className="px-6 pb-6">
                        <p className="text-slate/70 text-sm leading-relaxed">
                          <span className="font-medium">My thoughts:</span> {book.thoughts}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Bookshelf;