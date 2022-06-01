import React from 'react'

import { getTotalCost } from '@common/functions'
import { useWindowSize } from '@common/hooks'
import { ReactComponent as ChevronUp } from '@common/public/assets/chevronUp.svg'
import { ReactComponent as ChevronUpBig } from '@common/public/assets/chevronUpBig.svg'

import {
    QuantityInputContainer,
    ChevronButtonDown,
    ChevronButtonsContainer,
    ChevronButtonUp,
    QuantityInput,
} from './styles'

interface ISelectedOptionProperties {
    mintPrice: string
    maxQuantity: number
    selectedOption: number
    setSelectedOption: React.Dispatch<React.SetStateAction<number>>
    suggestedGasFees: string
    setEstimatedTotalCost: React.Dispatch<React.SetStateAction<string>>
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    estimateGasPrice?: () => Promise<void>
}

const MAX_WIDTH = 900

const SelectQuantity: React.FC<ISelectedOptionProperties> = ({
    selectedOption,
    maxQuantity,
    mintPrice,
    suggestedGasFees,
    setSelectedOption,
    setEstimatedTotalCost,
    handleChange,
    estimateGasPrice,
}) => {
    const [isIncreasing, setIsIncreasing] = React.useState(true)
    const [isDisabled, setIsDisabled] = React.useState(false)
    const [width] = useWindowSize()

    const handleIncreaseQuantity = React.useCallback(async () => {
        setIsIncreasing(true)
        if (selectedOption < maxQuantity) {
            setSelectedOption(state => state + 1)
        }
    }, [maxQuantity, selectedOption, setSelectedOption])

    const handleDecreaseQuantity = React.useCallback(async () => {
        setIsIncreasing(false)
        if (selectedOption > 1) {
            setSelectedOption(state => state - 1)
        }
    }, [selectedOption, setSelectedOption])

    React.useEffect(() => {
        selectedOption > maxQuantity && setSelectedOption(maxQuantity)
        selectedOption < 1 && setSelectedOption(1)
    }, [maxQuantity, selectedOption, setSelectedOption])

    React.useEffect(() => {
        setTimeout(async () => {
            setIsDisabled(true)
            estimateGasPrice && (await estimateGasPrice())
            setEstimatedTotalCost(getTotalCost(mintPrice, selectedOption, suggestedGasFees))
            setIsDisabled(false)
        }, 1)
    }, [estimateGasPrice, mintPrice, selectedOption, setEstimatedTotalCost, suggestedGasFees])

    return (
        <div>
            <QuantityInputContainer>
                <QuantityInput
                    type="number"
                    name="quantity"
                    id="quantiy"
                    aria-label="First name"
                    className="form-control"
                    onChange={handleChange}
                    value={selectedOption}
                />
                <ChevronButtonsContainer>
                    <ChevronButtonUp onClick={handleIncreaseQuantity} isIncreasing={isIncreasing} disabled={isDisabled}>
                        {width < MAX_WIDTH ? <ChevronUpBig /> : <ChevronUp />}
                    </ChevronButtonUp>
                    <ChevronButtonDown
                        onClick={handleDecreaseQuantity}
                        isIncreasing={isIncreasing}
                        disabled={isDisabled}
                    >
                        {width < MAX_WIDTH ? <ChevronUpBig /> : <ChevronUp />}
                    </ChevronButtonDown>
                </ChevronButtonsContainer>
            </QuantityInputContainer>
        </div>
    )
}

export default SelectQuantity
