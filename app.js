const STORAGE_KEY = "learn-code-hebrew-progress-v1";

const commandMeta = {
  forward: {
    label: "זוז קדימה",
    short: "קדימה",
    description: "הרובוט מתקדם משבצת אחת.",
    pseudo: "זוז קדימה",
    js: "moveForward();",
  },
  right: {
    label: "פנה ימינה",
    short: "ימינה",
    description: "הרובוט מסתובב ימינה.",
    pseudo: "פנה ימינה",
    js: "turnRight();",
  },
  left: {
    label: "פנה שמאלה",
    short: "שמאלה",
    description: "הרובוט מסתובב שמאלה.",
    pseudo: "פנה שמאלה",
    js: "turnLeft();",
  },
};

const conditionMeta = {
  star: {
    label: "יש כוכב מלפנים",
    pseudo: "יש כוכב מלפנים",
    js: "starAhead()",
  },
  wall: {
    label: "יש קיר מלפנים",
    pseudo: "יש קיר מלפנים",
    js: "wallAhead()",
  },
  clear: {
    label: "הדרך פנויה",
    pseudo: "הדרך פנויה",
    js: "!wallAhead()",
  },
  goal: {
    label: "השער מלפנים",
    pseudo: "השער מלפנים",
    js: "goalAhead()",
  },
};

const storyObjectMeta = {
  cat: { label: "חתול", emoji: "🐱" },
  key: { label: "מפתח", emoji: "🗝️" },
  door: { label: "דלת", emoji: "🚪" },
  friend: { label: "חברה", emoji: "👧" },
  party: { label: "מסיבה", emoji: "🎉" },
};

const storyConditionMeta = {
  always: {
    label: "בלי תנאי",
    pseudo: "תמיד",
    js: "true",
  },
  hasKey: {
    label: "אם יש מפתח",
    pseudo: "יש מפתח",
    js: "state.hasKey",
  },
  doorOpen: {
    label: "אם הדלת פתוחה",
    pseudo: "הדלת פתוחה",
    js: "state.doorOpen",
  },
  friendInvited: {
    label: "אם החברה הוזמנה",
    pseudo: "החברה הוזמנה",
    js: "state.friendInvited",
  },
  catHappy: {
    label: "אם החתול רגוע",
    pseudo: "החתול רגוע",
    js: "state.catHappy",
  },
};

const storyActionMeta = {
  sayHello: {
    label: "אמרי שלום",
    pseudo: "אמרי שלום",
    js: "sayHello();",
    effects: { catHappy: true },
    feedback: "החתול שמע שלום ונרגע.",
  },
  wave: {
    label: "נפנפי לשלום",
    pseudo: "נפנפי לשלום",
    js: "wave();",
    effects: {},
    feedback: "נפנפת, אבל זה לא ממש שינה את הסיפור.",
  },
  takeKey: {
    label: "קחי מפתח",
    pseudo: "קחי מפתח",
    js: "takeKey();",
    effects: { hasKey: true },
    feedback: "עכשיו יש לך מפתח.",
  },
  knockDoor: {
    label: "דפקי על הדלת",
    pseudo: "דפקי על הדלת",
    js: "knockDoor();",
    effects: {},
    feedback: "דפקת על הדלת, אבל היא לא נפתחה.",
  },
  openDoor: {
    label: "פתחי דלת",
    pseudo: "פתחי דלת",
    js: "openDoor();",
    effects: { doorOpen: true },
    feedback: "הדלת נפתחה.",
  },
  inviteFriend: {
    label: "הזמיני חברה",
    pseudo: "הזמיני חברה",
    js: "inviteFriend();",
    effects: { friendInvited: true },
    feedback: "החברה הוזמנה למסיבה.",
  },
  startParty: {
    label: "התחילי מסיבה",
    pseudo: "התחילי מסיבה",
    js: "startParty();",
    effects: { partyStarted: true },
    feedback: "המסיבה התחילה!",
  },
};

const storyFlagMeta = {
  catHappy: { label: "החתול רגוע", emoji: "🐱" },
  hasKey: { label: "יש מפתח", emoji: "🗝️" },
  doorOpen: { label: "הדלת פתוחה", emoji: "🚪" },
  friendInvited: { label: "החברה הוזמנה", emoji: "👧" },
  partyStarted: { label: "המסיבה התחילה", emoji: "🎉" },
};

const moduleMeta = {
  sequence: { icon: "🤖", label: "צעדים" },
  loops: { icon: "🌼", label: "לולאות" },
  conditions: { icon: "🔎", label: "תנאים" },
  debug: { icon: "🩺", label: "באגים" },
  combo: { icon: "✨", label: "שילובים" },
  builder: { icon: "🧱", label: "בונה" },
  snake: { icon: "🐍", label: "נחש" },
  turtle: { icon: "🐢", label: "צב" },
  story: { icon: "🎭", label: "סיפור" },
  kitchen: { icon: "🍲", label: "מטבח" },
  warehouse: { icon: "🚚", label: "אלגוריתמים" },
};

const companionStages = [
  {
    minCompletedLevels: 0,
    title: "נובה מתעוררת",
    subtitle: "החברה שלך עדיין קטנה, אבל כבר סקרנית.",
    mood: "בואי נתחיל מסע חדש!",
    nextUnlockLabel: "ניצוץ ראשון",
    accessories: [],
  },
  {
    minCompletedLevels: 2,
    title: "נובה המנצנצת",
    subtitle: "נפתח לנובה כוכב קטן שמופיע ליד כל הצלחה.",
    mood: "אני כבר מתחילה לזהור!",
    nextUnlockLabel: "כובע הרפתקאות",
    accessories: ["spark"],
  },
  {
    minCompletedLevels: 5,
    title: "נובה החוקרת",
    subtitle: "כובע קטן הופיע, ועכשיו היא נראית ממש מוכנה להרפתקה.",
    mood: "יש לי כבר כובע של חוקרת קוד.",
    nextUnlockLabel: "תרמיל מדבקות",
    accessories: ["spark", "hat"],
  },
  {
    minCompletedLevels: 8,
    title: "נובה האוספת",
    subtitle: "נפתח תרמיל כוכבים קטן שאוסף את כל ההפתעות בדרך.",
    mood: "אני שומרת את כל הכוכבים שלנו.",
    nextUnlockLabel: "גלימת אומץ",
    accessories: ["spark", "hat", "backpack"],
  },
  {
    minCompletedLevels: 12,
    title: "נובה האמיצה",
    subtitle: "הגלימה כבר מאחוריה, והמסע נראה הרבה יותר חגיגי.",
    mood: "אנחנו כבר עמוק במסע!",
    nextUnlockLabel: "כתר נצנצים",
    accessories: ["spark", "hat", "backpack", "cape"],
  },
  {
    minCompletedLevels: 18,
    title: "נובה הזוהרת",
    subtitle: "כתר נוצץ וענן קטן של כוכבים מלווים כל הצלחה.",
    mood: "כל שלב שאת מסיימת ממש משנה אותי.",
    nextUnlockLabel: "כנפיים של אלופה",
    accessories: ["spark", "hat", "backpack", "cape", "crown"],
  },
  {
    minCompletedLevels: 24,
    title: "נובה האלופה",
    subtitle: "נובה קיבלה כנפיים חגיגיות והפכה לשותפה מלאה למסע.",
    mood: "תראי אותנו. אנחנו ממש צוות קוד.",
    nextUnlockLabel: "הכול פתוח",
    accessories: ["spark", "hat", "backpack", "cape", "crown", "wings"],
  },
];

const futureGames = [
  {
    title: "עיר חכמה",
    text: "רמזורים, מכוניות וחוקים קטנים שמנהלים עיר דרך אירועים והחלטות.",
  },
  {
    title: "מכונת מוזיקה",
    text: "לולאות, תזמון ותבניות שיוצרות מקצבים ושירים קטנים מקוד.",
  },
  {
    title: "נחש עם חוקים",
    text: "לא עוד מסלול, אלא מנוע החלטות קטן שבו הנחש רץ לפי סדר של חוקים.",
  },
  {
    title: "מצב כתיבה",
    text: "מעבירים את אותם רעיונות מבלוקים לקוד מוקלד, שלב אחרי שלב.",
  },
];

const modules = [
  {
    id: "sequence",
    tone: "sequence",
    title: "מסע הרובוט",
    concept: "סדר פעולות",
    description: "לומדות לבנות רצף ברור של צעדים ולהריץ אותו.",
    lessons: [
      {
        id: "seq-1",
        title: "שביל העוגיות",
        instruction: "הובילי את הרובוט ישר אל השער ואספי בדרך את הכוכבים.",
        hint: "נסי שלושה צעדים קדימה.",
        objective: "להגיע לשער",
        maxProgramLength: 4,
        boardSize: 5,
        start: { x: 0, y: 4, dir: "E" },
        goal: { x: 3, y: 4 },
        stars: [
          { x: 1, y: 4 },
          { x: 2, y: 4 },
        ],
        walls: [],
        features: ["forward", "right", "left"],
        solutionProgram: [
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
        ],
      },
      {
        id: "seq-2",
        title: "הפנייה בגינה",
        instruction: "הפעם צריך גם לפנות. אספי את שני הכוכבים בדרך אל השער.",
        hint: "קודם עולים, אחר כך פונים ימינה.",
        objective: "להגיע לשער ולאסוף 2 כוכבים",
        maxProgramLength: 6,
        boardSize: 5,
        start: { x: 1, y: 4, dir: "N" },
        goal: { x: 3, y: 2 },
        stars: [
          { x: 1, y: 3 },
          { x: 2, y: 2 },
        ],
        walls: [],
        features: ["forward", "right", "left"],
        solutionProgram: [
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
          { type: "action", action: "right" },
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
        ],
      },
      {
        id: "seq-3",
        title: "עוקפים את הסלע",
        instruction: "יש עמוד של סלעים באמצע. בני דרך מסודרת מסביבם.",
        hint: "זוזי פעם אחת קדימה, עלי למעלה, ואז פני שוב ימינה.",
        objective: "לעקוף מכשול ולהגיע לשער",
        maxProgramLength: 12,
        boardSize: 5,
        start: { x: 0, y: 4, dir: "E" },
        goal: { x: 4, y: 0 },
        stars: [
          { x: 1, y: 2 },
          { x: 3, y: 0 },
        ],
        walls: [
          { x: 2, y: 2 },
          { x: 2, y: 3 },
          { x: 2, y: 4 },
        ],
        features: ["forward", "right", "left"],
        solutionProgram: [
          { type: "action", action: "forward" },
          { type: "action", action: "left" },
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
          { type: "action", action: "right" },
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
        ],
      },
    ],
  },
  {
    id: "loops",
    tone: "loops",
    title: "גן הלולאות",
    concept: "חזרות",
    description: "חוסכות בלוקים על ידי פעולה שחוזרת כמה פעמים.",
    lessons: [
      {
        id: "loop-1",
        title: "שביל ארוך אחד",
        instruction: "כאן כדאי להשתמש בבלוק חזרה. יש רק מעט מקום בתוכנית.",
        hint: "בלוק אחד של חזרה יכול לעשות ארבעה צעדים במקומך.",
        objective: "להגיע לשער עם מעט בלוקים",
        maxProgramLength: 2,
        boardSize: 5,
        start: { x: 0, y: 4, dir: "E" },
        goal: { x: 4, y: 4 },
        stars: [
          { x: 2, y: 4 },
          { x: 3, y: 4 },
        ],
        walls: [],
        features: ["forward", "right", "left", "repeat"],
        solutionProgram: [{ type: "repeat", count: 4, action: "forward" }],
      },
      {
        id: "loop-2",
        title: "פינה ועוד פינה",
        instruction: "נסי להשתמש פעמיים בלולאה כדי לחסוך מקום.",
        hint: "שלושה צעדים קדימה, פנייה ימינה, ואז שוב שלושה צעדים.",
        objective: "להגיע לשער ולאסוף 2 כוכבים",
        maxProgramLength: 4,
        boardSize: 5,
        start: { x: 0, y: 4, dir: "N" },
        goal: { x: 3, y: 1 },
        stars: [
          { x: 0, y: 2 },
          { x: 2, y: 1 },
        ],
        walls: [],
        features: ["forward", "right", "left", "repeat"],
        solutionProgram: [
          { type: "repeat", count: 3, action: "forward" },
          { type: "action", action: "right" },
          { type: "repeat", count: 3, action: "forward" },
        ],
      },
      {
        id: "loop-3",
        title: "ריצה לפינה הרחוקה",
        instruction: "הפינה הרחוקה מחכה. בואי נגיע אליה עם כמה שפחות שורות.",
        hint: "ארבעה צעדים למעלה, פנייה אחת, ואז עוד ארבעה צעדים.",
        objective: "להגיע לשער עם 3 שורות או פחות",
        maxProgramLength: 3,
        boardSize: 5,
        start: { x: 0, y: 4, dir: "N" },
        goal: { x: 4, y: 0 },
        stars: [
          { x: 0, y: 2 },
          { x: 2, y: 0 },
        ],
        walls: [],
        features: ["forward", "right", "left", "repeat"],
        solutionProgram: [
          { type: "repeat", count: 4, action: "forward" },
          { type: "action", action: "right" },
          { type: "repeat", count: 4, action: "forward" },
        ],
      },
    ],
  },
  {
    id: "conditions",
    tone: "conditions",
    title: "רואות ומחליטות",
    concept: "תנאים",
    description: "הקוד רואה משהו מולו ואז מחליט: כוכב, קיר או שער.",
    lessons: [
      {
        id: "cond-1",
        title: "כוכב בדרך",
        instruction: "לפעמים יש כוכב בדרך ולפעמים לא. אם יש כוכב ממש מלפנים, אוספים אותו קודם ורק אז ממשיכים לשער.",
        hint: "נסי: אם יש כוכב מלפנים, זוז קדימה. אחר כך עוד צעד קדימה.",
        objective: "להשתמש ב'אם יש כוכב מלפנים'",
        maxProgramLength: 2,
        boardSize: 5,
        start: { x: 0, y: 4, dir: "E" },
        goal: { x: 2, y: 4 },
        stars: [{ x: 1, y: 4 }],
        walls: [],
        variants: [
          {
            goal: { x: 2, y: 4 },
            stars: [{ x: 1, y: 4 }],
            walls: [],
          },
          {
            goal: { x: 1, y: 4 },
            stars: [],
            walls: [],
          },
        ],
        features: ["forward", "condition"],
        conditionOptions: ["star"],
        solutionProgram: [
          { type: "condition", check: "star", action: "forward" },
          { type: "action", action: "forward" },
        ],
      },
      {
        id: "cond-2",
        title: "יש קיר? פונים",
        instruction: "במסלול אחד הדרך פנויה, ובמסלול אחר יש קיר ממש מלפנים. הקוד צריך לבדוק את הקיר ואז להחליט אם לפנות.",
        hint: "אם יש קיר, פנה ימינה. אחר כך התקדמי פעמיים.",
        objective: "להשתמש ב'אם יש קיר מלפנים'",
        maxProgramLength: 3,
        boardSize: 5,
        start: { x: 1, y: 3, dir: "N" },
        goal: { x: 1, y: 1 },
        stars: [{ x: 1, y: 2 }],
        walls: [],
        variants: [
          {
            goal: { x: 1, y: 1 },
            stars: [{ x: 1, y: 2 }],
            walls: [],
          },
          {
            goal: { x: 3, y: 3 },
            stars: [{ x: 2, y: 3 }],
            walls: [{ x: 1, y: 2 }],
          },
        ],
        features: ["forward", "right", "left", "condition"],
        conditionOptions: ["wall"],
        solutionProgram: [
          { type: "condition", check: "wall", action: "right" },
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
        ],
      },
      {
        id: "cond-3",
        title: "השער קרוב או רחוק",
        instruction: "תמיד מתחילים בצעד אחד קדימה. אחר כך בודקים: האם השער ממש מלפנים, או שצריך לעצור כאן?",
        hint: "קודם זוזי קדימה פעם אחת, ואז שאלי: האם השער מלפנים?",
        objective: "להשתמש ב'אם השער מלפנים' כדי לעצור בדיוק במקום",
        maxProgramLength: 2,
        boardSize: 5,
        start: { x: 1, y: 3, dir: "N" },
        goal: { x: 1, y: 1 },
        stars: [{ x: 1, y: 2 }],
        walls: [],
        variants: [
          {
            goal: { x: 1, y: 1 },
            stars: [{ x: 1, y: 2 }],
            walls: [],
          },
          {
            goal: { x: 1, y: 2 },
            stars: [{ x: 1, y: 2 }],
            walls: [],
          },
        ],
        features: ["forward", "condition"],
        conditionOptions: ["goal"],
        solutionProgram: [
          { type: "action", action: "forward" },
          { type: "condition", check: "goal", action: "forward" },
        ],
      },
    ],
  },
  {
    id: "debug",
    tone: "debug",
    title: "מרפאת הבאגים",
    concept: "תיקון שגיאות",
    description: "הקוד כמעט נכון, אבל יש בו טעות אחת שצריך לתקן.",
    lessons: [
      {
        id: "debug-1",
        title: "טעות בפנייה",
        instruction: "יש כאן שורה אחת לא נכונה. תקני אותה כדי להגיע לשער.",
        hint: "בשלב הזה צריך לפנות ימינה, לא שמאלה.",
        objective: "למצוא שורה שגויה ולתקן אותה",
        maxProgramLength: 5,
        boardSize: 5,
        start: { x: 0, y: 4, dir: "N" },
        goal: { x: 2, y: 2 },
        stars: [{ x: 0, y: 3 }],
        walls: [],
        features: ["forward", "right", "left"],
        starterProgram: [
          { type: "action", action: "forward", locked: true },
          { type: "action", action: "forward", locked: true },
          { type: "action", action: "left" },
          { type: "action", action: "forward", locked: true },
          { type: "action", action: "forward", locked: true },
        ],
        solutionProgram: [
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
          { type: "action", action: "right" },
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
        ],
      },
      {
        id: "debug-2",
        title: "מונה לא נכון",
        instruction: "כמעט כל הקוד נכון, אבל מספר החזרות האחרון קטן מדי.",
        hint: "בלולאה האחרונה צריך עוד צעד אחד.",
        objective: "לתקן מספר חזרות",
        maxProgramLength: 3,
        boardSize: 5,
        start: { x: 0, y: 4, dir: "N" },
        goal: { x: 3, y: 1 },
        stars: [
          { x: 0, y: 2 },
          { x: 2, y: 1 },
        ],
        walls: [],
        features: ["forward", "right", "left", "repeat"],
        starterProgram: [
          { type: "repeat", count: 3, action: "forward", locked: true },
          { type: "action", action: "right", locked: true },
          { type: "repeat", count: 2, action: "forward" },
        ],
        solutionProgram: [
          { type: "repeat", count: 3, action: "forward" },
          { type: "action", action: "right" },
          { type: "repeat", count: 3, action: "forward" },
        ],
      },
      {
        id: "debug-3",
        title: "תנאי שמסתובב לצד הלא נכון",
        instruction: "הקוד יודע לבדוק קיר, אבל בוחר פעולה לא נכונה. תקני אותו.",
        hint: "אם יש קיר מלפנים, צריך לפנות ימינה.",
        objective: "לתקן תנאי אחד",
        maxProgramLength: 3,
        boardSize: 5,
        start: { x: 1, y: 3, dir: "N" },
        goal: { x: 3, y: 3 },
        stars: [{ x: 2, y: 3 }],
        walls: [{ x: 1, y: 2 }],
        features: ["forward", "right", "left", "condition"],
        conditionOptions: ["wall"],
        starterProgram: [
          { type: "condition", check: "wall", action: "left" },
          { type: "action", action: "forward", locked: true },
          { type: "action", action: "forward", locked: true },
        ],
        solutionProgram: [
          { type: "condition", check: "wall", action: "right" },
          { type: "action", action: "forward" },
          { type: "action", action: "forward" },
        ],
      },
    ],
  },
  {
    id: "combo",
    tone: "combo",
    title: "הכל ביחד",
    concept: "שילוב חכם",
    description: "כאן משלבות לולאות, תנאים, קירות, כוכבים ושערים באותה תוכנית.",
    unlockAfterModuleId: "debug",
    lessons: [
      {
        id: "combo-1",
        title: "שני שבילים, קוד אחד",
        instruction: "אותו קוד צריך לדעת מתי להמשיך ישר ומתי לפנות במסלול אחר. כאן משלבים חזרה עם בדיקת קיר.",
        hint: "נסי: חזרי 2 פעמים קדימה, אם יש קיר פני ימינה, ואז חזרי עוד 2 פעמים קדימה.",
        objective: "לשלב לולאה עם 'אם יש קיר מלפנים'",
        maxProgramLength: 3,
        boardSize: 5,
        start: { x: 0, y: 4, dir: "N" },
        goal: { x: 0, y: 0 },
        stars: [
          { x: 0, y: 3 },
          { x: 0, y: 1 },
        ],
        walls: [],
        variants: [
          {
            goal: { x: 0, y: 0 },
            stars: [
              { x: 0, y: 3 },
              { x: 0, y: 1 },
            ],
            walls: [],
          },
          {
            goal: { x: 2, y: 2 },
            stars: [
              { x: 0, y: 3 },
              { x: 1, y: 2 },
            ],
            walls: [{ x: 0, y: 1 }],
          },
        ],
        features: ["forward", "right", "left", "repeat", "condition"],
        conditionOptions: ["wall"],
        solutionProgram: [
          { type: "repeat", count: 2, action: "forward" },
          { type: "condition", check: "wall", action: "right" },
          { type: "repeat", count: 2, action: "forward" },
        ],
      },
      {
        id: "combo-2",
        title: "כוכב משנה מסלול",
        instruction: "אם יש כוכב בתחילת הדרך הרובוט מגיע לקיר מאוחר יותר, ואם אין כוכב הוא ממשיך ישר. כאן צריך לשלב כוכב, קיר ולולאות.",
        hint: "נסי: אם יש כוכב זוז קדימה, חזרי 2 פעמים קדימה, אם יש קיר פני שמאלה, ואז חזרי עוד 2 פעמים קדימה.",
        objective: "לשלב 'אם יש כוכב' עם 'אם יש קיר' ועם חזרות",
        maxProgramLength: 4,
        boardSize: 6,
        start: { x: 0, y: 4, dir: "E" },
        goal: { x: 3, y: 2 },
        stars: [{ x: 1, y: 4 }],
        walls: [{ x: 4, y: 4 }],
        variants: [
          {
            goal: { x: 3, y: 2 },
            stars: [{ x: 1, y: 4 }],
            walls: [{ x: 4, y: 4 }],
          },
          {
            goal: { x: 4, y: 4 },
            stars: [],
            walls: [],
          },
        ],
        features: ["forward", "right", "left", "repeat", "condition"],
        conditionOptions: ["star", "wall"],
        solutionProgram: [
          { type: "condition", check: "star", action: "forward" },
          { type: "repeat", count: 2, action: "forward" },
          { type: "condition", check: "wall", action: "left" },
          { type: "repeat", count: 2, action: "forward" },
        ],
      },
      {
        id: "combo-3",
        title: "הגמר הגדול",
        instruction: "זה שלב סיום פתוח יותר: אותו קוד צריך לאסוף אם יש כוכב, לפנות אם מופיע קיר, ואז לבדוק אם השער ממש מולו בשביל הצעד האחרון.",
        hint: "כיוון טוב להתחלה: כוכב, חזרה, קיר, חזרה, ואז בדיקת שער.",
        objective: "לבנות תוכנית ארוכה שמשלבת כמה רעיונות יחד",
        maxProgramLength: 5,
        boardSize: 6,
        start: { x: 0, y: 4, dir: "E" },
        goal: { x: 3, y: 1 },
        stars: [{ x: 1, y: 4 }],
        walls: [{ x: 4, y: 4 }],
        variants: [
          {
            goal: { x: 3, y: 1 },
            stars: [{ x: 1, y: 4 }],
            walls: [{ x: 4, y: 4 }],
          },
          {
            goal: { x: 5, y: 4 },
            stars: [],
            walls: [],
          },
        ],
        features: ["forward", "right", "left", "repeat", "condition"],
        conditionOptions: ["star", "wall", "goal"],
        solutionProgram: [
          { type: "condition", check: "star", action: "forward" },
          { type: "repeat", count: 2, action: "forward" },
          { type: "condition", check: "wall", action: "left" },
          { type: "repeat", count: 2, action: "forward" },
          { type: "condition", check: "goal", action: "forward" },
        ],
      },
    ],
  },
  {
    id: "builder",
    tone: "builder",
    title: "בונה שלבים",
    concept: "יוצרות אתגר",
    description: "כאן הילדה בונה את השלב בעצמה: שמה קירות, כוכבים ושער, ובודקת אם יצא אתגר מעניין.",
    unlockAfterModuleId: "combo",
    lessons: [
      {
        id: "builder-1",
        mode: "builder",
        title: "בונות פנייה טובה",
        instruction: "בני שלב שיש בו דרך אמיתית לשער, אבל לא דרך ישרה ומשעממת. המטרה היא לבנות אתגר שדורש לפחות פנייה אחת.",
        hint: "שימי שער, הוסיפי כמה קירות, ואז בדקי אם עדיין נשאר מסלול שאפשר לעבור.",
        objective: "לבנות שלב עם קירות ועם לפחות פנייה אחת בדרך",
        maxProgramLength: 0,
        boardSize: 6,
        start: { x: 0, y: 5, dir: "E" },
        goal: { x: 4, y: 1 },
        stars: [],
        walls: [],
        features: [],
        builderRules: [
          { type: "pathExists", label: "יש בכלל דרך מנקודת ההתחלה אל השער" },
          { type: "wallCount", min: 3, label: "יש לפחות 3 קירות על הלוח" },
          { type: "turnsMin", min: 1, label: "הדרך הקצרה דורשת לפחות פנייה אחת" },
          { type: "pathLengthMin", min: 5, label: "הדרך לא קצרה מדי: לפחות 5 צעדים" },
        ],
        solutionProgram: [],
      },
      {
        id: "builder-2",
        mode: "builder",
        title: "בונות שלב ללולאה",
        instruction: "עכשיו המטרה היא לבנות מסלול שיש בו קטע ארוך וישר, כזה שממש מזמין בלוק חזרה. הוסיפי גם כוכב אחד לפחות בדרך.",
        hint: "נסי לבנות שביל ארוך וישר של ארבעה צעדים לפחות, ולשים כוכב באמצע.",
        objective: "לבנות שלב עם קטע ישר ארוך שכדאי לפתור עם לולאה",
        maxProgramLength: 0,
        boardSize: 6,
        start: { x: 0, y: 5, dir: "E" },
        goal: { x: 5, y: 5 },
        stars: [],
        walls: [],
        features: [],
        builderRules: [
          { type: "pathExists", label: "יש דרך מההתחלה עד השער" },
          { type: "starCount", min: 1, label: "יש לפחות כוכב אחד בדרך" },
          { type: "wallCount", min: 2, label: "הוספת לפחות 2 קירות כדי לעצב את המסלול" },
          { type: "straightRunMin", min: 4, label: "בדרך הקצרה יש קטע ישר של 4 צעדים לפחות" },
        ],
        solutionProgram: [],
      },
      {
        id: "builder-3",
        mode: "builder",
        title: "האתגר שלי",
        instruction: "כאן כבר בונים שלב משלך. הוא צריך להיות עשיר יותר: קצת קירות, כמה כוכבים, ודרך שלא נגמרת מיד.",
        hint: "בני קודם מסלול שאפשר לעבור, ואז הוסיפי עליו כוכבים וקירות בלי לחסום אותו.",
        objective: "לבנות שלב עשיר שאפשר ממש לשחק בו",
        maxProgramLength: 0,
        boardSize: 6,
        start: { x: 0, y: 5, dir: "E" },
        goal: { x: 5, y: 0 },
        stars: [],
        walls: [],
        features: [],
        builderRules: [
          { type: "pathExists", label: "יש מסלול פתור מההתחלה עד השער" },
          { type: "wallCount", min: 5, label: "יש לפחות 5 קירות" },
          { type: "starCount", min: 2, label: "יש לפחות 2 כוכבים" },
          { type: "turnsMin", min: 2, label: "צריך לפחות שתי פניות בדרך הקצרה" },
          { type: "pathLengthMin", min: 7, label: "הדרך ארוכה מספיק: לפחות 7 צעדים" },
        ],
        solutionProgram: [],
      },
    ],
  },
  {
    id: "snake",
    tone: "snake",
    title: "נחש חכם",
    concept: "חוקים לנחש",
    description: "הנחש רץ לבד, אוסף תפוחים ומחליט מתי לפנות כדי להגיע הביתה.",
    unlockAfterModuleId: "combo",
    boardTheme: {
      actorPrefix: "🐍",
      starToken: "🍎",
      goalToken: "בית",
    },
    lessons: [
      {
        id: "snake-1",
        title: "שביל התפוחים",
        instruction: "הנחש רעב ורוצה לחזור הביתה. בונים לו חוק קצר שרץ ישר לאורך השביל ואוסף את כל התפוחים.",
        hint: "בלוק חזרה אחד יכול להזיז את הנחש ארבע פעמים.",
        objective: "לאסוף את כל התפוחים ולהגיע הביתה",
        maxProgramLength: 1,
        boardSize: 6,
        start: { x: 0, y: 5, dir: "E" },
        goal: { x: 4, y: 5 },
        stars: [
          { x: 1, y: 5 },
          { x: 2, y: 5 },
          { x: 3, y: 5 },
        ],
        walls: [],
        features: ["forward", "repeat"],
        solutionProgram: [{ type: "repeat", count: 4, action: "forward" }],
      },
      {
        id: "snake-2",
        title: "אם יש גדר",
        instruction: "בבוסתן אחד השביל פתוח, ובבוסתן השני יש גדר ממש מלפנים. אותו קוד צריך לדעת אם לפנות ימינה או להמשיך ישר.",
        hint: "אם יש קיר מלפנים, פנה ימינה. אחר כך חזרי פעמיים קדימה.",
        objective: "להשתמש ב'אם יש קיר מלפנים' בשני בוסתנים",
        maxProgramLength: 2,
        boardSize: 6,
        start: { x: 1, y: 4, dir: "N" },
        goal: { x: 1, y: 2 },
        stars: [{ x: 1, y: 3 }],
        walls: [],
        variants: [
          {
            goal: { x: 1, y: 2 },
            stars: [{ x: 1, y: 3 }],
            walls: [],
          },
          {
            goal: { x: 3, y: 4 },
            stars: [{ x: 2, y: 4 }],
            walls: [{ x: 1, y: 3 }],
          },
        ],
        features: ["forward", "right", "repeat", "condition"],
        conditionOptions: ["wall"],
        solutionProgram: [
          { type: "condition", check: "wall", action: "right" },
          { type: "repeat", count: 2, action: "forward" },
        ],
      },
      {
        id: "snake-3",
        title: "שני בוסתנים, נחש אחד",
        instruction: "לפעמים יש תפוח ראשון ממש מול הנחש, ולפעמים לא. אחר כך יכול להופיע גם קיר. בונים חוק חכם שיודע להתמודד עם שתי האפשרויות.",
        hint: "אם יש תפוח זוזי קדימה, חזרי פעמיים קדימה, ואם יש קיר פני שמאלה ואז חזרי עוד פעמיים.",
        objective: "לשלב תפוח, קיר וחזרה באותה תוכנית",
        maxProgramLength: 4,
        boardSize: 6,
        start: { x: 0, y: 4, dir: "E" },
        goal: { x: 3, y: 2 },
        stars: [{ x: 1, y: 4 }],
        walls: [{ x: 4, y: 4 }],
        variants: [
          {
            goal: { x: 3, y: 2 },
            stars: [{ x: 1, y: 4 }],
            walls: [{ x: 4, y: 4 }],
          },
          {
            goal: { x: 4, y: 4 },
            stars: [],
            walls: [],
          },
        ],
        features: ["forward", "left", "repeat", "condition"],
        conditionOptions: ["star", "wall"],
        solutionProgram: [
          { type: "condition", check: "star", action: "forward" },
          { type: "repeat", count: 2, action: "forward" },
          { type: "condition", check: "wall", action: "left" },
          { type: "repeat", count: 2, action: "forward" },
        ],
      },
    ],
  },
  {
    id: "turtle",
    tone: "turtle",
    title: "צב מצייר",
    concept: "פונקציות וציור",
    description: "כאן הצב באמת מצייר צורות על הדף. לומדות ששגרה אחת יכולה להיות חלק קטן שחוזר בציור גדול.",
    unlockAfterModuleId: "builder",
    boardTheme: {
      actorPrefix: "🐢",
      starToken: "🎨",
      goalToken: "סוף",
    },
    lessons: [
      {
        id: "turtle-1",
        mode: "draw",
        title: "קו ארוך",
        instruction: "הפעם לא מגיעים לשערים ולא אוספים כוכבים. הצב צריך לצבוע בדיוק את הקו המסומן על הדף, ורצוי לעשות את זה עם שגרה אחת.",
        hint: "השגרה כבר יודעת לעשות ארבעה צעדים קדימה.",
        objective: "לצבוע קו ישר בעזרת שגרה אחת",
        maxProgramLength: 1,
        boardSize: 6,
        start: { x: 0, y: 5, dir: "E" },
        goal: { x: 4, y: 5 },
        paintTargets: [
          { x: 0, y: 5 },
          { x: 1, y: 5 },
          { x: 2, y: 5 },
          { x: 3, y: 5 },
          { x: 4, y: 5 },
        ],
        exactPaint: true,
        stars: [],
        walls: [],
        features: ["routine"],
        routines: [
          {
            id: "long-line",
            label: "קו ארוך()",
            description: "שגרה אחת שמתקדמת ארבעה צעדים רצופים.",
            pseudo: "קו ארוך();",
            js: "drawLongLine();",
            steps: [{ type: "repeat", count: 4, action: "forward" }],
          },
        ],
        solutionProgram: [{ type: "routine", routineId: "long-line" }],
      },
      {
        id: "turtle-2",
        mode: "draw",
        title: "פינה מצוירת",
        instruction: "הפינה כבר מסומנת על הדף. עכשיו הצב צריך לצייר אותה באמת: קודם חלק אחד של הצורה, ואז את ההמשך.",
        hint: "הפעילי פעם אחת את פינה(), ואז התקדמי עוד פעמיים.",
        objective: "לצבוע פינה בעזרת שגרה ועוד צעד חוזר",
        maxProgramLength: 2,
        boardSize: 6,
        start: { x: 0, y: 5, dir: "N" },
        goal: { x: 2, y: 3 },
        paintTargets: [
          { x: 0, y: 5 },
          { x: 0, y: 4 },
          { x: 0, y: 3 },
          { x: 1, y: 3 },
          { x: 2, y: 3 },
        ],
        exactPaint: true,
        stars: [],
        walls: [],
        features: ["forward", "right", "repeat", "routine"],
        routines: [
          {
            id: "corner",
            label: "פינה()",
            description: "שני צעדים ישר ואז פנייה ימינה.",
            pseudo: "פינה();",
            js: "drawCorner();",
            steps: [
              { type: "repeat", count: 2, action: "forward" },
              { type: "action", action: "right" },
            ],
          },
        ],
        solutionProgram: [
          { type: "routine", routineId: "corner" },
          { type: "repeat", count: 2, action: "forward" },
        ],
      },
      {
        id: "turtle-3",
        mode: "draw",
        title: "מסגרת קטנה",
        instruction: "הצורה המסומנת עכשיו היא מסגרת קטנה. הדרך החכמה לצבוע אותה היא להשתמש שוב ושוב באותה שגרה קצרה.",
        hint: "הפעלת פינה() ארבע פעמים תחזיר את הצב לנקודת ההתחלה.",
        objective: "לצבוע מסגרת שלמה בעזרת אותה שגרה 4 פעמים",
        maxProgramLength: 4,
        boardSize: 6,
        start: { x: 1, y: 4, dir: "N" },
        goal: { x: 1, y: 4 },
        paintTargets: [
          { x: 1, y: 4 },
          { x: 1, y: 3 },
          { x: 1, y: 2 },
          { x: 2, y: 2 },
          { x: 3, y: 2 },
          { x: 3, y: 3 },
          { x: 3, y: 4 },
          { x: 2, y: 4 },
        ],
        exactPaint: true,
        stars: [],
        walls: [],
        features: ["routine"],
        routines: [
          {
            id: "corner",
            label: "פינה()",
            description: "שני צעדים ישר ואז פנייה ימינה.",
            pseudo: "פינה();",
            js: "drawCorner();",
            steps: [
              { type: "repeat", count: 2, action: "forward" },
              { type: "action", action: "right" },
            ],
          },
        ],
        solutionProgram: [
          { type: "routine", routineId: "corner" },
          { type: "routine", routineId: "corner" },
          { type: "routine", routineId: "corner" },
          { type: "routine", routineId: "corner" },
        ],
      },
    ],
  },
  {
    id: "story",
    tone: "story",
    title: "סיפור אינטראקטיבי",
    concept: "אירועים ומצב",
    description: "הסיפור כבר לא רץ על מבוך. כותבות כללים של לחיצה, שומרות מצב, וגורמות לדמויות להגיב.",
    unlockAfterModuleId: "turtle",
    boardTheme: {
      actorPrefix: "🧒",
      starToken: "🎁",
      goalToken: "סוף",
    },
    lessons: [
      {
        id: "story-1",
        mode: "story",
        title: "כשלוחצים על החתול",
        instruction: "כאן לומדות אירוע ראשון: לא זזים במבוך, אלא בונות כלל שאומר מה קורה כשלוחצים על החתול.",
        hint: "נסי כלל אחד: כשלוחצים על החתול, אמרי שלום.",
        objective: "לגרום לחתול להירגע בעזרת כלל לחיצה",
        maxProgramLength: 1,
        boardSize: 4,
        start: { x: 0, y: 3, dir: "E" },
        goal: { x: 0, y: 3 },
        stars: [],
        walls: [],
        features: ["story-rule"],
        storyObjects: ["cat"],
        storyObjectOptions: ["cat"],
        storyConditionOptions: ["always"],
        storyActionOptions: ["sayHello", "wave"],
        storyInitialFlags: {},
        storyGoalFlags: { catHappy: true },
        requiredStoryActions: ["sayHello"],
        solutionProgram: [
          { type: "story-rule", event: "cat", condition: "always", action: "sayHello" },
        ],
      },
      {
        id: "story-2",
        mode: "story",
        title: "מפתח ואז דלת",
        instruction: "עכשיו הסיפור זוכר משהו. קודם לוחצים על המפתח כדי לקחת אותו, ורק אחר כך כלל אחר יכול לפתוח את הדלת אם באמת יש מפתח.",
        hint: "צריך שני כללים: אחד למפתח, ואחד לדלת עם תנאי של 'אם יש מפתח'.",
        objective: "להשתמש במצב שנשמר בין שתי לחיצות",
        maxProgramLength: 2,
        boardSize: 4,
        start: { x: 0, y: 3, dir: "E" },
        goal: { x: 0, y: 3 },
        stars: [],
        walls: [],
        features: ["story-rule"],
        storyObjects: ["key", "door"],
        storyObjectOptions: ["key", "door"],
        storyConditionOptions: ["always", "hasKey"],
        storyActionOptions: ["takeKey", "openDoor", "knockDoor"],
        storyInitialFlags: {},
        storyGoalFlags: { doorOpen: true },
        requiredStoryActions: ["takeKey", "openDoor"],
        requiredStoryConditions: ["hasKey"],
        solutionProgram: [
          { type: "story-rule", event: "key", condition: "always", action: "takeKey" },
          { type: "story-rule", event: "door", condition: "hasKey", action: "openDoor" },
        ],
      },
      {
        id: "story-3",
        mode: "story",
        title: "מארגנות מסיבה",
        instruction: "כאן כבר בונות סיפור קטן שלם. צריך להזמין חברה, לקחת מפתח, לפתוח את הדלת, ורק אז ללחוץ על המסיבה כדי להתחיל אותה.",
        hint: "המסיבה צריכה כלל משלה, וגם לה יש תנאי: היא יכולה להתחיל רק אם הדלת כבר פתוחה.",
        objective: "לשלב כמה אירועים וכמה מצבים באותו סיפור",
        maxProgramLength: 4,
        boardSize: 5,
        start: { x: 0, y: 4, dir: "E" },
        goal: { x: 0, y: 4 },
        stars: [],
        walls: [],
        features: ["story-rule"],
        storyObjects: ["friend", "key", "door", "party"],
        storyObjectOptions: ["friend", "key", "door", "party"],
        storyConditionOptions: ["always", "hasKey", "doorOpen", "friendInvited"],
        storyActionOptions: ["inviteFriend", "takeKey", "openDoor", "startParty"],
        storyInitialFlags: {},
        storyGoalFlags: { friendInvited: true, doorOpen: true, partyStarted: true },
        requiredStoryActions: ["inviteFriend", "takeKey", "openDoor", "startParty"],
        requiredStoryConditions: ["hasKey", "doorOpen"],
        solutionProgram: [
          { type: "story-rule", event: "friend", condition: "always", action: "inviteFriend" },
          { type: "story-rule", event: "key", condition: "always", action: "takeKey" },
          { type: "story-rule", event: "door", condition: "hasKey", action: "openDoor" },
          { type: "story-rule", event: "party", condition: "doorOpen", action: "startParty" },
        ],
      },
    ],
  },
  {
    id: "kitchen",
    tone: "kitchen",
    title: "מטבח הקוד",
    concept: "מתכון חכם",
    description: "אוספות מצרכים, מסתובבות במטבח, ומשלבות תנאים ושגרות כדי להביא הכול לסיר.",
    unlockAfterModuleId: "story",
    boardTheme: {
      actorPrefix: "👩‍🍳",
      starToken: "🥕",
      goalToken: "סיר",
    },
    lessons: [
      {
        id: "kitchen-1",
        title: "מגש ראשון",
        instruction: "השפית רוצה להגיע מהר לדלפק הבא עם המגש. משתמשים בשגרה קצרה במקום לכתוב כל צעד בנפרד.",
        hint: "השגרה מגש() עושה בדיוק שני צעדים קדימה.",
        objective: "להפעיל שגרה קצרה אחת",
        maxProgramLength: 1,
        boardSize: 6,
        start: { x: 0, y: 5, dir: "E" },
        goal: { x: 2, y: 5 },
        stars: [{ x: 1, y: 5 }],
        walls: [],
        features: ["routine"],
        routines: [
          {
            id: "tray",
            label: "מגש()",
            description: "שני צעדים מהירים אל הדלפק הבא.",
            pseudo: "מגש();",
            js: "carryTray();",
            steps: [{ type: "repeat", count: 2, action: "forward" }],
          },
        ],
        solutionProgram: [{ type: "routine", routineId: "tray" }],
      },
      {
        id: "kitchen-2",
        title: "הדלפק חסום",
        instruction: "לפעמים הדלפק שמלפנים פנוי, ולפעמים עומד שם ארון. הקוד צריך לבדוק ואם צריך לפנות ימינה ואז להביא את המגש.",
        hint: "אם יש קיר מלפנים, פנה ימינה. אחר כך הפעילי מגש().",
        objective: "לשלב תנאי עם שגרה",
        maxProgramLength: 2,
        boardSize: 6,
        start: { x: 1, y: 4, dir: "N" },
        goal: { x: 1, y: 2 },
        stars: [{ x: 1, y: 3 }],
        walls: [],
        variants: [
          {
            goal: { x: 1, y: 2 },
            stars: [{ x: 1, y: 3 }],
            walls: [],
          },
          {
            goal: { x: 3, y: 4 },
            stars: [{ x: 2, y: 4 }],
            walls: [{ x: 1, y: 3 }],
          },
        ],
        features: ["right", "condition", "routine"],
        conditionOptions: ["wall"],
        routines: [
          {
            id: "tray",
            label: "מגש()",
            description: "שני צעדים מהירים אל הדלפק הבא.",
            pseudo: "מגש();",
            js: "carryTray();",
            steps: [{ type: "repeat", count: 2, action: "forward" }],
          },
        ],
        solutionProgram: [
          { type: "condition", check: "wall", action: "right" },
          { type: "routine", routineId: "tray" },
        ],
      },
      {
        id: "kitchen-3",
        title: "המתכון הגדול",
        instruction: "לפעמים יש ירק ממש מול השפית, ולפעמים המסלול ריק. אחרי זה יכול להופיע גם ארון. בונים מתכון חכם שמשלב תנאים ושגרה פעמיים.",
        hint: "אם יש ירק זוזי קדימה, הפעילי מגש(), אם יש קיר פני שמאלה, ואז הפעילי שוב מגש().",
        objective: "לשלב כוכב, קיר ושגרה באותה תוכנית",
        maxProgramLength: 4,
        boardSize: 6,
        start: { x: 0, y: 4, dir: "E" },
        goal: { x: 3, y: 2 },
        stars: [{ x: 1, y: 4 }],
        walls: [{ x: 4, y: 4 }],
        variants: [
          {
            goal: { x: 3, y: 2 },
            stars: [{ x: 1, y: 4 }],
            walls: [{ x: 4, y: 4 }],
          },
          {
            goal: { x: 4, y: 4 },
            stars: [],
            walls: [],
          },
        ],
        features: ["forward", "left", "condition", "routine"],
        conditionOptions: ["star", "wall"],
        routines: [
          {
            id: "tray",
            label: "מגש()",
            description: "שני צעדים מהירים אל הדלפק הבא.",
            pseudo: "מגש();",
            js: "carryTray();",
            steps: [{ type: "repeat", count: 2, action: "forward" }],
          },
        ],
        solutionProgram: [
          { type: "condition", check: "star", action: "forward" },
          { type: "routine", routineId: "tray" },
          { type: "condition", check: "wall", action: "left" },
          { type: "routine", routineId: "tray" },
        ],
      },
    ],
  },
  {
    id: "warehouse",
    tone: "warehouse",
    title: "מחסן חכם",
    concept: "אלגוריתמים קטנים",
    description: "נוסעות במסדרונות באורכים משתנים, מוצאות יציאה מחדרים, ובונות קוד שלא סופר צעדים אלא חושב לבד.",
    unlockAfterModuleId: "kitchen",
    boardTheme: {
      actorPrefix: "🚚",
      starToken: "📦",
      goalToken: "רציף",
    },
    lessons: [
      {
        id: "warehouse-1",
        title: "המסדרון שנמתח",
        instruction: "כל לוח כאן נראה דומה, אבל המסדרון באורך אחר. במקום לספור צעדים, צריך קוד אחד שממשיך כל עוד הדרך פנויה.",
        hint: "בלוק אחד מספיק כאן: כל עוד הדרך פנויה, זוז קדימה.",
        objective: "להגיע לרציף במסדרונות באורכים שונים",
        maxProgramLength: 1,
        boardSize: 7,
        start: { x: 0, y: 3, dir: "E" },
        goal: { x: 5, y: 3 },
        stars: [{ x: 3, y: 3 }],
        walls: [{ x: 6, y: 3 }],
        features: ["forward", "while"],
        whileOptions: ["clear"],
        variants: [
          {
            goal: { x: 3, y: 3 },
            stars: [{ x: 2, y: 3 }],
            walls: [{ x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }],
          },
          {
            goal: { x: 4, y: 3 },
            stars: [{ x: 2, y: 3 }],
            walls: [{ x: 5, y: 3 }, { x: 6, y: 3 }],
          },
          {
            goal: { x: 5, y: 3 },
            stars: [{ x: 3, y: 3 }],
            walls: [{ x: 6, y: 3 }],
          },
        ],
        solutionProgram: [{ type: "while", check: "clear", action: "forward" }],
      },
      {
        id: "warehouse-2",
        title: "פנייה לרציף",
        instruction: "עכשיו יש גם פנייה. כל מסדרון באורך אחר, אבל אותו קוד צריך לנסוע עד סוף המסדרון, לפנות ימינה, ואז להמשיך עד הרציף.",
        hint: "כל עוד הדרך פנויה זוזי קדימה, פני ימינה, ואז שוב כל עוד הדרך פנויה זוזי קדימה.",
        objective: "לפתור מסלול עם שתי ריצות באורכים משתנים",
        maxProgramLength: 3,
        boardSize: 7,
        start: { x: 0, y: 1, dir: "E" },
        goal: { x: 5, y: 5 },
        stars: [{ x: 3, y: 1 }, { x: 5, y: 3 }],
        walls: [{ x: 6, y: 1 }, { x: 5, y: 6 }],
        features: ["forward", "right", "while"],
        whileOptions: ["clear"],
        variants: [
          {
            goal: { x: 3, y: 4 },
            stars: [{ x: 2, y: 1 }, { x: 3, y: 3 }],
            walls: [{ x: 4, y: 1 }, { x: 3, y: 5 }],
          },
          {
            goal: { x: 4, y: 3 },
            stars: [{ x: 2, y: 1 }, { x: 4, y: 2 }],
            walls: [{ x: 5, y: 1 }, { x: 4, y: 4 }],
          },
          {
            goal: { x: 5, y: 5 },
            stars: [{ x: 3, y: 1 }, { x: 5, y: 3 }],
            walls: [{ x: 6, y: 1 }, { x: 5, y: 6 }],
          },
        ],
        solutionProgram: [
          { type: "while", check: "clear", action: "forward" },
          { type: "action", action: "right" },
          { type: "while", check: "clear", action: "forward" },
        ],
      },
      {
        id: "warehouse-3",
        title: "שלושה אגפים",
        instruction: "במחסן הזה יש שלושה אגפים רצופים, וכל אחד מהם משתנה מאחורי הקלעים. משתמשות בשגרה מסדרון() כדי לא לכתוב שוב ושוב את אותו רעיון.",
        hint: "השגרה מסדרון() נוסעת קדימה כל עוד הדרך פנויה. אחריה: ימינה, מסדרון(), שמאלה, מסדרון().",
        objective: "להשתמש בשגרה חכמה לאורך כמה אגפים",
        maxProgramLength: 5,
        boardSize: 8,
        start: { x: 0, y: 1, dir: "E" },
        goal: { x: 6, y: 4 },
        stars: [{ x: 2, y: 1 }, { x: 3, y: 3 }, { x: 5, y: 4 }],
        walls: [{ x: 4, y: 1 }, { x: 3, y: 5 }, { x: 7, y: 4 }],
        features: ["right", "left", "routine"],
        routines: [
          {
            id: "corridor",
            label: "מסדרון()",
            description: "נוסעת קדימה כל עוד הדרך פנויה.",
            pseudo: "מסדרון();",
            js: "driveCorridor();",
            steps: [{ type: "while", check: "clear", action: "forward" }],
          },
        ],
        variants: [
          {
            goal: { x: 6, y: 4 },
            stars: [{ x: 2, y: 1 }, { x: 3, y: 3 }, { x: 5, y: 4 }],
            walls: [{ x: 4, y: 1 }, { x: 3, y: 5 }, { x: 7, y: 4 }],
          },
          {
            goal: { x: 5, y: 5 },
            stars: [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 5 }],
            walls: [{ x: 3, y: 1 }, { x: 2, y: 6 }, { x: 6, y: 5 }],
          },
          {
            goal: { x: 6, y: 3 },
            stars: [{ x: 2, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 3 }],
            walls: [{ x: 5, y: 1 }, { x: 4, y: 4 }, { x: 7, y: 3 }],
          },
        ],
        solutionProgram: [
          { type: "routine", routineId: "corridor" },
          { type: "action", action: "right" },
          { type: "routine", routineId: "corridor" },
          { type: "action", action: "left" },
          { type: "routine", routineId: "corridor" },
        ],
      },
      {
        id: "warehouse-4",
        title: "מוצאות יציאה",
        instruction: "המשאית מתחילה בתוך חדר קטן, אבל בכל לוח היציאה נמצאת בכיוון אחר. קודם מסובבות עד שאין קיר מלפנים, ואז נוסעות במסדרון עד הרציף.",
        hint: "כל עוד יש קיר מלפנים: פני ימינה. אחר כך הפעילי מסדרון().",
        objective: "לשלב לולאה שבודקת קיר עם שגרה של נסיעה",
        maxProgramLength: 2,
        boardSize: 7,
        start: { x: 3, y: 3, dir: "N" },
        goal: { x: 5, y: 3 },
        stars: [{ x: 4, y: 3 }],
        walls: [{ x: 3, y: 2 }, { x: 3, y: 4 }, { x: 2, y: 3 }, { x: 6, y: 3 }],
        features: ["right", "while", "routine"],
        whileOptions: ["wall"],
        routines: [
          {
            id: "corridor",
            label: "מסדרון()",
            description: "נוסעת קדימה כל עוד הדרך פנויה.",
            pseudo: "מסדרון();",
            js: "driveCorridor();",
            steps: [{ type: "while", check: "clear", action: "forward" }],
          },
        ],
        variants: [
          {
            goal: { x: 3, y: 1 },
            stars: [{ x: 3, y: 2 }],
            walls: [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 2, y: 3 }, { x: 3, y: 0 }],
          },
          {
            goal: { x: 5, y: 3 },
            stars: [{ x: 4, y: 3 }],
            walls: [{ x: 3, y: 2 }, { x: 3, y: 4 }, { x: 2, y: 3 }, { x: 6, y: 3 }],
          },
          {
            goal: { x: 3, y: 5 },
            stars: [{ x: 3, y: 4 }],
            walls: [{ x: 3, y: 2 }, { x: 4, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 6 }],
          },
          {
            goal: { x: 1, y: 3 },
            stars: [{ x: 2, y: 3 }],
            walls: [{ x: 3, y: 2 }, { x: 4, y: 3 }, { x: 3, y: 4 }, { x: 0, y: 3 }],
          },
        ],
        solutionProgram: [
          { type: "while", check: "wall", action: "right" },
          { type: "routine", routineId: "corridor" },
        ],
      },
    ],
  },
];

const badgeDefinitions = [
  {
    id: "first-steps",
    title: "צעדים ראשונים",
    description: "מסיימים את השלב הראשון ומתחילים לחשוב כמו מתכנתת.",
    test: (summary) => summary.completedLevels >= 1,
  },
  {
    id: "sequence-master",
    title: "מלכת הרצף",
    description: "מסיימים את כל עולם סדר הפעולות.",
    test: (_, progress) => isModuleComplete("sequence", progress),
  },
  {
    id: "loop-master",
    title: "אלופת הלולאות",
    description: "מסיימים את עולם הלולאות ומגלות איך לחסוך קוד.",
    test: (_, progress) => isModuleComplete("loops", progress),
  },
  {
    id: "guardian",
    title: "שומרת המבוך",
    description: "מצליחות לכתוב קוד שחושב ובודק לפני שהוא זז.",
    test: (_, progress) => isModuleComplete("conditions", progress),
  },
  {
    id: "debugger",
    title: "בלשית באגים",
    description: "מסיימות את כל משימות התיקון.",
    test: (_, progress) => isModuleComplete("debug", progress),
  },
  {
    id: "combo-master",
    title: "אלופת השילובים",
    description: "מסיימות את עולם הכל ביחד ומחברות כמה רעיונות לתוכנית אחת.",
    test: (_, progress) => isModuleComplete("combo", progress),
  },
  {
    id: "builder-creator",
    title: "מעצבת שלבים",
    description: "מסיימות את עולם בונה השלבים ומתחילות לחשוב כמו מי שיוצרת את האתגר בעצמה.",
    test: (_, progress) => isModuleComplete("builder", progress),
  },
  {
    id: "snake-charmer",
    title: "מאלפת נחשים",
    description: "מסיימות את עולם הנחש החכם ונותנות לנחש חוקים שעובדים לבד.",
    test: (_, progress) => isModuleComplete("snake", progress),
  },
  {
    id: "turtle-artist",
    title: "ציירת צבים",
    description: "מסיימות את עולם הצב המצייר ולומדות לחשוב על ציור דרך שגרות ופונקציות.",
    test: (_, progress) => isModuleComplete("turtle", progress),
  },
  {
    id: "story-maker",
    title: "בונת סיפורים",
    description: "מסיימות את עולם הסיפור וכותבות אירועים ומצבים שגורמים לדמויות להגיב.",
    test: (_, progress) => isModuleComplete("story", progress),
  },
  {
    id: "kitchen-chef",
    title: "שפית קוד",
    description: "מסיימות את עולם המטבח ומצליחות להפעיל מתכון חכם עד הסוף.",
    test: (_, progress) => isModuleComplete("kitchen", progress),
  },
  {
    id: "warehouse-master",
    title: "אלופת האלגוריתמים",
    description: "מסיימות את המחסן החכם וכותבות קוד שמתאים את עצמו למסלולים משתנים.",
    test: (_, progress) => isModuleComplete("warehouse", progress),
  },
  {
    id: "star-hunter",
    title: "אוספת כוכבים",
    description: "צוברות לפחות 18 כוכבים במסע.",
    test: (summary) => summary.totalStars >= 18,
  },
  {
    id: "all-worlds",
    title: "אלופת כל העולמות",
    description: "מסיימות את כל מסלול הלמידה, מהצעדים הראשונים ועד העולמות המתקדמים.",
    test: (summary) => summary.completedModules === modules.length,
  },
];

const elements = {
  summaryCards: document.querySelector("#summary-cards"),
  companionCard: document.querySelector("#companion-card"),
  progressRibbon: document.querySelector("#progress-ribbon"),
  activePlayerName: document.querySelector("#active-player-name"),
  playerSelect: document.querySelector("#player-select"),
  playerNameInput: document.querySelector("#player-name-input"),
  addPlayerButton: document.querySelector("#add-player-button"),
  restartLearningButton: document.querySelector("#restart-learning-button"),
  moduleList: document.querySelector("#module-list"),
  futureGames: document.querySelector("#future-games"),
  levelBreadcrumb: document.querySelector("#level-breadcrumb"),
  levelTitle: document.querySelector("#level-title"),
  instructionText: document.querySelector("#instruction-text"),
  levelRail: document.querySelector("#level-rail"),
  goalStrip: document.querySelector("#goal-strip"),
  conceptPill: document.querySelector("#concept-pill"),
  scenarioExplainer: document.querySelector("#scenario-explainer"),
  board: document.querySelector("#board"),
  variantBoardStrip: document.querySelector("#variant-board-strip"),
  boardMessage: document.querySelector("#board-message"),
  paletteTitle: document.querySelector("#palette-title"),
  commandPalette: document.querySelector("#command-palette"),
  programTitle: document.querySelector("#program-title"),
  programList: document.querySelector("#program-list"),
  programMetrics: document.querySelector("#program-metrics"),
  previewTitle: document.querySelector("#preview-title"),
  codePreview: document.querySelector("#code-preview"),
  badgeStrip: document.querySelector("#badge-strip"),
  celebrationPanel: document.querySelector("#celebration-panel"),
  celebrationOverlay: document.querySelector("#celebration-overlay"),
  previewHebrew: document.querySelector("#preview-hebrew"),
  previewJs: document.querySelector("#preview-js"),
  runButton: document.querySelector("#run-button"),
  resetButton: document.querySelector("#reset-button"),
  shuffleButton: document.querySelector("#shuffle-button"),
  clearButton: document.querySelector("#clear-button"),
  hintButton: document.querySelector("#hint-button"),
  narrateButton: document.querySelector("#narrate-button"),
};

let nextCommandId = 1;

const state = {
  previewMode: "hebrew",
  playerState: loadPlayerState(),
  progress: createEmptyProgress(),
  currentModuleId: modules[0].id,
  currentLevelId: modules[0].lessons[0].id,
  currentScenario: null,
  currentScenarioIndex: 0,
  boardState: null,
  storyState: null,
  program: [],
  running: false,
  activeCommandId: null,
  pendingInsertIndex: null,
  selectedDebugCommandId: null,
  builderTool: "wall",
  celebrationOpen: false,
  feedback: {
    tone: "info",
    text: "בחרי בלוקים והתחילי לשחק.",
  },
  celebration: null,
};

init();

function init() {
  syncActivePlayer();
  renderFutureGames();
  loadActivePlayerLevel({ freshProgram: true, randomize: true });
  attachEvents();
  render();
}

function attachEvents() {
  elements.playerSelect.addEventListener("change", (event) => {
    if (state.running) {
      return;
    }

    switchActivePlayer(event.target.value);
  });

  elements.addPlayerButton.addEventListener("click", () => {
    if (state.running) {
      return;
    }

    addPlayerFromInput();
  });

  elements.playerNameInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || state.running) {
      return;
    }

    addPlayerFromInput();
  });

  elements.restartLearningButton.addEventListener("click", () => {
    if (state.running) {
      return;
    }

    restartActivePlayerProgress();
  });

  elements.moduleList.addEventListener("click", (event) => {
    const levelButton = event.target.closest("[data-level-id]");
    if (!levelButton) {
      return;
    }

    const moduleId = levelButton.getAttribute("data-module-id");
    const levelId = levelButton.getAttribute("data-level-id");
    const unlocked = isLevelUnlocked(moduleId, levelId, state.progress);

    if (!unlocked) {
      setFeedback("warn", "השלב הזה ייפתח אחרי שתסיימי את השלב הקודם באותו עולם.");
      renderBoardMessage();
      return;
    }

    loadLevel(moduleId, levelId, { freshProgram: true, randomize: true });
    render();
  });

  elements.levelRail.addEventListener("click", (event) => {
    const levelButton = event.target.closest("[data-level-id]");
    if (!levelButton || state.running) {
      return;
    }

    const moduleId = levelButton.getAttribute("data-module-id");
    const levelId = levelButton.getAttribute("data-level-id");
    loadLevel(moduleId, levelId, { freshProgram: true, randomize: true });
    render();
  });

  elements.commandPalette.addEventListener("click", (event) => {
    const addType = event.target.closest("[data-add-command]");
    if (!addType) {
      return;
    }

    if (state.running) {
      return;
    }

    if (getLevelMode() === "builder") {
      state.builderTool = addType.getAttribute("data-add-command");
      setFeedback("info", getBuilderToolMessage(state.builderTool));
      renderPalette();
      return;
    }

    addCommand(addType.getAttribute("data-add-command"));
  });

  elements.board.addEventListener("click", (event) => {
    const mode = getLevelMode();

    if (state.running) {
      return;
    }

    if (mode === "story") {
      const storyObject = event.target.closest("[data-story-object]");
      if (!storyObject) {
        return;
      }

      interactWithStoryObject(storyObject.getAttribute("data-story-object"));
      render();
      return;
    }

    if (mode !== "builder") {
      return;
    }

    const cell = event.target.closest("[data-cell-x][data-cell-y]");
    if (!cell) {
      return;
    }

    applyBuilderTool(
      Number(cell.getAttribute("data-cell-x")),
      Number(cell.getAttribute("data-cell-y"))
    );
    render();
  });

  elements.programList.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-program-action]");
    if (!actionButton || state.running) {
      return;
    }

    const commandId = Number(actionButton.getAttribute("data-command-id"));
    const action = actionButton.getAttribute("data-program-action");
    const command = state.program.find((item) => item.id === commandId);
    const level = getCurrentLevel();

    if (!command) {
      return;
    }

    if (action === "select-debug-row" && level.starterProgram) {
      if (command.locked) {
        state.selectedDebugCommandId = null;
        setFeedback("warn", "נסי שוב. נראה שהשורה הזאת דווקא תקינה.");
      } else {
        state.selectedDebugCommandId = commandId;
        setFeedback("info", "מעולה. מצאת שורה חשודה, ועכשיו אפשר לתקן אותה.");
      }
      render();
      return;
    }

    if (action === "clear-debug-selection" && level.starterProgram) {
      state.selectedDebugCommandId = null;
      setFeedback("info", "אפשר לבחור שורה אחרת לבדיקה.");
      render();
      return;
    }

    if (command.locked) {
      return;
    }

    if (action === "remove") {
      const removedIndex = state.program.findIndex((item) => item.id === commandId);
      if (removedIndex >= 0 && getCurrentLevel().starterProgram) {
        state.pendingInsertIndex = removedIndex;
      }
      state.program = state.program.filter((item) => item.id !== commandId);
    }

    if (action === "up") {
      moveProgramCommand(commandId, -1);
    }

    if (action === "down") {
      moveProgramCommand(commandId, 1);
    }

    render();
  });

  elements.programList.addEventListener("change", (event) => {
    const select = event.target.closest("[data-program-field]");
    if (!select || state.running) {
      return;
    }

    const commandId = Number(select.getAttribute("data-command-id"));
    const field = select.getAttribute("data-program-field");
    const location = findCommandLocation(state.program, commandId);
    const item = location?.item;

    if (!item || item.locked) {
      return;
    }

    if (field === "commandType") {
      const replacement = createCommandFromType(select.value, getCurrentLevel());
      if (replacement) {
        replacement.locked = Boolean(item.locked);
        replaceCommandAtLocation(location, replacement);
      }
      renderCodePreview();
      renderProgramList();
      return;
    }

    if (field === "action") {
      item.action = select.value;
    }

    if (field === "count") {
      item.count = Number(select.value);
    }

    if (field === "check") {
      item.check = select.value;
    }

    if (field === "storyEvent") {
      item.event = select.value;
    }

    if (field === "storyCondition") {
      item.condition = select.value;
    }

    if (field === "storyAction") {
      item.action = select.value;
    }

    renderCodePreview();
    renderProgramList();
  });

  elements.previewHebrew.addEventListener("click", () => {
    state.previewMode = "hebrew";
    renderPreviewToggle();
    renderCodePreview();
  });

  elements.previewJs.addEventListener("click", () => {
    state.previewMode = "js";
    renderPreviewToggle();
    renderCodePreview();
  });

  elements.runButton.addEventListener("click", () => {
    if (state.running) {
      return;
    }
    if (getLevelMode() === "story") {
      startStoryPlay();
      render();
      return;
    }
    if (getLevelMode() === "builder") {
      checkBuilderLevel();
      render();
      return;
    }
    runProgram();
  });

  elements.resetButton.addEventListener("click", () => {
    if (state.running) {
      return;
    }

    if (getLevelMode() === "story") {
      state.storyState = createStoryState(getCurrentLevel());
      state.celebration = null;
      setFeedback("info", "הסיפור אופס. אפשר להתחיל שוב ולבדוק את הכללים מחדש.");
      render();
      return;
    }

    if (getLevelMode() === "builder") {
      restoreBuilderScenario("template");
      setFeedback("info", "חזרנו לתבנית ההתחלה של שלב הבנייה.");
      render();
      return;
    }

    resetBoard({ randomize: false });
    setFeedback("info", "המסלול אופס. אפשר להריץ שוב.");
    render();
  });

  elements.shuffleButton.addEventListener("click", () => {
    if (state.running) {
      return;
    }

    const level = getCurrentLevel();
    const scenarioCount = getScenarioCount(level);
    const nextScenarioIndex = scenarioCount > 1
      ? pickDifferentScenarioIndex(scenarioCount, state.currentScenarioIndex)
      : 0;

    loadLevel(state.currentModuleId, state.currentLevelId, {
      freshProgram: false,
      randomize: scenarioCount <= 1,
      scenarioIndex: nextScenarioIndex,
    });
    setFeedback(
      "info",
      scenarioCount > 1
        ? `עברת ל${getScenarioLabel(nextScenarioIndex, scenarioCount)}. אותו קוד צריך לעבוד גם עליו.`
        : "המסלול התחלף. עכשיו בודקות אם הקוד שלך יודע להסתגל."
    );
    render();
  });

  elements.variantBoardStrip.addEventListener("click", (event) => {
    const scenarioButton = event.target.closest("[data-scenario-index]");
    if (!scenarioButton || state.running) {
      return;
    }

    const scenarioIndex = Number(scenarioButton.getAttribute("data-scenario-index"));
    const level = getCurrentLevel();
    const scenarioCount = getScenarioCount(level);

    if (Number.isNaN(scenarioIndex) || scenarioIndex === state.currentScenarioIndex) {
      return;
    }

    loadLevel(state.currentModuleId, state.currentLevelId, {
      freshProgram: false,
      randomize: false,
      scenarioIndex,
    });
    setFeedback("info", `עברת ל${getScenarioLabel(scenarioIndex, scenarioCount)}. עכשיו רואים בלוח הגדול איך אותו קוד מתנהג שם.`);
    render();
  });

  elements.clearButton.addEventListener("click", () => {
    if (state.running) {
      return;
    }

    if (getLevelMode() === "story") {
      state.program = [];
      state.storyState = createStoryState(getCurrentLevel());
      state.celebration = null;
      setFeedback("info", "החוקים נוקו, ואפשר לבנות את הסיפור מחדש.");
      render();
      return;
    }

    if (getLevelMode() === "builder") {
      restoreBuilderScenario("blank");
      setFeedback("info", "הלוח נוקה, ואפשר לבנות אותו מחדש.");
      render();
      return;
    }

    restoreProgramToDefault();
    resetBoard({ randomize: false });
    setFeedback("info", getCurrentLevel().starterProgram ? "חזרנו לקוד ההתחלתי של שלב הבאגים." : "התוכנית נוקתה.");
    render();
  });

  elements.hintButton.addEventListener("click", () => {
    const level = getCurrentLevel();
    setFeedback("warn", level.hint);
    renderBoardMessage();
  });

  elements.narrateButton.addEventListener("click", narrateCurrentLevel);

  elements.celebrationPanel.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open-celebration]");
    if (openButton && state.celebration) {
      state.celebrationOpen = true;
      renderCelebrationOverlay();
      return;
    }

    const nextButton = event.target.closest("[data-next-level]");
    if (!nextButton) {
      return;
    }

    const next = getNextLevel(state.currentModuleId, state.currentLevelId);
    if (!next) {
      return;
    }

    loadLevel(next.moduleId, next.levelId, { freshProgram: true, randomize: true });
    render();
  });

  elements.celebrationOverlay.addEventListener("click", (event) => {
    const nextButton = event.target.closest("[data-next-level]");
    if (nextButton) {
      const next = getNextLevel(state.currentModuleId, state.currentLevelId);
      if (!next) {
        state.celebrationOpen = false;
        render();
        return;
      }

      loadLevel(next.moduleId, next.levelId, { freshProgram: true, randomize: true });
      render();
      return;
    }

    const closeButton = event.target.closest("[data-close-celebration]");
    if (closeButton || event.target === elements.celebrationOverlay) {
      state.celebrationOpen = false;
      renderCelebrationOverlay();
    }
  });
}

function createEmptyProgress() {
  return {
    completedLevels: [],
    starsByLevel: {},
    selectedLevelId: null,
  };
}

function normalizeProgress(progress) {
  return {
    completedLevels: Array.isArray(progress?.completedLevels) ? progress.completedLevels : [],
    starsByLevel: progress?.starsByLevel && typeof progress.starsByLevel === "object" ? progress.starsByLevel : {},
    selectedLevelId: progress?.selectedLevelId || null,
  };
}

function sanitizePlayerName(name, fallback = "לומדת חדשה") {
  const trimmed = String(name || "").trim();
  return trimmed ? trimmed.slice(0, 24) : fallback;
}

function generatePlayerId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `player-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function createPlayer(name, progress = createEmptyProgress(), id = generatePlayerId()) {
  return {
    id,
    name: sanitizePlayerName(name),
    progress: normalizeProgress(progress),
  };
}

function createDefaultPlayerState(progress = createEmptyProgress()) {
  const defaultPlayer = createPlayer("לומדת חדשה", progress);
  return {
    activePlayerId: defaultPlayer.id,
    players: [defaultPlayer],
  };
}

function normalizePlayer(player, index) {
  return {
    id: typeof player?.id === "string" && player.id ? player.id : generatePlayerId(),
    name: sanitizePlayerName(player?.name, `לומדת ${index + 1}`),
    progress: normalizeProgress(player?.progress),
  };
}

function loadPlayerState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return createDefaultPlayerState();
  }

  try {
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed?.players)) {
      const players = parsed.players.map(normalizePlayer);
      if (players.length === 0) {
        return createDefaultPlayerState();
      }

      const activePlayerId = players.some((player) => player.id === parsed.activePlayerId)
        ? parsed.activePlayerId
        : players[0].id;

      return {
        activePlayerId,
        players,
      };
    }

    return createDefaultPlayerState(normalizeProgress(parsed));
  } catch (error) {
    return createDefaultPlayerState();
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.playerState));
}

function syncActivePlayer() {
  if (!Array.isArray(state.playerState.players) || state.playerState.players.length === 0) {
    state.playerState = createDefaultPlayerState();
  }

  const activePlayer = state.playerState.players.find((player) => player.id === state.playerState.activePlayerId)
    || state.playerState.players[0];

  state.playerState.activePlayerId = activePlayer.id;
  state.progress = activePlayer.progress;
}

function getActivePlayer() {
  return state.playerState.players.find((player) => player.id === state.playerState.activePlayerId)
    || state.playerState.players[0];
}

function getStoredLevelSelection(progress = state.progress) {
  if (!progress.selectedLevelId) {
    return {
      moduleId: modules[0].id,
      levelId: modules[0].lessons[0].id,
    };
  }

  const selected = findLevelById(progress.selectedLevelId);
  if (!selected) {
    return {
      moduleId: modules[0].id,
      levelId: modules[0].lessons[0].id,
    };
  }

  return {
    moduleId: selected.module.id,
    levelId: selected.level.id,
  };
}

function loadActivePlayerLevel(options = {}) {
  const selected = getStoredLevelSelection();
  loadLevel(selected.moduleId, selected.levelId, options);
}

function renderPlayerPanel() {
  const activePlayer = getActivePlayer();
  elements.activePlayerName.textContent = activePlayer.name;
  elements.playerSelect.innerHTML = state.playerState.players
    .map(
      (player) => `<option value="${player.id}">${escapeHtml(player.name)}</option>`
    )
    .join("");
  elements.playerSelect.value = activePlayer.id;
}

function switchActivePlayer(playerId) {
  const exists = state.playerState.players.some((player) => player.id === playerId);
  if (!exists) {
    return;
  }

  state.playerState.activePlayerId = playerId;
  syncActivePlayer();
  loadActivePlayerLevel({ freshProgram: true, randomize: true });
  setFeedback("info", `${getActivePlayer().name} ממשיכה בדיוק מהמקום שבו עצרה.`);
  render();
}

function addPlayerFromInput() {
  const rawName = elements.playerNameInput.value.trim();
  if (!rawName) {
    setFeedback("warn", "כתבי שם כדי להוסיף לומדת חדשה.");
    renderBoardMessage();
    return;
  }

  const newPlayer = createPlayer(rawName);
  state.playerState.players.push(newPlayer);
  state.playerState.activePlayerId = newPlayer.id;
  syncActivePlayer();
  elements.playerNameInput.value = "";
  loadActivePlayerLevel({ freshProgram: true, randomize: true });
  setFeedback("info", `${newPlayer.name} נוספה והתחילה מהשלב הראשון.`);
  render();
}

function restartActivePlayerProgress() {
  const activePlayer = getActivePlayer();
  const confirmed = window.confirm(`לאפס את כל ההתקדמות של ${activePlayer.name} ולהתחיל מהשלב הראשון?`);

  if (!confirmed) {
    return;
  }

  activePlayer.progress = createEmptyProgress();
  syncActivePlayer();
  loadActivePlayerLevel({ freshProgram: true, randomize: true });
  setFeedback("info", `${activePlayer.name} התחילה מחדש את המסלול.`);
  render();
}

function findModule(moduleId) {
  return modules.find((module) => module.id === moduleId);
}

function findLevelById(levelId) {
  for (const module of modules) {
    const level = module.lessons.find((lesson) => lesson.id === levelId);
    if (level) {
      return { module, level };
    }
  }
  return null;
}

function getCurrentModule() {
  return findModule(state.currentModuleId);
}

function getCurrentLevel() {
  return getCurrentModule().lessons.find((lesson) => lesson.id === state.currentLevelId);
}

function getLevelMode(level = getCurrentLevel()) {
  return level.mode || "grid";
}

function getBoardTheme(level = getCurrentLevel(), module = getCurrentModule()) {
  return {
    actorPrefix: level.boardTheme?.actorPrefix || module.boardTheme?.actorPrefix || "",
    starToken: level.boardTheme?.starToken || module.boardTheme?.starToken || "★",
    goalToken: level.boardTheme?.goalToken || module.boardTheme?.goalToken || "שער",
  };
}

function getRoutineDefinitions(level = getCurrentLevel()) {
  return Array.isArray(level.routines) ? level.routines : [];
}

function findRoutineDefinition(level, routineId) {
  return getRoutineDefinitions(level).find((routine) => routine.id === routineId) || null;
}

function getAvailableActions(level = getCurrentLevel()) {
  const actions = ["forward", "right", "left"].filter((action) => level.features.includes(action));
  return actions.length > 0 ? actions : Object.keys(commandMeta);
}

function getWhileOptions(level = getCurrentLevel()) {
  return level.whileOptions || level.conditionOptions || ["clear"];
}

function getCompanionProfile(summary = getProgressSummary(state.progress)) {
  let index = 0;

  companionStages.forEach((stage, stageIndex) => {
    if (summary.completedLevels >= stage.minCompletedLevels) {
      index = stageIndex;
    }
  });

  const stage = companionStages[index];
  const nextStage = companionStages[index + 1] || null;

  return {
    index,
    ...stage,
    progressInStage: nextStage
      ? Math.max(summary.completedLevels - stage.minCompletedLevels, 0)
      : 1,
    stageSpan: nextStage
      ? Math.max(nextStage.minCompletedLevels - stage.minCompletedLevels, 1)
      : 1,
    levelsToNext: nextStage
      ? Math.max(nextStage.minCompletedLevels - summary.completedLevels, 0)
      : 0,
    isMaxStage: !nextStage,
    nextStageTitle: nextStage?.title || null,
  };
}

function renderCompanionAvatar(companion, extraClass = "") {
  const classes = ["companion-card__avatar", `companion-card__avatar--${companion.index}`, extraClass]
    .filter(Boolean)
    .join(" ");

  return `
    <div class="${classes}" aria-hidden="true">
      <span class="companion-face"></span>
      <span class="companion-eye companion-eye--left"></span>
      <span class="companion-eye companion-eye--right"></span>
      <span class="companion-smile"></span>
      <span class="companion-cheek companion-cheek--left"></span>
      <span class="companion-cheek companion-cheek--right"></span>
      <span class="companion-accessory companion-accessory--spark"></span>
      <span class="companion-accessory companion-accessory--hat"></span>
      <span class="companion-accessory companion-accessory--backpack"></span>
      <span class="companion-accessory companion-accessory--cape"></span>
      <span class="companion-accessory companion-accessory--crown"></span>
      <span class="companion-accessory companion-accessory--wings"></span>
    </div>
  `;
}

function getModulePrimaryLevel(module, progress = state.progress) {
  const firstIncomplete = module.lessons.find((lesson) => isLevelUnlocked(module.id, lesson.id, progress) && !isLevelCompleted(lesson.id, progress));
  return firstIncomplete || module.lessons.find((lesson) => isLevelUnlocked(module.id, lesson.id, progress)) || module.lessons[0];
}

function getLevelRailItems(module = getCurrentModule()) {
  const lessons = module.lessons;
  if (lessons.length <= 5) {
    return lessons;
  }

  const currentIndex = lessons.findIndex((lesson) => lesson.id === state.currentLevelId);
  const start = Math.max(Math.min(currentIndex - 2, lessons.length - 5), 0);
  return lessons.slice(start, start + 5);
}

function getScenarioCount(level = getCurrentLevel()) {
  return getAllScenariosForLevel(level).length;
}

function getScenarioLabel(index, total) {
  const hebrewLetters = ["א", "ב", "ג", "ד", "ה"];

  if (index >= 0 && index < hebrewLetters.length) {
    return `לוח ${hebrewLetters[index]}`;
  }

  return total > 1 ? `לוח ${index + 1}` : "הלוח";
}

function pickDifferentScenarioIndex(total, currentIndex) {
  if (total <= 1) {
    return 0;
  }

  const offset = 1 + Math.floor(Math.random() * (total - 1));
  return (currentIndex + offset) % total;
}

function cloneScenario(scenario) {
  return {
    boardSize: scenario.boardSize,
    start: clonePosition(scenario.start),
    goal: clonePosition(scenario.goal),
    walls: scenario.walls.map(clonePosition),
    stars: scenario.stars.map(clonePosition),
    paintTargets: (scenario.paintTargets || []).map(clonePosition),
    exactPaint: Boolean(scenario.exactPaint),
  };
}

function createScenarioSelection(level, options = {}) {
  const scenarios = getAllScenariosForLevel(level);
  const lastIndex = Math.max(scenarios.length - 1, 0);
  const explicitIndex = typeof options.scenarioIndex === "number"
    ? Math.max(0, Math.min(options.scenarioIndex, lastIndex))
    : null;
  const index = explicitIndex !== null
    ? explicitIndex
    : options.randomize === false
      ? 0
      : Math.floor(Math.random() * scenarios.length);

  return {
    index,
    scenario: cloneScenario(scenarios[index]),
  };
}

function createScenario(level, randomize = true) {
  return createScenarioSelection(level, { randomize }).scenario;
}

function buildBaseScenario(level) {
  return {
    boardSize: level.boardSize,
    start: clonePosition(level.start),
    goal: clonePosition(level.goal),
    walls: level.walls ? level.walls.map(clonePosition) : [],
    stars: level.stars ? level.stars.map(clonePosition) : [],
    paintTargets: level.paintTargets ? level.paintTargets.map(clonePosition) : [],
    exactPaint: Boolean(level.exactPaint),
  };
}

function buildScenarioFromVariant(base, variant) {
  if (!variant) {
    return {
      boardSize: base.boardSize,
      start: clonePosition(base.start),
      goal: clonePosition(base.goal),
      walls: base.walls.map(clonePosition),
      stars: base.stars.map(clonePosition),
      paintTargets: base.paintTargets.map(clonePosition),
      exactPaint: base.exactPaint,
    };
  }

  return {
    boardSize: variant.boardSize || base.boardSize,
    start: clonePosition(variant.start || base.start),
    goal: clonePosition(variant.goal || base.goal),
    walls: (variant.walls || base.walls).map(clonePosition),
    stars: (variant.stars || base.stars).map(clonePosition),
    paintTargets: (variant.paintTargets || base.paintTargets).map(clonePosition),
    exactPaint: typeof variant.exactPaint === "boolean" ? variant.exactPaint : base.exactPaint,
  };
}

function getAllScenariosForLevel(level) {
  const base = buildBaseScenario(level);

  if (!level.variants || level.variants.length === 0) {
    return [base];
  }

  return level.variants.map((variant) => buildScenarioFromVariant(base, variant));
}

function loadLevel(moduleId, levelId, options = {}) {
  state.currentModuleId = moduleId;
  state.currentLevelId = levelId;
  state.progress.selectedLevelId = levelId;
  saveProgress();

  const selection = createScenarioSelection(getCurrentLevel(), {
    randomize: options.randomize !== false,
    scenarioIndex: options.scenarioIndex,
  });
  state.currentScenario = selection.scenario;
  state.currentScenarioIndex = selection.index;

  if (options.freshProgram) {
    restoreProgramToDefault();
  }

  resetBoard({ randomize: false });
  state.celebration = null;
  state.celebrationOpen = false;
  state.activeCommandId = null;
  state.pendingInsertIndex = null;
  state.selectedDebugCommandId = null;
}

function restoreProgramToDefault() {
  const level = getCurrentLevel();
  const source = level.starterProgram || [];
  state.program = hydrateProgram(source);
  state.pendingInsertIndex = null;
  state.selectedDebugCommandId = null;
}

function resetBoard({ randomize = false } = {}) {
  const level = getCurrentLevel();
  const mode = getLevelMode(level);

  if (randomize) {
    const selection = createScenarioSelection(level, { randomize: true });
    state.currentScenario = selection.scenario;
    state.currentScenarioIndex = selection.index;
  }

  const scenario = state.currentScenario || createScenarioSelection(level, { randomize: false }).scenario;
  state.currentScenario = scenario;
  state.storyState = mode === "story" ? createStoryState(level) : null;
  state.boardState = mode === "builder"
    ? createPreviewBoardState(scenario)
    : createBoardStateForScenario(scenario);

  if (mode !== "builder" && mode !== "story") {
    collectStarIfNeeded();
  }
}

function render() {
  renderPlayerPanel();
  renderSummary();
  renderCompanionCard();
  renderProgressRibbon();
  renderModuleList();
  renderCurrentLevel();
  renderLevelRail();
  renderEditorLabels();
  renderGoalStrip();
  renderBoard();
  renderVariantBoards();
  renderBoardMessage();
  renderPalette();
  renderProgramList();
  renderPreviewToggle();
  renderCodePreview();
  renderBadges();
  renderCelebration();
  renderCelebrationOverlay();
}

function renderSummary() {
  const summary = getProgressSummary(state.progress);
  const cards = [
    { value: summary.completedLevels, label: "שלבים שסיימת", icon: "🧩" },
    { value: summary.totalStars, label: "כוכבים שנצברו", icon: "⭐" },
    { value: summary.completedModules, label: "עולמות שהושלמו", icon: "🗺️" },
    { value: `${summary.completionPercent}%`, label: "המסע הושלם", icon: "🚀" },
  ];

  elements.summaryCards.innerHTML = cards
    .map(
      (card) => `
        <div class="summary-card">
          <div class="summary-card__icon">${card.icon}</div>
          <div class="summary-card__value">${card.value}</div>
          <div class="summary-card__label">${card.label}</div>
        </div>
      `
    )
    .join("");
}

function renderCompanionCard() {
  const summary = getProgressSummary(state.progress);
  const companion = getCompanionProfile(summary);
  const stageProgressPercent = companion.isMaxStage
    ? 100
    : Math.round((companion.progressInStage / companion.stageSpan) * 100);

  elements.companionCard.innerHTML = `
    <div class="companion-card__bubble">
      <strong>${companion.title}</strong>
      <span>${companion.mood}</span>
    </div>
    ${renderCompanionAvatar(companion)}
    <div class="companion-card__meta">
      <p class="companion-card__kicker">החברה שלך למסע</p>
      <h3>נובה</h3>
      <p>${companion.subtitle}</p>
      <div class="companion-progress-meter">
        <div class="companion-progress-meter__fill" style="width: ${stageProgressPercent}%"></div>
      </div>
      <div class="companion-card__hint">
        ${companion.isMaxStage ? "נובה כבר פתחה את כל הצורה החגיגית שלה." : `עוד ${companion.levelsToNext} שלבים ל${companion.nextUnlockLabel}.`}
      </div>
    </div>
  `;
}

function renderProgressRibbon() {
  const summary = getProgressSummary(state.progress);
  const companion = getCompanionProfile(summary);
  const currentModule = getCurrentModule();
  const currentModuleProgress = currentModule.lessons.filter((lesson) => isLevelCompleted(lesson.id, state.progress)).length;

  elements.progressRibbon.innerHTML = `
    <div class="progress-ribbon__item">
      <span class="progress-ribbon__icon">${moduleMeta[currentModule.id]?.icon || "✨"}</span>
      <div>
        <strong>${currentModule.title}</strong>
        <span>${currentModuleProgress}/${currentModule.lessons.length} שלבים בעולם הזה</span>
      </div>
    </div>
    <div class="progress-ribbon__item">
      <span class="progress-ribbon__icon">⭐</span>
      <div>
        <strong>${summary.totalStars} כוכבים</strong>
        <span>כל כוכב פותח עוד חלק של נובה</span>
      </div>
    </div>
    <div class="progress-ribbon__item">
      <span class="progress-ribbon__icon">🎁</span>
      <div>
        <strong>${companion.title}</strong>
        <span>${companion.isMaxStage ? "כל ההפתעות פתוחות" : `הפתעה הבאה: ${companion.nextUnlockLabel}`}</span>
      </div>
    </div>
  `;
}

function renderModuleList() {
  elements.moduleList.innerHTML = modules
    .map((module) => {
      const completedCount = module.lessons.filter((lesson) => isLevelCompleted(lesson.id, state.progress)).length;
      const progressPercent = Math.round((completedCount / module.lessons.length) * 100);
      const activeModule = module.id === state.currentModuleId;
      const primaryLevel = getModulePrimaryLevel(module, state.progress);
      const nodeButtons = module.lessons
        .map((lesson) => {
          const active = activeModule && lesson.id === state.currentLevelId;
          const done = isLevelCompleted(lesson.id, state.progress);
          const unlocked = isLevelUnlocked(module.id, lesson.id, state.progress);
          const classes = [
            "module-node",
            active ? "module-node--active" : "",
            done ? "module-node--done" : "",
            unlocked ? "" : "module-node--locked",
          ]
            .filter(Boolean)
            .join(" ");

          return `
            <button
              class="${classes}"
              type="button"
              data-module-id="${module.id}"
              data-level-id="${lesson.id}"
              title="${lesson.title}"
              ${unlocked ? "" : "disabled"}
            >
              ${module.lessons.findIndex((item) => item.id === lesson.id) + 1}
            </button>
          `;
        })
        .join("");

      return `
        <article class="module-card module-card--map ${activeModule ? "module-card--map-active" : ""}" data-module-tone="${module.tone}">
          <div class="module-card__header">
            <h3><span class="module-card__emoji">${moduleMeta[module.id]?.icon || "✨"}</span>${module.title}</h3>
            <span class="goal-chip">${completedCount}/${module.lessons.length}</span>
          </div>
          <div class="module-card__body">
            <p>${module.description}</p>
            <div class="module-node-row">${nodeButtons}</div>
            <div class="progress-bar">
              <div class="progress-bar__fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="module-card__footer">
              <span class="module-card__status">${activeModule ? "כאן את משחקת עכשיו" : progressPercent === 100 ? "העולם הושלם" : "אפשר להיכנס בכל זמן"}</span>
              <button class="secondary-button module-card__button" type="button" data-module-id="${module.id}" data-level-id="${primaryLevel.id}">
                ${activeModule ? "ממשיכות" : completedCount > 0 ? "חוזרות לעולם" : "נכנסות"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderLevelRail() {
  const module = getCurrentModule();
  const items = getLevelRailItems(module);
  const activeIndex = module.lessons.findIndex((lesson) => lesson.id === state.currentLevelId) + 1;

  elements.levelRail.innerHTML = `
    <div class="level-rail__header">
      <div>
        <p class="level-rail__eyebrow">${moduleMeta[module.id]?.icon || "✨"} מסלול בתוך העולם</p>
        <h3>${module.title}</h3>
      </div>
      <span class="level-rail__counter">שלב ${activeIndex} מתוך ${module.lessons.length}</span>
    </div>
    <div class="level-rail__track">
      ${items
        .map((lesson) => {
          const done = isLevelCompleted(lesson.id, state.progress);
          const active = lesson.id === state.currentLevelId;
          const unlocked = isLevelUnlocked(module.id, lesson.id, state.progress);
          const classes = [
            "level-rail__node",
            active ? "level-rail__node--active" : "",
            done ? "level-rail__node--done" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return `
            <button
              class="${classes}"
              type="button"
              data-module-id="${module.id}"
              data-level-id="${lesson.id}"
              ${unlocked ? "" : "disabled"}
            >
              <span class="level-rail__dot">${done ? "★" : module.lessons.findIndex((item) => item.id === lesson.id) + 1}</span>
              <span class="level-rail__label">${lesson.title}</span>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderFutureGames() {
  elements.futureGames.innerHTML = futureGames
    .map(
      (game) => `
        <article class="future-card">
          <div class="future-card__header">
            <h3>${game.title}</h3>
            <span class="goal-chip">בקרוב</span>
          </div>
          <p>${game.text}</p>
        </article>
      `
    )
    .join("");
}

function renderCurrentLevel() {
  const module = getCurrentModule();
  const level = getCurrentLevel();
  elements.levelBreadcrumb.textContent = `${module.title} / ${module.concept}`;
  elements.levelTitle.textContent = level.title;
  elements.instructionText.textContent = level.instruction;
  elements.conceptPill.textContent = module.concept;
}

function renderEditorLabels() {
  const mode = getLevelMode();

  if (mode === "builder") {
    elements.paletteTitle.textContent = "כלי בנייה";
    elements.programTitle.textContent = "רשימת בדיקה";
    elements.previewTitle.textContent = "מה בניתי";
    elements.runButton.textContent = "בדקי שלב";
    elements.resetButton.textContent = "תבנית התחלה";
    elements.clearButton.textContent = "לוח ריק";
    elements.narrateButton.textContent = "הקראה";
    return;
  }

  if (mode === "draw") {
    elements.paletteTitle.textContent = "מה הצב יודע";
    elements.programTitle.textContent = "תוכנית הציור";
    elements.previewTitle.textContent = "איך הציור כתוב";
    elements.runButton.textContent = "ציירי";
    elements.resetButton.textContent = "איפוס ציור";
    elements.clearButton.textContent = "נקה קוד";
    elements.narrateButton.textContent = "הקראה";
    return;
  }

  if (mode === "story") {
    elements.paletteTitle.textContent = "כללי סיפור";
    elements.programTitle.textContent = "החוקים שלי";
    elements.previewTitle.textContent = "איך הסיפור כתוב";
    elements.runButton.textContent = "התחילי סיפור";
    elements.resetButton.textContent = "איפוס סיפור";
    elements.clearButton.textContent = "נקה חוקים";
    elements.narrateButton.textContent = "הקראה";
    return;
  }

  elements.paletteTitle.textContent = "בלוקים זמינים";
  elements.programTitle.textContent = "התוכנית שלי";
  elements.previewTitle.textContent = "איך הקוד נשמע";
  elements.runButton.textContent = "הרצה";
  elements.resetButton.textContent = "איפוס מסלול";
  elements.clearButton.textContent = "נקה קוד";
  elements.narrateButton.textContent = "הקראה";
}

function renderGoalStrip() {
  const level = getCurrentLevel();
  const mode = getLevelMode(level);
  const bestStars = state.progress.starsByLevel[level.id] || 0;
  const scenarioCount = getScenarioCount(level);
  const canShuffle = mode !== "builder" && scenarioCount > 1;
  const chips = [`מטרה: ${level.objective}`, `כוכבים שכבר הרווחת כאן: ${bestStars}`];

  if (mode !== "builder") {
    chips.splice(1, 0, `מקסימום בלוקים: ${level.maxProgramLength}`);
  }

  if (mode === "draw") {
    chips.push("הצב צריך לצבוע בדיוק את הצורה המסומנת.");
  }

  if (mode === "story") {
    chips.push("כותבות כללים, לוחצות על הדמויות, ובודקות אם הסיפור מגיב נכון.");
  }

  if (mode === "builder") {
    chips.push("בחרי כלי, לחצי על הלוח, ואז בדקי אם בנית אתגר טוב.");
  }

  if (canShuffle) {
    chips.push(`אותו קוד צריך לעבוד על ${scenarioCount} לוחות`);
  }

  elements.shuffleButton.style.display = canShuffle ? "inline-flex" : "none";
  elements.shuffleButton.textContent = canShuffle ? "החליפי לוח" : "מסלול חדש";
  elements.goalStrip.innerHTML = chips
    .map((text) => `<span class="goal-chip">${text}</span>`)
    .join("");
}

function renderBoard() {
  if (getLevelMode() === "story") {
    renderStoryScene();
    return;
  }

  paintBoard(elements.board, state.currentScenario, state.boardState);
}

function renderStoryScene() {
  const level = getCurrentLevel();
  const storyState = state.storyState || createStoryState(level);
  const statusChips = Object.entries(storyFlagMeta)
    .filter(([key]) => storyState.flags[key])
    .map(([, meta]) => `<span class="goal-chip">${meta.emoji} ${meta.label}</span>`)
    .join("");

  elements.board.dataset.mode = "story";
  elements.board.dataset.tone = getCurrentModule().tone;
  elements.board.style.gridTemplateColumns = "";
  elements.board.innerHTML = `
    <div class="story-stage">
      <div class="story-stage__header">
        <div>
          <p class="story-stage__title">${storyState.started ? "הסיפור רץ" : "מוכנות לבדיקה"}</p>
          <p class="story-stage__text">
            ${storyState.started
              ? "לחצי על החפצים והדמויות לפי הכללים שכתבת."
              : "כתבי את הכללים שלך, ואז לחצי על 'התחילי סיפור'."}
          </p>
        </div>
      </div>
      <div class="story-object-grid">
        ${level.storyObjects
          .map((objectId) => {
            const meta = storyObjectMeta[objectId];
            const status = getStoryObjectStatus(objectId, storyState);
            return `
              <button class="story-object" type="button" data-story-object="${objectId}">
                <span class="story-object__emoji">${meta.emoji}</span>
                <span class="story-object__label">${meta.label}</span>
                <span class="story-object__status">${status}</span>
              </button>
            `;
          })
          .join("")}
      </div>
      <div class="story-status-row">
        ${statusChips || '<span class="story-status-row__empty">עדיין אין מצבים שנשמרו בסיפור.</span>'}
      </div>
    </div>
  `;
}

function renderVariantBoards() {
  const level = getCurrentLevel();
  const scenarioCount = getScenarioCount(level);

  if (scenarioCount <= 1) {
    elements.scenarioExplainer.hidden = true;
    elements.scenarioExplainer.innerHTML = "";
    elements.variantBoardStrip.hidden = true;
    elements.variantBoardStrip.innerHTML = "";
    return;
  }

  const scenarios = getAllScenariosForLevel(level);
  const introTitle = scenarioCount === 2 ? "יש כאן שני לוחות לאותו שלב." : `יש כאן ${scenarioCount} לוחות לאותו שלב.`;
  elements.scenarioExplainer.hidden = false;
  elements.scenarioExplainer.innerHTML = `
    <p class="scenario-explainer__title">${introTitle}</p>
    <p class="scenario-explainer__text">
      אותו קוד צריך לעבוד על כולם. הלוח הגדול מציג אחד מהם, והלוחות הקטנים מראים את האחרים.
      אפשר ללחוץ על כל לוח קטן כדי לבדוק אותו.
    </p>
  `;

  elements.variantBoardStrip.hidden = false;
  elements.variantBoardStrip.innerHTML = "";

  scenarios.forEach((scenario, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = [
      "variant-board-card",
      index === state.currentScenarioIndex ? "variant-board-card--active" : "",
    ]
      .filter(Boolean)
      .join(" ");
    card.dataset.scenarioIndex = String(index);
    card.disabled = state.running;

    const header = document.createElement("div");
    header.className = "variant-board-card__header";
    header.innerHTML = `
      <span class="variant-board-card__title">${getScenarioLabel(index, scenarioCount)}</span>
      <span class="variant-board-card__tag">${index === state.currentScenarioIndex ? "מוצג עכשיו" : "גם עליו בודקות"}</span>
    `;

    const note = document.createElement("p");
    note.className = "variant-board-card__text";
    note.textContent = index === state.currentScenarioIndex
      ? "זה הלוח שמופיע עכשיו למעלה."
      : "לחצי כאן כדי לראות איך אותו קוד עובד גם כאן.";

    const miniBoard = document.createElement("div");
    miniBoard.className = "board board--mini";
    paintBoard(miniBoard, scenario, createPreviewBoardState(scenario));

    card.appendChild(header);
    card.appendChild(note);
    card.appendChild(miniBoard);
    elements.variantBoardStrip.appendChild(card);
  });
}

function paintBoard(container, scenario, boardState) {
  if (!container || !scenario) {
    return;
  }

  const level = getCurrentLevel();
  const mode = getLevelMode(level);
  const module = getCurrentModule();
  const theme = getBoardTheme(level, module);
  const size = scenario?.boardSize || level.boardSize;
  const safeBoardState = boardState || createBoardStateForScenario(scenario);
  const wallSet = toPositionSet(scenario.walls);
  const starSet = toPositionSet(
    scenario.stars.filter((star) => !safeBoardState.collectedStars.includes(serializePosition(star)))
  );
  const visitedSet = new Set(safeBoardState.visited);
  const paintedSet = new Set(safeBoardState.paintedCells || []);
  const targetSet = toPositionSet(scenario.paintTargets || []);
  const goalKey = serializePosition(scenario.goal);

  container.dataset.tone = module.tone;
  container.dataset.mode = mode;
  container.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
  container.innerHTML = "";

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const key = serializePosition({ x, y });
      const isWall = wallSet.has(key);
      const isGoal = goalKey === key;
      const isStar = starSet.has(key);
      const isRobot = safeBoardState.robot.x === x && safeBoardState.robot.y === y;
      const visited = visitedSet.has(key);
      const isPainted = paintedSet.has(key);
      const isTarget = targetSet.has(key);

      const cell = document.createElement("div");
      cell.dataset.cellX = String(x);
      cell.dataset.cellY = String(y);
      cell.className = [
        "cell",
        visited ? "cell--visited" : "",
        isGoal ? "cell--goal" : "",
        isWall ? "cell--wall" : "",
        isPainted ? "cell--painted" : "",
        isTarget ? "cell--target" : "",
        mode === "builder" ? "cell--editable" : "",
      ]
        .filter(Boolean)
        .join(" ");

      if (isWall) {
        cell.innerHTML = '<div class="cell__layer"><span class="token-wall"></span></div>';
      }

      if (isGoal) {
        cell.innerHTML += `<div class="cell__layer"><span class="token-goal">${escapeHtml(theme.goalToken)}</span></div>`;
      }

      if (isStar) {
        cell.innerHTML += `<div class="cell__layer"><span class="token-star">${escapeHtml(theme.starToken)}</span></div>`;
      }

      if (mode === "draw" && isTarget && !isPainted) {
        cell.innerHTML += '<div class="cell__layer"><span class="token-target"></span></div>';
      }

      if (isRobot) {
        const arrow = escapeHtml(arrowForDirection(safeBoardState.robot.dir));
        const actor = theme.actorPrefix ? `<span class="token-robot__actor">${escapeHtml(theme.actorPrefix)}</span>` : "";
        const arrowClass = theme.actorPrefix ? "token-robot__arrow" : "token-robot__arrow token-robot__arrow--solo";
        cell.innerHTML += `
          <div class="cell__layer">
            <span class="token-robot">
              <span class="${arrowClass}">${arrow}</span>
              ${actor}
            </span>
          </div>
        `;
      }

      container.appendChild(cell);
    }
  }
}

function renderBoardMessage() {
  elements.boardMessage.textContent = state.feedback.text;
  elements.boardMessage.setAttribute("data-tone", state.feedback.tone);
}

function renderPalette() {
  const level = getCurrentLevel();
  const mode = getLevelMode(level);
  const cards = [];

  if (mode === "builder") {
    const tools = [
      { id: "wall", title: "קיר", description: "מוסיפה או מורידה קיר במשבצת שנלחצת." },
      { id: "star", title: "כוכב", description: "מוסיפה פרס קטן שאפשר לאסוף בדרך." },
      { id: "goal", title: "שער", description: "מעבירה את נקודת הסיום למשבצת שבחרת." },
      { id: "erase", title: "מחק", description: "מנקה קיר או כוכב מהמשבצת שנבחרה." },
    ];

    elements.commandPalette.innerHTML = tools
      .map((tool) => renderBuilderToolCard(tool.id, tool.title, tool.description))
      .join("");
    return;
  }

  if (mode === "story") {
    elements.commandPalette.innerHTML = renderPaletteCard(
      "story-rule",
      "כלל לחיצה",
      "כש... אז... כלל אחד שמסביר מה קורה כשלוחצים על דמות או חפץ."
    );
    return;
  }

  if (level.starterProgram) {
    elements.commandPalette.innerHTML = `
      <div class="program-empty">
        בשלב הזה לא מוסיפים שורות חדשות.
        קודם בוחרים איזו שורה שגויה, ואז מתקנים אותה במקום.
      </div>
    `;
    return;
  }

  if (level.features.includes("forward")) {
    cards.push(renderPaletteCard("forward", commandMeta.forward.label, commandMeta.forward.description));
  }

  if (level.features.includes("right")) {
    cards.push(renderPaletteCard("right", commandMeta.right.label, commandMeta.right.description));
  }

  if (level.features.includes("left")) {
    cards.push(renderPaletteCard("left", commandMeta.left.label, commandMeta.left.description));
  }

  if (level.features.includes("repeat")) {
    cards.push(renderPaletteCard("repeat", "חזרה", "שורה אחת שחוזרת כמה פעמים על אותה פעולה."));
  }

  if (level.features.includes("while")) {
    cards.push(renderPaletteCard("while", "כל עוד...", "חוזרת על אותה פעולה כל עוד התנאי עדיין נכון."));
  }

  if (level.features.includes("condition")) {
    cards.push(renderPaletteCard("condition", "אם... אז...", "בודקת מה יש מלפנים ופועלת בהתאם."));
  }

  if (level.features.includes("routine")) {
    getRoutineDefinitions(level).forEach((routine) => {
      cards.push(renderPaletteCard(`routine:${routine.id}`, routine.label, routine.description));
    });
  }

  elements.commandPalette.innerHTML = cards.join("");
}

function renderBuilderToolCard(type, title, description) {
  const classes = [
    "palette-card",
    state.builderTool === type ? "palette-card--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <button class="${classes}" type="button" data-add-command="${type}">
      <span class="palette-card__title">${title}</span>
      <span class="palette-card__desc">${description}</span>
    </button>
  `;
}

function renderPaletteCard(type, title, description) {
  return `
    <button class="palette-card" type="button" data-add-command="${type}">
      <span class="palette-card__title">${title}</span>
      <span class="palette-card__desc">${description}</span>
    </button>
  `;
}

function renderProgramList() {
  const level = getCurrentLevel();
  const mode = getLevelMode(level);
  const isDebugLevel = Boolean(level.starterProgram);

  if (mode === "builder") {
    renderBuilderChecklist(level);
    return;
  }

  elements.programMetrics.textContent = `${state.program.length}/${level.maxProgramLength} ${mode === "story" ? "כללים" : "שורות"}`;

  if (state.program.length === 0) {
    elements.programList.innerHTML = `<div class="program-empty">${
      mode === "story"
        ? "עדיין אין חוקים בסיפור. הוסיפי כלל אחד כדי להתחיל."
        : "עדיין אין בלוקים בתוכנית. בחרי בלוק אחד כדי להתחיל."
    }</div>`;
    return;
  }

  elements.programList.innerHTML = state.program
    .map((item, index) => {
      const running = state.activeCommandId === item.id;
      const itemClasses = [
        "program-item",
        isDebugLevel ? "program-item--debug" : "",
        running ? "program-item--running" : "",
        item.locked ? "program-item--locked" : "",
        state.selectedDebugCommandId === item.id ? "program-item--selected" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return `
        <div class="${itemClasses}">
          <div class="program-item__body">
            <span class="program-index">${index + 1}</span>
            <div class="program-text">${renderProgramItemText(item)}</div>
          </div>
          ${renderProgramActions(item, isDebugLevel)}
        </div>
      `;
    })
    .join("");
}

function renderBuilderChecklist(level) {
  const checks = getBuilderChecklist(level, state.currentScenario);
  const doneCount = checks.filter((check) => check.passed).length;

  elements.programMetrics.textContent = `${doneCount}/${checks.length} משימות`;
  elements.programList.innerHTML = checks
    .map((check, index) => {
      const classes = [
        "builder-check",
        check.passed ? "builder-check--passed" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return `
        <div class="${classes}">
          <div class="program-item__body">
            <span class="program-index">${check.passed ? "✓" : index + 1}</span>
            <div class="program-text">
              <span>${check.label}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function getBuilderToolMessage(tool) {
  return {
    wall: "עכשיו לוחצים על הלוח כדי להוסיף או להוריד קירות.",
    star: "עכשיו לוחצים על הלוח כדי להוסיף כוכבים לאיסוף.",
    goal: "עכשיו לוחצים על משבצת כדי להזיז אליה את השער.",
    erase: "עכשיו לוחצים על הלוח כדי למחוק קיר או כוכב.",
  }[tool] || "בחרי כלי ואז לחצי על הלוח.";
}

function restoreBuilderScenario(kind = "template") {
  const level = getCurrentLevel();
  const scenario = buildBaseScenario(level);

  if (kind === "blank") {
    scenario.walls = [];
    scenario.stars = [];
  }

  state.currentScenario = scenario;
  state.currentScenarioIndex = 0;
  state.boardState = createPreviewBoardState(scenario);
}

function applyBuilderTool(x, y) {
  const level = getCurrentLevel();
  const scenario = state.currentScenario;
  const target = { x, y };
  const key = serializePosition(target);
  const startKey = serializePosition(scenario.start);
  const goalKey = serializePosition(scenario.goal);
  const wallIndex = scenario.walls.findIndex((wall) => serializePosition(wall) === key);
  const starIndex = scenario.stars.findIndex((star) => serializePosition(star) === key);

  if (key === startKey) {
    setFeedback("warn", "את נקודת ההתחלה משאירים קבועה, כדי שכל שלב יתחיל מאותו מקום.");
    return;
  }

  if (state.builderTool === "goal") {
    if (wallIndex >= 0) {
      scenario.walls.splice(wallIndex, 1);
    }
    if (starIndex >= 0) {
      scenario.stars.splice(starIndex, 1);
    }
    scenario.goal = target;
    state.boardState = createPreviewBoardState(scenario);
    setFeedback("info", "השער עבר למשבצת החדשה.");
    return;
  }

  if (key === goalKey && state.builderTool !== "erase") {
    setFeedback("warn", "על השער לא שמים קיר או כוכב. קודם אפשר להזיז את השער למקום אחר.");
    return;
  }

  if (state.builderTool === "wall") {
    if (wallIndex >= 0) {
      scenario.walls.splice(wallIndex, 1);
      setFeedback("info", "הקיר ירד מהלוח.");
    } else {
      if (starIndex >= 0) {
        scenario.stars.splice(starIndex, 1);
      }
      scenario.walls.push(target);
      setFeedback("info", "נוסף קיר חדש.");
    }
    return;
  }

  if (state.builderTool === "star") {
    if (starIndex >= 0) {
      scenario.stars.splice(starIndex, 1);
      setFeedback("info", "הכוכב ירד מהלוח.");
    } else {
      if (wallIndex >= 0) {
        scenario.walls.splice(wallIndex, 1);
      }
      scenario.stars.push(target);
      setFeedback("info", "נוסף כוכב חדש.");
    }
    return;
  }

  if (state.builderTool === "erase") {
    if (wallIndex >= 0) {
      scenario.walls.splice(wallIndex, 1);
    }
    if (starIndex >= 0) {
      scenario.stars.splice(starIndex, 1);
    }
    setFeedback("info", "ניקינו את המשבצת.");
  }
}

function getBuilderChecklist(level, scenario) {
  const analysis = analyzeScenarioPath(scenario);
  return (level.builderRules || []).map((rule) => evaluateBuilderRule(rule, scenario, analysis));
}

function evaluateBuilderRule(rule, scenario, analysis) {
  if (rule.type === "pathExists") {
    return {
      label: rule.label,
      passed: analysis.exists,
    };
  }

  if (rule.type === "wallCount") {
    return {
      label: rule.label,
      passed: scenario.walls.length >= rule.min,
    };
  }

  if (rule.type === "starCount") {
    return {
      label: rule.label,
      passed: scenario.stars.length >= rule.min,
    };
  }

  if (rule.type === "pathLengthMin") {
    return {
      label: rule.label,
      passed: analysis.exists && analysis.pathLength >= rule.min,
    };
  }

  if (rule.type === "turnsMin") {
    return {
      label: rule.label,
      passed: analysis.exists && analysis.turns >= rule.min,
    };
  }

  if (rule.type === "straightRunMin") {
    return {
      label: rule.label,
      passed: analysis.exists && analysis.longestStraightRun >= rule.min,
    };
  }

  return {
    label: rule.label,
    passed: false,
  };
}

function analyzeScenarioPath(scenario) {
  const startKey = serializePosition(scenario.start);
  const goalKey = serializePosition(scenario.goal);
  const queue = [scenario.start];
  const parents = new Map([[startKey, null]]);
  let cursor = 0;

  while (cursor < queue.length) {
    const current = queue[cursor];
    cursor += 1;

    if (serializePosition(current) === goalKey) {
      break;
    }

    getNeighbors(current, scenario).forEach((neighbor) => {
      const key = serializePosition(neighbor);
      if (parents.has(key)) {
        return;
      }
      parents.set(key, current);
      queue.push(neighbor);
    });
  }

  if (!parents.has(goalKey)) {
    return {
      exists: false,
      pathLength: 0,
      turns: 0,
      longestStraightRun: 0,
    };
  }

  const path = [];
  let current = scenario.goal;

  while (current) {
    path.push(current);
    current = parents.get(serializePosition(current));
  }

  path.reverse();

  let turns = 0;
  let longestStraightRun = 0;
  let currentRun = 0;
  let previousDirection = null;

  for (let index = 1; index < path.length; index += 1) {
    const direction = directionBetween(path[index - 1], path[index]);

    if (direction === previousDirection) {
      currentRun += 1;
    } else {
      if (previousDirection !== null) {
        turns += 1;
      }
      currentRun = 1;
      previousDirection = direction;
    }

    longestStraightRun = Math.max(longestStraightRun, currentRun);
  }

  return {
    exists: true,
    pathLength: Math.max(path.length - 1, 0),
    turns,
    longestStraightRun,
  };
}

function getNeighbors(position, scenario) {
  return [
    { x: position.x + 1, y: position.y },
    { x: position.x - 1, y: position.y },
    { x: position.x, y: position.y + 1 },
    { x: position.x, y: position.y - 1 },
  ].filter((neighbor) => isInsideBoardForScenario(neighbor, scenario) && !isWallInScenario(neighbor, scenario));
}

function directionBetween(from, to) {
  if (to.x > from.x) {
    return "E";
  }
  if (to.x < from.x) {
    return "W";
  }
  if (to.y > from.y) {
    return "S";
  }
  return "N";
}

function formatBuilderSummary(level, scenario) {
  const analysis = analyzeScenarioPath(scenario);
  const checks = getBuilderChecklist(level, scenario);
  const completed = checks.filter((check) => check.passed).length;

  return [
    `// בונה שלבים`,
    `קירות: ${scenario.walls.length}`,
    `כוכבים: ${scenario.stars.length}`,
    `השער נמצא ב: (${scenario.goal.x + 1}, ${scenario.goal.y + 1})`,
    analysis.exists
      ? `המסלול הקצר ביותר: ${analysis.pathLength} צעדים, ${analysis.turns} פניות, קטע ישר הכי ארוך: ${analysis.longestStraightRun}`
      : "כרגע אין דרך מההתחלה אל השער.",
    `עמדתי ב-${completed} מתוך ${checks.length} בדיקות.`,
  ].join("\n");
}

function checkBuilderLevel() {
  const level = getCurrentLevel();
  const checks = getBuilderChecklist(level, state.currentScenario);
  const firstMissing = checks.find((check) => !check.passed);

  if (firstMissing) {
    setFeedback("warn", `עוד לא. נסי להשלים קודם: ${firstMissing.label}`);
    return;
  }

  setFeedback("success", "מעולה. השלב שבנית עומד בכל הבדיקות.");
  handleSuccess();
}

function startStoryPlay() {
  const level = getCurrentLevel();

  if (state.program.length === 0) {
    setFeedback("warn", "צריך לפחות כלל אחד כדי להתחיל את הסיפור.");
    return;
  }

  state.storyState = createStoryState(level);
  state.storyState.started = true;
  state.celebration = null;
  setFeedback("info", "הסיפור התחיל. עכשיו לחצי על הדמויות והחפצים ובדקי אם הכללים שכתבת עובדים.");
}

function interactWithStoryObject(objectId) {
  const level = getCurrentLevel();
  const objectMeta = storyObjectMeta[objectId];

  if (!state.storyState?.started) {
    setFeedback("warn", "לחצי קודם על 'התחילי סיפור' כדי לבדוק את הכללים.");
    return;
  }

  const matchingRules = state.program.filter((item) => item.type === "story-rule" && item.event === objectId);
  if (matchingRules.length === 0) {
    setFeedback("warn", `לחצת על ${objectMeta.label}, אבל אין עדיין כלל שמסביר מה קורה כשנוגעים בו.`);
    return;
  }

  const rule = matchingRules.find((item) => storyConditionPasses(item.condition));
  if (!rule) {
    setFeedback("warn", `יש כלל עבור ${objectMeta.label}, אבל התנאי שלו עוד לא מתקיים.`);
    return;
  }

  applyStoryAction(rule.action, objectId);
  state.storyState.interactions.push(objectId);

  if (areStoryGoalsMet(level, state.storyState) && !storyProgramMeetsRequirements(level, state.program)) {
    setFeedback("warn", buildStoryRequirementMessage(level));
    return;
  }

  if (isStoryLevelSolved(level, state.storyState)) {
    handleSuccess();
  }
}

function storyConditionPasses(conditionKey, storyState = state.storyState) {
  if (!conditionKey || conditionKey === "always") {
    return true;
  }

  return Boolean(storyState?.flags?.[conditionKey]);
}

function applyStoryAction(actionKey) {
  const action = storyActionMeta[actionKey];
  if (!action) {
    return;
  }

  state.storyState.flags = {
    ...state.storyState.flags,
    ...action.effects,
  };

  setFeedback("info", action.feedback);
}

function isStoryLevelSolved(level, storyState = state.storyState) {
  return areStoryGoalsMet(level, storyState) && storyProgramMeetsRequirements(level, state.program);
}

function areStoryGoalsMet(level, storyState = state.storyState) {
  const goals = level.storyGoalFlags || {};
  return Object.entries(goals).every(([key, expected]) => Boolean(storyState?.flags?.[key]) === Boolean(expected));
}

function storyProgramMeetsRequirements(level, program = state.program) {
  const requiredActions = level.requiredStoryActions || [];
  const requiredConditions = level.requiredStoryConditions || [];

  const hasActions = requiredActions.every((actionId) =>
    program.some((item) => item.type === "story-rule" && item.action === actionId)
  );

  const hasConditions = requiredConditions.every((conditionId) =>
    program.some((item) => item.type === "story-rule" && item.condition === conditionId)
  );

  return hasActions && hasConditions;
}

function buildStoryRequirementMessage(level) {
  if (level.requiredStoryConditions?.length) {
    return "הסיפור כבר כמעט עובד, אבל בשלב הזה צריך להשתמש גם בתנאי המתאים כדי להראות שהסיפור באמת זוכר מצב.";
  }

  return "הסיפור כבר כמעט עובד, אבל חסר עדיין כלל חשוב אחד.";
}

function getStoryObjectStatus(objectId, storyState = state.storyState) {
  const flags = storyState?.flags || {};

  if (objectId === "cat") {
    return flags.catHappy ? "רגוע" : "מחכה לשלום";
  }
  if (objectId === "key") {
    return flags.hasKey ? "אצלך" : "מחכה שייקחו אותו";
  }
  if (objectId === "door") {
    return flags.doorOpen ? "פתוחה" : "סגורה";
  }
  if (objectId === "friend") {
    return flags.friendInvited ? "הוזמנה" : "עוד לא הוזמנה";
  }
  if (objectId === "party") {
    return flags.partyStarted ? "התחילה" : "עוד מחכה";
  }

  return "מוכנה";
}

function getCommandBody(item) {
  if (item?.body) {
    return item.body;
  }

  if ((item?.type === "repeat" || item?.type === "condition" || item?.type === "while") && item.action) {
    return {
      type: "action",
      action: item.action,
      locked: Boolean(item.locked),
    };
  }

  return null;
}

function getCommandTypeValue(item) {
  if (item.type === "action") {
    return item.action;
  }

  if (item.type === "routine") {
    return `routine:${item.routineId}`;
  }

  return item.type;
}

function getNestableCommandOptions(level = getCurrentLevel()) {
  const options = [];

  if (level.features.includes("forward")) {
    options.push({ value: "forward", label: commandMeta.forward.label });
  }
  if (level.features.includes("right")) {
    options.push({ value: "right", label: commandMeta.right.label });
  }
  if (level.features.includes("left")) {
    options.push({ value: "left", label: commandMeta.left.label });
  }
  if (level.features.includes("repeat")) {
    options.push({ value: "repeat", label: "חזרה" });
  }
  if (level.features.includes("condition")) {
    options.push({ value: "condition", label: "אם... אז..." });
  }
  if (level.features.includes("while")) {
    options.push({ value: "while", label: "כל עוד..." });
  }
  if (level.features.includes("routine")) {
    getRoutineDefinitions(level).forEach((routine) => {
      options.push({ value: `routine:${routine.id}`, label: routine.label });
    });
  }

  return options;
}

function renderNestedTypePicker(item, level = getCurrentLevel()) {
  const selectedValue = getCommandTypeValue(item);
  return `
    <select class="program-select program-select--nested-kind" data-program-field="commandType" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
      ${getNestableCommandOptions(level)
        .map((option) => `<option value="${option.value}" ${option.value === selectedValue ? "selected" : ""}>${escapeHtml(option.label)}</option>`)
        .join("")}
    </select>
  `;
}

function renderNestedCommandEditor(item, level = getCurrentLevel(), depth = 1) {
  const body = getCommandBody(item);
  const depthClass = `program-nested--depth-${Math.min(depth, 3)}`;

  if (item.type === "action" || item.type === "routine") {
    return `<span class="program-nested ${depthClass}">${renderNestedTypePicker(item, level)}</span>`;
  }

  if (item.type === "repeat") {
    return `
      <span class="program-nested ${depthClass}">
        ${renderNestedTypePicker(item, level)}
        <span>חזור</span>
        <select class="program-select" data-program-field="count" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
          ${[2, 3, 4].map((count) => `<option value="${count}" ${item.count === count ? "selected" : ""}>${count}</option>`).join("")}
        </select>
        <span>פעמים על</span>
        <span class="program-nested__body">${body ? renderNestedCommandEditor(body, level, depth + 1) : ""}</span>
      </span>
    `;
  }

  if (item.type === "condition") {
    return `
      <span class="program-nested ${depthClass}">
        ${renderNestedTypePicker(item, level)}
        <span>אם</span>
        <select class="program-select" data-program-field="check" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
          ${(level.conditionOptions || Object.keys(conditionMeta))
            .map((key) => `<option value="${key}" ${item.check === key ? "selected" : ""}>${conditionMeta[key].label}</option>`)
            .join("")}
        </select>
        <span>אז</span>
        <span class="program-nested__body">${body ? renderNestedCommandEditor(body, level, depth + 1) : ""}</span>
      </span>
    `;
  }

  if (item.type === "while") {
    return `
      <span class="program-nested ${depthClass}">
        ${renderNestedTypePicker(item, level)}
        <span>כל עוד</span>
        <select class="program-select" data-program-field="check" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
          ${getWhileOptions(level)
            .map((key) => `<option value="${key}" ${item.check === key ? "selected" : ""}>${conditionMeta[key].label}</option>`)
            .join("")}
        </select>
        <span>עשי</span>
        <span class="program-nested__body">${body ? renderNestedCommandEditor(body, level, depth + 1) : ""}</span>
      </span>
    `;
  }

  return "";
}

function commandContainsType(item, wantedType) {
  if (!item) {
    return false;
  }

  if (item.type === wantedType) {
    return true;
  }

  const body = getCommandBody(item);
  return body ? commandContainsType(body, wantedType) : false;
}

function programContainsType(program, wantedType) {
  return program.some((item) => commandContainsType(item, wantedType));
}

function renderProgramItemText(item) {
  const level = getCurrentLevel();
  const isDebugSelected = Boolean(level.starterProgram) && state.selectedDebugCommandId === item.id;

  if (item.type === "action") {
    if (!item.locked && isDebugSelected) {
      return `
        <span>תקני ל:</span>
        <select class="program-select" data-program-field="action" data-command-id="${item.id}">
          ${getActionOptions(item.action, level)}
        </select>
      `;
    }

    return `<span>${commandMeta[item.action].label}</span>`;
  }

  if (item.type === "repeat") {
    if (level.starterProgram && !isDebugSelected) {
      return `<span>חזור ${item.count} פעמים: ${commandMeta[item.action].label}</span>`;
    }

    const body = getCommandBody(item);
    if (body) {
      return `
        <span>חזור</span>
        <select class="program-select" data-program-field="count" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
          ${[2, 3, 4].map((count) => `<option value="${count}" ${item.count === count ? "selected" : ""}>${count}</option>`).join("")}
        </select>
        <span>פעמים על</span>
        ${renderNestedCommandEditor(body, level)}
      `;
    }

    return `
      <span>חזור</span>
      <select class="program-select" data-program-field="count" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
        ${[2, 3, 4].map((count) => `<option value="${count}" ${item.count === count ? "selected" : ""}>${count}</option>`).join("")}
      </select>
      <span>פעמים:</span>
      <select class="program-select" data-program-field="action" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
        ${getActionOptions(item.action, level)}
      </select>
    `;
  }

  if (item.type === "condition") {
    if (level.starterProgram && !isDebugSelected) {
      return `<span>אם ${conditionMeta[item.check].label} אז ${commandMeta[item.action].label}</span>`;
    }

    const body = getCommandBody(item);
    if (body) {
      return `
        <span>אם</span>
        <select class="program-select" data-program-field="check" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
          ${(level.conditionOptions || Object.keys(conditionMeta))
            .map((key) => `<option value="${key}" ${item.check === key ? "selected" : ""}>${conditionMeta[key].label}</option>`)
            .join("")}
        </select>
        <span>אז</span>
        ${renderNestedCommandEditor(body, level)}
      `;
    }

    const conditionOptions = level.conditionOptions || Object.keys(conditionMeta);
    return `
      <span>אם</span>
      <select class="program-select" data-program-field="check" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
        ${conditionOptions
          .map((key) => `<option value="${key}" ${item.check === key ? "selected" : ""}>${conditionMeta[key].label}</option>`)
          .join("")}
      </select>
      <span>אז</span>
      <select class="program-select" data-program-field="action" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
        ${getActionOptions(item.action, level)}
      </select>
    `;
  }

  if (item.type === "while") {
    const body = getCommandBody(item);
    if (body) {
      return `
        <span>כל עוד</span>
        <select class="program-select" data-program-field="check" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
          ${getWhileOptions(level)
            .map((key) => `<option value="${key}" ${item.check === key ? "selected" : ""}>${conditionMeta[key].label}</option>`)
            .join("")}
        </select>
        <span>עשי</span>
        ${renderNestedCommandEditor(body, level)}
      `;
    }

    const whileOptions = getWhileOptions(level);
    return `
      <span>כל עוד</span>
      <select class="program-select" data-program-field="check" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
        ${whileOptions
          .map((key) => `<option value="${key}" ${item.check === key ? "selected" : ""}>${conditionMeta[key].label}</option>`)
          .join("")}
      </select>
      <span>חזרי:</span>
      <select class="program-select" data-program-field="action" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
        ${getActionOptions(item.action, level)}
      </select>
    `;
  }

  if (item.type === "routine") {
    const routine = findRoutineDefinition(level, item.routineId);
    return `<span>${escapeHtml(routine?.label || "שגרה()")}</span>`;
  }

  if (item.type === "story-rule") {
    return `
      <span>כשלוחצים על</span>
      <select class="program-select" data-program-field="storyEvent" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
        ${getStoryObjectOptions(item.event, level)}
      </select>
      <select class="program-select" data-program-field="storyCondition" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
        ${getStoryConditionOptions(item.condition, level)}
      </select>
      <span>אז</span>
      <select class="program-select" data-program-field="storyAction" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>
        ${getStoryActionOptions(item.action, level)}
      </select>
    `;
  }

  return "";
}

function renderProgramActions(item, isDebugLevel) {
  if (isDebugLevel) {
    if (state.selectedDebugCommandId === item.id && !item.locked) {
      return `
        <div class="program-actions">
          <span class="program-badge">נבחרה</span>
          <button class="program-pick-button" type="button" data-program-action="clear-debug-selection" data-command-id="${item.id}">
            בחרי אחרת
          </button>
        </div>
      `;
    }

    return `
      <div class="program-actions">
        <button class="program-pick-button" type="button" data-program-action="select-debug-row" data-command-id="${item.id}">
          זו השורה?
        </button>
      </div>
    `;
  }

  return `
    <div class="program-actions">
      <button class="program-action" type="button" title="למעלה" data-program-action="up" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>↑</button>
      <button class="program-action" type="button" title="למטה" data-program-action="down" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>↓</button>
      <button class="program-action" type="button" title="מחיקה" data-program-action="remove" data-command-id="${item.id}" ${item.locked ? "disabled" : ""}>×</button>
    </div>
  `;
}

function getActionOptions(selectedAction, level = getCurrentLevel()) {
  const allowedActions = getAvailableActions(level);
  const actions = allowedActions.includes(selectedAction) ? allowedActions : [...allowedActions, selectedAction];

  return actions
    .map((action) => `<option value="${action}" ${selectedAction === action ? "selected" : ""}>${commandMeta[action].label}</option>`)
    .join("");
}

function getStoryObjectOptions(selectedObject, level = getCurrentLevel()) {
  const options = level.storyObjectOptions || Object.keys(storyObjectMeta);
  return options
    .map((objectId) => `<option value="${objectId}" ${selectedObject === objectId ? "selected" : ""}>${storyObjectMeta[objectId].label}</option>`)
    .join("");
}

function getStoryConditionOptions(selectedCondition, level = getCurrentLevel()) {
  const options = level.storyConditionOptions || Object.keys(storyConditionMeta);
  return options
    .map((conditionId) => `<option value="${conditionId}" ${selectedCondition === conditionId ? "selected" : ""}>${storyConditionMeta[conditionId].label}</option>`)
    .join("");
}

function getStoryActionOptions(selectedAction, level = getCurrentLevel()) {
  const options = level.storyActionOptions || Object.keys(storyActionMeta);
  return options
    .map((actionId) => `<option value="${actionId}" ${selectedAction === actionId ? "selected" : ""}>${storyActionMeta[actionId].label}</option>`)
    .join("");
}

function renderPreviewToggle() {
  const hidden = getLevelMode() === "builder";
  const displayValue = hidden ? "none" : "inline-flex";
  elements.previewHebrew.parentElement.style.display = displayValue;

  const hebrewActive = state.previewMode === "hebrew";
  elements.previewHebrew.classList.toggle("toggle-button--active", hebrewActive);
  elements.previewJs.classList.toggle("toggle-button--active", !hebrewActive);
}

function renderCodePreview() {
  const level = getCurrentLevel();
  const mode = getLevelMode(level);
  let preview;

  if (mode === "builder") {
    preview = formatBuilderSummary(level, state.currentScenario);
  } else {
    preview = state.program.length
      ? state.program.map((item) => formatCodeLine(item, state.previewMode)).join("\n")
      : state.previewMode === "hebrew"
        ? "// התוכנית תחכה כאן"
        : "// Your code preview will appear here";
  }

  elements.codePreview.textContent = preview;
}

function getBadgeEmoji(badgeId) {
  const emojiById = {
    "first-steps": "🌟",
    "sequence-master": "🤖",
    "loop-master": "🌼",
    guardian: "🔎",
    debugger: "🩺",
    "combo-master": "✨",
    "builder-creator": "🧱",
    "snake-charmer": "🐍",
    "turtle-artist": "🐢",
    "story-maker": "🎭",
    "kitchen-chef": "🍲",
    "warehouse-master": "🚚",
    "star-hunter": "⭐",
    "all-worlds": "👑",
  };

  return emojiById[badgeId] || "🏅";
}

function renderBadges() {
  const summary = getProgressSummary(state.progress);
  elements.badgeStrip.innerHTML = badgeDefinitions
    .map((badge) => {
      const earned = badge.test(summary, state.progress);
      const classes = ["badge-card", earned ? "badge-card--earned" : ""].filter(Boolean).join(" ");

      return `
        <article class="${classes}">
          <div class="badge-card__top">
            <span class="badge-card__emoji">${getBadgeEmoji(badge.id)}</span>
            <div class="badge-card__tag">${earned ? "מדבקה שלך" : "עוד קצת"}</div>
          </div>
          <h3>${badge.title}</h3>
          <p>${badge.description}</p>
          <div class="badge-card__progress">${earned ? "נשמר באלבום של המסע" : "נפתחת כשתמשיכי במסע"}</div>
        </article>
      `;
    })
    .join("");
}

function renderCelebration() {
  const summary = getProgressSummary(state.progress);
  const companion = getCompanionProfile(summary);
  const currentModule = getCurrentModule();
  const next = getNextLevel(state.currentModuleId, state.currentLevelId);

  if (!state.celebration) {
    elements.celebrationPanel.innerHTML = `
      <div class="celebration-panel__header">
        <div>
          <p class="celebration-panel__title">כל שלב מוסיף למסע שלך עוד משהו חדש</p>
          <p>כשתסיימי שלב, תיפתח כאן חגיגה עם כוכבים, בלונים והפתעה קטנה לנובה.</p>
        </div>
        <span class="goal-chip">${moduleMeta[currentModule.id]?.icon || "✨"} ${currentModule.title}</span>
      </div>
      <div class="celebration-panel__row">
        <span class="goal-chip">⭐ ${summary.totalStars} כוכבים עד עכשיו</span>
        <span class="goal-chip">🎁 ${companion.title}</span>
        <span class="goal-chip">${companion.isMaxStage ? "כל ההפתעות כבר פתוחות" : `עוד ${companion.levelsToNext} שלבים ל${companion.nextUnlockLabel}`}</span>
      </div>
    `;
    return;
  }

  const nextButton = next
    ? `<button class="primary-button" type="button" data-next-level="true">לשלב הבא</button>`
    : "";

  elements.celebrationPanel.innerHTML = `
    <div class="celebration-panel__header">
      <div>
        <p class="celebration-panel__title">${state.celebration.title}</p>
        <p>${state.celebration.text}</p>
      </div>
      <div class="celebration-panel__stars">${Array.from({ length: Math.max(state.celebration.stars, 1) }, () => "⭐").join("")}</div>
    </div>
    <div class="celebration-panel__row">
      <span class="goal-chip">הרווחת ${state.celebration.stars} כוכבים בשלב הזה</span>
      <span class="goal-chip">${state.celebration.companionLevelUp ? "🎉" : "✨"} ${state.celebration.companionUnlockText}</span>
      <button class="secondary-button" type="button" data-open-celebration="true">החגיגה שוב</button>
      ${nextButton}
    </div>
  `;
}

function renderCelebrationOverlay() {
  const visible = Boolean(state.celebration && state.celebrationOpen);
  document.body.classList.toggle("body--celebrating", visible);

  if (!visible) {
    elements.celebrationOverlay.hidden = true;
    elements.celebrationOverlay.innerHTML = "";
    return;
  }

  const next = getNextLevel(state.currentModuleId, state.currentLevelId);
  const currentModule = getCurrentModule();
  const summary = getProgressSummary(state.progress);
  const companion = getCompanionProfile(summary);
  const stageProgressPercent = companion.isMaxStage
    ? 100
    : Math.round((companion.progressInStage / companion.stageSpan) * 100);
  const balloons = ["🎈", "✨", "🎈", "⭐", "🎈", "🎉"]
    .map(
      (token, index) => `<span class="celebration-overlay__balloon celebration-overlay__balloon--${(index % 6) + 1}">${token}</span>`
    )
    .join("");
  const rewardStars = Array.from({ length: Math.max(state.celebration.stars, 1) }, () => "<span class=\"celebration-overlay__earned-star\">⭐</span>").join("");
  const sparkles = Array.from({ length: 8 }, (_, index) => `<span class="celebration-overlay__spark celebration-overlay__spark--${(index % 4) + 1}">✦</span>`).join("");
  const primaryAction = next
    ? `<button class="primary-button" type="button" data-next-level="true">לשלב הבא</button>`
    : `<button class="primary-button" type="button" data-close-celebration="true">חוזרות למסע</button>`;

  elements.celebrationOverlay.hidden = false;
  elements.celebrationOverlay.innerHTML = `
    <div class="celebration-overlay__dialog" role="dialog" aria-modal="true" aria-labelledby="celebration-title">
      <div class="celebration-overlay__decor" aria-hidden="true">
        ${balloons}
        ${sparkles}
      </div>
      <button class="celebration-overlay__close" type="button" aria-label="סגירת החגיגה" data-close-celebration="true">×</button>
      <p class="celebration-overlay__eyebrow">${moduleMeta[currentModule.id]?.icon || "✨"} ${currentModule.title}</p>
      <h2 class="celebration-overlay__title" id="celebration-title">${escapeHtml(state.celebration.title)}</h2>
      <p class="celebration-overlay__text">${escapeHtml(state.celebration.text)}</p>
      <div class="celebration-overlay__reward-row">
        <article class="celebration-overlay__reward-card">
          <span class="celebration-overlay__reward-label">כוכבים מהשלב הזה</span>
          <div class="celebration-overlay__earned-stars">${rewardStars}</div>
        </article>
        <article class="celebration-overlay__reward-card">
          <span class="celebration-overlay__reward-label">המסע הכולל</span>
          <strong>${summary.completedLevels}/${summary.totalLevels} שלבים כבר הושלמו</strong>
          <span>${summary.totalStars} כוכבים באוסף</span>
        </article>
      </div>
      <div class="celebration-overlay__milestone ${state.celebration.companionLevelUp ? "celebration-overlay__milestone--levelup" : ""}">
        ${state.celebration.companionLevelUp ? "נובה קיבלה צורה חדשה!" : "עוד צעד יפה במסע של נובה"}
      </div>
      <div class="celebration-overlay__companion">
        ${renderCompanionAvatar(companion, "celebration-overlay__avatar")}
        <div class="celebration-overlay__companion-copy">
          <p class="celebration-overlay__companion-kicker">נובה חוגגת איתך</p>
          <strong>${escapeHtml(companion.title)}</strong>
          <p>${escapeHtml(state.celebration.companionUnlockText)}</p>
          <div class="celebration-overlay__meter">
            <div class="celebration-overlay__meter-fill" style="width: ${stageProgressPercent}%"></div>
          </div>
        </div>
      </div>
      <div class="celebration-overlay__actions">
        ${primaryAction}
        <button class="secondary-button" type="button" data-close-celebration="true">להמשיך לשחק כאן</button>
      </div>
    </div>
  `;
}

function addCommand(type) {
  const level = getCurrentLevel();
  const newCommand = createCommandFromType(type, level);

  if (!newCommand) {
    return;
  }

  if (state.program.length >= level.maxProgramLength) {
    setFeedback("warn", "התוכנית מלאה. אפשר למחוק שורה אחת או להשתמש בבלוק חכם יותר.");
    renderBoardMessage();
    return;
  }

  if (level.starterProgram && state.pendingInsertIndex !== null) {
    const insertAt = Math.min(state.pendingInsertIndex, state.program.length);
    state.program.splice(insertAt, 0, newCommand);
    state.pendingInsertIndex = null;
  } else {
    state.program.push(newCommand);
  }

  setFeedback(
    "info",
    getLevelMode(level) === "story"
      ? "הוספנו כלל חדש. עכשיו אפשר לערוך אותו ולבדוק את הסיפור."
      : "הוספנו בלוק חדש. עכשיו אפשר להריץ או להמשיך לבנות."
  );
  render();
}

function createCommandFromType(type, level = getCurrentLevel()) {
  if (type.startsWith("routine:")) {
    const routineId = type.slice("routine:".length);
    const routine = findRoutineDefinition(level, routineId);

    if (!routine) {
      return null;
    }

    return {
      id: nextCommandId += 1,
      type: "routine",
      routineId,
      locked: false,
    };
  }

  if (type === "forward" || type === "right" || type === "left") {
    return {
      id: nextCommandId += 1,
      type: "action",
      action: type,
      locked: false,
    };
  }

  if (type === "repeat") {
    return {
      id: nextCommandId += 1,
      type: "repeat",
      count: 2,
      action: "forward",
      body: {
        id: nextCommandId += 1,
        type: "action",
        action: "forward",
        locked: false,
      },
      locked: false,
    };
  }

  if (type === "while") {
    const defaultCheck = getWhileOptions(level)[0] || "clear";
    const defaultAction = defaultCheck === "wall" ? "right" : "forward";
    return {
      id: nextCommandId += 1,
      type: "while",
      check: defaultCheck,
      action: defaultAction,
      body: {
        id: nextCommandId += 1,
        type: "action",
        action: defaultAction,
        locked: false,
      },
      locked: false,
    };
  }

  if (type === "condition") {
    const defaultCheck = level.conditionOptions?.[0] || "wall";
    const defaultAction = defaultCheck === "wall" ? "right" : "forward";
    return {
      id: nextCommandId += 1,
      type: "condition",
      check: defaultCheck,
      action: defaultAction,
      body: {
        id: nextCommandId += 1,
        type: "action",
        action: defaultAction,
        locked: false,
      },
      locked: false,
    };
  }

  if (type === "story-rule") {
    return {
      id: nextCommandId += 1,
      type: "story-rule",
      event: level.storyObjectOptions?.[0] || "cat",
      condition: level.storyConditionOptions?.[0] || "always",
      action: level.storyActionOptions?.[0] || "sayHello",
      locked: false,
    };
  }

  return null;
}

function moveProgramCommand(commandId, direction) {
  const index = state.program.findIndex((item) => item.id === commandId);
  const target = index + direction;

  if (index < 0 || target < 0 || target >= state.program.length) {
    return;
  }

  const targetItem = state.program[target];
  if (targetItem.locked) {
    return;
  }

  const [item] = state.program.splice(index, 1);
  state.program.splice(target, 0, item);
}

function findCommandLocation(program, commandId, parent = null, key = null) {
  for (let index = 0; index < program.length; index += 1) {
    const item = program[index];

    if (item.id === commandId) {
      return { item, container: program, index, parent, key };
    }

    const body = getCommandBody(item);
    if (body && body.id === commandId) {
      return { item: body, container: null, index: null, parent: item, key: "body" };
    }

    if (body) {
      const nested = findCommandLocation([body], commandId, item, "body");
      if (nested) {
        return nested;
      }
    }
  }

  return null;
}

function replaceCommandAtLocation(location, replacement) {
  if (!location) {
    return;
  }

  if (location.container) {
    location.container[location.index] = replacement;
    return;
  }

  if (location.parent && location.key) {
    location.parent[location.key] = replacement;
  }
}

async function runProgram() {
  const level = getCurrentLevel();
  const mode = getLevelMode(level);

  if (mode === "story") {
    startStoryPlay();
    render();
    return;
  }

  if (state.program.length === 0) {
    setFeedback("warn", "צריך לפחות בלוק אחד כדי להתחיל.");
    renderBoardMessage();
    return;
  }

  state.running = true;
  state.celebration = null;
  resetBoard({ randomize: false });
  setFeedback("info", "מריצות את התוכנית...");
  render();

  for (const item of state.program) {
    state.activeCommandId = item.id;
    renderProgramList();

    const outcome = await executeProgramItem(item, level);
    renderBoard();

    if (outcome === "failed" || outcome === "success") {
      break;
    }

    await wait(360);
  }

  if (state.running) {
    state.activeCommandId = null;

    if (isLevelSolved()) {
      const validation = validateProgramAgainstLevel(level, state.program);

      if (validation.allPassed) {
        handleSuccess();
      } else {
        setFeedback("warn", buildVariantFailureMessage(level, validation));
      }
    } else {
      setFeedback(
        "warn",
        getLevelMode(level) === "draw"
          ? "הציור עדיין לא שלם, או שהצב לא סיים בדיוק במקום הנכון."
          : "התוכנית הסתיימה, אבל הרובוט עדיין לא הגיע למטרה."
      );
    }
  }

  state.running = false;
  state.activeCommandId = null;
  render();
}

async function executeProgramItem(item, level = getCurrentLevel()) {
  if (item.type === "action") {
    return executeAction(item.action);
  }

  if (item.type === "repeat") {
    const body = getCommandBody(item) || { type: "action", action: item.action || "forward" };
    for (let count = 0; count < item.count; count += 1) {
      const outcome = await executeProgramItem(body, level);
      render();
      if (outcome === "failed" || outcome === "success") {
        return outcome;
      }
      await wait(280);
    }
    return "continue";
  }

  if (item.type === "while") {
    return executeWhileLoop(item);
  }

  if (item.type === "routine") {
    return executeRoutine(item, level);
  }

  if (item.type === "condition") {
    const passed = evaluateCondition(item.check);
    setFeedback(
      passed ? "info" : "warn",
      passed ? `התנאי התקיים: ${conditionMeta[item.check].label}.` : `התנאי לא התקיים: ${conditionMeta[item.check].label}.`
    );
    renderBoardMessage();
    await wait(320);

    if (!passed) {
      return "continue";
    }

    return executeProgramItem(getCommandBody(item) || { type: "action", action: item.action || "forward" }, level);
  }

  return "continue";
}

function getLoopSafetyLimit(scenario = state.currentScenario) {
  const size = scenario?.boardSize || getCurrentLevel().boardSize || 6;
  return Math.max(size * size * 4, 24);
}

async function executeWhileLoop(item) {
  const label = conditionMeta[item.check]?.label || "התנאי";
  const firstPass = evaluateCondition(item.check);
  const body = getCommandBody(item) || { type: "action", action: item.action || "forward" };

  setFeedback(
    firstPass ? "info" : "warn",
    firstPass ? `כל עוד ${label}, ממשיכות.` : `כרגע לא מתקיים: ${label}. הבלוק "כל עוד" לא התחיל לרוץ.`
  );
  renderBoardMessage();
  await wait(280);

  let iterations = 0;
  const safetyLimit = getLoopSafetyLimit();

  while (evaluateCondition(item.check) && iterations < safetyLimit) {
    const outcome = await executeProgramItem(body);
    render();

    if (outcome === "failed" || outcome === "success") {
      return outcome;
    }

    iterations += 1;
    await wait(260);
  }

  if (iterations >= safetyLimit) {
    setFeedback("warn", "הלולאה הזאת עוד לא יודעת לעצור. נסי תנאי או פעולה אחרים.");
    renderBoardMessage();
    return "failed";
  }

  return "continue";
}

async function executeRoutine(item, level) {
  const routine = findRoutineDefinition(level, item.routineId);

  if (!routine) {
    return "continue";
  }

  setFeedback("info", `מפעילות את ${routine.label}`);
  renderBoardMessage();
  await wait(280);

  for (const step of routine.steps) {
    const outcome = await executeProgramItem(step, level);
    renderBoard();

    if (outcome === "failed" || outcome === "success") {
      return outcome;
    }
  }

  return "continue";
}

function executeAction(action) {
  const mode = getLevelMode();

  if (action === "left") {
    state.boardState.robot.dir = turnLeft(state.boardState.robot.dir);
    setFeedback("info", "פנינו שמאלה.");
    return isLevelSolved() ? "success" : "continue";
  }

  if (action === "right") {
    state.boardState.robot.dir = turnRight(state.boardState.robot.dir);
    setFeedback("info", "פנינו ימינה.");
    return isLevelSolved() ? "success" : "continue";
  }

  if (action === "forward") {
    const next = nextPosition(state.boardState.robot);

    if (!isInsideBoard(next) || isWall(next)) {
      state.running = false;
      setFeedback(
        "danger",
        mode === "draw"
          ? "אופס, הצב יצא מהדף או נתקע. נסי לשנות את הציור."
          : "אופס, הרובוט ניסה להיכנס בקיר. בואי נתקן את הקוד."
      );
      return "failed";
    }

    state.boardState.robot = next;
    state.boardState.visited.push(serializePosition(next));
    paintCellForBoardState(state.boardState, next);
    collectStarIfNeeded();

    if (isLevelSolved()) {
      setFeedback(
        "success",
        mode === "draw"
          ? "איזה יופי, הציור יצא בדיוק כמו שרצינו."
          : "איזה יופי, הרובוט הגיע לשער ואסף את מה שצריך."
      );
      return "success";
    }

    setFeedback("info", mode === "draw" ? "הצב צייר עוד צעד." : "צעד אחד קדימה.");
    return "continue";
  }

  return "continue";
}

function collectStarIfNeeded() {
  const robotKey = serializePosition(state.boardState.robot);
  const exists = state.currentScenario.stars.some((star) => serializePosition(star) === robotKey);

  if (exists && !state.boardState.collectedStars.includes(robotKey)) {
    state.boardState.collectedStars.push(robotKey);
  }
}

function evaluateCondition(check) {
  const next = nextPosition(state.boardState.robot);

  if (check === "star") {
    return state.currentScenario.stars.some((star) => serializePosition(star) === serializePosition(next));
  }

  if (check === "wall") {
    return !isInsideBoard(next) || isWall(next);
  }

  if (check === "clear") {
    return isInsideBoard(next) && !isWall(next);
  }

  if (check === "goal") {
    return serializePosition(next) === serializePosition(state.currentScenario.goal);
  }

  return false;
}

function isLevelSolved() {
  if (getLevelMode() === "story") {
    return isStoryLevelSolved(getCurrentLevel(), state.storyState);
  }

  return isScenarioSolved(state.boardState, state.currentScenario);
}

function handleSuccess() {
  const level = getCurrentLevel();
  const mode = getLevelMode(level);
  const stars = scoreCurrentLevel(level);
  const beforeSummary = getProgressSummary(state.progress);
  const beforeCompanion = getCompanionProfile(beforeSummary);

  if (!state.progress.completedLevels.includes(level.id)) {
    state.progress.completedLevels.push(level.id);
  }

  state.progress.starsByLevel[level.id] = Math.max(state.progress.starsByLevel[level.id] || 0, stars);
  saveProgress();
  const afterSummary = getProgressSummary(state.progress);
  const afterCompanion = getCompanionProfile(afterSummary);

  state.celebration = {
    title: `כל הכבוד! סיימת את ${level.title}`,
    text: mode === "builder"
      ? "בנית שלב שעומד בכל הבדיקות, והשלב הבא כבר פתוח."
      : mode === "story"
        ? "הכללים שכתבת גרמו לסיפור להגיב בדיוק כמו שצריך, והשלב הבא כבר פתוח."
      : mode === "draw"
        ? "הציור יצא בדיוק כמו שצריך, והשלב הבא כבר פתוח."
        : level.variants && level.variants.length > 0
          ? "הקוד עבד על כל הלוחות של השלב הזה, והשלב הבא כבר פתוח."
          : "הקוד עבד, אסף את מה שצריך, והשלב הבא כבר פתוח.",
    stars,
    companionLevelUp: afterCompanion.index > beforeCompanion.index,
    companionTitle: afterCompanion.title,
    companionUnlockText: afterCompanion.index > beforeCompanion.index
      ? `נובה גדלה לדרגה חדשה: ${afterCompanion.title}`
      : afterCompanion.isMaxStage
        ? "נובה כבר פתחה את כל הצורה החגיגית שלה."
        : `עוד ${afterCompanion.levelsToNext} שלבים ל${afterCompanion.nextUnlockLabel}.`,
  };
  state.celebrationOpen = true;
}

function validateProgramAgainstLevel(level, program) {
  const scenarios = getAllScenariosForLevel(level);
  const failedScenarios = [];

  scenarios.forEach((scenario, index) => {
    const result = simulateProgramAgainstScenario(program, scenario, level);
    if (!result.solved) {
      failedScenarios.push(index);
    }
  });

  return {
    allPassed: failedScenarios.length === 0,
    failedScenarios,
    totalScenarios: scenarios.length,
  };
}

function simulateProgramAgainstScenario(program, scenario, level) {
  const boardState = createBoardStateForScenario(scenario);

  for (const item of program) {
    const outcome = simulateProgramItemOnBoard(item, boardState, scenario, level);
    if (outcome === "failed") {
      return { solved: false };
    }
    if (outcome === "success") {
      return { solved: true };
    }
  }

  return { solved: isScenarioSolved(boardState, scenario) };
}

function simulateProgramItemOnBoard(item, boardState, scenario, level) {
  if (item.type === "action") {
    return executeActionOnBoard(boardState, scenario, item.action);
  }

  if (item.type === "repeat") {
    const body = getCommandBody(item) || { type: "action", action: item.action || "forward" };
    for (let count = 0; count < item.count; count += 1) {
      const outcome = simulateProgramItemOnBoard(body, boardState, scenario, level);
      if (outcome === "failed" || outcome === "success") {
        return outcome;
      }
    }
    return "continue";
  }

  if (item.type === "condition") {
    if (!evaluateConditionOnBoard(boardState, scenario, item.check)) {
      return "continue";
    }

    return simulateProgramItemOnBoard(
      getCommandBody(item) || { type: "action", action: item.action || "forward" },
      boardState,
      scenario,
      level
    );
  }

  if (item.type === "while") {
    const body = getCommandBody(item) || { type: "action", action: item.action || "forward" };
    let iterations = 0;
    const safetyLimit = getLoopSafetyLimit(scenario);

    while (evaluateConditionOnBoard(boardState, scenario, item.check) && iterations < safetyLimit) {
      const outcome = simulateProgramItemOnBoard(body, boardState, scenario, level);
      if (outcome === "failed" || outcome === "success") {
        return outcome;
      }
      iterations += 1;
    }

    if (iterations >= safetyLimit) {
      return "failed";
    }

    return "continue";
  }

  if (item.type === "routine") {
    const routine = findRoutineDefinition(level, item.routineId);

    if (!routine) {
      return "continue";
    }

    for (const step of routine.steps) {
      const outcome = simulateProgramItemOnBoard(step, boardState, scenario, level);
      if (outcome === "failed" || outcome === "success") {
        return outcome;
      }
    }
  }

  return "continue";
}

function createBoardStateForScenario(scenario) {
  const boardState = {
    robot: clonePosition(scenario.start),
    collectedStars: [],
    visited: [serializePosition(scenario.start)],
    paintedCells: [serializePosition(scenario.start)],
  };

  collectStarForBoard(boardState, scenario);
  return boardState;
}

function createPreviewBoardState(scenario) {
  return {
    robot: clonePosition(scenario.start),
    collectedStars: [],
    visited: [],
    paintedCells: [],
  };
}

function createStoryState(level = getCurrentLevel()) {
  return {
    started: false,
    flags: { ...(level.storyInitialFlags || {}) },
    interactions: [],
  };
}

function executeActionOnBoard(boardState, scenario, action) {
  if (action === "left") {
    boardState.robot.dir = turnLeft(boardState.robot.dir);
    return isScenarioSolved(boardState, scenario) ? "success" : "continue";
  }

  if (action === "right") {
    boardState.robot.dir = turnRight(boardState.robot.dir);
    return isScenarioSolved(boardState, scenario) ? "success" : "continue";
  }

  if (action === "forward") {
    const next = nextPosition(boardState.robot);

    if (!isInsideBoardForScenario(next, scenario) || isWallInScenario(next, scenario)) {
      return "failed";
    }

    boardState.robot = next;
    boardState.visited.push(serializePosition(next));
    paintCellForBoardState(boardState, next);
    collectStarForBoard(boardState, scenario);

    return isScenarioSolved(boardState, scenario) ? "success" : "continue";
  }

  return "continue";
}

function evaluateConditionOnBoard(boardState, scenario, check) {
  const next = nextPosition(boardState.robot);

  if (check === "star") {
    return scenario.stars.some((star) => serializePosition(star) === serializePosition(next));
  }

  if (check === "wall") {
    return !isInsideBoardForScenario(next, scenario) || isWallInScenario(next, scenario);
  }

  if (check === "clear") {
    return isInsideBoardForScenario(next, scenario) && !isWallInScenario(next, scenario);
  }

  if (check === "goal") {
    return serializePosition(next) === serializePosition(scenario.goal);
  }

  return false;
}

function collectStarForBoard(boardState, scenario) {
  const robotKey = serializePosition(boardState.robot);
  const exists = scenario.stars.some((star) => serializePosition(star) === robotKey);

  if (exists && !boardState.collectedStars.includes(robotKey)) {
    boardState.collectedStars.push(robotKey);
  }
}

function isScenarioSolved(boardState, scenario) {
  if (scenario.paintTargets && scenario.paintTargets.length > 0) {
    const paintedSet = new Set(boardState.paintedCells || []);
    const targetSet = toPositionSet(scenario.paintTargets);
    const paintedAllTargets = [...targetSet].every((key) => paintedSet.has(key));
    const exactMatch = !scenario.exactPaint || [...paintedSet].every((key) => targetSet.has(key));
    const onGoal = serializePosition(boardState.robot) === serializePosition(scenario.goal);

    return paintedAllTargets && exactMatch && onGoal;
  }

  const onGoal = serializePosition(boardState.robot) === serializePosition(scenario.goal);
  const collectedAll = boardState.collectedStars.length >= scenario.stars.length;
  return onGoal && collectedAll;
}

function paintCellForBoardState(boardState, position) {
  const key = serializePosition(position);

  if (!boardState.paintedCells.includes(key)) {
    boardState.paintedCells.push(key);
  }
}

function isInsideBoardForScenario(position, scenario) {
  const size = scenario.boardSize;
  return position.x >= 0 && position.x < size && position.y >= 0 && position.y < size;
}

function isWallInScenario(position, scenario) {
  const wallSet = toPositionSet(scenario.walls);
  return wallSet.has(serializePosition(position));
}

function buildVariantFailureMessage(level, validation) {
  if (!level.variants || level.variants.length <= 1) {
    return "התוכנית כמעט עבדה, אבל צריך עוד תיקון קטן.";
  }

  const failedText = validation.failedScenarios.length === 1
    ? "גם בלוח נוסף אחד"
    : `גם ב-${validation.failedScenarios.length} לוחות נוספים`;
  const usedCondition = programContainsType(state.program, "condition");
  const usedWhile = programContainsType(state.program, "while");

  if (!usedCondition && !usedWhile && level.features.includes("while")) {
    return `הקוד עבד בלוח שמופיע על המסך, אבל הוא לא עובד ${failedText}. בשלב הזה צריך להשתמש בבלוק "כל עוד..." כדי שהקוד יסתגל לאורך או לכיוון שמשתנה.`;
  }

  if (level.features.includes("while") && usedWhile && !usedCondition) {
    return `הקוד עבד בלוח שמופיע על המסך, אבל הוא לא עובד ${failedText}. לחצי על הלוחות הקטנים ובדקי איפה הלולאה עדיין לא מסתגלת מספיק טוב.`;
  }

  if (!usedCondition) {
    return `הקוד עבד בלוח שמופיע על המסך, אבל הוא לא עובד ${failedText}. בשלב הזה צריך להשתמש בבלוק "אם... אז..." כדי שהרובוט יחליט לבד.`;
  }

  return `הקוד עבד בלוח שמופיע על המסך, אבל הוא לא עובד ${failedText}. לחצי על הלוחות הקטנים ובדקי איפה התנאי עדיין לא מספיק חכם.`;
}

function scoreCurrentLevel(level) {
  if (getLevelMode(level) === "story") {
    let score = 1;
    const compactEnough = state.program.length <= Math.max(level.solutionProgram.length, 1);
    const usesCondition = state.program.some((item) => item.type === "story-rule" && item.condition !== "always");

    if (compactEnough) {
      score += 1;
    }

    if (usesCondition || level.storyConditionOptions?.length <= 1) {
      score += 1;
    }

    return score;
  }

  if (getLevelMode(level) === "builder") {
    const analysis = analyzeScenarioPath(state.currentScenario);
    let score = 1;

    if (state.currentScenario.stars.length >= 2) {
      score += 1;
    }

    if (analysis.turns >= 2 || state.currentScenario.walls.length >= 5) {
      score += 1;
    }

    return score;
  }

  if (getLevelMode(level) === "draw") {
    let score = 2;
    const compactEnough = state.program.length <= Math.max(level.solutionProgram.length, 1);

    if (compactEnough) {
      score += 1;
    }

    return score;
  }

  let score = 1;
  const collectedAll = state.boardState.collectedStars.length === state.currentScenario.stars.length;
  const compactEnough = state.program.length <= Math.max(level.solutionProgram.length, 1);

  if (collectedAll) {
    score += 1;
  }

  if (compactEnough) {
    score += 1;
  }

  return score;
}

function indentCode(text, depth = 1) {
  const pad = "  ".repeat(depth);
  return text
    .split("\n")
    .map((line) => `${pad}${line}`)
    .join("\n");
}

function formatCodeLine(item, mode, level = getCurrentLevel()) {
  if (item.type === "action") {
    return mode === "hebrew" ? commandMeta[item.action].pseudo : commandMeta[item.action].js;
  }

  if (item.type === "repeat") {
    const body = formatCodeLine(getCommandBody(item) || { type: "action", action: item.action || "forward" }, mode, level);
    if (mode === "hebrew") {
      return `חזור ${item.count} פעמים:\n${indentCode(body)}`;
    }
    return `repeat(${item.count}, () => {\n${indentCode(body)}\n});`;
  }

  if (item.type === "condition") {
    const body = formatCodeLine(getCommandBody(item) || { type: "action", action: item.action || "forward" }, mode, level);
    if (mode === "hebrew") {
      return `אם ${conditionMeta[item.check].pseudo}:\n${indentCode(body)}`;
    }
    return `if (${conditionMeta[item.check].js}) {\n${indentCode(body)}\n}`;
  }

  if (item.type === "while") {
    const body = formatCodeLine(getCommandBody(item) || { type: "action", action: item.action || "forward" }, mode, level);
    if (mode === "hebrew") {
      return `כל עוד ${conditionMeta[item.check].pseudo}:\n${indentCode(body)}`;
    }
    return `while (${conditionMeta[item.check].js}) {\n${indentCode(body)}\n}`;
  }

  if (item.type === "routine") {
    const routine = findRoutineDefinition(level, item.routineId);
    if (!routine) {
      return "";
    }

    return mode === "hebrew" ? routine.pseudo : routine.js;
  }

  if (item.type === "story-rule") {
    const objectLabel = storyObjectMeta[item.event]?.label || "חפץ";
    const condition = storyConditionMeta[item.condition] || storyConditionMeta.always;
    const action = storyActionMeta[item.action];

    if (!action) {
      return "";
    }

    if (mode === "hebrew") {
      if (item.condition === "always") {
        return `כשלוחצים על ${objectLabel}:\n  ${action.pseudo}`;
      }

      return `כשלוחצים על ${objectLabel}, ואם ${condition.pseudo}:\n  ${action.pseudo}`;
    }

    if (item.condition === "always") {
      return `onClick("${item.event}", () => {\n  ${action.js}\n});`;
    }

    return `onClick("${item.event}", () => {\n  if (${condition.js}) {\n    ${action.js}\n  }\n});`;
  }

  return "";
}

function narrateCurrentLevel() {
  if (!("speechSynthesis" in window)) {
    setFeedback("warn", "בדפדפן הזה אין כרגע הקראה קולית.");
    renderBoardMessage();
    return;
  }

  const mode = getLevelMode();
  const programText = mode === "builder"
    ? formatBuilderSummary(getCurrentLevel(), state.currentScenario).replace(/\n/g, ". ")
    : state.program.length
      ? state.program.map((item) => formatCodeLine(item, "hebrew").replace(/\n/g, " ")).join(". ")
      : "עדיין אין בלוקים בתוכנית.";

  const utterance = new SpeechSynthesisUtterance(`${getCurrentLevel().instruction}. ${programText}`);
  utterance.lang = "he-IL";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function getProgressSummary(progress) {
  const totalLevels = modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLevels = progress.completedLevels.length;
  const totalStars = Object.values(progress.starsByLevel).reduce((sum, value) => sum + value, 0);
  const completedModules = modules.filter((module) => isModuleComplete(module.id, progress)).length;
  const completionPercent = Math.round((completedLevels / totalLevels) * 100);

  return {
    totalLevels,
    completedLevels,
    totalStars,
    completedModules,
    completionPercent,
  };
}

function isModuleComplete(moduleId, progress) {
  const module = findModule(moduleId);
  return module.lessons.every((lesson) => progress.completedLevels.includes(lesson.id));
}

function isLevelCompleted(levelId, progress) {
  return progress.completedLevels.includes(levelId);
}

function isLevelUnlocked(moduleId, levelId, progress) {
  const module = findModule(moduleId);
  const index = module.lessons.findIndex((lesson) => lesson.id === levelId);

  if (index <= 0) {
    return true;
  }
  const previousLevelId = module.lessons[index - 1].id;
  return progress.completedLevels.includes(previousLevelId);
}

function getNextLevel(moduleId, levelId) {
  const moduleIndex = modules.findIndex((module) => module.id === moduleId);
  const levelIndex = modules[moduleIndex].lessons.findIndex((lesson) => lesson.id === levelId);
  const module = modules[moduleIndex];

  if (levelIndex < module.lessons.length - 1) {
    return {
      moduleId,
      levelId: module.lessons[levelIndex + 1].id,
    };
  }

  if (moduleIndex < modules.length - 1) {
    return {
      moduleId: modules[moduleIndex + 1].id,
      levelId: modules[moduleIndex + 1].lessons[0].id,
    };
  }

  return null;
}

function hydrateProgram(source) {
  return source.map((item) => ({
    ...item,
    id: nextCommandId += 1,
    locked: Boolean(item.locked),
  }));
}

function setFeedback(tone, text) {
  state.feedback = { tone, text };
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function clonePosition(position) {
  return { ...position };
}

function serializePosition(position) {
  return `${position.x},${position.y}`;
}

function toPositionSet(positions) {
  return new Set(positions.map(serializePosition));
}

function isInsideBoard(position) {
  const size = state.currentScenario.boardSize;
  return position.x >= 0 && position.x < size && position.y >= 0 && position.y < size;
}

function isWall(position) {
  const wallSet = toPositionSet(state.currentScenario.walls);
  return wallSet.has(serializePosition(position));
}

function nextPosition(robot) {
  if (robot.dir === "N") {
    return { x: robot.x, y: robot.y - 1, dir: robot.dir };
  }
  if (robot.dir === "E") {
    return { x: robot.x + 1, y: robot.y, dir: robot.dir };
  }
  if (robot.dir === "S") {
    return { x: robot.x, y: robot.y + 1, dir: robot.dir };
  }
  return { x: robot.x - 1, y: robot.y, dir: robot.dir };
}

function turnRight(direction) {
  return {
    N: "E",
    E: "S",
    S: "W",
    W: "N",
  }[direction];
}

function turnLeft(direction) {
  return {
    N: "W",
    W: "S",
    S: "E",
    E: "N",
  }[direction];
}

function arrowForDirection(direction) {
  return {
    N: "↑",
    E: "→",
    S: "↓",
    W: "←",
  }[direction];
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
