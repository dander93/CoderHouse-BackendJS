const mostrarLista = (input) => {
    if(!input || !input.length){
        console.log("La lista está vacio")
    }
    else{
        console.log(input)
        input.forEach(console.log)

        return `el largo de la lista es ${input.length}`
    }
}

let a = mostrarLista(["a","b",2])
console.log(mostrarLista(["a","b",2]))

console.log(mostrarLista(a))


