export const getTotal = (items) => {
  let total = 0
  for (let key in items) {
    total += items[key]
  }
  return total
}
