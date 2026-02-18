import matter from "gray-matter";

// In a real app, you'd dynamically import markdown files
// For now, we'll create a helper that returns sample data
// You can later implement dynamic imports with Vite's import.meta.glob

export const getWritingPieces = () => {
  // Sample data - in production, this would parse actual .md files
  return [
    {
      slug: "ray-of-sunshine",
      title: "Ray of Sunshine",
      date: "2025-10-14",
      category: "poetry",
      excerpt: "i saw you for the first time, size of my palm...",
      content: `i saw you for the first time 
size of my palm
and you fit perfectly

i learned so much about you
as you grew
he likes chicken bones
and loves to be run after 

i taught you fetch,
and handshake, and a high five
while you taught me unconditional love
and kindness, a rare find 

and now you're growing evermore
they say you've gotten slow
how is that possible,
when it was only yesterday
i was chasing you around the dining table

i will never forget
how you found me
alone, in my balcony
and sniffed me while my tears ran dry 
i will never forget
how you held me 

so please, could you freeze time?
they say this is life
what good can be this life
without you near me

my little ray of sunshine
my little bundle of joy
i don't want to part ways
may the spiritual world be my saving grace

because an earth without you
leaves nothing to embrace`,
    },
    {
      slug: "learning-discernment",
      title: "Learning Discernment",
      date: "2023-01-20",
      category: "prose",
      excerpt: "you can only help people who want to be helped...",
      content: `you can only help people who want to be helped ~ 

sometimes believing in the potential of someone can be like painting a beautiful portrait of a person with poor vision: it's pointless 

you hold the portrait up excitedly, it has the shine of their eyes, with colors like crimson and some we don't even know names of: this portrait shows everything - their grit, their endless capacity to love, their inner child that is finally calm, and you tell them:

"look, do you see? you are really this, this is your true authentic self, this painting has it all, your future self, your limitless potential"

they say they cannot see, they only see shades of grey and blue

you're confused - "how do you not see what I see?" 

so you lift the painting higher excitedly again on your tiptoes, you add more color, add finer details like a wider smile and say "look, you can be happy, look! this is you smiling, isn't it beautiful?"

they continue sitting still, no interest in the view, awake yet fully asleep

and now you wonder, 'is it me? is my painting not good enough?'

and now the excitement slowly turns into frustration, you don't know what to do anymore, you just stand there, holding it up, tiring yourself, praying someday they'll see what you see

here's a word of advice: leave, and let them come to you and say: "help me change"

what should you do now?

be the change you seek in the world, inspire them with stories of your quests, so you can show them that if you can do it, so can they

and i promise you: more often than not, they do change 

and if they don't: c'est la vie my friend`,
    },
    {
      slug: "mirrors",
      title: "Mirrors",
      date: "2023-07-05",
      category: "poetry",
      excerpt: "lately, when i look in the mirror, i don't like what i see...",
      content: `lately, when i look in the mirror
i don't like what i see;
'can i cut these parts',
'or change this skin'',
'is this all i'll ever be?'

my friends helped me carry this mirror
from upper east,
it belonged to a girl in parsons 
i wonder if she gave it away 
for the same insecurities 

my inner critic has taken a new form:
or maybe this is one of many
and lately it's the loudest 
ive ever seen 
but i've chosen to fight

so i wake up, and smile
even when i see my skin so dull 
or a stomach too bloated,
i remind myself: this is all me
a beautiful me, with a whole body
functioning to its best abilities
for its crazy life & me

i'm sure everyone has them;
insecurities - how wonderful 
it could be, if we saw ourselves
from another's eyes:
i'd imagine we would look 
far more pretty, far smarter, 
but that shouldn't be 

this is the hard, arduous journey 
of loving ourselves truly
we came here with one purpose 
to love, and be loved 
so let's think of it 
as my spiritual undertaking,
a quest i would eventually conquer, 
a dream i'd make reality, 
a lonely mission for a billion beings, 
of finally looking in the mirror 
and loving what they see`,
    },
  ];
};

export const getWritingPiece = (slug) => {
  const pieces = getWritingPieces();
  return pieces.find((piece) => piece.slug === slug);
};

export const parseMarkdownFile = (fileContent) => {
  const { data, content } = matter(fileContent);
  return {
    frontmatter: data,
    content,
  };
};
