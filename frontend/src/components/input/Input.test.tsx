import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textbox } from "./Input";

describe("App", () => {
  it("test to be in document", () => {
    render(
      <Textbox
        value={"test"}
        placeholder={"test"}
        onChange={() => null}
        onEnter={() => null}
      />
    );
    expect(screen.getByPlaceholderText("test"));
  });
});
