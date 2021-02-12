import { GetDatastores, GetDatastoresInputs } from "../GetDatastores";
import { ApiService } from "../../ApiService";
import { get } from "../../request";

jest.mock("../../request");
const mockGet = get as jest.MockedFunction<typeof get>;

describe("GetDatastores", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new GetDatastores();
            await expect(() =>
                activity.execute({
                    service: undefined as any,
                })
            ).rejects.toThrow("service is required");
        });

        it("calls the API using GET", async () => {
            const inputs: GetDatastoresInputs = {
                service: {} as any,
            };

            const result = {
                type: "folder",
                name: "datastores",
                contents: [
                    {
                        type: "folder",
                        name: "foo",
                        contents: [{ name: "foo", type: "bar" }],
                    },
                ],
            };
            mockGet.mockImplementationOnce(
                (service: ApiService, path: string) => {
                    expect(service).toBe(inputs.service);
                    expect(path).toBe("datastores");
                    return Promise.resolve(result);
                }
            );
            const activity = new GetDatastores();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
