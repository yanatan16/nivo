/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { ResponsiveBar, BarDefaultProps } from '@nivo/bar'
import SEO from '../../components/seo'
import { useTheme } from '../../theming/context'
import ComponentPage from '../../components/components/ComponentPage'
import ComponentHeader from '../../components/components/ComponentHeader'
import ComponentDescription from '../../components/components/ComponentDescription'
import ComponentTabs from '../../components/components/ComponentTabs'
import ActionsLogger, { useActionsLogger } from '../../components/components/ActionsLogger'
import ComponentSettings from '../../components/components/ComponentSettings'
import Stories from '../../components/components/Stories'
import generateCode from '../../lib/generateChartCode'
import meta from '../../data/components/bar/meta.yml'
import { generateLightDataSet } from '../../data/components/bar/generator'
import mapper from '../../data/components/bar/mapper'
import { groupsByScope } from '../../data/components/bar/props'

const Tooltip = () => {
    /* return custom tooltip */
}

const initialSettings = {
    indexBy: 'country',

    margin: {
        top: 50,
        right: 130,
        bottom: 50,
        left: 60,
    },

    padding: 0.3,
    innerPadding: 0,
    minValue: 'auto',
    maxValue: 'auto',

    groupMode: 'stacked',
    layout: 'vertical',
    reverse: false,

    colors: 'nivo',
    colorBy: 'id',
    defs: [
        patternDotsDef('dots', {
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
        }),
        patternLinesDef('lines', {
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
        }),
    ],
    fill: [{ match: { id: 'fries' }, id: 'dots' }, { match: { id: 'sandwich' }, id: 'lines' }],
    borderRadius: 0,
    borderWidth: 0,
    borderColor: {
        type: 'inherit:darker',
        gamma: 1.6,
    },

    axisTop: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    enableGridX: false,
    enableGridY: true,

    enableLabel: true,
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor: {
        type: 'inherit:darker',
        gamma: 1.6,
    },

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],
}

const Bar = () => {
    const theme = useTheme()
    const [settings, setSettings] = useState(initialSettings)
    const [data, setData] = useState(generateLightDataSet())
    const diceRoll = useCallback(() => setData(generateLightDataSet()), [setData])
    const [actions, logAction] = useActionsLogger()
    const onClick = useCallback(
        node => {
            logAction({
                type: 'click',
                label: `[bar] ${node.id} - ${node.indexValue}: ${node.value}`,
                data: node,
            })
        },
        [logAction]
    )

    const mappedSettings = mapper(settings)

    const code = generateCode(
        'ResponsiveBar',
        {
            keys: data.keys,
            ...mappedSettings,
            tooltip: mappedSettings.tooltip ? Tooltip : undefined,
        },
        { pkg: '@nivo/bar', defaults: BarDefaultProps }
    )

    return (
        <ComponentPage>
            <SEO title="Bar" keywords={meta.Bar.tags} />
            <ComponentHeader chartClass="Bar" tags={meta.Bar.tags} />
            <ComponentDescription description={meta.Bar.description} />
            <ComponentTabs chartClass="bar" code={code} data={data.data} diceRoll={diceRoll}>
                <ResponsiveBar
                    data={data.data}
                    keys={data.keys}
                    {...mappedSettings}
                    theme={theme.nivo}
                    onClick={onClick}
                />
            </ComponentTabs>
            <ActionsLogger actions={actions} />
            <ComponentSettings
                component="Bar"
                settings={settings}
                onChange={setSettings}
                groups={groupsByScope.Bar}
            />
            <Stories stories={meta.Bar.stories} />
        </ComponentPage>
    )
}

export default Bar
