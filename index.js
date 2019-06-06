// Node js does not support ES6 import export, unless we use babel to compile decode.js
const Decoder = require('./lib/decoder');

const decoders = [];
decoders.push(new Decoder('i66e')); // Integer
decoders.push(new Decoder('i-11e')); // Negative Integer
decoders.push(new Decoder('6:string')); // String
decoders.push(new Decoder('l4:spami42ee')); // List
decoders.push(new Decoder('d3:bar4:spam3:fooi42ee')); // Dictionary
decoders.push(new Decoder('l4:spami42ed3:bar4:spam3:fooi42eee')); // List with a dictionary inside
decoders.push(new Decoder('d3:barl4:spami42ee3:fooi42ee')); // Dictionary with a list inside

for (let i = 0; i < 7; i++) {
  console.log('Encoded string: ' + decoders[i].str);
  console.log('Decoded data: ' + JSON.stringify(decoders[i].decode()));
}
