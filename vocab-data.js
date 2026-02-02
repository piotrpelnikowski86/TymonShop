// English Vocabulary Database for Polish Schools (Grades 1-3)

const vocabularyDatabase = {
    grade1: [
        // Colors (Kolory)
        { english: "red", polish: "czerwony", category: "colors" },
        { english: "blue", polish: "niebieski", category: "colors" },
        { english: "yellow", polish: "żółty", category: "colors" },
        { english: "green", polish: "zielony", category: "colors" },
        { english: "black", polish: "czarny", category: "colors" },
        { english: "white", polish: "biały", category: "colors" },
        { english: "pink", polish: "różowy", category: "colors" },
        { english: "orange", polish: "pomarańczowy", category: "colors" },

        // Numbers (Liczby)
        { english: "one", polish: "jeden", category: "numbers" },
        { english: "two", polish: "dwa", category: "numbers" },
        { english: "three", polish: "trzy", category: "numbers" },
        { english: "four", polish: "cztery", category: "numbers" },
        { english: "five", polish: "pięć", category: "numbers" },
        { english: "six", polish: "sześć", category: "numbers" },
        { english: "seven", polish: "siedem", category: "numbers" },
        { english: "eight", polish: "osiem", category: "numbers" },
        { english: "nine", polish: "dziewięć", category: "numbers" },
        { english: "ten", polish: "dziesięć", category: "numbers" },

        // Family (Rodzina)
        { english: "mother", polish: "mama", category: "family" },
        { english: "father", polish: "tata", category: "family" },
        { english: "sister", polish: "siostra", category: "family" },
        { english: "brother", polish: "brat", category: "family" },
        { english: "grandmother", polish: "babcia", category: "family" },
        { english: "grandfather", polish: "dziadek", category: "family" },

        // Animals (Zwierzęta)
        { english: "cat", polish: "kot", category: "animals" },
        { english: "dog", polish: "pies", category: "animals" },
        { english: "bird", polish: "ptak", category: "animals" },
        { english: "fish", polish: "ryba", category: "animals" },
        { english: "rabbit", polish: "królik", category: "animals" },
        { english: "mouse", polish: "mysz", category: "animals" },
        { english: "horse", polish: "koń", category: "animals" },
        { english: "cow", polish: "krowa", category: "animals" },

        // School (Szkoła)
        { english: "book", polish: "książka", category: "school" },
        { english: "pen", polish: "długopis", category: "school" },
        { english: "pencil", polish: "ołówek", category: "school" },
        { english: "desk", polish: "ławka", category: "school" },
        { english: "teacher", polish: "nauczyciel", category: "school" },
        { english: "student", polish: "uczeń", category: "school" },

        // Basic Words (Podstawowe słowa)
        { english: "hello", polish: "cześć", category: "basic" },
        { english: "goodbye", polish: "do widzenia", category: "basic" },
        { english: "yes", polish: "tak", category: "basic" },
        { english: "no", polish: "nie", category: "basic" },
        { english: "please", polish: "proszę", category: "basic" },
        { english: "thank you", polish: "dziękuję", category: "basic" },
    ],

    grade2: [
        // More Animals (Więcej zwierząt)
        { english: "elephant", polish: "słoń", category: "animals" },
        { english: "lion", polish: "lew", category: "animals" },
        { english: "tiger", polish: "tygrys", category: "animals" },
        { english: "bear", polish: "niedźwiedź", category: "animals" },
        { english: "monkey", polish: "małpa", category: "animals" },
        { english: "giraffe", polish: "żyrafa", category: "animals" },
        { english: "zebra", polish: "zebra", category: "animals" },
        { english: "penguin", polish: "pingwin", category: "animals" },

        // Food (Jedzenie)
        { english: "apple", polish: "jabłko", category: "food" },
        { english: "banana", polish: "banan", category: "food" },
        { english: "bread", polish: "chleb", category: "food" },
        { english: "milk", polish: "mleko", category: "food" },
        { english: "water", polish: "woda", category: "food" },
        { english: "juice", polish: "sok", category: "food" },
        { english: "cheese", polish: "ser", category: "food" },
        { english: "egg", polish: "jajko", category: "food" },
        { english: "pizza", polish: "pizza", category: "food" },
        { english: "ice cream", polish: "lody", category: "food" },

        // Body Parts (Części ciała)
        { english: "head", polish: "głowa", category: "body" },
        { english: "hand", polish: "ręka", category: "body" },
        { english: "foot", polish: "stopa", category: "body" },
        { english: "eye", polish: "oko", category: "body" },
        { english: "ear", polish: "ucho", category: "body" },
        { english: "nose", polish: "nos", category: "body" },
        { english: "mouth", polish: "usta", category: "body" },
        { english: "leg", polish: "noga", category: "body" },

        // Clothes (Ubrania)
        { english: "shirt", polish: "koszula", category: "clothes" },
        { english: "pants", polish: "spodnie", category: "clothes" },
        { english: "dress", polish: "sukienka", category: "clothes" },
        { english: "shoes", polish: "buty", category: "clothes" },
        { english: "hat", polish: "kapelusz", category: "clothes" },
        { english: "jacket", polish: "kurtka", category: "clothes" },
        { english: "socks", polish: "skarpetki", category: "clothes" },

        // Weather (Pogoda)
        { english: "sun", polish: "słońce", category: "weather" },
        { english: "rain", polish: "deszcz", category: "weather" },
        { english: "snow", polish: "śnieg", category: "weather" },
        { english: "wind", polish: "wiatr", category: "weather" },
        { english: "cloud", polish: "chmura", category: "weather" },

        // Verbs (Czasowniki)
        { english: "run", polish: "biegać", category: "verbs" },
        { english: "jump", polish: "skakać", category: "verbs" },
        { english: "walk", polish: "chodzić", category: "verbs" },
        { english: "eat", polish: "jeść", category: "verbs" },
        { english: "drink", polish: "pić", category: "verbs" },
        { english: "sleep", polish: "spać", category: "verbs" },
        { english: "play", polish: "bawić się", category: "verbs" },
        { english: "read", polish: "czytać", category: "verbs" },
        { english: "write", polish: "pisać", category: "verbs" },
        { english: "sing", polish: "śpiewać", category: "verbs" },
    ],

    grade3: [
        // Days of Week (Dni tygodnia)
        { english: "Monday", polish: "poniedziałek", category: "days" },
        { english: "Tuesday", polish: "wtorek", category: "days" },
        { english: "Wednesday", polish: "środa", category: "days" },
        { english: "Thursday", polish: "czwartek", category: "days" },
        { english: "Friday", polish: "piątek", category: "days" },
        { english: "Saturday", polish: "sobota", category: "days" },
        { english: "Sunday", polish: "niedziela", category: "days" },

        // Months (Miesiące)
        { english: "January", polish: "styczeń", category: "months" },
        { english: "February", polish: "luty", category: "months" },
        { english: "March", polish: "marzec", category: "months" },
        { english: "April", polish: "kwiecień", category: "months" },
        { english: "May", polish: "maj", category: "months" },
        { english: "June", polish: "czerwiec", category: "months" },

        // House (Dom)
        { english: "house", polish: "dom", category: "house" },
        { english: "room", polish: "pokój", category: "house" },
        { english: "kitchen", polish: "kuchnia", category: "house" },
        { english: "bathroom", polish: "łazienka", category: "house" },
        { english: "bedroom", polish: "sypialnia", category: "house" },
        { english: "window", polish: "okno", category: "house" },
        { english: "door", polish: "drzwi", category: "house" },
        { english: "table", polish: "stół", category: "house" },
        { english: "chair", polish: "krzesło", category: "house" },
        { english: "bed", polish: "łóżko", category: "house" },

        // Nature (Natura)
        { english: "tree", polish: "drzewo", category: "nature" },
        { english: "flower", polish: "kwiat", category: "nature" },
        { english: "grass", polish: "trawa", category: "nature" },
        { english: "mountain", polish: "góra", category: "nature" },
        { english: "river", polish: "rzeka", category: "nature" },
        { english: "lake", polish: "jezioro", category: "nature" },
        { english: "sea", polish: "morze", category: "nature" },
        { english: "forest", polish: "las", category: "nature" },

        // Adjectives (Przymiotniki)
        { english: "big", polish: "duży", category: "adjectives" },
        { english: "small", polish: "mały", category: "adjectives" },
        { english: "tall", polish: "wysoki", category: "adjectives" },
        { english: "short", polish: "niski", category: "adjectives" },
        { english: "hot", polish: "gorący", category: "adjectives" },
        { english: "cold", polish: "zimny", category: "adjectives" },
        { english: "fast", polish: "szybki", category: "adjectives" },
        { english: "slow", polish: "wolny", category: "adjectives" },
        { english: "happy", polish: "szczęśliwy", category: "adjectives" },
        { english: "sad", polish: "smutny", category: "adjectives" },
        { english: "good", polish: "dobry", category: "adjectives" },
        { english: "bad", polish: "zły", category: "adjectives" },

        // More Verbs (Więcej czasowników)
        { english: "swim", polish: "pływać", category: "verbs" },
        { english: "fly", polish: "latać", category: "verbs" },
        { english: "dance", polish: "tańczyć", category: "verbs" },
        { english: "draw", polish: "rysować", category: "verbs" },
        { english: "listen", polish: "słuchać", category: "verbs" },
        { english: "speak", polish: "mówić", category: "verbs" },
        { english: "watch", polish: "oglądać", category: "verbs" },
        { english: "help", polish: "pomagać", category: "verbs" },
        { english: "learn", polish: "uczyć się", category: "verbs" },
        { english: "teach", polish: "uczyć", category: "verbs" },

        // Transportation (Transport)
        { english: "car", polish: "samochód", category: "transportation" },
        { english: "bus", polish: "autobus", category: "transportation" },
        { english: "train", polish: "pociąg", category: "transportation" },
        { english: "bicycle", polish: "rower", category: "transportation" },
        { english: "plane", polish: "samolot", category: "transportation" },
        { english: "boat", polish: "łódź", category: "transportation" },
    ]
};

// Helper function to get all words for a specific grade
function getVocabularyByGrade(grade) {
    const gradeKey = `grade${grade}`;
    return vocabularyDatabase[gradeKey] || [];
}

// Helper function to get all words (all grades)
function getAllVocabulary() {
    return [
        ...vocabularyDatabase.grade1,
        ...vocabularyDatabase.grade2,
        ...vocabularyDatabase.grade3
    ];
}

// Helper function to get words by category
function getVocabularyByCategory(grade, category) {
    const words = getVocabularyByGrade(grade);
    return words.filter(word => word.category === category);
}

// Helper function to get all categories for a grade
function getCategoriesForGrade(grade) {
    const words = getVocabularyByGrade(grade);
    const categories = [...new Set(words.map(word => word.category))];
    return categories.sort();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        vocabularyDatabase,
        getVocabularyByGrade,
        getAllVocabulary,
        getVocabularyByCategory,
        getCategoriesForGrade
    };
}
