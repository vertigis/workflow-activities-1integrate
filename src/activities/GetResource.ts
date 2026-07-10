import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetResourceInputs {
    /**
     * @description The 1Integrate API Service.
     * @required
     */
    service: ApiService;

    /**
     * @description The resource folder.
     * @required
     */
    folder: "actions" | "actionmaps" | "datastores" | "rules" | "sessions";

    /**
     * @description The folder structure for the resource.
     * @required
     */
    path: string;

    parameters?: Record<string, string | number | boolean | null | undefined>;

    expect?: "json" | "blob";
}

/** An interface that defines the outputs of the activity. */
export interface GetResourceOutputs {
    /**
     * @description The action audit log entries.
     */
    result: any;
}

/**
 * @category 1Spatial - 1Integrate
 * @description Returns a 1Integrate resource given its folder and the path under.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class GetResource implements IActivityHandler {
    async execute(inputs: GetResourceInputs): Promise<GetResourceOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (!inputs.folder) {
            throw new Error("folder is required");
        }
        if (!inputs.path) {
            throw new Error("path is required");
        }
        const expect = inputs.expect ? inputs.expect : "json";
        const queryString: Record<string, any> = {};
        if (inputs.parameters != undefined) {
            Object.assign(queryString, inputs.parameters);
        }
        const response = await get(
            inputs.service,
            `${inputs.folder}/${inputs.path}`,
            queryString,
            expect
        );

        return {
            result: response,
        };
    }
}
