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

function RSA() {
    const M = getPrime()
    let N = getPrime()
    const L = 37
    while (M === N || (M - 1) * (N - 1) < L) {
        N = getPrime()
    }
    // const x= RSAGetPrivateKeyRSA(M,N,L)[1]
    console.log(M)
    console.log(N)
    console.log(RSAGetCommonKeyRSA(M, N, L))
    console.log(RSAGetPrivateKeyRSA(M, N, L))
}

RSA()