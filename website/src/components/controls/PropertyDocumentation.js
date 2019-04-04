/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import PropertyHelp from './PropertyHelp'

const PropertyDocumentation = ({ property }) => {
    return (
        <Control description={property.description}>
            <PropertyHeader {...property} />
            <PropertyHelp>{property.help}</PropertyHelp>
        </Control>
    )
}

export default PropertyDocumentation
