import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import CountryField from "../CountryField.vue";
import { countriesList } from "../../data";

describe("CountryField", () => {
  it("renders properly", () => {
    const wrapper = mount(CountryField, {
      props: { items: countriesList, getUser: vi.fn() },
    });
    const input = wrapper.get("input");
    expect(input).toBeTruthy();
  });

});
