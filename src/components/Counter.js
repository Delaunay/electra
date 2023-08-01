


function NewCounter() {
    let count = 0
    return function () {
        count += 1
        return count;
    }
}


let Counter = NewCounter()

export {Counter, NewCounter}