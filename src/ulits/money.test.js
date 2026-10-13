import { it , expect ,describe} from "vitest";
import {formatMoney} from './money'
describe('formatMoney',()=>{
    it('format 1999 to 19.99',()=>{
        expect(formatMoney(1999)).toBe('19.99')
    })
    it('display to 2 decimals',()=>{
        expect(formatMoney(1990)).toBe('19.90')
        expect(formatMoney(100)).toBe('1.00')
    })
    it('format 0 to 0.00',()=>{
        expect(formatMoney(0)).toBe('0.00')
    })
    it('diplay negative number',()=>{
        expect(formatMoney(-199)).toBe('-1.99')
    })
})