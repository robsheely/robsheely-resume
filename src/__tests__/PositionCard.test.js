import React from "react";
import { render, cleanup } from "react-testing-library";

import PositionCard from "../PositionCard";

const MOCK_DATA = {
  position: {
    role: "Role",
    start: 2002, 
    end: 2012, 
    company: "Good Company", 
    achievements: [
      {
        id: "1",
        content: "Achievement 1"
      },
      {
        id: "2",
        content: "Achievement 2"
      },
      {
        id: "3",
        content: "Achievement 3"
      }
    ]
  }
};

describe("PositionCard", () => {
  afterEach(cleanup);

  it("Passes smoke test", () => {
    const { container } = render(<PositionCard position={MOCK_DATA.position}/>);

    expect(container).toMatchSnapshot();
  });

  it("Contains expected children & content", () => {
    const { queryByTestId } = render(<PositionCard position={MOCK_DATA.position}/>);

    expect(queryByTestId("position-good-company")).not.toBeNull();
    expect(queryByTestId("position-good-company-title").textContent).toBe("ROLE2002 - 2012");
    expect(queryByTestId("position-good-company-company").textContent).toBe("Good Company");
    expect(queryByTestId("position-good-company-achievements")).not.toBeNull();
    expect(queryByTestId("position-good-company-achievements").children.length).toBe(3);
    expect(queryByTestId("position-good-company-achievement-2").textContent).toBe("•Achievement 2");
  });
});