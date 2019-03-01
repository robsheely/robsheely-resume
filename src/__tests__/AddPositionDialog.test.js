import React from "react";
import { ApolloProvider } from "react-apollo";
import { render, cleanup, fireEvent } from "react-testing-library";
import setupClient from "apollo-client-mock";

import AddPositionDialog from "../AddPositionDialog";

const typeDefs = require("../server/schema");

const addPosition = jest.fn();

const defaultMocks = {
  Query: () => ({
    resume: () => []
  }),
  Mutation: () => ({
    addPosition
  })
};

const createClient = setupClient(defaultMocks, typeDefs);

const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

describe("AddPositionDialog", () => {
  const INPUT_DATA = {
    role: "Good Role",
    start: 2002,
    end: 2012,
    company: "Good Company",
    achievements: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3"
    ]
  };

  const closeDialog = jest.fn();

  const renderComponent = (open = true) => {
    return render(
      <ApolloProvider client={createClient()}>
        <AddPositionDialog open={open} closeDialog={closeDialog}/>
      </ApolloProvider>
    );
  };

  afterEach(() => {
    cleanup();
    addPosition.mockReset();
    closeDialog.mockReset();
  });

  it("Passes smoke tests", () => {
    // Closed
    let dialog = renderComponent(false);
    expect(dialog.container).toMatchSnapshot();
    // Open    
    dialog = renderComponent();
    expect(dialog.container).toMatchSnapshot();
  });

  it("Strips non-numerical chars from date field", async () => {
    const { getByLabelText } = renderComponent();
    fireEvent.change(getByLabelText("Start Year"), { target: { value: "12WW34" } });
    await sleep();
    expect(getByLabelText("Start Year").value).toBe("1234");
  });

  it("Calls mutation with correct values to submit", async () => {
    const { getByTestId, getByLabelText } = renderComponent();
    const addButton = getByTestId("add-position-dialog-add-button");
    fireEvent.change(getByLabelText("Role"), { target: { value: INPUT_DATA.role } });
    fireEvent.change(getByLabelText("Start Year"), { target: { value: INPUT_DATA.start } });
    fireEvent.change(getByLabelText("End Year"), { target: { value: INPUT_DATA.end } });
    fireEvent.change(getByLabelText("Company"), { target: { value: INPUT_DATA.company } });
    fireEvent.change(getByLabelText("Add Achievement"), { target: { value: INPUT_DATA.achievements[ 0 ] } });
    fireEvent.click(addButton);
    fireEvent.change(getByLabelText("Add Achievement"), { target: { value: INPUT_DATA.achievements[ 1 ] } });
    fireEvent.click(addButton);
    fireEvent.change(getByLabelText("Add Achievement"), { target: { value: INPUT_DATA.achievements[ 2 ] } });
    fireEvent.click(addButton);
    await sleep();
    fireEvent.click(getByTestId("add-position-dialog-submit-button"));
    await sleep();
    expect(addPosition.mock.calls[ 0 ][ 1 ]).toEqual({ input: INPUT_DATA });
    expect(closeDialog).toHaveBeenCalled();
  });

  it("Does not call mutation on cancel", async () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("add-position-dialog-cancel-button"));
    expect(addPosition).not.toHaveBeenCalled();
    expect(closeDialog).toHaveBeenCalled();
  });
});
