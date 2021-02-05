import { ManageResource, ManageResourceInputs } from "../ManageResource";
import { ApiService } from "../../ApiService";
import { put } from "../../request";

jest.mock("../../request");
const mockPut = put as jest.MockedFunction<typeof put>;

describe("ManageResource", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new ManageResource();
            await expect(() => activity.execute({
                service: undefined as any,
                folder: "actions",
                path: "xyz/prsqr",
                isFolder: false,


            })).rejects.toThrow("service is required");
        });
        it("requires folder input", async () => {
            const activity = new ManageResource();
            await expect(() => activity.execute({
                service: {} as any,
                folder: undefined as any,
                path: "xyz/prsqr",
                isFolder: false,

            })).rejects.toThrow("folder is required");
        });
        it("requires path input", async () => {
            const activity = new ManageResource();
            await expect(() => activity.execute({
                service: {} as any,
                folder: "actions",
                path: undefined as any,
                isFolder: false,

            })).rejects.toThrow("path is required");
        });


        it("calls the API using PUT", async () => {
            const inputs: ManageResourceInputs = {
                service: {} as any,
                folder: "actions",
                path: "xyz/prsqr",
                isFolder: false,

            };

            const result = { foo: "bar" };
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            mockPut.mockImplementationOnce((service: ApiService, path: string,  params?: Record<string, any>, data?: Record<string, any>) => {
                expect(service).toBe(inputs.service);
                expect(path).toBe(`${inputs.folder}/${inputs.path}`);
            
                return Promise.resolve(result);
            })
            const activity = new ManageResource();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
