
export function sum(a, b) {
    return {
        x: b.x + a.x,
        y: b.y + a.y
    };
}

export function difference(a, b) {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    };
}
