/**
 * Created by cuitao on 2017/4/18.
 */
const BitInteger = require('bigi')

function gcd(a, b, c) {
    if (b === 0) {
        return [1, c, a]
    } else {
        const temp = gcd(b, a % b, c)
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
    let i = parseInt(100 * Math.random())

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
    let index = 0
    let x = gcd(L, fi, index)[0]
    while (x < 0) {
        index++
        x = gcd(L, fi, index)[0]
    }
    return [M * N, x]
}

function encrypt(message, MN, L) {
    return new BitInteger(message.toString()).modPow(new BitInteger(L.toString()), new BitInteger(MN.toString()))
}
function decrypt(c, MN, x) {
    return new BitInteger(c.toString()).modPow(new BitInteger(x.toString()), new BitInteger(MN.toString()))
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
console.log(c.toString())
console.log(parseInt(c.toString()) % 173)
const message1 = decrypt(c, privateKey[0], privateKey[1])
console.log(parseInt(message1.toString()) % 173)
console.log(message1)

const c2 = encrypt(message, privateKey[0], privateKey[1])
const message2 = decrypt(c2, publicKey[0], publicKey[1])
console.log(parseInt(message2.toString()) % 173)
console.log(message2)


