type db = { a: string, b: string, c: number, d?: string|number }[];

const Kafi = require( "./AL-Kafi.json" ) as db; 
const misc = require( "./Misc.json" ) as db; 

export const ahadis = [ ...Kafi, ...misc ];