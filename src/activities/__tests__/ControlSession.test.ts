import { ControlSession, ControlSessionInputs } from "../ControlSession";
import { ApiService } from "../../ApiService";
import { post } from "../../request";

jest.mock("../../request");
const mockPost = post as jest.MockedFunction<typeof post>;

describe("ControlSession", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new ControlSession();
            await expect(() =>
                activity.execute({
                    service: undefined as any,
                    path: "xyz/prsqr",
                    action: "play",
                })
            ).rejects.toThrow("service is required");
        });
        it("requires path input", async () => {
            const activity = new ControlSession();
            await expect(() =>
                activity.execute({
                    service: {} as any,
                    path: undefined as any,
                    action: "play",
                })
            ).rejects.toThrow("path is required");
        });
        it("requires action input", async () => {
            const activity = new ControlSession();
            await expect(() =>
                activity.execute({
                    service: {} as any,
                    path: "xyz/prsqr",
                    action: undefined as any,
                })
            ).rejects.toThrow("action is required");
        });

        it("calls the API using POST", async () => {
            const inputs: ControlSessionInputs = {
                service: {} as any,
                path: "xyz/prsqr",
                action: "play",
            };

            const result = { foo: "bar" };

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            mockPost.mockImplementationOnce(
                (
                    service: ApiService,
                    path: string,
                    params?: Record<string, any>,
                    data?: Record<string, any>
                ) => {
                    expect(service).toBe(inputs.service);
                    expect(path).toBe(`sessions/${inputs.path}`);
                    expect(JSON.stringify(params)).toBe(
                        JSON.stringify({ action: inputs.action })
                    );

                    return Promise.resolve(result);
                }
            );
            const activity = new ControlSession();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
