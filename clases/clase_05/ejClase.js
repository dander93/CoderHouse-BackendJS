const memo = {};

for (let i = 0; i < 10000; i++) {
    //entre 0 y 1 redondeado
    let value = Math.floor(Math.random() * 20 + 1);

    if (!memo[value])  memo[value] = 1
    else  memo[value] = memo[value] + 1
}

console.log(memo)