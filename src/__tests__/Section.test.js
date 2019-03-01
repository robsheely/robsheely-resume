import React from "react";
import { render, cleanup } from "react-testing-library";

import Section from "../Section";

const MOCK_DATA = {
  label: "Good Label",
  content: "Good Content"
};

describe("Section", () => {
  afterEach(cleanup);

  it("Passes smoke test", () => {
    const { container } = render(<Section name={name} label={MOCK_DATA.label}>
      <div>{MOCK_DATA.content}</div>
    </Section>);

    expect(container).toMatchSnapshot();
  });

  it("Renders label, divider and content when label is not null", () => {
    const { queryByTestId } = render(<Section label={MOCK_DATA.label}>
      <div>{MOCK_DATA.content}</div>
    </Section>);
    
const name = "good-label";

    expect(queryByTestId(`section-${name}`)).not.toBeNull();
    expect(queryByTestId(`section-${name}-content`)).not.toBeNull();
    expect(queryByTestId(`section-${name}-content-label`)).not.toBeNull();
    expect(queryByTestId(`section-${name}-content-label`).textContent).toBe(MOCK_DATA.label);
    expect(queryByTestId(`section-${name}-content-divider`)).not.toBeNull();
    expect(queryByTestId(`section-${name}-content`).children.length).toBe(3);
    expect(queryByTestId(`section-${name}-content`).children[ 2 ].textContent).toBe(MOCK_DATA.content);
  });

  it("Renders only content when label is null", () => {
    const { queryByTestId } = render(<Section>
      <div>{MOCK_DATA.content}</div>
    </Section>);

    const name = "none";
    
    expect(queryByTestId(`section-${name}`)).not.toBeNull();
    expect(queryByTestId(`section-${name}-content`)).not.toBeNull();
    expect(queryByTestId(`section-${name}-content-label`)).toBeNull();
    expect(queryByTestId(`section-${name}-content-divider`)).toBeNull();
    expect(queryByTestId(`section-${name}-content`).children.length).toBe(1);
    expect(queryByTestId(`section-${name}-content`).children[ 0 ].textContent).toBe(MOCK_DATA.content);
  });
});