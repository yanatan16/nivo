/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 9px 20px;
    grid-column-gap: 16px;
    grid-row-gap: 7px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:last-child {
        border-bottom-width: 0;
    }

    @media only screen and (min-width: 760px) and (max-width: 1000px) {
        & {
            padding: 9px 10px;
        }
    }

    @media only screen and (max-width: 760px) {
        & {
            padding: 9px 10px;
        }
    }
`

const Control = ({ children }) => {
    return <Container>{children}</Container>
}

export default Control
