import { useContext } from "react";
import { configCtx, context } from "../config/config";

function useConfig(): configCtx {
  const config = useContext(context);
  if (!config) {
    throw new Error("Config not found in context");
  }
  return config;
}

export default useConfig;
