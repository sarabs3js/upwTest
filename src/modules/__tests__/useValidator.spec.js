import { expect } from "chai";
import { describe, it } from "vitest";
import { countriesList } from "../../data";
import useValidators from "../useValidators";

describe("Use Validator function", () => {
  it("Should validate Tax field", () => {
    const { taxInput } = useValidators();
    expect(taxInput("Tax", "DSDEE1232L", "India")).toBe("");
    expect(taxInput("Tax", "12345ABD23DD", "Canada")).toBe("");
    expect(taxInput("Tax", "3333DDD23232", "USA")).toBe("");
    expect(taxInput("Tax", "3333DDD232322")).toBe("Tax number is not valid.");
    expect(taxInput("Tax", "3333DDD232322", "USA")).toBe(
      "Tax number is not valid."
    );
    expect(taxInput("Tax", "3333DDD2323222", "USA")).toBe("");
    expect(taxInput("Tax", "DSDEE1232L", "Indi")).toBe(
      "Tax number is not valid."
    );
  });
  it("Should validate empty field", () => {
    const { isEmpty } = useValidators();
    // Negative Scenario
    expect(isEmpty("Tax", "")).toBe("The Tax field is required");
    expect(isEmpty("Username", "")).toBe("The Username field is required");
    expect(isEmpty("Country", "")).toBe("The Country field is required");

    // Positive Scenario
    expect(isEmpty("Tax", "Tax")).toBe("");
    expect(isEmpty("Username", "name")).toBe("");
    expect(isEmpty("Country", "USA")).toBe("");
  });

  it("Should validate valid country selected", () => {
    const { validCountry } = useValidators();
    // Negative Scenario
    expect(validCountry("Country", "US", countriesList)).toBe(
      "Please select a valid country."
    );
    expect(validCountry("Country", "U", countriesList)).toBe(
      "Please select a valid country."
    );
    expect(validCountry("Country", "Can", countriesList)).toBe(
      "Please select a valid country."
    );

    // Positive Scenario
    expect(validCountry("Country", "Canada", countriesList)).toBe("");
    expect(validCountry("Country", "India", countriesList)).toBe("");
    expect(validCountry("Country", "USA", countriesList)).toBe("");
  });

  it("Should validate minimum length", () => {
    const { minLength } = useValidators();
    // Negative Scenario
    expect(minLength("Country", "US", 3)).toBe(
      "The Country field must be atleast 3 characters long"
    );
    expect(minLength("Country", "U", 4)).toBe(
      "The Country field must be atleast 4 characters long"
    );
    expect(minLength("Country", "Can", 5)).toBe(
      "The Country field must be atleast 5 characters long"
    );

    // Positive Scenario
    expect(minLength("Country", "USA", 3)).toBe("");
    expect(minLength("Country", "Canada", 4)).toBe("");
    expect(minLength("Country", "India", 5)).toBe("");
  });
});
