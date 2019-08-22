const isInt = (value) => {
    return !isNaN(value) && parseInt(value, 10).toString() === value;
};
  
  // this check assumes the german way of writing numbers (, as decimal point)
  // all strings with "." will be rejected
  // TODO: locale dependent number check
const strIsNumber = (value) => {
    // first change all "." to a non-number type
    // then change all "," to "."
    const valueToCheck = value.replace(/\./g, "_").replace(/,/g, ".");
  
    return valueToCheck.length > 0 && !isNaN(valueToCheck);
};
  
const isAlphaNumStr = (value) => {
    // consider using a unicode regular expression and enabling a transpiler to make sure it's supported in all browsers
    return null != value.match(/^[\wäüöïëÄÜÖßáéíóúàèìùòâêîôûçÇãñõÆØÅæøå-]*$/);
};
  
const isAlphaNumPuncStr = (value) => {
    // consider using a unicode regular expression and enabling a transpiler to make sure it's supported in all browsers
    return null != value.match(/^[ \wäüöïëÄÜÖßáéíóúàèìùòâêîôûçÇãñõÆØÅæøå()/.,:+-]*$/);
};
  
const isValidPartName = (value) => {
    const trimmedString = value.trim();
    return null != trimmedString.match(/^[ \wäüöïëÄÜÖßáéíóúàèìùòâêîôûçÇãñõÆØÅæøå.,:()[\]{}^&!*/+-]{1,255}$/);
};
  
  
const isValidPassword = (value) => {
    // password is required to be between 6 and 256 characters long and contain at least one digit and one non-digit character
    return (value.length > 8 &&
        value.length <= 256 &&
        value.search(/\d/) !== -1 &&
        value.search(/\D/) !== -1);
};
  
const isValidEmailAddress = (value) => {
    return null !== value.match(/^\s*\S+@\S+\.\S+\s*$/);
}
  
const isValidPhoneNumber = (value) => {
    return null !== value.match(/^[\s\d+()\/-]*$/);
}
  
export {isInt, strIsNumber, isAlphaNumStr, isAlphaNumPuncStr, isValidPassword,
    isValidPartName, isValidEmailAddress, isValidPhoneNumber};
  
export const isCustomerOrderNumberValid = (orderNumber) => {
    const trimmedOrderNumber = orderNumber.trim();
    return (trimmedOrderNumber.length === 0 || (isAlphaNumPuncStr(orderNumber) && trimmedOrderNumber.length <= 128))
};
  
export const isOrderCommentValid = (comment) => {
    return comment.length < 5000;
};