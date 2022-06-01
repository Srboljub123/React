import axios from 'axios'

const checkInitAssetUrl = (
    initAssetUrl: string,
    setSource: React.Dispatch<React.SetStateAction<string>>,
    setContentType: React.Dispatch<React.SetStateAction<string>>,
): void => {
    if (/\.(webp|avif|gif|png|jpe?g)$/i.test(initAssetUrl)) {
        setSource(initAssetUrl)
        setContentType('image')
    } else {
        axios.get(`/api?check=${initAssetUrl}`, {}).then(response => {
            setSource(initAssetUrl)
            setContentType(response.data)
        })
    }
}

export default checkInitAssetUrl
