export const ENCRYPT = (password) => {
    return password.slice(1, password.length-1) + password.slice(0, 1) + password.slice(password.length-1, password.length)
}
// 'ditya12a3'
export const DECRYPT = (password) => {
    return password.slice(password.length-2, password.length-1)+password.slice(0, password.length-2) + password.slice(password.length-1, password.length);
}