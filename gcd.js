/**
 * Created by cuitao on 2017/4/18.
 */


function gcd(a, b) {
    if (b === 0) {
        return [1, 0, a]
    } else {
        const temp = gcd(b, a % b)
        return [temp[1], (temp[0] - parseInt(a / b) * temp[1]), temp[2]]
    }
}

function isPrime(value) {
    for (let i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}


function getPrime() {
    let i = parseInt(10000 * Math.random())

    while (i > 2) {
        if (isPrime(i)) {
            return i
        }
        i--
    }

    return 2
}


function RSAGetCommonKeyRSA(M, N, L) {
    return [M * N, L]
}

function RSAGetPrivateKeyRSA(M, N, L) {
    const fi = (M - 1) * (N - 1)
    let x = gcd(L, fi)[0]
    return [M * N, x]
}

function encrypt(message, MN, L) {
    const a = Math.pow(message, L)
    return a % MN
}
function decrypt(c, MN, x) {
    const a = Math.pow(c, x)
    return a % MN
}

function generatorKeys() {
    const M = getPrime()
    let N = getPrime()
    const L = 173
    while (M === N || (M - 1) * (N - 1) < L) {
        N = getPrime()
    }
    return ({publicKey: RSAGetCommonKeyRSA(M, N, L), privateKey: RSAGetPrivateKeyRSA(M, N, L)})
}
const {publicKey, privateKey} = generatorKeys()
console.log(publicKey)
console.log(privateKey)
const message = 97
const c = encrypt(message, publicKey[0], publicKey[1])
const message1 = decrypt(c, privateKey[0], privateKey[1])
console.log(message1)



