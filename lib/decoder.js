function Decoder(str) {
  this.pointer = 0;
  this.str = str;
}

Decoder.prototype.integerDecode = function() {
  // data format: i<integer>e
  const currentStr = this.str.slice(this.pointer);
  const endPos = currentStr.indexOf('e');
  const integerStr = currentStr.slice(1, endPos);

  // check if invalid: negative zero, leading zeros
  if ((integerStr[0] === '-' && integerStr[1] === '0') ||
    (integerStr[0] === '0' && integerStr[1])) {
    throw Error('Invalid data format!');
  }

  this.pointer += 1 + endPos;
  return parseInt(integerStr, 10);
};

Decoder.prototype.stringDecode = function() {
  // data format: <length>:<string>
  const currentStr = this.str.slice(this.pointer);
  const delimiterPos = currentStr.indexOf(':');
  const stringLength = parseInt(this.str.slice(this.pointer, this.pointer + delimiterPos), 10);
  this.pointer += delimiterPos + 1 + stringLength;

  return currentStr.slice(delimiterPos + 1, delimiterPos + stringLength + 1);
};

Decoder.prototype.listDecode = function() {
  // data format: l<contents>e
  const list = [];
  this.pointer++;

  while (this.str[this.pointer] !== 'e') {
    list.push(this.decode());
  }

  this.pointer++;
  return list;
};

Decoder.prototype.dictionaryDecode = function() {
  // data format: d<contents>e
  const dictionary = {};
  this.pointer++;

  while (this.str[this.pointer] !== 'e') {
    dictionary[this.stringDecode()] = this.decode();
  }

  this.pointer++;
  return dictionary;
};

Decoder.prototype.decode = function() {

  if (!this.str) return '';

  switch (this.str[this.pointer]) {
    case 'i':
      return this.integerDecode();
    case 'l':
      return this.listDecode();
    case 'd':
      return this.dictionaryDecode();
    default:
      return this.stringDecode();
  }
};

console.log(new Decoder('i66e').decode()); // Integer
console.log(new Decoder('i-11e').decode()); // Negative Integer
console.log(new Decoder('6:string').decode()); // String
console.log(new Decoder('l4:spami42ee').decode()); // List
console.log(new Decoder('d3:bar4:spam3:fooi42ee').decode()); // Dictionary
console.log(new Decoder('l4:spami42ed3:bar4:spam3:fooi42eee').decode()); // List with a dictionary inside
console.log(new Decoder('d3:barl4:spami42ee3:fooi42ee').decode()); // Dictionary with a list inside
