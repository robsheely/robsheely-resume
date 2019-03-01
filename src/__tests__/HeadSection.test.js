import React from "react";
import { render, cleanup } from "react-testing-library";

import HeadSection from "../HeadSection";

const MOCK_DATA = {
  name: "Name",
  contact: "Phone | Address | Email",
  head: "Good Programmer",
  subhead: "Makes Good Programs",
  summary: "A really good programmer who makes good programs."
};

describe("HeadSection", () => {
  afterEach(cleanup);

  it("Passes smoke test", () => {
    const { container } = render(<HeadSection {...MOCK_DATA}/>);

    expect(container).toMatchSnapshot();
  });

  it("Contains expected children & content", () => {
    const { queryByTestId } = render(<HeadSection {...MOCK_DATA}/>);

    expect(queryByTestId("header-section")).not.toBeNull();
    expect(queryByTestId("header-section-name").textContent).toBe(MOCK_DATA.name);
    expect(queryByTestId("header-section-contact").textContent).toBe(MOCK_DATA.contact);
    expect(queryByTestId("header-section-head").textContent).toBe(MOCK_DATA.head);
    expect(queryByTestId("header-section-subhead").textContent).toBe(MOCK_DATA.subhead);
    expect(queryByTestId("header-section-summary").textContent).toBe(MOCK_DATA.summary);
  });
});
