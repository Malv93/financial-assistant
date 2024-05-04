import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BE_URL: string;
      MOCK_DATA: boolean;
      // add more environment variables and their types here
    }
  }
}