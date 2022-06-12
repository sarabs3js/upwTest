import { describe, it, expect } from "vitest";
import registerUser from "../registerUser";

describe("Register User API", () => {
    it ("Should Make API call and return data", () => {
        expect(registerUser({})).toBeTruthy();
    })
});
