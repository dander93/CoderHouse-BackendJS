class Contador {
    static globalCounter = 0;

    #counter;

    constructor(Nombre) {
        this.name = Nombre;
        this.#counter = 0;
    }

    contar() {
        Contador.globalCounter += 1;
        this.#counter += 1;
    }

    getCuentaIndividual = () => this.#counter

    getCuentaGlobal = () => Contador.globalCounter;

    getResponsable = () => this.name;
}

const CONSOLE_COLOR = "\x1b[33m"
const CONSOLE_COLOR_RESET = "\x1b[0m"

const contador1 = new Contador("contador1");
const contador2 = new Contador("contador2");

console.log(`${CONSOLE_COLOR}${contador2.getResponsable()} - Contador Individual: ${contador1.getCuentaIndividual()}${CONSOLE_COLOR_RESET}`);
console.log(`${CONSOLE_COLOR}${contador2.getResponsable()} - Contador Global: ${contador1.getCuentaGlobal()}${CONSOLE_COLOR_RESET}`);

contador2.contar()
contador2.contar()
contador2.contar()

console.log(`${contador1.getResponsable()} - Contador Individual: ${contador1.getCuentaIndividual()}`);
console.log(`${contador1.getResponsable()} - Contador Global: ${contador1.getCuentaGlobal()}`);

contador1.contar()

console.log(`${CONSOLE_COLOR}${contador2.getResponsable()} - Contador Individual: ${contador1.getCuentaIndividual()}${CONSOLE_COLOR_RESET}`);
console.log(`${CONSOLE_COLOR}${contador2.getResponsable()} - Contador Global: ${contador1.getCuentaGlobal()}${CONSOLE_COLOR_RESET}`);

contador1.contar()
contador2.contar()

console.log(`${contador1.getResponsable()} - Contador Individual: ${contador1.getCuentaIndividual()}`);
console.log(`${contador1.getResponsable()} - Contador Global: ${contador1.getCuentaGlobal()}`);

contador1.contar()
contador1.getCuentaIndividual()

contador2.getCuentaIndividual()

contador1.getCuentaGlobal()
