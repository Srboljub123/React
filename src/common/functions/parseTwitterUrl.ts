export const parseTwitterUrl = (text: string, url: string): string => {
    return `http://twitter.com/share?text=${text}&url=${url}`
}
