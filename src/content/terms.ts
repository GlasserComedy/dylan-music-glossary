import folkloreCover from "@/assets/Talking_folklore_center_cover.jpg.asset.json";
import folkloreSheet from "@/assets/talking-folklore-center-2.jpg.asset.json";
import folkloreSeries from "@/assets/talking-folklore-center-3.jpg.asset.json";

export type Category =
  | "Music"
  | "Words"
  | "Performance"
  | "Roots"
  | "Influence"
  | "Reinvention";

export type MediaRef =
  | { kind: "youtube"; id?: string; spotifyId?: string; albumId?: string }
  | { kind: "spotify"; id: string }
  | { kind: "search"; query: string };

export type Term = {
  slug: string;
  title: string;
  category: Category;
  definition: string;
  inDylan: string;
  example?: {
    title: string;
    /** A short note on how this song illustrates the term. */
    note: string;
    media: MediaRef;
  };
  /** Additional song examples, shown as separate boxes alongside `example`. */
  examples?: {
    title: string;
    note: string;
    media: MediaRef;
  }[];
  /** Archival images shown in the term detail panel. */
  documents?: { src: string; caption: string }[];
  related?: string[];
  /** Extra names, places and facts that should find this term in search. */
  aliases?: string[];
};


export const CATEGORIES: Category[] = [
  "Music",
  "Words",
  "Performance",
  "Roots",
  "Influence",
  "Reinvention",
];

export const TERMS: Term[] = [
  {
    slug: "abstract-lyrics",
    title: "Abstract Lyrics",
    category: "Words",
    definition:
      "Lyrics that suggest meaning through imagery, metaphor, or dreamlike language rather than direct storytelling.",
    inDylan:
      "Dylan mastered this in songs like Visions of Johanna and Desolation Row, influencing generations of songwriters.",
    example: {
      title: "It's Alright, Ma (I'm Only Bleeding)",
      note:
        "The song piles up images of hypocrisy and disillusion without ever spelling out a single argument \u2014 meaning arrives through accumulation rather than statement.",
      media: { kind: "youtube", id: "_CJHbfkROow", spotifyId: "6ERleVBO60Qdv4Yl1bJHKU" },
    },
    related: ["imagery", "surrealism", "lyric"],
  },
  {
    slug: "a-cappella",
    title: "A cappella",
    category: "Performance",
    definition:
      "Vocal music performed without any instrumental accompaniment, using only the human voice for melody, harmony, and rhythm.",
    inDylan:
      "Dylan never released a fully a cappella recording, but his songs have been arranged by choirs and vocal groups that strip away instruments and let the lyrics and harmony carry everything.",
    example: {
      title: "Man of Constant Sorrow",
      note:
        "Home Free's all-vocal cover of the folk standard Dylan recorded on his 1962 debut replaces instruments with harmony and vocal percussion, turning the song into a contemporary a cappella performance.",
      media: { kind: "youtube", id: "-ew_bfFvros", spotifyId: "2cCbLVs1UlYPmvRjj666Uu" },
    },
    related: ["instrumental", "harmony", "folk-revival"],
  },
  {
    slug: "acoustic",
    title: "Acoustic",
    category: "Performance",
    definition:
      "Music played on unamplified instruments, often highlighting a clear voice and natural resonance.",
    inDylan:
      "Dylan's earliest recordings were almost entirely acoustic, letting the words and melody carry the performance without electric backing.",
    example: {
      title: "All I Really Want to Do",
      note:
        "A light, acoustic folk arrangement keeps the focus on the conversational vocal and the song's playful, sympathetic lyric.",
      media: { kind: "youtube", id: "WYDfjV2B5Gk", spotifyId: "2JcAqr3fUWIFZWPa9rjkwm" },
    },
    related: ["folk-revival", "newport-1965"],
  },
  {
    slug: "ballad",
    title: "Ballad",
    category: "Roots",
    definition:
      "A slow, narrative song, traditionally telling a story of love, loss, or legend across several verses.",
    inDylan:
      "Dylan wrote some of the finest modern ballads, from the aching Boots of Spanish Leather to the sprawling Sad-Eyed Lady of the Lowlands.",
    example: {
      title: "Boots of Spanish Leather",
      note:
        "A classic ballad exchange of letters between two lovers separated by an ocean, telling its story verse by verse in the voice of both characters.",
      media: { kind: "youtube", id: "iy6wryJMwVU", spotifyId: "6QHYEZlm9wyfXfEM1vSu1P" },
    },
    related: ["narrative", "folk-revival"],
  },
  {
    slug: "blues",
    title: "Blues",
    category: "Roots",
    definition:
      "An African-American musical form built on a 12-bar chord pattern, blue notes, and a call-and-response feel.",
    inDylan:
      "Dylan absorbed the blues from Robert Johnson and Blind Willie McTell; the form runs beneath much of Blood on the Tracks.",
    example: {
      title: "Meet Me in the Morning",
      note:
        "A straight 12-bar blues on Blood on the Tracks, complete with slide guitar and a lyric of weary, early-morning longing.",
      media: { kind: "youtube", id: "VE6-uc1zr3s", spotifyId: "53ygARQf1f30Z0EmXPHWGT" },
    },
    related: ["chord-progression", "woody-guthrie"],
  },
  {
    slug: "chord-progression",
    title: "Chord Progression",
    category: "Music",
    definition:
      "A sequence of chords that provides the harmonic backbone of a song.",
    inDylan:
      "Dylan built many of his best-known songs on a handful of chords, letting a plain progression carry extraordinary words.",
    example: {
      title: "Knockin' on Heaven's Door",
      note:
        "Its endlessly repeating four-chord cycle is simple and effective, helping make the song itself one of the most covered in popular music.",
      media: { kind: "youtube", id: "rm9coqlk8fY", spotifyId: "5Qyq0oeQ0amjnpwne2usj0" },
    },
    related: ["harmony", "rhythm"],
  },
  {
    slug: "cover",
    title: "Cover",
    category: "Reinvention",
    definition:
      "A cover is when an artist performs someone else's song; an original is one they wrote themselves.",
    inDylan:
      "Dylan's originals are legendary, but his reinterpretations of folk and blues classics show his deep respect for tradition.",
    example: {
      title: "Make You Feel My Love (Adele version)",
      note:
        "Adele's version reshapes Dylan's song into a piano ballad \u2014 the same words and melody, a completely different reading.",
      media: { kind: "youtube", id: "0put0_a--Ng", spotifyId: "3sWUxzbfXGLdoSe6dqF0bW" },
    },
    related: ["singer-songwriter"],
  },
  {
    slug: "folk-revival",
    title: "Folk Revival",
    category: "Roots",
    definition:
      "The mid-20th-century American movement that brought traditional folk songs back into popular culture through artists like Pete Seeger and Joan Baez.",
    inDylan:
      "Dylan arrived in Greenwich Village at its height, then helped push the movement toward original songwriting and rock.",
    example: {
      title: "House of the Risin' Sun",
      note:
        "A traditional song Dylan learned in the Village and recorded on his debut, showing how the revival passed old material into new hands.",
      media: { kind: "youtube", id: "RP_caKDfoyU", spotifyId: "3yFRbFaSj8MeNuYaN21HIu" },
    },
    related: ["acoustic", "woody-guthrie", "protest-song"],
  },
  {
    slug: "gospel",
    title: "Gospel",
    category: "Roots",
    definition:
      "Christian devotional music rooted in African-American church traditions, marked by call-and-response and impassioned vocals.",
    inDylan:
      "Dylan's late-70s conversion produced Slow Train Coming and Saved, records steeped in gospel choirs and testifying vocals.",
    example: {
      title: "Gotta Serve Somebody",
      note:
        "Recorded during Dylan's born-again period, it carries the call-and-response drive and moral urgency of the Black gospel tradition.",
      media: { kind: "youtube", id: "wC10VWDTzmU", spotifyId: "760420tYNmNjFgi8bWvbop" },
    },
    related: ["blues"],
  },
  {
    slug: "harmonica",
    title: "Harmonica",
    category: "Performance",
    definition:
      "A free-reed wind instrument played by exhaling and inhaling through its channels; small, cheap, and loud enough to ride over a guitar, it became a fixture of both blues and folk.",
    inDylan:
      "Dylan's first released recordings were not as a singer, but as a harmonica sideman: he played on Harry Belafonte's 'The Midnight Special' in 1961 and on Carolyn Hester's 1962 Columbia album, and later added harp to sessions with Big Joe Williams. He wore the instrument on a neck rack over his guitar, turning it into a visual signature and a raw, keening counter-voice to his singing.",
    example: {
      title: "Freight Train Blues",
      note:
        "From his 1962 debut album, this is folk harmonica in a rack: short, chugging fills that echo the rhythm of a train beneath a solo voice and guitar.",
      media: { kind: "youtube", spotifyId: "1v4EF7zZLvC8XkcEncOTue" },
    },
    examples: [
      {
        title: "Pledging My Time",
        note:
          "On Blonde on Blonde the harmonica snarls through a full electric band, showing how the little instrument could hold its own in a roaring blues setting.",
        media: { kind: "youtube", id: "ODdJnWKE4ZE", spotifyId: "2qTvEdNY21mL9whUJot9Oc" },
      },
    ],
    related: ["folk-revival"],
  },
  {
    slug: "harmony",
    title: "Harmony",
    category: "Music",
    definition:
      "The combination of simultaneously sounded notes to produce chords and chord progressions that support a melody.",
    inDylan:
      "Dylan's simpler harmonic palette let the words lead — but his collaborations with The Band added rich vocal harmony behind him.",
    example: {
      title: "I Shall Be Released (with The Band)",
      note:
        "The layered vocals of Dylan and The Band turn a simple hymn-like tune into a chorus of voices moving together in harmony.",
      media: { kind: "youtube", id: "oHL5Y-ZCTY8", spotifyId: "7fGYJT5dBuGFxER8iWS8nQ" },
    },
    related: ["chord-progression", "rhythm"],
  },
  {
    slug: "imagery",
    title: "Imagery",
    category: "Words",
    definition:
      "Descriptive language that appeals to the senses and conjures pictures in the mind. In Dylan's work it ranges from concrete, almost cinematic snapshots to dreamlike, symbolist visions, often compressing a whole world into a single line.",
    inDylan:
      "From the early 'foggy ruins of time' and 'sad forests' to the hallucinogenic visions of the mid-1960s and the parched, weathered landscapes of his later albums, Dylan built his songs out of pictures. His images are rarely decorative; they act as emotional arguments, turning a train whistle, a pebble, or a ghost of electricity into something the listener can almost see. 'A Hard Rain's A-Gonna Fall' piles up apocalyptic pictures, while 'Visions of Johanna' lets disconnected images float like projections in a dark room.",
    example: {
      title: "Visions of Johanna",
      note:
        "Neon lights, ghosts of electricity and a night watchman's flashlight give the song a set of pictures far more precise than its story, showing how Dylan can build a whole world from a few charged images.",
      media: { kind: "youtube", id: "AwuCF5lYqEE", spotifyId: "2rslQV48gNv3r9pPrQFPW1" },
    },
    related: ["abstract-lyrics", "metaphor", "surrealism"],
  },
  {
    slug: "jack-kerouac",
    title: "Jack Kerouac",
    category: "Influence",
    definition:
      "Novelist and poet at the center of the Beat Generation, celebrated for spontaneous prose, road mythology, and jazz-inflected phrasing.",
    inDylan:
      "Dylan carried On the Road with him as a young man; the free-associative rush of Chimes of Freedom owes something to Kerouac's line.",
    example: {
      title: "Chimes of Freedom",
      note:
        "Its long, tumbling lines and visionary road imagery read like Kerouac's spontaneous prose set to a melody.",
      media: { kind: "youtube", id: "zDOHhx_dk1g", spotifyId: "5zOiSgAZJhikocvA3KdSpX" },
    },
    related: ["surrealism", "abstract-lyrics"],
  },
  {
    slug: "lyric",
    title: "Lyric",
    category: "Words",
    definition:
      "The words of a song, distinct from melody and harmony. The term reaches back to ancient Greece, where a lyric was a poem sung to the lyre, and it has come to mean any short, song-like verse that compresses feeling into a few charged lines. In popular music, the lyric is the carrier of story, image, argument, and mood.",
    inDylan:
      "From the earliest folk songs to the late-period meditations, Dylan treated the lyric as a form capable of anything: reportage, confession, prophecy, joke, and dream. He absorbed the Romantic lyric of Robert Burns, the modernist density of Eliot and Pound, the blues' stoic shorthand, and the talking blues' stand-up monologue, then folded them into a voice that reset what a popular song's words were allowed to do.",
    example: {
      title: "Shelter from the Storm",
      note:
        "The words carry the whole song \u2014 a plainspoken narrative of refuge and betrayal whose power lies almost entirely in the writing.",
      media: { kind: "youtube", id: "-gsDBuHwqbM", spotifyId: "0e7x8s2ke6KxkWwrL4HJMB" },
    },
    related: ["abstract-lyrics", "imagery", "narrative", "bard", "literature"],
  },
  {
    slug: "metaphor",
    title: "Metaphor",
    category: "Words",
    definition:
      "A figure of speech that describes one thing as if it were another, opening up layered meanings.",
    inDylan:
      "A Hard Rain's a-Gonna Fall builds an apocalypse out of stacked metaphors — the hard rain itself never gets literally defined.",
    example: {
      title: "A Hard Rain's a-Gonna Fall",
      note:
        "The hard rain is never explained; it stands in for catastrophe, judgment and grief all at once.",
      media: { kind: "youtube", id: "T5al0HmR4to", spotifyId: "7ny2ATvjtKszCpLpfsGnVQ" },
    },
    related: ["imagery", "abstract-lyrics", "protest-song"],
  },
  {
    slug: "narrative",
    title: "Narrative",
    category: "Words",
    definition:
      "A song that tells a story with characters, setting, and unfolding events, often moving like a short film or spoken tale set to music.",
    inDylan:
      "North Country Blues unfolds the slow collapse of an iron-range mining town through the voice of a woman watching her family and community come apart. Like a miniature novel, it gives us a place, a timeline, and a witness who carries the weight of the story.",
    example: {
      title: "North Country Blues",
      note:
        "Told from a single woman's perspective, the song traces a town's decline across seasons and years: the mines closing, the men leaving, the stores standing empty. It is reportage by way of lived memory.",
      media: { kind: "youtube", id: "r5GjjUppig8", spotifyId: "3cY8cOjaN8Lwi08g9Fpr6D" },
    },
    related: ["ballad", "protest-song"],
  },
  {
    slug: "newport-1965",
    title: "Newport 1965",
    category: "Reinvention",
    definition:
      "The 1965 Newport Folk Festival set at which Dylan first played electric, dividing the folk audience. The Newport Folk Festival itself was founded in 1959 by jazz impresario George Wein, singer Theodore Bikel, and a circle of folk advocates as a counterpart to the already established Newport Jazz Festival. It quickly became the annual summit of the American folk revival, a place where Lead Belly's heirs, Woody Guthrie's disciples, and a new generation of songwriters shared stages and workshops on the lawns of Newport, Rhode Island.",
    inDylan:
      "Dylan was already a Newport regular: he had been introduced to the festival by Pete Seeger, who saw him as the movement's most important new voice. By 1963 he was being hailed as a king of folk at Newport, and by 1964 he was moving away from protest songs toward more personal, surreal writing. The 1965 festival was therefore both the climax of his folk apprenticeship and the moment he declared his independence from it. Backed by members of the Paul Butterfield Blues Band — Mike Bloomfield on guitar, Al Kooper on organ, and others — Dylan opened his short Sunday-night set with Maggie's Farm. The electric instruments, the volume, and the restless crowd reaction have been debated, mythologized, and reinterpreted ever since. Legend has it that Pete Seeger threatened to axe the cables with a hatchet because he could not hear the words over the noise; whatever the exact truth, the moment symbolized the fracturing of the folk-revival consensus and the arrival of rock as a serious adult language. The set's long afterlife has made it one of the most consequential weekends in modern music.",
    example: {
      title: "Maggie's Farm (Newport 1965)",
      note:
        "The opening number of the electric set — the recording captures the crowd's confusion, applause, and the sense that something irreversible was happening in real time.",
      media: { kind: "youtube", id: "32Rz7RLKUWA", spotifyId: "0DPYCtNwxDxAFZD9S6W2Jk" },
    },
    related: ["acoustic", "folk-revival", "pete-seeger", "jimi-hendrix"],
  },
  {
    slug: "nobel-prize",
    title: "Nobel Prize",
    category: "Influence",
    definition:
      "The 2016 Nobel Prize in Literature, awarded to Dylan 'for having created new poetic expressions within the great American song tradition.'",
    inDylan:
      "The award reframed the popular song as literature and set off wide debate about the boundaries of the form.",
    example: {
      title: "Mr. Tambourine Man",
      note:
        "Often cited as the song where Dylan's writing moves fully into poetry, it was central to the case that his songs are literature.",
      media: { kind: "youtube", id: "oecX_1pqxk0", spotifyId: "7FsmZP2mj7qx7YDRrjGEUR" },
    },
    related: ["lyric", "singer-songwriter"],
  },
  {
    slug: "protest-song",
    title: "Protest Song",
    category: "Influence",
    definition:
      "A song written to challenge injustice, war, or political power.",
    inDylan:
      "Masters of War is one of the most unsparing protest songs ever recorded; Dylan called it a curse, not a plea.",
    example: {
      title: "Masters of War",
      note:
        "A direct address to arms manufacturers, unsparing and unrhetorical \u2014 protest with no attempt at persuasion.",
      media: { kind: "youtube", id: "JEmI_FT4YHU", spotifyId: "5kZotoDYqPbLgcB35jkmRZ" },
    },
    related: ["folk-revival", "narrative"],
  },
  {
    slug: "rhythm",
    title: "Rhythm",
    category: "Music",
    definition:
      "The pattern of stressed and unstressed beats that gives a song its pulse and forward motion.",
    inDylan:
      "Subterranean Homesick Blues moves in a rapid-fire talking rhythm that anticipates rap by more than a decade.",
    example: {
      title: "Subterranean Homesick Blues",
      note:
        "The words come in a clipped, hammering rhythm that pushes ahead of the beat, driving the song more than the melody does.",
      media: { kind: "youtube", id: "MGxjIBEZvx0", spotifyId: "6k9DUKMJpWvu6eFG3O64Lg" },
    },
    related: ["chord-progression", "harmony"],
  },
  {
    slug: "singer-songwriter",
    title: "Singer-Songwriter",
    category: "Words",
    definition:
      "An artist who writes, composes, and performs their own songs, conveying personal vision through voice and words.",
    inDylan:
      "Dylan emerged in the early 1960s as a defining voice of the singer-songwriter tradition, blending poetic lyrics with memorable melodies.",
    example: {
      title: "Don't Think Twice, It's All Right",
      note:
        "Words, melody and performance all come from one person \u2014 a farewell song that only works in the writer's own voice.",
      media: { kind: "youtube", id: "1iHhWh9FtsQ", spotifyId: "2WOjLF83vqjit2Zh4B69V3" },
    },
    related: ["cover", "narrative", "lyric"],
  },
  {
    slug: "surrealism",
    title: "Surrealism",
    category: "Words",
    definition:
      "A 20th-century art movement that juxtaposed unreal images to reach a truth beyond ordinary logic.",
    inDylan:
      "Desolation Row is an 11-minute surrealist parade — Einstein disguised as Robin Hood, Cinderella sweeping up on Desolation Row.",
    example: {
      title: "Desolation Row",
      note:
        "Historical and fictional figures wander through the same street scene, logic suspended in favour of dream imagery.",
      media: { kind: "youtube", id: "hUvcWXTIjcU", spotifyId: "4n1ZGm3TxYmoYe1YR8cMus" },
    },
    related: ["imagery", "abstract-lyrics", "jack-kerouac"],
  },
  {
    slug: "talkin-blues",
    title: "Talkin' Blues",
    category: "Roots",
    definition:
      "A spoken-sung form over a simple blues progression, often satirical, popularized by Woody Guthrie.",
    inDylan:
      "Dylan's early sets were full of talkin' blues — sharp, funny, and unmistakably indebted to Guthrie.",
    example: {
      title: "Talkin' World War III Blues",
      note:
        "Dylan half-speaks the verses over a plain blues shuffle, landing jokes between the chord changes.",
      media: { kind: "youtube", id: "TYtVc56o9oo", spotifyId: "0ePDsEDDIPZNpbwRUEXKoX" },
    },
    related: ["woody-guthrie", "blues"],
  },
  {
    slug: "woody-guthrie",
    title: "Woody Guthrie",
    category: "Roots",
    definition:
      "American folk singer and songwriter (1912–1967) whose plain-spoken songs of working people, dust storms, and social justice became the template for the American folk revival. Born in Oklahoma, Guthrie travelled the country during the Great Depression, absorbing blues, hillbilly, cowboy songs, and union hymns, then reshaping them into hundreds of Dust Bowl ballads, children's songs, and political anthems. His guitar bore a sticker reading 'This Machine Kills Fascists,' and his most famous song, 'This Land Is Your Land,' was written as a defiant answer to 'God Bless America.' By the time a new generation discovered him in the 1950s, his influence was already embedded in every folk singer who tried to tell a true story in plain language.",
    inDylan:
      "Dylan idolised Guthrie before he arrived in New York. In January 1961 he travelled to Greystone Park Psychiatric Hospital in New Jersey, where Guthrie was hospitalised with Huntington's disease, and sang for him at his bedside. That encounter became the central myth of Dylan's early years: the young disciple receiving a blessing from the dying master. He wrote 'Song to Woody' on his debut album as a direct tribute, and Guthrie's restless, travelling, truth-telling persona became the model Dylan first imitated and then outgrew. Long after he moved beyond protest songs, the shadow of Guthrie — the drifter with a guitar, a notebook, and a moral compass — remained in Dylan's imagination.",
    example: {
      title: "Song to Woody",
      note:
        "Written for Guthrie and built on the melody of his own 1913 Massacre, it is a debt acknowledged in the song itself.",
      media: { kind: "youtube", id: "lOWfCVQBixs", spotifyId: "0dfdXhBg11XA16XgAEtFcN" },
    },
    related: ["folk-revival", "talkin-blues"],
  },
  {
    slug: "film-music",
    title: "Film Music / Soundtrack",
    category: "Influence",
    definition:
      "Songs written or used for movies.",
    inDylan:
      "Dylan contributed unforgettable soundtrack pieces, from Knockin' on Heaven's Door in Pat Garrett and Billy the Kid to his Oscar-winning Things Have Changed from Wonder Boys.",
    example: {
      title: "Things Have Changed (from Wonder Boys)",
      note:
        "Written for Wonder Boys, the song works both as a scene-setter in the film and as a standalone record.",
      media: { kind: "youtube", id: "L9EKqQWPjyo", spotifyId: "2gmaLBS73JrG0zlnEb2Eeo" },
    },
  },
  {
    slug: "finger-picking",
    title: "Finger Picking",
    category: "Performance",
    definition:
      "A guitar technique where the fingers pluck individual strings.",
    inDylan:
      "Dylan used fingerpicking early in his folk career, particularly on songs influenced by Woody Guthrie and traditional blues.",
    example: {
      title: "Don't Think Twice, It's All Right",
      note:
        "The rolling fingerpicked pattern runs unbroken beneath the vocal, giving the song its restless forward motion.",
      media: { kind: "youtube", id: "1iHhWh9FtsQ", spotifyId: "2WOjLF83vqjit2Zh4B69V3" },
    },
    related: ["flat-picking", "strumming"],
  },
  {
    slug: "flat-picking",
    title: "Flat Picking",
    category: "Performance",
    definition:
      "A guitar technique that uses a pick to strike single notes or chords.",
    inDylan:
      "Dylan often combined flat picking with strumming, giving his folk and rock songs rhythmic drive.",
    example: {
      title: "Ballad of Hollis Brown",
      note:
        "Struck with a flatpick, the insistent single-chord figure keeps the grim story moving.",
      media: { kind: "youtube", id: "_8xkxy3tXTA", spotifyId: "3Si9u9FVlUTcUXVcawnstJ" },
    },
    related: ["finger-picking", "strumming"],
  },
  {
    slug: "keyboard",
    title: "Keyboard",
    category: "Performance",
    definition:
      "A family of instruments including piano and organ.",
    inDylan:
      "Dylan used keyboards both live and in the studio, expanding his sound beyond guitar-based arrangements.",
    example: {
      title: "Blind Willie McTell",
      note:
        "Organ and piano fill the arrangement behind the vocal, giving the outtake its slow, hymn-like weight.",
      media: { kind: "youtube", id: "_AIRdU6CPf0", spotifyId: "2HT5jSAGQtNJ6nM8dhvrng" },
    },
    related: ["piano"],
  },
  {
    slug: "reggae",
    title: "Reggae",
    category: "Roots",
    definition:
      "A Jamaican music style with an offbeat rhythm.",
    inDylan:
      "Dylan saw Bob Marley perform live and was deeply impressed. He experimented with reggae influences on songs like Man Gave Names to All the Animals.",
    example: {
      title: "Man Gave Names to All the Animals",
      note:
        "The offbeat guitar accents and loping bass line lift a straight rock tune into reggae-inflected territory.",
      media: { kind: "youtube", id: "OmxhajWJAnY", spotifyId: "5mGq3cybgQDZgTEbu9ldV9" },
    },
  },
  {
    slug: "social-commentary",
    title: "Social Commentary",
    category: "Influence",
    definition:
      "Art that reflects on society's issues.",
    inDylan:
      "Dylan's early songs spoke to civil rights and war, and his later works continued to explore injustice and humanity.",
    example: {
      title: "Only a Pawn in Their Game",
      note:
        "The song argues that the man who fired the shot was himself a product of a system built on racial division.",
      media: { kind: "youtube", id: "8X0UmfBwA_U", spotifyId: "6lib77q4koq52srysevRfT" },
    },
    related: ["protest-song", "topical-song"],
  },
  {
    slug: "strumming",
    title: "Strumming",
    category: "Performance",
    definition:
      "Brushing across guitar strings to play chords.",
    inDylan:
      "Dylan's strumming drove many of his folk songs, setting the rhythm for his lyrics to ride on.",
    example: {
      title: "Pretty Peggy-O",
      note:
        "A traditional song carried almost entirely by open-chord strumming that keeps a steady, dance-like pulse.",
      media: { kind: "youtube", id: "RwZkMDxtYpo", spotifyId: "4aFM4HgUGRM1cB75qbh2Su" },
    },
    related: ["finger-picking", "flat-picking"],
  },
  {
    slug: "time-signature",
    title: "Time Signature",
    category: "Music",
    definition:
      "The way beats are grouped in music, like 4/4 or 3/4.",
    inDylan:
      "Dylan used standard signatures but bent them with his phrasing, making familiar rhythms sound fresh — Just Like a Woman sits in 6/8, and To Ramona rides a waltzing 3/4.",
    example: {
      title: "Just Like a Woman",
      note:
        "Its lilting 6/8 feel gives the song a swaying motion that a straight 4/4 would flatten.",
      media: { kind: "youtube", id: "dRLXZVojdhQ", spotifyId: "37Dl7jQMmt0gUnzTKqnjkN" },
    },
    related: ["rhythm"],
  },
  {
    slug: "topical-song",
    title: "Topical Song",
    category: "Influence",
    definition:
      "A song addressing current events.",
    inDylan:
      "Dylan's early topical songs, like Hurricane and The Lonesome Death of Hattie Carroll, captured specific social issues while still resonating universally.",
    example: {
      title: "The Lonesome Death of Hattie Carroll",
      note:
        "Drawn from a 1963 court case, the song reports the facts and lets the sentence at the end deliver the verdict.",
      media: { kind: "youtube", id: "FmbwU3J-2kk", spotifyId: "6j1fiAG1NFBqPDRfJY19Yv" },
    },
    related: ["protest-song", "social-commentary", "narrative"],
  },
  {
    slug: "traditional",
    title: "Traditional",
    category: "Roots",
    definition:
      "Music passed down over generations.",
    inDylan:
      "Dylan performed many traditional folk songs, honoring the roots that inspired his originals.",
    example: {
      title: "Froggie Went a-Courtin'",
      note:
        "An old children's folk song passed down for centuries, recorded by Dylan almost exactly as it was handed to him.",
      media: { kind: "youtube", id: "47NFLztId4E", spotifyId: "5sEiHlDvo5CRpX5AT3Q8z1" },
    },
    related: ["folk-revival", "folklore"],
  },
  {
    slug: "tremolo",
    title: "Tremolo",
    category: "Music",
    definition:
      "From the Italian for 'trembling' — a rapid, quivering musical effect, often produced by fast repetition of a single note.",
    inDylan:
      "Common in Dylan's early work; you can hear it in the guitar on With God on Our Side and Restless Farewell.",
    example: {
      title: "With God on Our Side",
      note:
        "The quivering guitar figure behind the verses adds an unsettled shimmer beneath the song's hard questions.",
      media: { kind: "youtube", id: "5y2FuDY6Q4M", spotifyId: "4rEs697oKBUikr9yOnyD0I" },
    },
  },
  {
    slug: "violin",
    title: "Violin",
    category: "Performance",
    definition:
      "A bowed string instrument that evolved from medieval fiddles and reached its modern form in 16th-century Italy, above all in Cremona, where luthiers such as Andrea Amati and later Antonio Stradivari refined its curved body, four strings, and singing tone. The violin became the leading melodic instrument in European classical music and, as the fiddle, a cornerstone of folk, country, bluegrass, and Celtic traditions on both sides of the Atlantic.",
    inDylan:
      "Dylan sometimes incorporated violin (fiddle) in his arrangements to add a rustic or dramatic feel. Scarlet Rivera's exotic, gypsy-tinged playing on Desire is the classic example, and the instrument's portability and vocal-like sustain have made it a natural partner for singers in folk and roots settings.",
    example: {
      title: "One More Cup of Coffee",
      note:
        "Scarlet Rivera's violin winds around the vocal line throughout, giving the song its Eastern, wandering character.",
      media: { kind: "youtube", id: "95cufW4h-gA", spotifyId: "4WOruM7TiQSETsWYy8bDSX" },
    },
  },
  {
    slug: "reinvention",
    title: "Reinvention",
    category: "Reinvention",
    definition:
      "The act of reshaping oneself.",
    inDylan:
      "Dylan reinvented his sound and image constantly — from folk troubadour to electric rocker to country crooner and beyond.",
    example: {
      title: "Tonight I'll Be Staying Here With You",
      note:
        "The Nashville Skyline croon here is barely recognisable as the same singer who made Highway 61 four years earlier.",
      media: { kind: "youtube", id: "9ZhLGP5dF2k", spotifyId: "3uHpPWsNDTpbbqedCRoaQU" },
    },
    related: ["acoustic"],
  },
  {
    slug: "1960s",
    title: "1960s",
    category: "Reinvention",
    definition:
      "The decade that redefined popular music as a force for social change, personal confession, and artistic ambition. Between the civil-rights movement, the Vietnam War, and a youth culture searching for new values, the 1960s turned the songwriter into a public poet and the three-minute single into a manifesto.",
    inDylan:
      "Bob Dylan's 1960s arc traces the whole era. He arrived in Greenwich Village in 1961 as a Woody Guthrie disciple, wrote the anthems of the civil-rights and antiwar movements, then unplugged the folk circuit and plugged into rock with a ferocity that changed both genres. Across The Freewheelin' Bob Dylan, The Times They Are A-Changin', Bringing It All Back Home, Highway 61 Revisited, and Blonde on Blonde, he moved from protest broadsides to surrealist narratives, from solo acoustic songs to full electric bands, and from the voice of a movement to an artist who refused to be any one thing. By 1966, a year of legendary tours and combative concerts, the decade had made him the central figure in modern songwriting—and a motorcycle crash that summer abruptly ended the first phase of his career, sending him into retreat and, eventually, reinvention.",
    example: {
      title: "The Times They Are a-Changin'",
      note:
        "Released in early 1964, the song became a generational credo before the decade had even fully arrived. Its deliberate, marching melody and open-armed warning made it feel like a newspaper headline set to music.",
      media: { kind: "youtube", id: "90WD_ats6eE", spotifyId: "52vA3CYKZqZVdQnzRrdZt6" },
    },
    examples: [
      {
        title: "Blowin' in the Wind",
        note:
          "The 1963 single that introduced Dylan as a protest songwriter. Its unanswered questions about peace, freedom, and justice became inseparable from the civil-rights movement.",
        media: { kind: "youtube", id: "MMFj8uDubsE", spotifyId: "18GiV1BaXzPVYpp9rmOg0E" },
      },
      {
        title: "Subterranean Homesick Blues",
        note:
          "A 1965 single that marked the shift from acoustic folk to electric rock. Its rapid-fire, allusive lyric and promotional film—an early music video—announced a new kind of popular art.",
        media: { kind: "youtube", id: "MGxjIBEZvx0", spotifyId: "6k9DUKMJpWvu6eFG3O64Lg" },
      },
    ],
    related: ["counter-culture", "protest-song", "folk-revival", "newport-1965", "electric"],
  },
  {
    slug: "acting",
    title: "Acting",
    category: "Reinvention",
    definition:
      "Taking on roles or personas in performance.",
    inDylan:
      "Dylan often acted out identities in his songs, and appeared in films like Pat Garrett and Billy the Kid, blurring the line between musician and actor.",
    example: {
      title: "Knockin' on Heaven's Door",
      note:
        "Written for Pat Garrett and Billy the Kid, in which Dylan also appears on screen as the character Alias.",
      media: { kind: "youtube", id: "rm9coqlk8fY", spotifyId: "5Qyq0oeQ0amjnpwne2usj0" },
    },
    related: ["film-music"],
  },
  {
    slug: "artist-name",
    title: "Artist Name",
    category: "Reinvention",
    definition:
      "The name an artist chooses for their work.",
    inDylan:
      "Born Robert Zimmerman, he adopted the name Bob Dylan — inspired by poet Dylan Thomas — signaling his desire to craft a new identity through music and poetry.",
    example: {
      title: "Bob Dylan (1962 debut album)",
      note:
        "The album that first put the name Bob Dylan on a record sleeve, replacing Robert Zimmerman for good.",
      media: { kind: "youtube", id: "QgJ9oUX1pbA", albumId: "5k63xxy9YcKM0H9GS3vP1K" },
    },
  },
  {
    slug: "avant-garde",
    title: "Avant-garde",
    category: "Reinvention",
    definition:
      "Experimental, boundary-pushing art.",
    inDylan:
      "Dylan embraced avant-garde ideas in his surreal mid-1960s lyrics and collaborations with poets like Allen Ginsberg, challenging what a song could be.",
    example: {
      title: "Tombstone Blues",
      note:
        "Its collision of Belle Starr, Jack the Ripper and Beethoven pushes the pop song into deliberately experimental territory.",
      media: { kind: "youtube", id: "ag-Esuy44ks", spotifyId: "5JqsRFZYDtIK5Rgeuzd2Jv" },
    },
    related: ["surrealism", "jack-kerouac"],
  },
  {
    slug: "bard",
    title: "Bard",
    category: "Words",
    definition:
      "A poet or singer who composes and recites verse, often accompanied by music. The title carries the weight of national tradition: William Shakespeare is the Bard of Avon, Robert Burns the Bard of Ayrshire, and in the folk world a bard is simply the person who remembers and reshapes the songs a community lives by.",
    inDylan:
      "Dylan's work belongs to this lineage of song-poets. He has bowed to Shakespeare and Burns as towering figures, and his own songs function as modern bardic testimony: songs of love, wandering, judgment, and social witness that have been passed from voice to voice across generations.",
    examples: [
      {
        title: "Desolation Row",
        note:
          "Romeo, Ophelia, and a whole gallery of Shakespearean shadows drift through this long, dreamlike song, placing Dylan inside the bardic tradition of dramatic verse.",
        media: { kind: "youtube", id: "hUvcWXTIjcU", spotifyId: "4n1ZGm3TxYmoYe1YR8cMus" },
      },
      {
        title: "A Red, Red Rose",
        note:
          "Robert Burns's most famous love song is the lyric Dylan himself cited as the verse that had the biggest effect on his life.",
        media: { kind: "youtube", id: "iMPR9g9IVzU", spotifyId: "5NhqukW4NzQYPF8zP42M49" },
      },
    ],
    related: ["lyric", "literature", "robert-burns", "imagery"],
  },
  {
    slug: "beat-generation",
    title: "Beat Generation",
    category: "Influence",
    definition:
      "A 1950s literary movement that emphasized spontaneity, freedom, and poetry.",
    inDylan:
      "Dylan absorbed its spirit from Jack Kerouac and Allen Ginsberg, channeling their energy into his own lyrical style.",
    example: {
      title: "Desolation Row",
      note:
        "The long free-associating catalogue of characters owes its rhythm and spirit to Beat poetry.",
      media: { kind: "youtube", id: "hUvcWXTIjcU", spotifyId: "4n1ZGm3TxYmoYe1YR8cMus" },
    },
    related: ["jack-kerouac", "surrealism"],
  },
  {
    slug: "christian-rock",
    title: "Christian Rock",
    category: "Roots",
    definition:
      "Rock music with Christian themes.",
    inDylan:
      "Dylan shocked fans by embracing Christian rock on albums like Slow Train Coming (1979), proving his music would follow his own convictions rather than public expectation.",
    example: {
      title: "Saved",
      note:
        "The title track of Dylan's second born-again album is a full-throated Christian rock declaration, built on gospel backing vocals and a clear testimonial message.",
      media: { kind: "youtube", id: "VprJwT4JDWo", spotifyId: "2SvhnRCqjsRMU99Nl0if9H" },
    },
    related: ["gospel"],
  },
  {
    slug: "columbia-records",
    title: "Columbia Records",
    category: "Influence",
    definition:
      "The record label that has been Dylan's primary home since 1961.",
    inDylan:
      "Signed by producer John Hammond, Dylan released nearly all his classic albums on Columbia.",
    example: {
      title: "The Freewheelin' Bob Dylan",
      note:
        "Dylan's second Columbia album, and the one that established the label's faith in him as a writer.",
      media: { kind: "youtube", id: "JncbFS5ek74", albumId: "0o1uFxZ1VTviqvNaYkTJek" },
    },
    related: ["john-hammond"],
  },
  {
    slug: "counter-culture",
    title: "Counter-culture",
    category: "Reinvention",
    definition:
      "The youth-driven movement of the 1960s that rejected mainstream values.",
    inDylan:
      "Dylan became its reluctant voice, though he often resisted being pinned down as a spokesperson and mocked the squares who couldn't keep up.",
    example: {
      title: "Ballad of a Thin Man",
      note:
        "Mr. Jones \u2014 baffled, respectable and out of his depth \u2014 became the counter-culture's shorthand for the establishment.",
      media: { kind: "youtube", id: "we37yX3zpKA", spotifyId: "0f5N14nB8xi0p3o4BlVvbx" },
    },
    related: ["1960s", "protest-song"],
  },
  {
    slug: "electric",
    title: "Electric",
    category: "Reinvention",
    definition:
      "Music played with amplification and power.",
    inDylan:
      "Dylan's shift to electric rock in the mid-1960s not only transformed his sound but changed the course of popular music forever. Much has been said and written about this period, with whole books devoted to it, and it has been dramatized on screen — including in the 2024 biopic A Complete Unknown starring Timothée Chalamet.",
    example: {
      title: "Like a Rolling Stone",
      note:
        "Six minutes of full-band electric rock that broke every rule about what a hit single could be.",
      media: { kind: "youtube", id: "IwOfCgkyEj0", spotifyId: "3uwzG1g" },
    },
    related: ["acoustic", "newport-1965", "folk-rock"],
  },
  {
    slug: "folk-rock",
    title: "Folk-Rock",
    category: "Roots",
    definition:
      "A genre combining folk lyrics and melodies with rock instrumentation.",
    inDylan:
      "Dylan's Like a Rolling Stone helped launch folk-rock, inspiring artists like The Byrds to electrify their sound.",
    example: {
      title: "Mr. Tambourine Man (The Byrds)",
      note:
        "The Byrds took Dylan's acoustic song, added electric twelve-string and a backbeat, and folk-rock had its first hit.",
      media: { kind: "youtube", id: "Swqw5a8I4b4", spotifyId: "11HmnsdTSpUh6ifD15tywv" },
    },
    related: ["electric", "folk-revival"],
  },
  {
    slug: "folklore",
    title: "Folklore",
    category: "Roots",
    definition:
      "The traditions and stories of a culture, often passed down through music.",
    inDylan:
      "Dylan tapped into folklore through ballads and storytelling, carrying forward the oral tradition in a modern voice.",
    example: {
      title: "The Water Is Wide",
      note:
        "A traditional British folk song Dylan recorded during the Time Out of Mind sessions, showing how an old melody could be renewed by his weathered voice.",
      media: { kind: "youtube", id: "ozKv_Nmgrkw", spotifyId: "6EmdWTaN4455ZPfZqoc0pT" },
    },
    related: ["traditional", "ballad", "greenwich-village", "talkin-blues"],

  },
  {
    slug: "greenwich-village",
    title: "Greenwich Village",
    category: "Influence",
    definition:
      "A Lower Manhattan neighborhood whose low brick townhouses, hidden courtyards, and crooked streets have drawn artists, writers, and radicals since the nineteenth century. Long before the 1960s, its small-scale architecture and cheap rents made it a refuge for painters, poets, and performers who wanted to live outside the city's commercial grid.",
    inDylan:
      "Dylan arrived in Greenwich Village in January 1961 and found a scene that had been decades in the making. He cut his teeth in clubs like Café Wha?, The Gaslight Café, and Gerde's Folk City, learning from the singers who had already made MacDougal and Bleecker streets a working laboratory for folk, blues, and jazz. The Village's history as an artists' quarter gave the young songwriter a ready-made world of cafés, crash pads, and audiences, and its belief that a song could be both art and argument shaped his ambition long before he became famous.",
    example: {
      title: "Talkin' New York",
      note:
        "Dylan's own account of arriving in the Village, written in the talking-blues style he learned in its clubs.",
      media: { kind: "youtube", id: "rxIJnZQmTt4", spotifyId: "1X6dRpq3Wi6Jxthi8ZBBBz" },
    },
    related: ["folk-revival", "washington-square-park", "dave-van-ronk"],
  },
  {
    slug: "washington-square-park",
    title: "Washington Square Park",
    category: "Influence",
    definition:
      "A public park at the heart of Greenwich Village, famous for its marble arch and its long tradition as an unofficial outdoor stage for folk musicians, protest singers, and street performers.",
    inDylan:
      "On Sunday afternoons, when the weather was warm, musicians gathered around the fountain and played for passersby, giving newcomers like Dylan a free place to test songs and find a community. In April 1961 the city tried to restrict singing in the park, sparking the 'Folk Riot' that saw musicians and supporters defend the park as a shared cultural space. For Dylan, Washington Square Park was the front porch of the Village scene: a place to hear a new chord, meet a rival, or learn a song that would travel far beyond Manhattan.",
    example: {
      title: "Blowin' in the Wind",
      note:
        "The questions Dylan wrote in the Village in 1962 moved from the park's benches to the national stage, becoming an anthem of the folk revival.",
      media: { kind: "youtube", id: "MMFj8uDubsE", spotifyId: "18GiV1BaXzPVYpp9rmOg0E" },
    },
    related: ["greenwich-village", "folk-revival", "dave-van-ronk"],
    aliases: [
      "Washington Square",
      "Folk Riot",
      "1961",
    ],
  },
  {
    slug: "guitar",
    title: "Guitar",
    category: "Performance",
    definition:
      "A stringed instrument that grew out of centuries of European and Mediterranean plucked instruments before the Spanish guitarra gave it its familiar shape. Once it reached North America, makers redesigned it for a louder, brasher country: steel strings replaced gut, and companies like C.F. Martin built bigger-bodied guitars — culminating in the Dreadnought — so the instrument could cut through square dances, radio bands, and eventually electrified blues and rock.",
    inDylan:
      "Dylan's guitar, whether acoustic or electric, was the constant companion of his voice. He came of age just as the steel-string folk boom had made the guitar a portable public-address system, and he pushed it further when he plugged in at Newport in 1965, turning the same instrument into a roaring rock voice.",
    example: {
      title: "Girl from the North Country",
      note:
        "Fingerpicked acoustic guitar carries the entire song, the instrument acting as its only accompaniment.",
      media: { kind: "youtube", id: "Je4Eg77YSSA", spotifyId: "0fQubK3b1VamHnEtwXhUX8" },
    },
    related: ["strumming", "finger-picking"],
  },
  {
    slug: "improvisation",
    title: "Improvisation",
    category: "Performance",
    definition:
      "Making music spontaneously, in real time, rather than from a fixed score. It is a universal practice across traditions: jazz soloists spin variations on a chord sequence, folk singers adapt lyrics and melodies in performance, Indian classical musicians explore a raga's mood through extemporized phrasing, and even Baroque composers such as Bach and Handel were celebrated improvisers at the keyboard. For many composers, improvisation is a workshop — a way to discover themes, test phrases, and generate the raw material that later becomes a finished piece.",
    inDylan:
      "Dylan's approach to improvisation was shaped by folk's loose, oral tradition and by the freedom of jazz phrasing. He rarely performs a song the same way twice, improvising lyrics, phrasing, arrangements, and even entire verses in concert. His live versions often rewrite point of view, key, and emotional tone, treating the recorded song as a sketch rather than a final statement.",
    example: {
      title: "Tangled Up in Blue (live variations)",
      note:
        "Dylan has rewritten this song's lyrics, key and point of view repeatedly in performance over five decades, turning it into a living example of how improvisation can keep a song changing long after it was first recorded.",
      media: { kind: "youtube", id: "YwSZvHqf9qM", spotifyId: "5D0dv42CZd5xtlLVxDFXs3" },
    },
  },
  {
    slug: "instrumental",
    title: "Instrumental",
    category: "Music",
    definition:
      "A piece of music without sung words, where melody, harmony, and rhythm are carried entirely by instruments — the opposite of an a cappella performance, where the human voice alone provides the instrumentation.",
    inDylan:
      "Dylan rarely recorded instrumentals, but when he did they served as a deliberate statement of musical style and atmosphere.",
    example: {
      title: "Nashville Skyline Rag",
      note:
        "A country rag played by Dylan's Nashville session band, the track announces the album's down-home sound without a single lyric.",
      media: { kind: "youtube", id: "F4T3xs4-Jso", spotifyId: "716TKYoyVXFrXjz3rHwajp" },
    },
    related: ["melody", "tempo"],
  },
  {
    slug: "joan-baez",
    title: "Joan Baez",
    category: "Influence",
    definition:
      "A defining voice of the 1960s folk revival and one of the most influential folk singers of the modern era.",
    inDylan:
      "Joan Baez was already a celebrated figure when she began championing Dylan's songs, bringing his early work to larger concert halls and radio audiences before his own name could fill them. She invited him on stage at her shows, introduced him to her listeners, and their bond became one of the most enduring partnerships in American roots music \u2014 stretching from the 1960s folk circuit through later tours and recordings, and giving Dylan a bridge between the folk underground and the mainstream.",
    example: {
      title: "Diamonds & Rust (Joan Baez)",
      note:
        "Baez's signature reflection on their relationship, capturing both sides of a collaboration that shaped each artist's career.",
      media: { kind: "youtube", id: "1ST9TZBb9v8", spotifyId: "4O0sGJdqpHMaWz7KoVd7tb" },
    },
    related: ["folk-revival"],
  },
  {
    slug: "john-hammond",
    title: "John Hammond",
    category: "Influence",
    definition:
      "The legendary Columbia Records producer who signed Dylan in 1961.",
    inDylan:
      "Hammond also discovered artists like Billie Holiday and Bruce Springsteen; his belief in Dylan launched a career.",
    example: {
      title: "Song to Woody",
      note:
        "Recorded at the sessions Hammond produced for Dylan's debut, months after he signed him.",
      media: { kind: "youtube", id: "lOWfCVQBixs", spotifyId: "0dfdXhBg11XA16XgAEtFcN" },
    },
    related: ["columbia-records"],
  },
  {
    slug: "literature",
    title: "Literature",
    category: "Influence",
    definition:
      "Written works of lasting artistic value, ranging from poetry and drama to fiction and scripture, distinguished by imaginative power, formal craft, and a voice that survives beyond its moment.",
    inDylan:
      "Dylan came to songwriting as a reader first. He absorbed the Bible's thunder and prophecy, the Symbolists' dream logic, the Beats' open-road cadences, and the Modernists' habit of making the familiar strange. T. S. Eliot and Ezra Pound taught him that fragments could be arranged into new architectures; Dylan Thomas proved that a name could be carried like a torch. In turn, Dylan's songs began to read as literature themselves: printed in collections, studied in classrooms, and, in 2016, recognized with the Nobel Prize in Literature for having created new poetic expressions within the great American song tradition.",
    example: {
      title: "Gates of Eden",
      note:
        "Its biblical and mythic imagery reads as poetry on the page as much as lyric on the record, a song that could sit beside Blake and the Book of Revelation.",
      media: { kind: "youtube", id: "r9MXMHzlGIM", spotifyId: "3K10pmwoFZt5N6ESWvDQkv" },
    },
    related: ["nobel-prize", "lyric", "jack-kerouac", "metaphor", "imagery", "bard", "robert-burns"],
  },
  {
    slug: "melody",
    title: "Melody",
    category: "Music",
    definition:
      "A sequence of notes forming a recognizable tune.",
    inDylan:
      "Dylan sometimes leaned on simple melodies so that the lyrics could take center stage — but when he wanted a hook, he could write one that carried across generations.",
    example: {
      title: "Sara",
      note:
        "One of Dylan's most openly melodic songs, the tune carrying the emotion as directly as the words.",
      media: { kind: "youtube", id: "Ma7BK2MJNqo", spotifyId: "0fj1UaYgiAoahQxhrbX0hW" },
    },
    related: ["harmony"],
  },
  {
    slug: "music-video",
    title: "Music Video",
    category: "Reinvention",
    definition:
      "A short film accompanying a song.",
    inDylan:
      "Dylan's Subterranean Homesick Blues 'cue-card' clip (1965) is often called one of the first true music videos.",
    example: {
      title: "Subterranean Homesick Blues (video)",
      note:
        "Filmed in an alley behind the Savoy Hotel, Dylan drops cue cards of the lyrics \u2014 a template for the music video.",
      media: { kind: "youtube", id: "MGxjIBEZvx0", spotifyId: "6k9DUKMJpWvu6eFG3O64Lg" },
    },
    related: ["rhythm"],
  },
  {
    slug: "piano",
    title: "Piano",
    category: "Performance",
    definition:
      "A keyboard instrument invented around 1700 by Bartolomeo Cristofori in Florence as a way to give the harpsichord dynamic control. Its hammers strike strings rather than plucking them, allowing everything from whispered pianissimos to thunderous fortissimos. Over the next three centuries the piano became the central instrument of Western classical music, parlour song, gospel, jazz, and rock and roll, adapting its voice to whatever room it entered.",
    inDylan:
      "Dylan often turns to the piano when performing live, changing the texture of his songs with fuller harmonies. He has long admired pianists whose playing carries a whole personality: Jerry Lee Lewis's volcanic gospel runs, Little Richard's ferocious stride, Fats Domino's rolling New Orleans ease, and Ray Charles's blues sermonizing. Their example taught him that the piano could drive a song as hard as any guitar.",
    example: {
      title: "Dear Landlord",
      note:
        "Dylan plays the piano part himself, the chords shaping the song's slow, contemplative feel.",
      media: { kind: "youtube", id: "0hkVJ5FRdDs", spotifyId: "4xhHhecO7i0jEySdGKQMWp" },
    },
    related: ["keyboard"],
  },
  {
    slug: "producer",
    title: "Producer",
    category: "Influence",
    definition:
      "The person who shapes the sound of a recording.",
    inDylan:
      "Dylan has worked with producers from John Hammond to Daniel Lanois, each leaving a mark on his albums. He has also produced many of his own records under the alias Jack Frost, keeping the studio control close to the songs themselves.",
    example: {
      title: "Time Out of Mind (prod. Daniel Lanois)",
      note:
        "Lanois's atmospheric production \u2014 reverb, murk, room sound \u2014 is as much a part of the record as the songs.",
      media: { kind: "youtube", id: "Ex5h0PHHbNI", albumId: "185DHT5SvszXRrezx3lOjt" },
    },
    related: ["daniel-lanois", "john-hammond", "columbia-records"],
    aliases: ["Daniel Lanois", "Oh Mercy", "Time Out of Mind"],
  },
  {
    slug: "rock",
    title: "Rock",
    category: "Roots",
    definition:
      "A genre driven by electric instruments and strong rhythm.",
    inDylan:
      "Dylan fused rock with poetic lyrics, proving the genre could be more than entertainment.",
    example: {
      title: "Highway 61 Revisited",
      note:
        "The title track drives on electric blues-rock, with a slide whistle punctuating the verses.",
      media: { kind: "youtube", id: "8hr3Stnk8_k", spotifyId: "6os5B6xjuke9YfBKH3tu1e" },
    },
    related: ["electric", "folk-rock"],
  },
  {
    slug: "vinyl",
    title: "Vinyl",
    category: "Influence",
    definition:
      "The record format that dominated 20th-century music.",
    inDylan:
      "Dylan's albums — especially Blonde on Blonde — are still cherished on vinyl for their warm sound.",
    example: {
      title: "Blonde on Blonde",
      note:
        "Rock's first double album, sequenced across four vinyl sides \u2014 the format shaped how it was written and heard.",
      media: { kind: "youtube", id: "A3qXRfHIeuY", albumId: "4NP1rhnsPdYpnyJP0p0k0L" },
    },
  },
  {
    slug: "vocal-style",
    title: "Vocal Style",
    category: "Words",
    definition: "The unique sound and approach of a singer.",
    inDylan:
      "Dylan's nasal, gritty vocal style became iconic, even as it divided listeners — and he has reshaped it many times, from Nashville Skyline's croon to the sandpaper rasp of his late records.",
    example: {
      title: "To Be Alone with You",
      note:
        "The warm, close-country croon on this Nashville Skyline cut is a clear example of Dylan deliberately softening his voice to match a different emotional world.",
      media: { kind: "youtube", id: "eos_70yqX8E", spotifyId: "7CuCP5OoLH77hJTibZQE4r" },
    },
  },
  {
    slug: "umm-kulthum",
    title: "Umm Kulthum",
    category: "Influence",
    definition:
      "Umm Kulthum (also spelled Om Khalsoum) was the most celebrated singer in the Arab world, known as the 'Star of the East' for her powerful, emotionally intense performances of long, poetic songs. Her voice moved through long, ornamented phrases and dramatic shifts in dynamics, accompanied by large orchestras that followed her every gesture.",
    inDylan:
      "Dylan named Umm Kulthum his favorite singer after first hearing her in Jerusalem. He said that Middle Eastern singing was a source for his own vocal approach, and the influence is audible in the way he stretches and ornaments lines on songs such as One More Cup of Coffee, letting the voice wander and hang in the air like one of her slow, winding melodies.",
    example: {
      title: "Enta Omri",
      note:
        "This epic love song, composed by Mohamed Abdel Wahab, shows the sustained, ornamental phrasing that fascinated Dylan and that echoes in his most Eastern-tinged vocal performances.",
      media: { kind: "youtube", id: "XPGHpBOt5sE", spotifyId: "0ivlkHUXmRfJWT3RwQuBcz" },
    },
    aliases: ["Om Khalsoum", "Umm Kalthoum", "Om Kalsoum", "Oum Kalthoum"],
    related: ["vocal-style", "violin"],
  },
  {
    slug: "voice-of-a-generation",
    title: "Voice of a Generation",
    category: "Reinvention",
    definition:
      "A label given to Dylan in the 1960s for capturing the era's spirit.",
    inDylan:
      "Dylan resisted the title, insisting he was just writing songs — but it stuck.",
    example: {
      title: "The Times They Are a-Changin'",
      note:
        "Its direct address to parents, senators and writers is what earned Dylan the title he spent years rejecting.",
      media: { kind: "youtube", id: "90WD_ats6eE", spotifyId: "52vA3CYKZqZVdQnzRrdZt6" },
    },
    related: ["1960s", "counter-culture"],
  },
  {
    slug: "minor-key",
    title: "Minor Key",
    category: "Music",
    definition:
      "A key based on the minor scale, often associated with darker, sadder, more tense, or dramatic moods than a major key.",
    inDylan:
      "Dylan reaches for minor keys when a song needs unease — the mode colours much of his early topical writing and his mid-1970s work.",
    example: {
      title: "As I Went Out One Morning",
      note:
        "The minor tonality gives this brief, allegorical encounter a sense of menace the plain narrative never states outright.",
      media: { kind: "youtube", id: "DYhOWt9sOP8", spotifyId: "2040FzW1ywVMnNJAMPoXZn" },
    },
    related: ["major-key", "mode", "harmony"],
  },
  {
    slug: "major-key",
    title: "Major Key",
    category: "Music",
    definition:
      "A key based on the major scale, generally associated with brighter, happier, more stable, or more optimistic sounds.",
    inDylan:
      "Many of Dylan's lighter, blues- and country-flavoured songs sit squarely in major keys, letting the humour in the words come through.",
    example: {
      title: "Honey, Just Allow Me One More Chance",
      note:
        "A bright major-key romp — the cheerful harmony sets up the song's grinning, pleading humour.",
      media: { kind: "youtube", id: "l9uBYOWD_fo", spotifyId: "71XTdtW3bvmIrotG8yYVMS" },
    },
    related: ["minor-key", "mode", "harmony"],
  },
  {
    slug: "chorus-refrain",
    title: "Chorus / Refrain",
    category: "Words",
    definition:
      "A repeated section or line in a song. In folk music, a refrain is often a repeated phrase at the end of each verse rather than a separate chorus.",
    inDylan:
      "Dylan leans on the folk refrain far more than the pop chorus, using a returning final line to fix a song's argument in the listener's memory.",
    example: {
      title: "The Lonesome Death of Hattie Carroll",
      note:
        "Dylan uses a traditional ballad structure where the repeated refrain reinforces the song's moral message and emotional impact.",
      media: { kind: "youtube", id: "FmbwU3J-2kk", spotifyId: "6j1fiAG1NFBqPDRfJY19Yv" },
    },
    related: ["verse", "bridge", "ballad"],
  },
  {
    slug: "verse",
    title: "Verse",
    category: "Words",
    definition:
      "A section of a song where the melody usually stays the same while the lyrics change, often advancing a story or idea.",
    inDylan:
      "Dylan's verses do most of the work in his songs, carrying narrative and image where other writers would reach for a hook.",
    example: {
      title: "All Along the Watchtower",
      note:
        "A rare example of Dylan using a compact, verse-only structure with no traditional chorus.",
      media: { kind: "youtube", id: "bT7Hj-ea0VE", spotifyId: "14kwHJxxL8BVmJMxKaP2E2" },
    },
    related: ["chorus-refrain", "bridge", "narrative"],
  },
  {
    slug: "mode",
    title: "Mode",
    category: "Music",
    definition:
      "A musical scale pattern different from the major and minor scales, often associated with traditional folk music. Modes can create ancient, mysterious, or folk-like sounds.",
    inDylan:
      "Dylan drew heavily from traditional folk songs, many of which use modal melodies inherited from British and Appalachian traditions.",
    example: {
      title: "Little Sadie",
      note:
        "Little Sadie leans on a Mixolydian melody — a modal tune carried over from the older folk repertoire.",
      media: { kind: "youtube", spotifyId: "2QEZRXy7t6lzbzS1dJ9Lck" },
    },
    examples: [
      {
        title: "Little Sadie",
        note:
          "Little Sadie leans on a Mixolydian melody — a modal tune carried over from the older folk repertoire.",
        media: { kind: "youtube", spotifyId: "2QEZRXy7t6lzbzS1dJ9Lck" },
      },
      {
        title: "Man of Constant Sorrow",
        note:
          "Man of Constant Sorrow sits in Dorian mode, the flattened third giving the old ballad its ancient, unresolved colour.",
        media: { kind: "youtube", id: "GC_Q-OWbPeo", spotifyId: "3SF5puV5eb6bgRSxBeMOk9" },
      },
    ],
    related: ["minor-key", "major-key", "traditional"],
  },
  {
    slug: "drone",
    title: "Drone",
    category: "Music",
    definition:
      "A sustained note or chord that continues underneath a melody, creating a hypnotic or traditional folk sound.",
    inDylan:
      "The drone links Dylan's writing back to the modal folk tradition, where a fixed bass note anchors a melody instead of a moving chord sequence.",
    example: {
      title: "Masters of War",
      note:
        "Built around a repeating, droning guitar pattern inspired by the traditional melody of 'Nottamun Town,' creating a dark and timeless atmosphere.",
      media: { kind: "youtube", id: "JEmI_FT4YHU", spotifyId: "5kZotoDYqPbLgcB35jkmRZ" },
    },
    related: ["mode", "traditional", "protest-song"],
  },
  {
    slug: "bridge",
    title: "Bridge",
    category: "Words",
    definition:
      "A contrasting section of a song that provides musical or lyrical variety, often connecting two repeated sections. In the UK, the bridge is traditionally called the middle eight.",
    inDylan:
      "Dylan uses bridges sparingly, but when he does they usually shift the song's emotional angle before it returns to its main idea.",
    example: {
      title: "Lay Lady Lay",
      note:
        "The bridge introduces a new emotional perspective before returning to the main song idea.",
      media: { kind: "youtube", id: "LhzEsb2tNbI", spotifyId: "1yRxcHJsRMmQOZ7tZtXwo9" },
    },
    related: ["verse", "chorus-refrain"],
  },
  {
    slug: "beat",
    title: "Beat",
    category: "Music",
    definition:
      "The steady pulse that listeners tap their foot to; the basic unit of rhythm in music.",
    inDylan:
      "Dylan's bands have set his words against everything from a loose folk pulse to a hard, insistent backbeat.",
    example: {
      title: "Gotta Serve Somebody",
      note:
        "The driving beat reflects Dylan's late-1970s gospel period and the influence of blues, rock, and soul rhythms.",
      media: { kind: "youtube", id: "wC10VWDTzmU", spotifyId: "760420tYNmNjFgi8bWvbop" },
    },
    related: ["rhythm", "tempo", "time-signature"],
  },
  {
    slug: "tempo",
    title: "Tempo",
    category: "Music",
    definition:
      "The speed at which a piece of music is performed. Tempo can create feelings of urgency, excitement, calmness, or reflection.",
    inDylan:
      "Dylan often re-tempos his own songs in performance, turning a brisk number into a meditation or the reverse.",
    example: {
      title: "Lily, Rosemary and the Jack of Hearts",
      note:
        "Lily, Rosemary and the Jack of Hearts moves fast, its tempo carrying the narrative momentum.",
      media: { kind: "youtube", id: "agdoeRpTfHg", spotifyId: "2Np0oPpnsECM4BQSVPZfVV" },
    },
    examples: [
      {
        title: "Lily, Rosemary and the Jack of Hearts",
        note:
          "Lily, Rosemary and the Jack of Hearts moves fast, its tempo carrying the narrative momentum.",
        media: { kind: "youtube", id: "agdoeRpTfHg", spotifyId: "2Np0oPpnsECM4BQSVPZfVV" },
      },
      {
        title: "Forever Young (Slow Version)",
        note:
          "The slow version of Forever Young settles into a reflective ballad tempo — the same song, a different pace.",
        media: { kind: "youtube", id: "Vz231O7Cw-I", spotifyId: "4yWl0tnEanf3zmZzl9kbQn" },
      },
    ],
    related: ["beat", "rhythm"],
  },
  {
    slug: "rhyme",
    title: "Rhyme",
    category: "Words",
    definition:
      "The repetition of similar sounds, usually at the ends of lines, used to create musicality, structure, and emphasis in lyrics.",
    inDylan:
      "Rhyme is one of Dylan's sharpest tools — he stacks it, buries it inside lines, and stretches words to make it land.",
    example: {
      title: "Hurricane",
      note:
        "Dylan uses complex internal rhymes, repeated sounds, and rhythmic phrasing to drive the song's storytelling and urgency.",
      media: { kind: "youtube", id: "bpZvg_FjL3Q", spotifyId: "1fYdZW9CJOwEjOjVHaxvQ5" },
    },
    related: ["lyric", "narrative", "rhythm"],
  },
  {
    slug: "form-structure",
    title: "Form / Structure",
    category: "Music",
    definition:
      "The overall architecture of a song \u2014 the order and repetition of its sections, such as intro, verse, chorus, bridge and outro.",
    inDylan:
      "Dylan works in both directions: long, chorus-less ballads that run on verses alone, and tightly built pop songs that follow classic sectional form.",
    example: {
      title: "Just Like a Woman",
      note:
        "A textbook layout \u2014 intro, verse, chorus, verse, chorus, bridge (the \u201cmiddle eight\u201d in British usage), verse, chorus, outro \u2014 with the bridge lifting the key line before the final return.",
      media: { kind: "youtube", id: "dRLXZVojdhQ", spotifyId: "37Dl7jQMmt0gUnzTKqnjkN" },
    },
    related: ["verse", "chorus-refrain", "bridge", "melody"],
  },
  {
    slug: "rap",
    title: "Rap",
    category: "Roots",
    definition:
      "Rhythmic, rhymed speech delivered over a beat \u2014 a spoken vocal tradition that became the backbone of hip-hop.",
    inDylan:
      "Dylan's rapid-fire talking blues and word-torrent songs like Subterranean Homesick Blues are often cited as ancestors of rap; he later name-checked the form directly.",
    example: {
      title: "Kurtis Blow \u2014 Street Rock (with Bob Dylan)",
      note:
        "Dylan sings on Kurtis Blow's 1986 track, one of the earliest crossovers between a folk-rock songwriter and hip-hop \u2014 rhymed speech over a beat meeting sung verse.",
      media: { kind: "youtube", id: "xfi7ME_Y5Vs", spotifyId: "1GO6BnAO8t6e35NX64QGN9" },
    },
    related: ["talkin-blues", "rhyme", "beat", "rhythm"],
  },
  {
    slug: "pete-seeger",
    title: "Pete Seeger",
    category: "Roots",
    definition:
      "American folk singer, songwriter, and activist (1919–2014) who did as much as anyone to keep the folk tradition alive as a living, political force. Raised in a musical family, Seeger was a founding member of the Almanac Singers and the Weavers, helping bring folk song into the mainstream in the 1940s and 1950s. After the Weavers were blacklisted during the McCarthy era, he carved out a second career as a solo performer, union organiser, and teacher, travelling with a long-neck banjo and a belief that a good song could make people want to change the world. He later founded the Clearwater project to clean up the Hudson River, proving that environmental activism and folk music could be part of the same life.",
    inDylan:
      "Seeger was one of Dylan's earliest and most influential champions. He introduced the young singer to the Newport Folk Festival, put him in front of large audiences, and treated him as a natural heir to the folk tradition. Their relationship was complicated by Dylan's 1965 electric turn at Newport, when legend says Seeger threatened to cut the cables with a hatchet; whatever the exact details, the moment marked a public break between the old guard and the new. Yet the connection endured. Seeger remained a lifelong figure in Dylan's memory of apprenticeship, the link between Greenwich Village, the labour movement, and the idea that a song could carry a conscience.",
    example: {
      title: "If I Had a Hammer",
      note:
        "Seeger's singalong anthem shows the tradition Dylan entered \u2014 a simple, repeatable song built to be sung by a crowd for a cause.",
      media: { kind: "youtube", id: "VO39e5Uznu4", spotifyId: "0P4ICD4ck53aHPSzQasWtA" },
    },
    related: ["folk-revival", "protest-song", "newport-1965"],
  },
  {
    slug: "dave-van-ronk",
    title: "Dave Van Ronk",
    category: "Influence",
    definition:
      "A folk and blues singer, guitarist, and fixture of the Greenwich Village scene, often called the 'Mayor of MacDougal Street.' His encyclopedic knowledge of traditional blues and ragtime made him a mentor to younger musicians arriving in the early 1960s.",
    inDylan:
      "Dylan met Van Ronk soon after reaching the Village and quickly fell under his influence. Van Ronk's own recording of 'He Was a Friend of Mine' captures the thick, bluesy guitar style and rough-weathered voice that made him a hero on MacDougal Street, and Dylan's early version of the song carries the stamp of those club-floor lessons. Van Ronk remained a presence in the Village long after Dylan's fame eclipsed the small clubs they had both played.",
    example: {
      title: "He Was a Friend of Mine",
      note:
        "Van Ronk's own recording, with its heavy fingerpicking and gruff vocal, shows why he was the keeper of the old songs on MacDougal Street.",
      media: { kind: "youtube", id: "754sRFIHIrA", spotifyId: "38bVZHfIbyZcbt9C465E3e" },
    },
    related: ["greenwich-village", "folk-revival", "blues", "traditional"],
    aliases: [
      "Mayor of MacDougal Street",
      "MacDougal Street",
    ],
  },
  {
    slug: "allen-ginsberg",
    title: "Allen Ginsberg",
    category: "Influence",
    definition:
      "Beat poet whose long-lined, incantatory verse reshaped what American poetry could sound like.",
    inDylan:
      "Ginsberg was a friend, travelling companion and touchstone; his breath-length lines echo through Dylan's mid-60s writing and the Rolling Thunder years.",
    example: {
      title: "America",
      note:
        "Ginsberg's sprawling address to his own country \u2014 accusatory, funny, and cataloguing \u2014 is the poetic register Dylan reaches for in songs like It's Alright, Ma.",
      media: { kind: "youtube", id: "o9_aJqtnmPo" },
    },
    related: ["beat-generation", "jack-kerouac", "literature"],
  },
  {
    slug: "the-band",
    title: "The Band",
    category: "Influence",
    definition:
      "The group that backed Dylan on his first electric tours and became a defining act of American roots rock.",
    inDylan:
      "They weathered the boos of the 1966 tour with him, made the Basement Tapes together, and returned for the 1974 comeback tour.",
    example: {
      title: "I Shall Be Released",
      note:
        "A Dylan song written during the Basement Tapes sessions and made famous by The Band \u2014 his writing, their weathered harmony and organ-led arrangement.",
      media: { kind: "youtube", id: "MjtPBjEz-BA", spotifyId: "7fGYJT5dBuGFxER8iWS8nQ" },
    },
    related: ["electric", "folk-rock", "harmony"],
  },
  {
    slug: "the-beatles",
    title: "The Beatles",
    category: "Influence",
    definition:
      "The English group whose songwriting and studio work redefined popular music in the 1960s.",
    inDylan:
      "Dylan and The Beatles traded influence in both directions \u2014 he pushed their lyrics inward, they pushed him toward the band and the electric single.",
    example: {
      title: "I Want to Hold Your Hand",
      note:
        "The song that broke them in America and that Dylan heard on the radio in 1964 \u2014 pop craft with harmonic surprises, the sound he began writing toward.",
      media: { kind: "youtube", id: "jenWdylTtzs", spotifyId: "4DRBaZ760gyk7LWnaJFqsJ" },
    },
    related: ["rock", "folk-rock", "electric"],
  },
  {
    slug: "lead-belly",
    title: "Lead Belly",
    category: "Roots",
    definition:
      "Huddie Ledbetter, the twelve-string guitarist and songster whose recordings carried a vast body of American folk and blues song.",
    inDylan:
      "Hearing Lead Belly was one of the turns that sent the young Dylan from rock and roll toward folk music.",
    example: {
      title: "In the Pines (Where Did You Sleep Last Night)",
      note:
        "A traditional song Lead Belly made his own \u2014 the same process of inhabiting and reshaping an old song that Dylan built a career on.",
      media: { kind: "youtube", id: "2MkfTYPmLlA", spotifyId: "5rerimz0RW2Royhow3g0sR" },
    },
    related: ["traditional", "folklore", "blues"],
  },
  {
    slug: "hank-williams",
    title: "Hank Williams",
    category: "Roots",
    definition:
      "Country singer and songwriter whose plain, aching songs set the template for confessional country writing.",
    inDylan:
      "Dylan has called Hank Williams his first musical hero and a lifelong lesson in saying the most with the fewest words.",
    example: {
      title: "Lost Highway",
      note:
        "Three verses of drifting and regret with almost no ornament \u2014 the compression and the road imagery Dylan carried into his own writing.",
      media: { kind: "youtube", id: "lCgicPdsxxg", spotifyId: "0jo2E9nTTflJzAadadRaek" },
    },
    related: ["lyric", "narrative", "traditional"],
  },
  {
    slug: "robert-johnson",
    title: "Robert Johnson",
    category: "Roots",
    definition:
      "Delta blues guitarist and singer whose small body of 1930s recordings became the myth-laden foundation of the blues.",
    inDylan:
      "Dylan first heard Johnson's reissued recordings in 1961 and described the verses as opening a door in his own writing.",
    example: {
      title: "Cross Road Blues",
      note:
        "The crossroads legend in three minutes \u2014 slide guitar, a shifting beat, and images loaded far beyond their literal words.",
      media: { kind: "youtube", id: "Kxi4XkIVWLQ", spotifyId: "1TrGdXSgiBm8W68D2K1COG" },
    },
    related: ["blues", "imagery", "folklore"],
  },
  {
    slug: "robert-burns",
    title: "Robert Burns",
    category: "Influence",
    definition:
      "The eighteenth-century Scottish poet and songwriter regarded as Scotland's national bard. Burns collected, revised, and immortalized folk songs in both Scots and English, turning everyday speech into some of the most durable love, drinking, and social-justice verses in the language; he also penned the words to Auld Lang Syne, the song now sung the world over to mark the turn of a year.",
    inDylan:
      "In 2008 Dylan named Burns his greatest inspiration, citing the 1794 love song A Red, Red Rose as the lyric or verse that had the biggest effect on his life. The choice placed a Scottish folk poet at the root of a distinctly American songwriting voice.",
    example: {
      title: "A Red, Red Rose",
      note:
        "Burns's song of love outlasting seas and stones is the very lyric Dylan singled out as his most important inspiration as a songwriter, heard here in Jean Redpath's definitive Scots reading.",
      media: { kind: "youtube", id: "iMPR9g9IVzU", spotifyId: "1mnZJhThITmq9urDmCWlt7" },
    },
    aliases: ["Jean Redpath", "Burns", "Scottish bard", "A Red Red Rose"],
    related: ["bard", "lyric", "literature", "folk-revival"],
  },
  {
    slug: "jimmie-rodgers",
    title: "Jimmie Rodgers",
    category: "Roots",
    definition:
      "The \u201cSinging Brakeman,\u201d whose blue yodels fused blues, country and vaudeville into the first great American recording star.",
    inDylan:
      "Dylan produced a Jimmie Rodgers tribute album in 1997 and has pointed to him as the point where the strands of American song first braided together.",
    example: {
      title: "In the Jailhouse Now",
      note:
        "Blues form, comic storytelling and a yodel refrain in one song \u2014 the genre-crossing that Dylan treats as the native condition of American music.",
      media: { kind: "youtube", id: "p3L2qf3q-ok", spotifyId: "5qhjl6GzrmwPYpJJFh2SRz" },
    },
    related: ["blues", "traditional", "folklore"],
  },
  {
    slug: "folklore-center",
    title: "The Folklore Center",
    category: "Influence",
    definition:
      "The small shop at 110 MacDougal Street in Greenwich Village that sold instruments, songbooks and records, and served as the folk revival's meeting room.",
    inDylan:
      "Dylan hung around the Folklore Center from his first weeks in New York, borrowing records and songs there; Izzy Young staged his first formal concert, at Carnegie Chapter Hall in November 1961.",
    documents: [
      {
        src: folkloreCover.url,
        caption:
          "Cover of the Folklore Center's 1962 sheet-music edition of \u201cTalking Folklore Center\u201d by Bob Dylan, priced at 25 cents.",
      },
      {
        src: folkloreSheet.url,
        caption:
          "Inside spread: the notated melody and the full lyric, naming MacDougal Street, the Folklore Center and Izzy Young.",
      },
      {
        src: folkloreSeries.url,
        caption: "Title page \u2014 Folklore Center Series, No. 1.",
      },
    ],
    related: ["izzy-young", "greenwich-village", "folklore", "talkin-blues"],
    aliases: [
      "MacDougal Street",
      "110 MacDougal",
      "record shop",
      "Carnegie Chapter Hall",
      "New York",
    ],
  },
  {
    slug: "izzy-young",
    title: "Izzy Young",
    category: "Influence",
    definition:
      "Israel \u201cIzzy\u201d Young, folklorist and founder of the Folklore Center, who promoted concerts, kept notebooks on the scene, and later ran the Folklore Centrum in Stockholm.",
    inDylan:
      "Young interviewed Dylan in 1961 and produced his first New York concert, becoming one of the earliest people to write down who this singer said he was.",
    documents: [
      {
        src: folkloreCover.url,
        caption:
          "Cover of the Folklore Center's 1962 sheet-music edition of \u201cTalking Folklore Center\u201d by Bob Dylan, priced at 25 cents.",
      },
      {
        src: folkloreSheet.url,
        caption:
          "Inside spread: the notated melody and the full lyric, naming MacDougal Street, the Folklore Center and Izzy Young.",
      },
      {
        src: folkloreSeries.url,
        caption: "Title page \u2014 Folklore Center Series, No. 1.",
      },
    ],
    related: ["folklore-center", "greenwich-village", "folk-revival"],
    aliases: [
      "Israel Young",
      "Folklore Centrum",
      "Stockholm",
      "folklorist",
      "1961 Carnegie Chapter Hall concert",
    ],
  },
  {
    slug: "nina-simone",
    title: "Nina Simone",
    category: "Influence",
    definition:
      "Classically trained pianist and singer who fused jazz, blues, gospel and civil rights protest into a singular, commanding voice. Known as the High Priestess of Soul, she brought conservatory discipline to a repertoire that stretched from Gershwin to the spirituals of the movement, and she treated every song as a statement of identity.",
    inDylan:
      "Simone covered Dylan repeatedly — her readings of his songs stripped them back to raw moral weight and showed how far his writing could travel outside folk. Dylan was deeply impressed by her; he admired the force of her piano playing, the authority of her delivery, and the way she could turn a song into a confrontation. In the mid-1960s, when both artists were reshaping their respective forms, they were often discussed as parallel voices — writers and performers who refused the categories others tried to place them in.",
    example: {
      title: "Just Like Tom Thumb's Blues (Nina Simone)",
      note:
        "Simone's late-career cover strips the original's wry travelogue to its bruised, after-hours core, turning Dylan's tale of lost weekends into a slow piano confession.",
      media: { kind: "youtube", id: "6jWBiFMlGVQ", spotifyId: "3p1uhpNDN4NsA4mhjfOuOy" },
    },
    related: ["protest-song", "cover", "blues", "civil-rights"],
    aliases: ["Eunice Waymon", "High Priestess of Soul", "civil rights", "jazz"],
  },
  {
    slug: "odetta",
    title: "Odetta",
    category: "Roots",
    definition:
      "Folk and blues singer whose booming voice and guitar work carried spirituals, work songs and ballads into the revival.",
    inDylan:
      "Dylan has said hearing Odetta's records made him trade his electric guitar for an acoustic \u2014 she was one of his first direct models.",
    example: {
      title: "No More Auction Block",
      note:
        "Odetta's powerful solo recording of this anti-slavery work song became the template Dylan studied when he was learning how a single voice and acoustic guitar could carry a whole history of struggle. Dylan almost certainly drew on 'No More Auction Block' for 'Blowin' in the Wind' — at least musically, if not thematically — taking the same three-line melodic lift and turning it into one of the most famous questions in popular music.",
      media: { kind: "youtube", id: "AHVWpcJsZBw", spotifyId: "654uytI1ZQaTrioZUKVGAs" },
    },
    related: ["folk-revival", "traditional", "blues"],
    aliases: ["Odetta Holmes", "Voice of the Civil Rights Movement"],
  },
  {
    slug: "sister-rosetta-tharpe",
    title: "Sister Rosetta Tharpe",
    category: "Roots",
    definition:
      "Gospel singer and electric guitarist whose distorted, swinging playing helped invent rock and roll.",
    inDylan:
      "Tharpe is the bridge Dylan's electric turn stands on \u2014 sacred song played loud on an electric guitar, decades before Newport.",
    example: {
      title: "Up Above My Head",
      note:
        "Gospel call-and-response driven by her own electric lead lines \u2014 proof that plugging in was never a break with tradition.",
      media: { kind: "youtube", id: "JeaBNAXfHfQ", spotifyId: "5SdV6pe3sgH7b0DphOwGmI" },
    },
    related: ["gospel", "electric", "newport-1965"],
    aliases: ["Rosetta Nubin", "Godmother of Rock and Roll", "gospel guitar"],
  },
  {
    slug: "elizabeth-cotten",
    title: "Elizabeth Cotten",
    category: "Performance",
    definition:
      "Self-taught guitarist and songwriter who played left-handed on an upside-down guitar, creating the alternating-bass style known as Cotten picking.",
    inDylan:
      "Her fingerpicking became a standard vocabulary in the Village, and her songs entered the revival repertoire Dylan learned from.",
    example: {
      title: "Freight Train",
      note:
        "Written when she was a child, its rolling thumb-and-finger pattern is the textbook example of the picking style revival guitarists copied.",
      media: { kind: "youtube", id: "R2DCWfBkMSI", spotifyId: "0dWGrAFwqAnL3MwagYFG74" },
    },
    related: ["finger-picking", "folk-revival", "guitar"],
    aliases: ["Libba Cotten", "Cotten picking", "Freight Train"],
  },
  {
    slug: "joni-mitchell",
    title: "Joni Mitchell",
    category: "Words",
    definition:
      "Canadian songwriter, painter and guitarist celebrated for open tunings, painterly harmony and candid, emotionally detailed writing that stretched what a pop song could confess.",
    inDylan:
      "A peer rather than a follower \u2014 she toured with Dylan during the Rolling Thunder Revue, and while Dylan had already broadened songwriting into social, mythic and interior territory, Mitchell pushed even further into the openly confessional, mapping private feeling with a specificity that made the personal landscape feel as vast as his symbolic one.",
    example: {
      title: "Coyote",
      note:
        "Written and performed during the Rolling Thunder Revue, it sketches life on that tour in tumbling, novelistic verses.",
      media: { kind: "youtube", id: "zeaO5UZ5OcI", spotifyId: "5fdjxHzBILxMXRrbbOVupJ" },
    },
    related: ["singer-songwriter", "reinvention", "lyric"],
    aliases: ["Roberta Joan Anderson", "open tunings", "Blue"],
  },
  {
    slug: "patti-smith",
    title: "Patti Smith",
    category: "Reinvention",
    definition:
      "Poet and performer who welded Beat and Symbolist poetry to rock and roll at the birth of punk.",
    inDylan:
      "Smith took Dylan's example \u2014 poetry sung over a band \u2014 into punk, and in 2016 sang A Hard Rain's A-Gonna Fall at his Nobel ceremony.",
    example: {
      title: "A Hard Rain's A-Gonna Fall (Nobel ceremony, 2016)",
      note:
        "Her faltering, restarted performance in Stockholm made the song's weight audible in a way a flawless reading could not.",
      media: { kind: "youtube", id: "941PHEJHCwU", spotifyId: "0lIoY4ZQsdn5QzhraM9o9u" },
    },
    related: ["abstract-lyrics", "literature", "cover"],
    aliases: ["punk", "Horses", "Nobel Prize 2016", "Stockholm"],
  },
  {
    slug: "bessie-smith",
    title: "Bessie Smith",
    category: "Roots",
    definition:
      "The Empress of the Blues \u2014 the greatest of the 1920s classic blues singers, with a huge voice and impeccable phrasing.",
    inDylan:
      "Her records are part of the old, weird America Dylan absorbed; the 12-bar shapes and blues phrasing behind his singing start here.",
    example: {
      title: "Nobody Knows You When You're Down and Out",
      note:
        "A plain lesson in blues form and delivery \u2014 the meaning sits in how she bends and delays each line, not in the words alone.",
      media: { kind: "youtube", id: "kxTyV_cBz7o", spotifyId: "1stlnGxZ1HakRx5QUiRIJw" },
    },
    related: ["blues", "vocal-style", "melody"],
    aliases: ["Empress of the Blues", "classic blues", "1920s"],
  },
  {
    slug: "billie-holiday",
    title: "Billie Holiday",
    category: "Performance",
    definition:
      "Jazz singer whose behind-the-beat phrasing and small, expressive voice redefined how a lyric could be sung.",
    inDylan:
      "Dylan has cited her as a model for treating time loosely \u2014 the singer's job is to bend the line, not to hit it squarely.",
    example: {
      title: "Strange Fruit",
      note:
        "A protest song delivered almost without raising the voice \u2014 restraint and phrasing carrying the whole weight of the subject.",
      media: { kind: "youtube", id: "-DGY9HvChXk", spotifyId: "6W5706MsehAWMAZLIg9Fu2" },
    },
    related: ["vocal-style", "protest-song", "melody"],
    aliases: ["Lady Day", "Eleanora Fagan", "jazz singing"],
  },
  {
    slug: "emmylou-harris",
    title: "Emmylou Harris",
    category: "Performance",
    definition:
      "Country singer and harmony vocalist of extraordinary purity, and an interpreter of other writers' songs.",
    inDylan:
      "Harris sang harmony across most of Desire, and her voice shadowing Dylan's is a defining sound of that record.",
    example: {
      title: "Oh Sister",
      note:
        "Her harmony line trails Dylan's melody a step behind and above, giving the song its unsettled, modal atmosphere.",
      media: { kind: "youtube", id: "Tc2NpNqDgPE", spotifyId: "4JtK4KieKw8mlPAIX4ODht" },
    },
    related: ["harmony", "violin", "traditional"],
    aliases: ["Emylou Harris", "Desire 1976", "harmony singing", "country rock"],
  },
  {
    slug: "scarlet-rivera",
    title: "Scarlet Rivera",
    category: "Performance",
    definition:
      "Violinist whose gypsy-inflected, improvised lines became the signature instrumental voice of Dylan's mid-70s work.",
    inDylan:
      "Dylan spotted her carrying a violin case on a New York street, auditioned her that day, and put her on Desire and the Rolling Thunder Revue.",
    example: {
      title: "Hurricane",
      note:
        "Her violin answers every vocal phrase, driving the narrative forward like a second storyteller.",
      media: { kind: "youtube", id: "ujgqOgMIwfA", spotifyId: "1fYdZW9CJOwEjOjVHaxvQ5" },
    },
    related: ["violin", "reinvention", "improvisation"],
    aliases: ["violin", "fiddle", "Desire 1976", "Hurricane"],
  },
  {
    slug: "rob-stoner",
    title: "Rob Stoner",
    category: "Performance",
    definition:
      "Bassist, bandleader and harmony singer who anchored Dylan's Desire sessions and the Rolling Thunder Revue.",
    inDylan:
      "Stoner assembled and led the Rolling Thunder band, holding a loose, shifting group of players to a steady pulse night after night.",
    example: {
      title: "Isis (Rolling Thunder Revue)",
      note:
        "The bass keeps a hard, insistent beat under Dylan's shouted narrative, letting the arrangement stay wild without falling apart.",
      media: { kind: "youtube", id: "INilAY6aJTc", spotifyId: "4znWzULyBSErvvt6rVHlta" },
    },
    related: ["violin", "reinvention", "beat"],
    aliases: ["Robert Rothstein", "bass", "bandleader"],
  },
  {
    slug: "jimi-hendrix",
    title: "Jimi Hendrix",
    category: "Reinvention",
    definition:
      "Guitarist who turned feedback, distortion and the whammy bar into an expressive language of their own.",
    inDylan:
      "Dylan was already a hero to Hendrix before they met; Hendrix had worn out copies of Highway 61 Revisited and called Dylan the poet who turned his mind on. In 1968, the Jimi Hendrix Experience transformed the quiet parable of All Along the Watchtower into an electric storm, and Dylan was overwhelmed by what Hendrix found inside the song. He said Hendrix could 'find things inside a song and vigorously develop them,' improving it by the spaces he used. From the mid-1970s onward Dylan adopted Hendrix's arrangement as his own, and he has described his live versions as tributes to a friend whose interpretation eclipsed even the original.",
    example: {
      title: "All Along the Watchtower (Jimi Hendrix Experience)",
      note:
        "A sparse acoustic parable becomes a storm of guitar \u2014 the clearest proof that a cover can redefine the original.",
      media: { kind: "youtube", id: "TLV4_xaYynY", spotifyId: "7xdLNxZCtY68x5MAOBEmBq" },
    },
    related: ["cover", "electric", "guitar"],
    aliases: ["Watchtower", "Electric Ladyland", "feedback", "Experience"],
  },
  {
    slug: "bob-marley",
    title: "Bob Marley",
    category: "Roots",
    definition:
      "Jamaican singer and songwriter who carried reggae, and its politics, to a global audience.",
    inDylan:
      "Marley's example fed Dylan's late-70s interest in reggae rhythm and in songs that hold faith and protest together.",
    example: {
      title: "Redemption Song",
      note:
        "Voice and acoustic guitar alone, carrying a political and spiritual argument \u2014 the folk form arriving from a different tradition.",
      media: { kind: "youtube", id: "yv5xonFSC4c", spotifyId: "5z30BgFgHH5nqNRa8eRA3H" },
    },
    related: ["reggae", "protest-song", "rhythm"],
    aliases: ["The Wailers", "Jamaica", "Rastafari", "Kingston"],
  },
  {
    slug: "elvis-presley",
    title: "Elvis Presley",
    category: "Roots",
    definition:
      "The singer who fused blues, country and gospel into rock and roll and made it a mass phenomenon.",
    inDylan:
      "Dylan said hearing Elvis was like busting out of jail; Elvis later recorded Tomorrow Is a Long Time, which Dylan called his favourite cover of his own work.",
    example: {
      title: "Tomorrow Is a Long Time (Elvis Presley)",
      note:
        "Elvis sings Dylan's ballad straight and warm, showing how the song works purely as melody once the folk framing is removed.",
      media: { kind: "youtube", id: "0VLpgttfEM0", spotifyId: "1Cw8Z6GmBMkegweASFAgZW" },
    },
    related: ["rock", "cover", "gospel"],
    aliases: ["Elvis", "Presley", "Sun Records", "Memphis", "rock and roll"],
  },
  {
    slug: "buddy-holly",
    title: "Buddy Holly",
    category: "Roots",
    definition:
      "Singer-songwriter who wrote, played and produced his own material, setting the template for the self-contained rock artist.",
    inDylan:
      "Dylan saw Holly play in Duluth days before his death and invoked him in his 1998 Grammy speech \u2014 an early model of writing your own songs.",
    example: {
      title: "That'll Be the Day",
      note:
        "Two guitars, bass and drums playing a song its own singer wrote \u2014 the small, complete unit Dylan grew up hearing.",
      media: { kind: "youtube", id: "M4TfFTmITLo", spotifyId: "4UcHTV3TjlThmMlZgOG4Kr" },
    },
    related: ["singer-songwriter", "rock", "guitar"],
    aliases: ["Charles Hardin Holley", "The Crickets", "Duluth 1959", "Lubbock"],
  },
  {
    slug: "chuck-berry",
    title: "Chuck Berry",
    category: "Words",
    definition:
      "Guitarist and songwriter whose rapid, detailed lyrics and signature riffs defined rock and roll writing.",
    inDylan:
      "Subterranean Homesick Blues owes its tumbling, comic wordplay directly to Berry's Too Much Monkey Business.",
    example: {
      title: "Too Much Monkey Business",
      note:
        "A list-song of daily irritations delivered at speed \u2014 the rhythmic template Dylan borrowed for Subterranean Homesick Blues.",
      media: { kind: "youtube", id: "gxMDKzOgVVo", spotifyId: "7cYcfTspJ2r3xEnilg9B5o" },
    },
    related: ["rock", "rhyme", "narrative"],
    aliases: ["Johnny B. Goode", "St. Louis", "duck walk", "Chess Records"],
  },
  {
    slug: "little-richard",
    title: "Little Richard",
    category: "Performance",
    definition:
      "Pianist and singer whose screaming vocals and pounding piano made rock and roll a physical event.",
    inDylan:
      "Dylan's high-school yearbook ambition was to join Little Richard's band \u2014 his first idea of what a performer could be.",
    example: {
      title: "Tutti Frutti",
      note:
        "Pure delivery over content \u2014 the voice, the piano and the beat carry everything, a lesson in performance as meaning.",
      media: { kind: "youtube", id: "F13JNjpNW6c", spotifyId: "2iXcvnD3d1gfLBum0cE5Eg" },
    },
    related: ["piano", "vocal-style", "rock"],
    aliases: ["Richard Penniman", "Hibbing yearbook", "Tutti Frutti", "Macon"],
  },
  {
    slug: "the-byrds",
    title: "The Byrds",
    category: "Reinvention",
    definition:
      "Los Angeles band whose jangling twelve-string guitars and close harmonies created folk rock.",
    inDylan:
      "Their electric Mr. Tambourine Man was a number one hit in 1965 and showed Dylan's songs could live inside rock arrangements.",
    example: {
      title: "Mr. Tambourine Man (The Byrds)",
      note:
        "One verse, a Rickenbacker twelve-string and tight harmony turn a long folk reverie into a radio single \u2014 folk rock in three minutes.",
      media: { kind: "youtube", id: "Swqw5a8I4b4", spotifyId: "11HmnsdTSpUh6ifD15tywv" },
    },
    related: ["folk-rock", "cover", "harmony"],
    aliases: ["Roger McGuinn", "Jim McGuinn", "Rickenbacker", "twelve-string", "1965"],
  },
  {
    slug: "grateful-dead",
    title: "Grateful Dead",
    category: "Performance",
    definition:
      "San Francisco band built on long improvisation and a repertoire drawn deep from American roots music.",
    inDylan:
      "Dylan toured with the Dead in 1987, and rehearsing his own back catalogue with them pushed him to rethink how his older songs could be played.",
    example: {
      title: "Slow Train (Dylan & the Dead, 1987)",
      note:
        "The band stretches the song out and lets it breathe \u2014 the loose, improvised approach that reopened Dylan's own catalogue to him.",
      media: { kind: "youtube", id: "ZfOHUCZkYjU", spotifyId: "6kpqaDEznzrlLFhPDwjNNY" },
    },
    related: ["improvisation", "traditional", "reinvention"],
    aliases: ["Jerry Garcia", "Dylan & the Dead", "1987 tour", "jam band"],
  },
  {
    slug: "mark-knopfler",
    title: "Mark Knopfler",
    category: "Influence",
    definition:
      "Guitarist and producer of Dire Straits, known for clean fingerstyle electric playing and unhurried arrangements.",
    inDylan:
      "Knopfler played on Slow Train Coming and produced Infidels, giving both records their spare, precise sound.",
    example: {
      title: "Jokerman",
      note:
        "Knopfler's production leaves space around the vocal, letting a dense lyric land clearly \u2014 the producer's hand heard as restraint.",
      media: { kind: "youtube", id: "1XSvsFgvWr0", spotifyId: "6cuHkcRUqtQhtJ4sWCkd1q" },
    },
    related: ["producer", "guitar", "electric"],
    aliases: ["Dire Straits", "Infidels", "Slow Train Coming", "Sultans of Swing"],
  },
  {
    slug: "sly-and-robbie",
    title: "Sly & Robbie",
    category: "Roots",
    definition:
      "Sly Dunbar and Robbie Shakespeare, the Jamaican drum-and-bass duo who defined the sound of modern reggae.",
    inDylan:
      "They played the rhythm section on Infidels, putting a reggae pulse underneath some of Dylan's early-80s songs.",
    example: {
      title: "Man of Peace",
      note:
        "The drums and bass lock into a reggae-inflected groove that drives the song more than the guitars do.",
      media: { kind: "youtube", id: "kLJpoAsZR98", spotifyId: "4rTdJYQ98IB5EOvKxz1Dm3" },
    },
    related: ["reggae", "rhythm", "beat"],
    aliases: [
      "Robbie Shakespeare",
      "Sly Dunbar",
      "riddim twins",
      "Infidels",
      "Jamaica",
    ],
  },
  {
    slug: "daniel-lanois",
    title: "Daniel Lanois",
    category: "Influence",
    definition:
      "Canadian producer known for atmospheric, room-heavy recordings built on texture as much as arrangement.",
    inDylan:
      "Lanois produced Oh Mercy and Time Out of Mind, two late-career records whose sound is inseparable from the songs.",
    example: {
      title: "Time Out of Mind (prod. Daniel Lanois)",
      note:
        "Reverb, murk and distant room sound turn a set of blues-based songs into something haunted \u2014 production as authorship.",
      media: { kind: "youtube", id: "Ex5h0PHHbNI", albumId: "185DHT5SvszXRrezx3lOjt" },
    },
    related: ["producer", "reinvention", "blues"],
    aliases: ["Oh Mercy", "Time Out of Mind", "1997", "ambient production"],
  },
];




// Split terms into rotational sets of ~8 for the head-rotation mechanic.
const SET_SIZE = 8;

export function getTermSets(terms: Term[] = TERMS): Term[][] {
  const sets: Term[][] = [];
  for (let i = 0; i < terms.length; i += SET_SIZE) {
    sets.push(terms.slice(i, i + SET_SIZE));
  }
  return sets;
}

export function findTermSetIndex(slug: string, sets: Term[][]): number {
  const idx = sets.findIndex((set) => set.some((t) => t.slug === slug));
  return idx === -1 ? 0 : idx;
}
