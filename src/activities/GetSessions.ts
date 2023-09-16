import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { traverseResources } from "./TraverseResources";

/** An interface that defines the inputs of the activity. */
export interface GetSessionsInputs {
    /**
     * @description The 1Integrate API Service.
     * @required
     */
    service: ApiService;
}

/** An interface that defines the outputs of the activity. */
export interface GetSessionsOutputs {
    /**
     * @description The action audit log entries.
     */
    result: any;
}

/**
 * @category 1Spatial - 1Integrate
 * @description Returns the activity log entries for a given locate.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class GetSessions implements IActivityHandler {
    async execute(inputs: GetSessionsInputs): Promise<GetSessionsOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }

        const response = await traverseResources(inputs.service, "sessions");

        return {
            result: response,
        };
    }
}
