let pointer = 0;

function integerDecode(str) {
  // data format: i<integer>e
  const currentStr = str.slice(pointer);
  const endPos = currentStr.indexOf('e');
  const integerStr = currentStr.slice(1, endPos);

  // check if invalid: negative zero, leading zeros
  if ((integerStr[0] === '-' && integerStr[1] === '0') ||
    (integerStr[0] === '0' && integerStr[1])) {
    throw Error('Invalid data format!');
  }

  pointer += 1 + endPos;
  return parseInt(integerStr, 10);
}

function stringDecode(str) {
  // data format: <length>:<string>
  const currentStr = str.slice(pointer);
  const delimiterPos = currentStr.indexOf(':');
  const stringLength = parseInt(str.slice(pointer, pointer + delimiterPos), 10);
  pointer += delimiterPos + 1 + stringLength;

  return currentStr.slice(delimiterPos + 1, delimiterPos + stringLength + 1);
}

function listDecode(str) {
  // data format: l<contents>e
  const list = [];
  pointer++;

  while (str[pointer] !== 'e') {
    list.push(decode(str));
  }

  pointer++;
  return list;
}

function dictionaryDecode(str) {
  // data format: d<contents>e
  const dictionary = {};
  pointer++;

  while (str[pointer] !== 'e') {
    dictionary[stringDecode(str)] = decode(str);
  }

  pointer++;
  return dictionary;
}

function decode(str) {

  if (!str) return '';

  switch (str[pointer]) {
    case 'i':
      return integerDecode(str);
    case 'l':
      return listDecode(str);
    case 'd':
      return dictionaryDecode(str);
    default:
      return stringDecode(str);
  }
}

// console.log(decode('i66e'));
// console.log(decode('i-11e'));
// console.log(decode('6:string'));
// console.log(decode('l4:spami42ee'));
// console.log(decode('d3:bar4:spam3:fooi42ee'));
// console.log(decode('l4:spami42ed3:bar4:spam3:fooi42eee'));
console.log(decode('d3:barl4:spami42ee3:fooi42ee'));
