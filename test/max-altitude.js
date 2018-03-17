const targetPos = [-581698065.0341377, -563005614.2312663, 15346427.011126932];
const observerPos = [-148411073.99436438, 8918868.609505937, -16044.74367855841];
const tilt = 0.4090928;

const r = targetPos.map((v, i) => v - observerPos[i]);
const rm = Math.sqrt(r.reduce((acc, v) => acc + v * v, 0));
const ru = r.map(v => v / rm);

console.log("tilt:", 180 * tilt / Math.PI);
console.log(ru);

const lat = Math.PI * 51 / 180;

const eqp = [
    ru[0] * Math.cos(lat),
    (Math.cos(tilt) * ru[1] - Math.sin(tilt) * ru[2]) * Math.cos(lat),
    (Math.cos(tilt) * ru[2] + Math.sin(tilt) * ru[1]) * Math.sin(lat)
];

console.log(eqp);


let max = 0;

for (let i = 0; i < 100; i++) {
    const ra = 2 * Math.PI * i / 100;

    const zv = [
        Math.cos(ra),
        Math.sin(ra),
        1
    ];

    const dot = zv.reduce((acc, v, i) => acc + v * eqp[i], 0);
    const angle = Math.acos(dot);
    max = Math.max(max, 90 - 180 * angle / Math.PI);
}

const a = eqp[0],
    b = eqp[1],
    c = eqp[2];

/**
 * solve: a * cos(ra) + b * sin(ra) + c = 0
 * transform to: d * sin(ra + p) + c = 0
 *
 * d * (sin(ra)*cos(p) + cos(ra)*sin(p)) = 0
 * d * sin(p)* cos(ra) + d * cos(p) * sin(ra) = 0
 *
 * d * sin(p) = a
 * d * cos(p) = b
 *
 * p = atan2(a, b)
 **/


const p = Math.atan2(a, b),
    cosP = Math.cos(p),
    sinP = Math.sin(p),
    d = Math.abs(cosP) > Math.abs(sinP) ? b / cosP : a / sinP;

const maxDot =  c + Math.abs(d);

console.log(max);
console.log(90 - 180 * Math.acos(maxDot) / Math.PI);
