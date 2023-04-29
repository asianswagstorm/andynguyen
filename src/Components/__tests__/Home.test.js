import { cleanup } from "@testing-library/react";
import { shallow } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import Card from "../Card.js";
import { tiles } from "../constants/Tiles";
import Home from "../Home.js";
import ListOfProjects from "../ListOfProjects.js";

afterEach(cleanup);

describe("HomeRenders", () => {
  describe("render", () => {
    it("home renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<Home />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    // it('should render properly', () => {
    //   const wrapper =  render(<Home/>);
    //   expect(wrapper).toMatchSnapshot();
    // })
  });
  describe("match number of projects", () => {
    it("should match the number of projects", () => {
      const numberOfProjects = tiles.length;
      const wrapper = shallow(<ListOfProjects filterOption="" />);
      const actualNumberOfProjects = wrapper.find(Card).length;
      expect(actualNumberOfProjects).toEqual(numberOfProjects);
    });
  });
});
