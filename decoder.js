let pointer = 0;

function integerDecode(str) {
  // data format: i<integer>e
  const currentStr = str.slice(pointer);
  const endPos = currentStr.indexOf('e');
  const integerStr = currentStr.slice(1, endPos);

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
    list.push(dataStream(str));
  }

  pointer++;
  return list;
}

function dictionaryDecode(str) {
  // data format: d<contents>e
  const dictionary = {};
  pointer++;

  while (str[pointer] !== 'e') {
    dictionary[stringDecode(str)] = dataStream(str);
  }

  pointer++;
  return dictionary;
}

function dataStream(str) {

  switch (str[pointer]) {
    case 'i':
      return integerDecode(str);
    case 'l':
      return listDecode(str);
    case 'd':
      return dictionaryDecode(str);
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return stringDecode(str);
  }
}

// console.log(dataStream('i66e'));
// console.log(dataStream('i-11e'));
// console.log(dataStream('6:string'));
// console.log(dataStream('l4:spami42ee'));
// console.log(dataStream('d3:bar4:spam3:fooi42ee'));
// console.log(dataStream('l4:spami42ed3:bar4:spam3:fooi42eee'));
console.log(dataStream('d3:barl4:spami42ee3:fooi42ee'));
