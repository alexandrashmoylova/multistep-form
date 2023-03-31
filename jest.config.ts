import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/identity-obj-proxy"
  },
  testEnvironment: "jsdom",
}

export default config;