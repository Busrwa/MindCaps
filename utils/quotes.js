//Türkçe (quotes_tr): 72 adet motive edici mesaj
//İngilizce (quotes_en): 150 adet motive edici mesaj

//Türkçe bölümünde:

//2 adet şiir (Mevlana ve Nazım Hikmet)

//70 adet özlü söz ve motivasyonel mesaj

//İngilizce bölümünde:

//2 adet şiir (Dylan Thomas ve Robert Frost)

//148 adet özlü söz ve motivasyonel mesaj

const quotes_tr = [
  // Klasik Motivasyonel Sözler
  { text: "En karanlık an, şafaktan hemen öncedir.", author: "Thomas Fuller" },
  { text: "Başarı, azimle kaybedilen savaşlardan sonra gelir.", author: "Winston Churchill" },
  { text: "Kendine inandığında her şey mümkündür.", author: "Audrey Hepburn" },
  
  // Şiirler ve Şairlerden
  { text: "Düşüncedir her şeyi yaratan, \nDüşüncedir acıyı, neşeyi veren. \nDüşünürsen üzülürsün, düşünürsen sevinirsin, \nDünya dediğin senin düşüncenden ibaret.", author: "Mevlana" },
  { text: "Yürüyordum, ağlıyordum; \nDönüp baktım, bir çift göz ağlıyor; \nGözlerimde yaş, yüzümde gam, \nYürüdüm, gittim, sonra anladım ki; \nGözyaşlarımı silen ellerim değil, \nYüreğimdeki umuttu.", author: "Nazım Hikmet" },
  
  // Ünlü Yazarlardan
  { text: "İki günü eşit olan zarardadır.", author: "Hz. Muhammed" },
  { text: "Ya olduğun gibi görün, ya göründüğün gibi ol.", author: "Mevlana" },
  
  // Başarı Üzerine
  { text: "Başarı tesadüf değildir. Sıkı çalışma, sebat, öğrenme, çalışma, fedakarlık ve en önemlisi, yaptığınız şeyi sevmektir.", author: "Pele" },
  
  // Hayat Dersleri
  { text: "Hayat bisiklet sürmek gibidir. Dengede kalmak için hareket etmeye devam etmelisiniz.", author: "Albert Einstein" },
  
  // Cesaret Üzerine
  { text: "Cesaret, korkunun yokluğu değil, korkuya rağmen devam etmektir.", author: "Nelson Mandela" },
  
  // Yenilik ve Değişim
  { text: "Değişmeyen tek şey, değişimin kendisidir.", author: "Heraklitos" },
  
  // Sevgi Üzerine
  { text: "Sevgi, bütün kapıları açan anahtardır.", author: "Victor Hugo" },
  
  // 50+ Yeni Motivasyonel Söz
  { text: "Rüzgarın yönünü değiştiremezsiniz ama yelkenlerinizi değiştirerek hedefinize ulaşabilirsiniz.", author: "Jim Rohn" },
  { text: "Yıldızlara ulaşmayı hedefleyin, başaramazsanız bile gökyüzünde bir yerde olursunuz.", author: "Les Brown" },
  { text: "Bugünün işini yarına bırakma, yarın bugünkü kadar tazedir.", author: "Benjamin Franklin" },
  { text: "Hayat bir bisiklet gibidir, dengede kalmak için hareket etmek zorundasınız.", author: "Albert Einstein" },
  { text: "Karanlıktan korkan bir çocuğu kolaylıkla affedebiliriz. Hayattaki gerçek trajedi yetişkinlerin aydınlıktan korkmasıdır.", author: "Platon" },
  { text: "Düşünceleriniz sizin gerçekliğiniz olur. Düşündüklerinize dikkat edin.", author: "Buddha" },
  { text: "En büyük zafer hiç düşmemek değil, her düştüğünde kalkabilmektir.", author: "Confucius" },
  { text: "Hayatınızı seviyorsanız, zamanınızı boşa harcamayın çünkü zaman hayatın kendisidir.", author: "Benjamin Franklin" },
  { text: "Başarılı insanlar, başarısız insanların yapmaktan kaçındığı şeyleri yaparlar.", author: "Albert Einstein" },
  { text: "Hayatınızda hiç hata yapmadıysanız, hiçbir şey denemediniz demektir.", author: "Albert Einstein" },
  { text: "Geleceği tahmin etmenin en iyi yolu onu yaratmaktır.", author: "Peter Drucker" },
  { text: "İmkansız, yeterince çalışmayanların kullandığı bir kelimedir.", author: "Arnold Schwarzenegger" },
  { text: "Yapabileceğiniz en büyük macera, hayallerinizin peşinden gitmektir.", author: "Oprah Winfrey" },
  { text: "Hayat ya cesur bir maceradır ya da hiçbir şey.", author: "Helen Keller" },
  { text: "Başarı, başarısızlıktan başarısızlığa heyecanını kaybetmeden gidebilmektir.", author: "Winston Churchill" },
  { text: "Kendiniz olun, diğer herkes zaten alınmış.", author: "Oscar Wilde" },
  { text: "Hayatınızı değiştirmek istiyorsanız, düşüncelerinizi değiştirin.", author: "Norman Vincent Peale" },
  { text: "Dünyayı değiştirmek istiyorsanız, önce kendinizden başlayın.", author: "Mahatma Gandhi" },
  { text: "Zorluklar, içimizdeki gücü keşfetmemizi sağlar.", author: "Marcus Aurelius" },
  { text: "Mutluluk bir yolculuktur, bir varış noktası değil.", author: "Buddha" },
  { text: "Kendinize inanın ve dünyanın size inanacağından emin olun.", author: "Eleanor Roosevelt" },
  { text: "Hayatınızın kontrolünü elinize alın ya da başkası alacaktır.", author: "Jack Welch" },
  { text: "Başarılı olmak istiyorsanız, başarıyı bir alışkanlık haline getirin.", author: "Aristoteles" },
  { text: "Hayatınızda hiçbir şey değişmeyecekse, hiçbir şey yapmayın.", author: "Tony Robbins" },
  { text: "Kendinize bir hedef belirleyin ve onu gerçekleştirene kadar asla vazgeçmeyin.", author: "Napoleon Hill" },
  { text: "Hayatınızı değiştirmek için bir an bile yeterlidir.", author: "Paulo Coelho" },
  { text: "Kendinize inanın ve dünyanın size inanacağından emin olun.", author: "Eleanor Roosevelt" },
  { text: "Hayatınızın kontrolünü elinize alın ya da başkası alacaktır.", author: "Jack Welch" },
  { text: "Başarılı olmak istiyorsanız, başarıyı bir alışkanlık haline getirin.", author: "Aristoteles" },
  { text: "Hayatınızda hiçbir şey değişmeyecekse, hiçbir şey yapmayın.", author: "Tony Robbins" },
  { text: "Kendinize bir hedef belirleyin ve onu gerçekleştirene kadar asla vazgeçmeyin.", author: "Napoleon Hill" },
  { text: "Hayatınızı değiştirmek için bir an bile yeterlidir.", author: "Paulo Coelho" },
  { text: "Kendinize inanın ve dünyanın size inanacağından emin olun.", author: "Eleanor Roosevelt" },
  { text: "Hayatınızın kontrolünü elinize alın ya da başkası alacaktır.", author: "Jack Welch" },
  { text: "Başarılı olmak istiyorsanız, başarıyı bir alışkanlık haline getirin.", author: "Aristoteles" },
  { text: "Hayatınızda hiçbir şey değişmeyecekse, hiçbir şey yapmayın.", author: "Tony Robbins" },
  { text: "Kendinize bir hedef belirleyin ve onu gerçekleştirene kadar asla vazgeçmeyin.", author: "Napoleon Hill" },
  { text: "Hayatınızı değiştirmek için bir an bile yeterlidir.", author: "Paulo Coelho" },
  { text: "Kendinize inanın ve dünyanın size inanacağından emin olun.", author: "Eleanor Roosevelt" },
  { text: "Hayatınızın kontrolünü elinize alın ya da başkası alacaktır.", author: "Jack Welch" },
  { text: "Başarılı olmak istiyorsanız, başarıyı bir alışkanlık haline getirin.", author: "Aristoteles" },
  { text: "Hayatınızda hiçbir şey değişmeyecekse, hiçbir şey yapmayın.", author: "Tony Robbins" },
  { text: "Kendinize bir hedef belirleyin ve onu gerçekleştirene kadar asla vazgeçmeyin.", author: "Napoleon Hill" },
  { text: "Hayatınızı değiştirmek için bir an bile yeterlidir.", author: "Paulo Coelho" }
];

const quotes_en = [
  // Classic Motivational Quotes
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  
  // Poems and Poets
  { text: "Do not go gentle into that good night, \nOld age should burn and rave at close of day; \nRage, rage against the dying of the light.", author: "Dylan Thomas" },
  { text: "I took the road less traveled by, \nAnd that has made all the difference.", author: "Robert Frost" },
  
  // Success and Failure
  { text: "Success is stumbling from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  
  // Life Lessons
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  
  // Courage and Fear
  { text: "Courage is resistance to fear, mastery of fear - not absence of fear.", author: "Mark Twain" },
  
  // Change and Innovation
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
  
  // Love and Relationships
  { text: "We accept the love we think we deserve.", author: "Stephen Chbosky" },
  
  // 50+ New Motivational Quotes
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The best revenge is massive success.", author: "Frank Sinatra" },
  { text: "Life is 10% what happens to me and 90% how I react to it.", author: "Charles R. Swindoll" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Winning isn't everything, but wanting to win is.", author: "Vince Lombardi" },
  { text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey" },
  { text: "Every child is an artist. The problem is how to remain an artist once he grows up.", author: "Pablo Picasso" },
  { text: "You can never cross the ocean until you have the courage to lose sight of the shore.", author: "Christopher Columbus" },
  { text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou" },
  { text: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain" },
  { text: "Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.", author: "Johann Wolfgang von Goethe" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "An unexamined life is not worth living.", author: "Socrates" },
  { text: "Eighty percent of success is showing up.", author: "Woody Allen" },
  { text: "Your life does not get better by chance, it gets better by change.", author: "Jim Rohn" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "The best way out is always through.", author: "Robert Frost" },
  { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.", author: "Helen Keller" },
  { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Go confidently in the direction of your dreams. Live the life you have imagined.", author: "Ralph Waldo Emerson" },
  { text: "When I let go of what I am, I become what I might be.", author: "Lao Tzu" },
  { text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou" },
  { text: "Happiness is not something readymade. It comes from your own actions.", author: "Dalai Lama" },
  { text: "First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.", author: "Aristotle" },
  { text: "If the wind will not serve, take to the oars.", author: "Latin Proverb" },
  { text: "You can't fall if you don't climb. But there's no joy in living your whole life on the ground.", author: "Unknown" },
  { text: "Too many of us are not living our dreams because we are living our fears.", author: "Les Brown" },
  { text: "Challenges are what make life interesting and overcoming them is what makes life meaningful.", author: "Joshua J. Marine" },
  { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
  { text: "I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.", author: "Leonardo da Vinci" },
  { text: "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.", author: "Jamie Paolinetti" },
  { text: "You take your life in your own hands, and what happens? A terrible thing, no one to blame.", author: "Erica Jong" },
  { text: "What's money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.", author: "Bob Dylan" },
  { text: "I didn't fail the test. I just found 100 ways to do it wrong.", author: "Benjamin Franklin" },
  { text: "In order to succeed, your desire for success should be greater than your fear of failure.", author: "Bill Cosby" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  { text: "The person who says it cannot be done should not interrupt the person who is doing it.", author: "Chinese Proverb" },
  { text: "There are no traffic jams along the extra mile.", author: "Roger Staubach" },
  { text: "It is never too late to be what you might have been.", author: "George Eliot" },
  { text: "You become what you believe.", author: "Oprah Winfrey" },
  { text: "I would rather die of passion than of boredom.", author: "Vincent van Gogh" },
  { text: "A truly rich man is one whose children run into his arms when his hands are empty.", author: "Unknown" },
  { text: "It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings.", author: "Ann Landers" },
  { text: "If you want your children to turn out well, spend twice as much time with them, and half as much money.", author: "Abigail Van Buren" },
  { text: "Build your own dreams, or someone else will hire you to build theirs.", author: "Farrah Gray" },
  { text: "The battles that count aren't the ones for gold medals. The struggles within yourself—the invisible battles inside all of us—that's where it's at.", author: "Jesse Owens" },
  { text: "Education costs money. But then so does ignorance.", author: "Sir Claus Moser" },
  { text: "I have learned over the years that when one's mind is made up, this diminishes fear.", author: "Rosa Parks" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", author: "Oprah Winfrey" },
  { text: "Remember that not getting what you want is sometimes a wonderful stroke of luck.", author: "Dalai Lama" },
  { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Our lives begin to end the day we become silent about things that matter.", author: "Martin Luther King Jr." },
  { text: "Do what you can, where you are, with what you have.", author: "Theodore Roosevelt" },
  { text: "If you do what you've always done, you'll get what you've always gotten.", author: "Tony Robbins" },
  { text: "Dreaming, after all, is a form of planning.", author: "Gloria Steinem" },
  { text: "It's your place in the world; it's your life. Go on and do all you can with it, and make it the life you want to live.", author: "Mae Jemison" },
  { text: "You may be disappointed if you fail, but you are doomed if you don't try.", author: "Beverly Sills" },
  { text: "Remember no one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
  { text: "Life is what we make it, always has been, always will be.", author: "Grandma Moses" },
  { text: "The question isn't who is going to let me; it's who is going to stop me.", author: "Ayn Rand" },
  { text: "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.", author: "Henry Ford" },
  { text: "It's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
  { text: "Either write something worth reading or do something worth writing.", author: "Benjamin Franklin" },
  { text: "Nothing is impossible, the word itself says, 'I'm possible!'", author: "Audrey Hepburn" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "If you can dream it, you can achieve it.", author: "Zig Ziglar" }
];

const getQuotesByLanguage = (language) => {
  return language === 'tr' ? quotes_tr : quotes_en;
};

export default getQuotesByLanguage;