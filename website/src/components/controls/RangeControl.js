import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import pick from 'lodash/pick'
import Control from './Control'
import Label from './Label'
import TextInput from './TextInput'

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 12px;
    max-width: 240px;
`

export default class RangeControl extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        unit: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        help: PropTypes.node.isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number,
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    handleChange = e => {
        this.props.onChange(Number(e.target.value))
    }

    render() {
        const { id, label, value, unit, help } = this.props

        // /*unit && <span className="unit">{unit}</span>*/

        return (
            <Control>
                <Label htmlFor={id}>{label}</Label>
                <Row>
                    <div className="RangeControl_Input">
                        <TextInput id={id} value={value} onChange={this.handleChange} />
                        {unit && <span className="RangeControl_Unit">{unit}</span>}
                    </div>
                    <input
                        type="range"
                        value={value}
                        onChange={this.handleChange}
                        {...pick(this.props, ['min', 'max', 'step'])}
                    />
                </Row>
                <span />
                <div className="control-help">{help}</div>
            </Control>
        )
    }
}
