import { QuerySession, QuerySessionInputs } from "../QuerySession";
import { ApiService } from "../../ApiService";
import { get } from "../../request";

jest.mock("../../request");
const mockGet = get as jest.MockedFunction<typeof get>;

describe("QuerySession", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new QuerySession();
            await expect(() =>
                activity.execute({
                    service: undefined as any,
                    path: "xyz/prsqr",
                })
            ).rejects.toThrow("service is required");
        });
        it("requires path input", async () => {
            const activity = new QuerySession();
            await expect(() =>
                activity.execute({
                    service: {} as any,
                    path: undefined as any,
                })
            ).rejects.toThrow("path is required");
        });

        it("calls the API using POST", async () => {
            const inputs: QuerySessionInputs = {
                service: {} as any,
                path: "xyz/prsqr",
                detail: "amalgamatedResults",
            };

            const result = { foo: "bar" };

            mockGet.mockImplementationOnce(
                (
                    service: ApiService,
                    path: string,
                    params?: Record<string, any>
                ) => {
                    expect(service).toBe(inputs.service);
                    expect(path).toBe(`results/${inputs.path}`);
                    expect(JSON.stringify(params)).toBe(
                        JSON.stringify({ detail: inputs.detail })
                    );

                    return Promise.resolve(result);
                }
            );
            const activity = new QuerySession();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
