import React from 'react'
import styled from 'styled-components'

const InputElement = styled.input`
    height: 28px;
    width: 100%;
    font-size: 12px;
    height: 28px;
    padding: 0 7px;
    border-radius: 1px;
    background: ${({ theme }) => theme.colors.inputBackground};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textLight};

    &:focus {
        outline: 0;
        cursor: auto;
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.text};
        box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.accent};
    }
`

const TextInput = props => {
    const hasUnit = !!props.unit

    return (
        <div>
            <InputElement type="text" {...props} />
            {hasUnit && <span>{props.unit}</span>}
        </div>
    )
}

export default TextInput
