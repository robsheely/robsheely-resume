import React from "react";
import { ApolloProvider } from "react-apollo";
import { render, cleanup } from "react-testing-library";
import setupClient from "apollo-client-mock";

import Resume from "../Resume";

const resultData = require("../server/data.json");
const typeDefs = require("../server/schema");

const mockResume = jest.fn().mockImplementation(() => resultData);
const mocks = {
  Query: () => ({
    resume: mockResume
  })
};

const createClient = setupClient(mocks, typeDefs);

const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

describe("Resume", () => {
  afterEach(cleanup);

  const renderComponent = (open = true) => {
    return render(
      <ApolloProvider client={createClient()}>
        <Resume />
      </ApolloProvider>
    );
  };

  it("Calls query", () => {
    renderComponent();
    expect(mockResume).toHaveBeenCalled();
  });

  it("Renders loading", () => {
    const { queryByText } = renderComponent();
    expect(queryByText("loading...")).not.toBeNull();
  });

  it("Renders elements", async () => {
    const { queryByTestId } = renderComponent();
    await sleep();
    expect(queryByTestId("resume")).not.toBeNull();
    expect(queryByTestId("resume-add-button")).not.toBeNull();
    expect(queryByTestId("section-none")).not.toBeNull();
    expect(queryByTestId("section-none-content-label")).toBeNull();
    expect(queryByTestId("section-areas-of-expertise")).not.toBeNull();
    expect(queryByTestId("section-areas-of-expertise-content-label").textContent).toBe("Areas of Expertise");
    expect(queryByTestId("section-technical-proficiency")).not.toBeNull();
    expect(queryByTestId("section-technical-proficiency-content-label").textContent).toBe("Technical Proficiency");
    expect(queryByTestId("section-professional-experience")).not.toBeNull();
    expect(queryByTestId("section-professional-experience-content-label").textContent).toBe("Professional Experience");
    expect(queryByTestId("section-education-&-training")).not.toBeNull();
    expect(queryByTestId("section-education-&-training-content-label").textContent).toBe("Education & Training");
    expect(queryByTestId("section-community-involvement")).not.toBeNull();
    expect(queryByTestId("section-community-involvement-content-label").textContent).toBe("Community Involvement");
  });
});