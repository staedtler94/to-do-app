import { expect } from 'chai';

describe('Sample Unit Test', () => {
    it('should return true for a true value', () => {
        const value = true;
        expect(value).to.be.true;
    });

    it('should return false for a false value', () => {
        const value = false;
        expect(value).to.be.false;
    });

    it('should add two numbers correctly', () => {
        const sum = (a: number, b: number) => a + b;
        expect(sum(2, 3)).to.equal(5);
    });
});