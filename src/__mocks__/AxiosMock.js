import axiosMock from "axios";

jest.mock("axios");

axiosMock.create = () => axiosMock;

export { axiosMock };
