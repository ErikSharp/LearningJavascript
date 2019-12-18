function createMessage(name) {
    return `Hello ${name}! From the module`;
}

// this shows how you can export a factory to get beyond the singleton module
export function create(name) {
    var publicAPI = {
        print() {
            console.log(createMessage());
        }
    };

    return publicAPI;
}

var counter = 0;

// No matter how many times this gets imported it's still a singleton
export function displaySingletonCounter() {
    console.log(counter++);
}
