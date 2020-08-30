import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog render tests', () => {
    let component

    beforeEach(() => {
        const blog = {
            likes: '180',
            title: 'A functional blog title',
            author: 'A blog author',
            url: 'url.com.au',
            user: {
                username: 'root'
            }
        }

        component = render(
            <Blog blog={blog} />
        )


        // const li = component.container.children

        // console.log(li)

        // console.log(prettyDOM(li))

    })

    test('renders content', () => {

        expect(component.container).toHaveTextContent(
            'A functional blog title'
        )
    })


    test('At the start, the url/likes aren\'t displayed', () => {
        const div = component.container.querySelector('.revealedBlog')

        expect(div).toHaveStyle('display: none')
    })

    test('After clicking the button, the url/likes are displayed', () => {
        const div = component.container.querySelector('.revealedBlog')
        const button = component.getByText('View')
        fireEvent.click(button)

        expect(div).not.toHaveStyle('display: none')
    })

})

test('Tests the like button', () => {
    const likeButton = jest.fn()
    const blog = {
        likes: '180',
        title: 'A functional blog title',
        author: 'A blog author',
        url: 'url.com.au',
        user: {
            username: 'root'
        }
    }

    let component = render(
        <Blog blog={blog} increaseLikes={likeButton} />
    )

    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(likeButton.mock.calls).toHaveLength(2)
})

