function add(a,b) {
    return a+b ; 
}

function sub(a,b) {
    return a-b ; 
}

function mult(a,b) {
    return a*b ; 
}

function div(a,b) {
    return a/b ; 
}

// module.exports = add ; ONLY EXPORTS ADD FUNCTION 

//exporting without names
// module.exports = {add , sub , mult , div} ; 

//exporting with names
module.exports = {addFn : add , subFn : sub , multFn : mult , divFn : div} ;

