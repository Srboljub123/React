export const normalizePrice = (mintPrice: string, selectedOption: number): string => {
    const result = Number(mintPrice) * selectedOption
    return result.toFixed(countDecimals(Number(mintPrice)))
}

const countDecimals = function (value: number) {
    if (value % 1 != 0) return value.toString().split('.')[1].length
    return 0
}
