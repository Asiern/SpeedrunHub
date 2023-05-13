import { renderHook, act } from "@testing-library/react-hooks";
import { useConfig } from "../../app/hooks";
import { defaultConfig } from "../../app/config/config";
import { context } from "../../app/config/config";

describe("useConfig hook", () => {
  it("should throw an error if config is not found in context", () => {
    const wrapper = ({ children }) => (
      <context.Provider value={null}>{children}</context.Provider>
    );
    const { result } = renderHook(() => useConfig(), { wrapper });
    expect(result.error).toEqual(new Error("Config not found in context"));
  });
  it("should return the config from context", () => {
    const wrapper = ({ children }) => (
      <context.Provider value={{ config: defaultConfig, setConfig: jest.fn() }}>
        {children}
      </context.Provider>
    );
    const { result } = renderHook(() => useConfig(), { wrapper });
    expect(result.current.config).toEqual(defaultConfig);
  });
});
