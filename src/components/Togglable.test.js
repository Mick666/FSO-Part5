import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv" />
            </Togglable>
        )
    })

    xtest('renders its children', () => {
        expect(
            component.container.querySelector('.testDiv')
        ).toBeDefined()
    })

    xtest('at start the children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    xtest('after clicking the button, children are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    xtest('toggled content can be closed', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)

        const closeButton = component.container.querySelector(
            'button:nth-child(2)'
        )
        fireEvent.click(closeButton)

        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

})