const chai = require('chai');
const Cconf = require('../index');

const expect = chai.expect;

//测试
describe('测试', () => {
    it('should return object', () => {
        const cconf = new Cconf();
        cconf.file('./tests/data.json');
        expect(cconf.export()).to.be.an('object');
        expect(cconf.get('name'))  === 'NEUQer';
        cconf.set('createAt', 2014);
        expect(cconf.get('crateAt')) === 2014;
    });
});
