import { Carousel } from 'react-bootstrap'
import styled, { css } from 'styled-components'

import ChevronLeft from '@common/public/assets/chevronLeft.svg'
import ChevronRight from '@common/public/assets/chevronRight.svg'

const CustomCarouselMixin = css`
    background: #161616;
    border: 1px solid #3e3e3e;
    box-sizing: border-box;
    border-radius: 100px;
    height: 48px;
    width: 48px;
`

export const CustomCarouselContainer = styled.div`
    /* padding: 3rem;
    border: 1px solid #434343; */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CustomCarousel = styled(Carousel)`
    .carousel-control-next {
        ${CustomCarouselMixin}
        top: 50%;
        right: -26px;
        opacity: 1;

        @media only screen and (max-width: 900px) {
            top: 105%;
            right: 0px;
        }
    }
    .carousel-control-prev {
        ${CustomCarouselMixin}
        top: 50%;
        left: -26px;
        opacity: 1;

        @media only screen and (max-width: 900px) {
            top: 105%;
            left: 0px;
        }
    }

    .carousel-control-next-icon {
        background-image: url(${ChevronRight});
    }

    .carousel-control-prev-icon {
        background-image: url(${ChevronLeft});
    }
`

export const CustomCarouselCounterWrapper = styled.div`
    padding: 1rem;
    display: flex;
    height: 30px;
    background: #161616;
    border: 1px solid #3e3e3e;
    box-sizing: border-box;
    border-radius: 50px;
    align-items: center;

    @media only screen and (max-width: 900px) {
        margin-top: 6%;
    }
`

export const CustomCarouselCounter = styled.span`
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
`
