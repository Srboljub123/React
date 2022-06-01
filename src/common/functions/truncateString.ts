export const truncateString = (fullString: string, stringLength: number): string => {
    if (fullString.length <= stringLength) return fullString

    const separator = '...'
    const div = 2

    const separatorLength = separator.length,
        charsToShow = stringLength - separatorLength,
        frontChars = Math.ceil(charsToShow / div),
        backChars = Math.floor(charsToShow / div)

    return fullString.slice(0, Math.max(0, frontChars)) + separator + fullString.slice(fullString.length - backChars)
}
