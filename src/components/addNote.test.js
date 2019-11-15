import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddNote from '../components/addNote'

describe('AddNote component', () => {
  it.skip ('renders a .addNote by default', () => {
    const wrapper = shallow(<AddNote />)
    expect(toJson(wrapper)).toMatchSnapShot()
  })
})
