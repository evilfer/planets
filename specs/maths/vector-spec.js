var hlp = require('../r'),
    expect = hlp.expect,
    v = hlp.req('maths/vector');

describe('vector', function () {

    it('should check equality', function () {
        expect(v.eq([0, 0, 0], [0, 0, 0])).to.be.true;
        expect(v.eq([1, 0], [1, 0])).to.be.true;
        expect(v.eq([0, 0, 0], [0, 0])).to.be.false;
        expect(v.eq([0, 0, 0], [0, 1, 0])).to.be.false;
    });

    it('should add', function () {
        var a = [-1, 3, 2];
        v.add(a, [2, -1, 1]);
        expect(a).to.eql([1, 2, 3]);
    });

    it('should subtract', function () {
        var a = [-1, 3, 2];
        v.sub(a, [2, -1, 1]);
        expect(a).to.eql([-3, 4, 1]);
    });

    it('should sum', function () {
        var a = v.sum([0, 0, 0], [-1, 3, 2], [2, -1, 1]);
        expect(a).to.eql([1, 2, 3]);
    });

    it('should diff', function () {
        var a = [0, 0, 0];

        v.diff(a, [-1, 3, 2], [2, -1, 1]);
        expect(a).to.eql([-3, 4, 1]);
    });

    it('should do scaled sum', function () {
        var a = v.sclSum([0, 0, 0], [-1, 3, 2], 2, [2, -1, 1], 3);
        expect(a).to.eql([4, 3, 7]);
    });

    it('should calculate cross product', function () {
        var r = [0, 0, 0];

        v.cross(r, [3, -3, 1], [4, 9, 2]);
        expect(r).to.eql([-15, -2, 39]);

        v.cross(r, [4, 9, 2], [3, -3, 1]);
        expect(r).to.eql([15, 2, -39]);

        v.cross(r, [3, -3, 1], [-12, 12, -4]);
        expect(r).to.eql([0, 0, 0]);
    });

    it('should calculate squared mod of a vector', function () {
        expect(v.mod2([1, 0, 0])).to.equal(1);
        expect(v.mod2([-1, 4, 3])).to.equal(26);
    });

    it('should calculate mod of a vector', function () {
        expect(v.mod([1, 0, 0])).to.equal(1);
        expect(v.mod([0, 4, 3])).to.equal(5);
    });

    it('should calculate distance of two  vector', function () {
        expect(v.distance([1, 2, 5], [1, -2, 8])).to.equal(5);
    });

    it('should calculate dot product', function () {
        expect(v.dot([3, -3, 1], [4, 9, 2])).to.equal(-13);
        expect(v.dot([4, 9, 2], [3, -3, 1])).to.equal(-13);
        expect(v.dot([3, -3, 1], [-12, 12, -4])).to.equal(-76);
    });

    it('should scale vector', function () {
        var r = [0, 0, 0];

        v.scld(r, [3, -3, 1], 0)
        expect(r).to.eql([0, -0, 0]);

        v.scld(r, [4, 9, 2], 1)
        expect(r).to.eql([4, 9, 2]);

        v.scld(r, [3, -3, 1], -2)
        expect(r).to.eql([-6, 6, -2]);
    });

    it('should scale vector', function () {
        var a = [3, -3, 1];

        v.scl(a, 1);
        expect(a).to.eql([3, -3, 1]);

        v.scl(a, -2);
        expect(a).to.eql([-6, 6, -2]);
    });

});
