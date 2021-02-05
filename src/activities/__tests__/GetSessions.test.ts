import { GetSessions, GetSessionsInputs } from "../GetSessions";
import { ApiService } from "../../ApiService";
import { get } from "../../request";

jest.mock("../../request");
const mockGet = get as jest.MockedFunction<typeof get>;

describe("GetSessions", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new GetSessions();
            await expect(() =>
                activity.execute({
                    service: undefined as any,
                })
            ).rejects.toThrow("service is required");
        });

        it("calls the API using GET", async () => {
            const inputs: GetSessionsInputs = {
                service: {} as any,
            };

            const result = { foo: "bar" };

            mockGet.mockImplementationOnce(
                (service: ApiService, path: string) => {
                    expect(service).toBe(inputs.service);
                    expect(path).toBe("sessions");
                    return Promise.resolve(result);
                }
            );
            const activity = new GetSessions();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
