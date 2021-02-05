import { GetResource, GetResourceInputs } from "../GetResource";
import { ApiService } from "../../ApiService";
import { get } from "../../request";

jest.mock("../../request");
const mockGet = get as jest.MockedFunction<typeof get>;

describe("GetResource", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new GetResource();
            await expect(() =>
                activity.execute({
                    service: undefined as any,
                    folder: "actions",
                    path: "xyz/prsqr",
                })
            ).rejects.toThrow("service is required");
        });
        it("requires folder input", async () => {
            const activity = new GetResource();
            await expect(() =>
                activity.execute({
                    service: {} as any,
                    folder: undefined as any,
                    path: "xyz/prsqr",
                })
            ).rejects.toThrow("folder is required");
        });
        it("requires path input", async () => {
            const activity = new GetResource();
            await expect(() =>
                activity.execute({
                    service: {} as any,
                    folder: "actions",
                    path: undefined as any,
                })
            ).rejects.toThrow("path is required");
        });
        it("calls the API using GET", async () => {
            const inputs: GetResourceInputs = {
                service: {} as any,
                folder: "actions",
                path: "xyz/prsqr",
            };

            const result = { foo: "bar" };

            mockGet.mockImplementationOnce(
                (service: ApiService, path: string) => {
                    expect(service).toBe(inputs.service);
                    expect(path).toBe(`${inputs.folder}/${inputs.path}`);
                    return Promise.resolve(result);
                }
            );
            const activity = new GetResource();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
