export const getTopThreeFromDataObject = (items) => {
  let max1 = { value: -1, key: undefined },
    max2 = { value: -1, key: undefined },
    max3 = { value: -1, key: undefined }
  for (let key in items) {
    if (items[key] >= max1['value']) {
      max3 = max2
      max2 = max1
      max1 = { key, value: items[key] }
    } else if (items[key] >= max2['value']) {
      max3 = max2
      max2 = { key, value: items[key] }
    } else if (items[key] > max3['value']) {
      max3 = { key, value: items[key] }
    }
  }
  let result = []
  if (max1.value !== -1) {
    result.push(max1)
  }
  if (max2.value !== -1) {
    result.push(max2)
  }
  if (max3.value !== -1) {
    result.push(max3)
  }
  return result
}
