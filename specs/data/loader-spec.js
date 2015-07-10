var fs = require('fs'),

    hlp = require('../r'),
    expect = hlp.expect,
    data = hlp.req('data/data');

describe('data loader', function () {

    it('should create tree', function () {
        expect(data).to.have.property('tree');
        expect(data.tree.length).to.be.above(0);
    });

    it('should create ids', function () {
        expect(data.tree[0]).to.have.property('id');

        var id = Object.keys(data.objects)[0];
        expect(data.objects[id].id).to.equal(id);
    });

});
