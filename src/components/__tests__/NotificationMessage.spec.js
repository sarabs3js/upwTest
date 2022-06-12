import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import NotificationMessage from "../NotificationMessage.vue";

describe("NotificationMessage", () => {
  it("renders properly", async () => {
    const wrapper = mount(NotificationMessage, {
      props: {
        message: "My Message",
        type: "error",
      },
    });
    expect(wrapper.text()).toContain("My Message");
  });
});
