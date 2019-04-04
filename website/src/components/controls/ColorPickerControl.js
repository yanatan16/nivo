/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import PropertyHelp from './PropertyHelp'

class ColorPickerControl extends Component {
    handleChange = e => {
        this.props.onChange(e.target.value)
    }

    render() {
        const { id, property, value } = this.props

        return (
            <Control description={property.description}>
                <PropertyHeader id={id} {...property} />
                <div>
                    <input type="color" id={id} onChange={this.handleChange} value={value} />
                    &nbsp;&nbsp;&nbsp;
                    <code className="code code-string">{value}</code>
                </div>
                <PropertyHelp>{property.help}</PropertyHelp>
            </Control>
        )
    }
}

ColorPickerControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default ColorPickerControl
