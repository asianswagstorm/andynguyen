import React from 'react';
import { cleanup,render } from '@testing-library/react';
import Navbar from '../Navbar';

afterEach(cleanup);

describe("Navbar should render", () => {
    it('should render properly', () => {
        const wrapper = render(<Navbar />);
        expect(wrapper).toMatchSnapshot();
    })

    it('should contain 1 list item', () => {
        const {getByTestId} = render(<Navbar />);
        expect(getByTestId('nav__li__tag').children.length).toBe(1);
    })
})