import React from "react";
import { render, cleanup } from "react-testing-library";

import SectionList from "../SectionList";

const MOCK_DATA = {
  name: "sectionList",
  items: [
    {
      id: "1",
      content: "Item Number 1"
    },
    {
      id: "2",
      content: "Item Number 2"
    },
    {
      id: "3",
      content: "Item Number 3"
    },
    {
      id: "4",
      content: "Item Number 4"
    }
  ]
};

describe("SectionList", () => {
  afterEach(cleanup);

  it("Passes smoke test", () => {
    const { container } = render(<SectionList name={MOCK_DATA.name} items={MOCK_DATA.items}/>);

    expect(container).toMatchSnapshot();
  });

  it("Contains expected children & content", () => {
    const { queryByTestId } = render(<SectionList name={MOCK_DATA.name} items={MOCK_DATA.items}/>);

    expect(queryByTestId(`sectionList-${MOCK_DATA.name}`)).not.toBeNull();
    expect(queryByTestId(`sectionList-${MOCK_DATA.name}`).children.length).toBe(4);
    expect(queryByTestId(`sectionList-${MOCK_DATA.name}-item-1`).textContent).toBe("•Item Number 1");
  });
});