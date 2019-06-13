module.exports = (word) => {
  var re = /[\W_]/g;
  var lowRegStr = word.toLowerCase().replace(re, '');
  var reverseStr = lowRegStr.split('').reverse().join('');
  return reverseStr === lowRegStr;
};