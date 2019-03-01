import React from "react";
import { render, cleanup } from "react-testing-library";

import ExpertiseSection from "../ExpertiseSection";

const MOCK_DATA = {
  items: [
    {
      id: "1",
      content: "Expertise 1"
    },
    {
      id: "2",
      content: "Expertise 2"
    },
    {
      id: "3",
      content: "Expertise 3"
    },
    {
      id: "4",
      content: "Expertise 4"
    }
  ]
};

describe("ExpertiseSection", () => {
  afterEach(cleanup);

  it("Passes smoke test", () => {
    const { container } = render(<ExpertiseSection content={MOCK_DATA.items}/>);

    expect(container).toMatchSnapshot();
  });

  it("Contains expected children & content", () => {
    const { queryByTestId } = render(<ExpertiseSection content={MOCK_DATA.items}/>);

    expect(queryByTestId("expertiseList")).not.toBeNull();
    expect(queryByTestId("expertiseList").children.length).toBe(4);
    expect(queryByTestId(`expertiseList-item-1`).textContent).toBe("•   Expertise 1");
  });
});