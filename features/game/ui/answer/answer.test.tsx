import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Answer } from "./answer";

describe("Answer component", () => {
  it("renders text and prefix", () => {
    render(
      <Answer answer="Test Answer" prefix="A" index={0} onSelect={() => {}} />,
    );
    expect(screen.getByText("Test Answer")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(<Answer answer="Clickable" index={0} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Clickable"));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
