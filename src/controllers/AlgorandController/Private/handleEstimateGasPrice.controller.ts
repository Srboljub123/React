const SINGLE_TICKET_GAS_MARGIN = 1000

const handleEstimateGasPriceController = (setSuggestedGasFees: React.Dispatch<React.SetStateAction<string>>): void => {
    setSuggestedGasFees(String(SINGLE_TICKET_GAS_MARGIN / __MICRO_ALGO_RATIO__))
}

export default handleEstimateGasPriceController
