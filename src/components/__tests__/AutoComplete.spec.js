import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import AutoComplete from "../AutoComplete.vue";
import { countriesList } from "../../data";

describe("AutoComplete", () => {
  it("renders properly", () => {
    const wrapper = mount(AutoComplete, {
      props: { items: countriesList, getUser: vi.fn() },
    });
    const input = wrapper.get("input");
    expect(input).toBeTruthy();
  });

});
