import { RemoveResource, RemoveResourceInputs } from "../RemoveResource";
import { ApiService } from "../../ApiService";
import { remove } from "../../request";

jest.mock("../../request");
const mockRemove = remove as jest.MockedFunction<typeof remove>;

describe("RemoveResource", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new RemoveResource();
            await expect(() =>
                activity.execute({
                    service: undefined as any,
                    folder: "actions",
                    path: "xyz/prsqr",
                })
            ).rejects.toThrow("service is required");
        });
        it("requires folder input", async () => {
            const activity = new RemoveResource();
            await expect(() =>
                activity.execute({
                    service: {} as any,
                    folder: undefined as any,
                    path: "xyz/prsqr",
                })
            ).rejects.toThrow("folder is required");
        });
        it("requires path input", async () => {
            const activity = new RemoveResource();
            await expect(() =>
                activity.execute({
                    service: {} as any,
                    folder: "actions",
                    path: undefined as any,
                })
            ).rejects.toThrow("path is required");
        });

        it("calls the API using DELETE", async () => {
            const inputs: RemoveResourceInputs = {
                service: {} as any,
                folder: "actions",
                path: "xyz/prsqr",
            };

            const result = { foo: "bar" };

            mockRemove.mockImplementationOnce(
                (service: ApiService, path: string) => {
                    expect(service).toBe(inputs.service);
                    expect(path).toBe(`${inputs.folder}/${inputs.path}`);

                    return Promise.resolve(result);
                }
            );
            const activity = new RemoveResource();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
