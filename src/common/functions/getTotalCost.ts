export const getTotalCost = (initMintPrice: string, selectedOption: number, estimatedGasFees: string): string => {
    return (Number.parseFloat(initMintPrice) * selectedOption + Number.parseFloat(estimatedGasFees)).toFixed(
        __EIGHT_DIGITS__,
    )
}
