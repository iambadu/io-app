import React from "react";
import { createStore } from "redux";
import { within } from "@testing-library/react-native";
import { UIAttachment } from "../../../../store/reducers/entities/messages/types";
import { MessageF24 } from "../MessageF24";
import I18n from "../../../../i18n";
import {
  mockOtherAttachment,
  mockPdfAttachment
} from "../../../../__mocks__/attachment";
import { appReducer } from "../../../../store/reducers";
import { applicationChangeState } from "../../../../store/actions/application";
import { renderScreenFakeNavRedux } from "../../../../utils/testWrapper";

describe("MessageF24 component", () => {
  it("should render the 'Show all' button if there are more than one attachment", () => {
    const component = renderComponent([mockPdfAttachment, mockOtherAttachment]);
    expect(
      component.queryByText(I18n.t("features.pn.details.f24Section.showAll"))
    ).toBeTruthy();
  });

  it("should render only one attachment if there is only one", () => {
    const { getByTestId } = renderComponent([mockPdfAttachment]);
    const f24Container = getByTestId("f24-list-container");
    const attachments =
      within(f24Container).queryAllByTestId("message-attachment");
    expect(attachments.length).toBe(1);
  });
});

const renderComponent = (attachments: ReadonlyArray<UIAttachment>) => {
  const globalState = appReducer(undefined, applicationChangeState("active"));
  const store = createStore(appReducer, globalState as any);

  return renderScreenFakeNavRedux(
    () => <MessageF24 attachments={attachments} />,
    "DUMMY",
    {},
    store
  );
};
