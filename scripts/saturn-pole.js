var obliq = Math.PI / 180 * (23 + 26/60 + 21.448 / 3600),

    eq2ecl = function (ra, dec) {
        var x1 = Math.cos(ra) * Math.cos(dec),
            y1 = Math.sin(ra) * Math.cos(dec),
            z1 = Math.sin(dec),


            x2 = x1,
            y2 = Math.cos(obliq) * y1 - Math.sin(obliq) * z1,
            z2 = Math.cos(obliq) * z1 - Math.sin(obliq) * y1,

            dec2 = Math.asin(z2),
            ra2 = Math.atan2(y2 / Math.cos(dec2), x2 / Math.cos(dec2));

        return {ra: ra2, dec: dec2};
    },

    ra = 40.60 * Math.PI / 180,
    dec = 83.54 * Math.PI / 180,

    tx = eq2ecl(ra, dec);

console.log(tx.ra * 180 / Math.PI, (Math.PI / 2 - tx.dec) * 180 / Math.PI);
