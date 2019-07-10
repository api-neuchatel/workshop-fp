const people = [
    {
        id: 1,
        name: "Arnaud",
        age: 29
    },
    {
        id: 2,
        name: "Xavier",
        age: 22
    },
    {
        id: 3,
        name: "Robert",
        age: 50
    },
    {
        id: 4,
        name: "Damien",
        age : 37
    },
    {
        id: 5,
        name: "Jerome",
        age : 90
    },
    {
        id: 6,
        name: "Dominique",
        age : 40
    }
]

const movies = [
    {
        title: "Lord of the Rings",
        author: "Peter Jackson",
        comments: [{peopleId: 1, grade: 5},
                   {peopleId: 2, grade: 7},
                   {peopleId: 3, grade: 4},
                   {peopleId: 4, grade: 9}]
    },
    {
        title: "The Empire strikes back",
        author: "Steven Spielberg",
        comments: [{peopleId: 1, grade: 2},
                   {peopleId: 2, grade: 8},
                   {peopleId: 3, grade: 10},
                   {peopleId: 4, grade: 7}]
    },
]

function flat(arr) { 
    return arr.reduce((acc,v) => acc.concat(v),[]) 
};

/**
 * Applies a function (f) to each element of an array (arr).
 * Type: [A] => (A => B) => [B]
 * 
 * TODO: 
 * 1. I can pass an array and a function to apply a transformation via the map() function
 */
export function map(arr, f) {
    let tmp = [];
    for(let c of arr) {
        tmp.push(f(c));
    }
    return tmp;
}



/**
 * Filters the elements of an array (xs) keeping only those who match a given predicate (p).
 * Type: [A] => (A => Boolean) => [A]
 * 
 * TODO:
 * 2. I can pass an array and a predicate to filter out items via the filter() function
 */
export function filter(arr, p) {
    let tmp = [];
    for(let c of arr) {
        if(p(c)) {
            tmp.push(c);
        }
    }
    return tmp;
}

/**
 * Returns a person by its id
 * Type: Int => Person
 * 
 * TODO:
 * 3. I can create a function that close over a variable in its environnement, that\' called a closure!
 */
export function findPersonById(id) {
    return filter(people, p => p.id===id)[0];
}

/**
 * Returns the people younger than 30
 * Type: Unit => [Person]
 * 
 * TODO:
 * 4. I can get people younger than 30'
 */
export function peopleYoungerThan30() {
    return filter(people, p => p.age < 30);
}

/**
 * Returns the people acronyms
 * Type: Unit => [String]
 * Example: ["Ar", "Xa", Da"]
 * 
 * TODO:
 * 5. I can get two letters acronyms
 */
export function peopleAcronyms() {
    return map(people, p => p.name.substr(0,2));
}

/**
 * Returns the people acronyms in uppercase that starts with the letter "D"
 * Type : Unit -> [String]
 * Example : ["DA", "DO"]
 * 
 * TODO:
 * 6. I can get two letters acronyms in uppercase that starts with D
 */
export function peopleAcronymsUppercaseStartWithD() {
    return filter(map(map(people, p => p.name.substr(0,2)), p => p.toUpperCase()), p => p[0]=='D');
}

/**
 * Returns the comments for each user by movie
 * Type : Unit -> [{movie, name, grade}]
 * Example : [{name: "Lord of the Rings", name: "Xavier", grade: 5},{name: "Empire strikes back", name: "Arnaud", grade: 6}]
 * 
 * TODO:
 * 7. I can get all comments for each movie and people
 */
export function commentsByMovie() {
    return flat(map(movies, m => map(m.comments, c => ({movie: m.title, name: findPersonById(c.peopleId).name, grade: c.grade}))));
}