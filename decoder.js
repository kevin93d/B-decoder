function integerDecode(str) {
  // data format: i<integer>e
  const endPos = str.indexOf('e');
  const integerStr = str.slice(1, endPos);

  return parseInt(integerStr, 10);
}

function stringDecode(str) {
  // data format: <length>:<string>
  const delimiterPos = str.indexOf(':');
  const stringLength = parseInt(str.slice(0, delimiterPos), 10);

  return str.slice(delimiterPos + 1, delimiterPos + stringLength + 1);
}

// console.log(integerDecode('i66e'));
console.log(stringDecode('6:string'));
