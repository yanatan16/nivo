import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import pick from 'lodash/pick'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import PropertyHelp from './PropertyHelp'
import TextInput from './TextInput'

const SwitchRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    & > *:first-child {
        margin-right: 9px;
    }
`

const RangeRow = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 9px;
    align-items: center;
    max-width: 240px;
    margin-bottom: 5px;
`

export default class SwitchableRangeControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        property: PropTypes.object.isRequired,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        options: PropTypes.shape({
            unit: PropTypes.string,
            defaultValue: PropTypes.number.isRequired,
            disabledValue: PropTypes.any.isRequired,
            min: PropTypes.number.isRequired,
            max: PropTypes.number.isRequired,
            step: PropTypes.number,
        }).isRequired,
        onChange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)

        const {
            value,
            options: { disabledValue, defaultValue },
        } = this.props
        this.state = {
            isSliderEnabled: value !== disabledValue,
            sliderValue: value === disabledValue ? defaultValue : value,
        }
    }

    handleSwitchUpdate = e => {
        const {
            onChange,
            options: { disabledValue },
        } = this.props
        const { sliderValue } = this.state
        if (e.target.checked === false) {
            this.setState({ isSliderEnabled: true })
            onChange(Number(sliderValue))
        } else {
            this.setState({ isSliderEnabled: false })
            onChange(disabledValue)
        }
    }

    handleSliderUpdate = e => {
        const { onChange } = this.props
        this.setState({ sliderValue: Number(e.target.value) })
        onChange(Number(e.target.value))
    }

    render() {
        const {
            id,
            property,
            options: { disabledValue, unit },
            value,
        } = this.props
        const { isSliderEnabled, sliderValue } = this.state

        return (
            <Control description={property.description}>
                <PropertyHeader {...property} />
                <SwitchRow>
                    <span className="control-switch">
                        <input
                            className="cmn-toggle"
                            id={`${id}.switch`}
                            type="checkbox"
                            checked={!isSliderEnabled}
                            onChange={this.handleSwitchUpdate}
                        />
                        <label htmlFor={`${id}.switch`} />
                    </span>
                    <span
                        style={{
                            color: isSliderEnabled ? '#bbbbbb' : 'inherit',
                        }}
                    >
                        {disabledValue}
                    </span>
                </SwitchRow>
                {isSliderEnabled && (
                    <RangeRow>
                        <TextInput value={value} unit={unit} isNumber={true} disabled={true} />
                        <input
                            id={`${id}.slider`}
                            type="range"
                            value={sliderValue}
                            onChange={this.handleSliderUpdate}
                            {...pick(this.props.options, ['min', 'max', 'step'])}
                        />
                    </RangeRow>
                )}
                <PropertyHelp>{property.help}</PropertyHelp>
            </Control>
        )
    }
}
