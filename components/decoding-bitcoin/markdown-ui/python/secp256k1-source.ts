// Shared secp256k1 helper module, injected into the Pyodide filesystem as
// `secp256k1.py` so lesson code can `from secp256k1 import add, mul, ...`.
//
// This replaces the "paste this helper block above your code" instructions the
// lessons used to carry. Keep it in one place: several lessons import it.
export const SECP256K1_SOURCE = `"""secp256k1 point math. You do not need to read this file."""
import hashlib

p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
G = (0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798,
     0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8)


def add(P, Q):
    """Add two curve points."""
    if P is None: return Q
    if Q is None: return P
    if P[0] == Q[0] and (P[1] + Q[1]) % p == 0: return None
    if P == Q:
        lam = (3 * P[0] * P[0]) * pow(2 * P[1], p - 2, p) % p
    else:
        lam = (Q[1] - P[1]) * pow(Q[0] - P[0], p - 2, p) % p
    x = (lam * lam - P[0] - Q[0]) % p
    return (x, (lam * (P[0] - x) - P[1]) % p)


def mul(k, P=G):
    """Multiply a point by a scalar. mul(k) computes k * G."""
    R = None
    while k:
        if k & 1: R = add(R, P)
        P = add(P, P)
        k >>= 1
    return R


def lift_x(x):
    """Turn an x-only key into the full point with even y."""
    y = pow((x * x * x + 7) % p, (p + 1) // 4, p)
    if y % 2 != 0: y = p - y
    return (x, y)


def tagged_hash(tag, data):
    """BIP340 tagged hash: sha256(sha256(tag) || sha256(tag) || data)."""
    t = hashlib.sha256(tag.encode()).digest()
    return hashlib.sha256(t + t + data).digest()
`

// Schnorr sign/verify (from the Schnorr lesson) as an importable module, so a
// lesson about tweaking can call schnorr_sign/schnorr_verify without the
// signature internals cluttering the editable file.
export const SCHNORR_SOURCE = `"""Schnorr sign/verify from the Schnorr lesson, plus BIP340 even-Y rules.
You do not need to read this file."""
import hashlib
from secp256k1 import add, mul, lift_x, tagged_hash, n


def schnorr_sign(d, msg):
    if mul(d)[1] % 2 != 0:
        d = n - d                      # BIP340: P must have even y
    P = mul(d)
    k = int.from_bytes(hashlib.sha256(d.to_bytes(32, "big") + msg).digest(), "big") % n
    if mul(k)[1] % 2 != 0:
        k = n - k                      # BIP340: R must have even y
    R = mul(k)
    h = int.from_bytes(tagged_hash("BIP0340/challenge",
        R[0].to_bytes(32, "big") + P[0].to_bytes(32, "big") + msg), "big") % n
    s = (k + h * d) % n
    return R[0].to_bytes(32, "big") + s.to_bytes(32, "big")


def schnorr_verify(pubkey_x, msg, sig):
    P = lift_x(pubkey_x)
    r, s = int.from_bytes(sig[:32], "big"), int.from_bytes(sig[32:], "big")
    h = int.from_bytes(tagged_hash("BIP0340/challenge",
        sig[:32] + pubkey_x.to_bytes(32, "big") + msg), "big") % n
    R = add(mul(s), mul(n - h, P))     # s*G - h*P
    return R is not None and R[1] % 2 == 0 and R[0] == r
`

export const PRESETS: Record<string, Record<string, string>> = {
    secp256k1: { "secp256k1.py": SECP256K1_SOURCE },
    // schnorr.py first: it's the more relevant helper for signing lessons;
    // secp256k1.py is the deeper point-math layer underneath it.
    schnorr: {
        "schnorr.py": SCHNORR_SOURCE,
        "secp256k1.py": SECP256K1_SOURCE
    }
}
