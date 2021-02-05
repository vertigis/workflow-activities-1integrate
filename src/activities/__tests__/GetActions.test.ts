import { GetActions, GetActionsInputs } from "../GetActions";
import { ApiService } from "../../ApiService";
import { get } from "../../request";

jest.mock("../../request");
const mockGet = get as jest.MockedFunction<typeof get>;

describe("GetActions", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new GetActions();
            await expect(() => activity.execute({
                service: undefined as any,
               
            })).rejects.toThrow("service is required");
        });

        it("calls the API using GET", async () => {
            const inputs: GetActionsInputs = {
                service: {} as any,
               
            };

            const result = { foo: "bar" };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            mockGet.mockImplementationOnce((service: ApiService, path: string, data?: Record<string, any>) => {
                expect(service).toBe(inputs.service);
                expect(path).toBe("actions");
                return Promise.resolve(result);
            })
            const activity = new GetActions();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
