import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { traverseResources } from "./TraverseResources";

/** An interface that defines the inputs of the activity. */
export interface GetDatastoresInputs {
    /**
     * @description The 1Integrate API Service.
     * @required
     */
    service: ApiService;
}

/** An interface that defines the outputs of the activity. */
export interface GetDatastoresOutputs {
    /**
     * @description The action audit log entries.
     */
    result: any;
}

/**
 * @category 1Spatial - 1Integrate
 * @description Returns a list of datastore resources in the Datastores folder.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class GetDatastores implements IActivityHandler {
    async execute(inputs: GetDatastoresInputs): Promise<GetDatastoresOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }

        const response = await traverseResources(inputs.service, "datastores");

        return {
            result: response,
        };
    }
}
