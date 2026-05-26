import {describe,it,expect} from "@jest/globals"
import { multiply, sum } from "../index.js";

describe("sum",()=>{
    it('adds 1 to 2 results to 3',()=>{
        const finalvalue = sum(1,2);
        expect(finalvalue).toBe(3);
    })

    it(' when we add -1 to -2 results to -3', ()=>{
       expect(sum(-1,-2)).toBe(-3);
    })
})


describe(" multiply",()=>{
    it(' when 3 multipty 4 results 12',()=>{
        expect(multiply(3,4)).toBe(12);
    })
})