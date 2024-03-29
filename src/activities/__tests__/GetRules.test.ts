import { GetRules, GetRulesInputs } from "../GetRules";
import { ApiService } from "../../ApiService";
import { get } from "../../request";

jest.mock("../../request");
const mockGet = get as jest.MockedFunction<typeof get>;

describe("GetRules", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new GetRules();
            await expect(() =>
                activity.execute({
                    service: undefined as any,
                })
            ).rejects.toThrow("service is required");
        });

        it("calls the API using GET", async () => {
            const inputs: GetRulesInputs = {
                service: {} as any,
            };

            const result = {
                type: "folder",
                name: "rules",
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
                    expect(path).toBe("rules");
                    return Promise.resolve(result);
                }
            );
            const activity = new GetRules();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
