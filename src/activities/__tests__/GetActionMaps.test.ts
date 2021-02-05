import { GetActionMaps, GetActionMapsInputs } from "../GetActionMaps";
import { ApiService } from "../../ApiService";
import { get } from "../../request";

jest.mock("../../request");
const mockGet = get as jest.MockedFunction<typeof get>;

describe("GetActionMaps", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new GetActionMaps();
            await expect(() =>
                activity.execute({
                    service: undefined as any,
                })
            ).rejects.toThrow("service is required");
        });

        it("calls the API using GET", async () => {
            const inputs: GetActionMapsInputs = {
                service: {} as any,
            };

            const result = { foo: "bar" };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            mockGet.mockImplementationOnce(
                (
                    service: ApiService,
                    path: string,
                    data?: Record<string, any>
                ) => {
                    expect(service).toBe(inputs.service);
                    expect(path).toBe("actionmaps");
                    return Promise.resolve(result);
                }
            );
            const activity = new GetActionMaps();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
