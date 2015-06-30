var expect = require('chai').expect,
    r = require('../r'),

    v = r('maths/vector');

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
        var a = v.sum([-1, 3, 2], [2, -1, 1]);
        expect(a).to.eql([1, 2, 3]);
    });

    it('should calculate cross product', function () {
        expect(v.cross([3, -3, 1], [4, 9, 2])).to.eql([-15, -2, 39]);
        expect(v.cross([4, 9, 2], [3, -3, 1])).to.eql([15, 2, -39]);
        expect(v.cross([3, -3, 1], [-12, 12, -4])).to.eql([0, 0, 0]);
    });

    it('should calculate squared mod of a vector', function () {
        expect(v.mod2([1, 0, 0])).to.equal(1);
        expect(v.mod2([-1, 4, 3])).to.equal(26);
    });

    it('should calculate mod of a vector', function () {
        expect(v.mod([1, 0, 0])).to.equal(1);
        expect(v.mod([0, 4, 3])).to.equal(5);
    });

    it('should calculate dot product', function () {
        expect(v.dot([3, -3, 1], [4, 9, 2])).to.equal(-13);
        expect(v.dot([4, 9, 2], [3, -3, 1])).to.equal(-13);
        expect(v.dot([3, -3, 1], [-12, 12, -4])).to.equal(-76);
    });

    it('should scale vector', function () {
        expect(v.scld([3, -3, 1], 0)).to.eql([0, -0, 0]);
        expect(v.scld([4, 9, 2], 1)).to.eql([4, 9, 2]);
        expect(v.scld([3, -3, 1], -2)).to.eql([-6, 6, -2]);
    });

    it('should scale vector', function () {
        var a = [3, -3, 1];

        v.scl(a, 1);
        expect(a).to.eql([3, -3, 1]);

        v.scl(a, -2);
        expect(a).to.eql([-6, 6, -2]);
    });

});
