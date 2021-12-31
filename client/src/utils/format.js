/**
 * @param {Date} date
 * @returns {string}
 */
const formatDate = (date) => {
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
}

export { formatDate }
