import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { ApiService } from "../ApiService";
import { traverseResources } from "./TraverseResources";

/** An interface that defines the inputs of the activity. */
export interface GetActionsInputs {
    /**
     * @description The 1Integrate API Service.
     * @required
     */
    service: ApiService;
}

/** An interface that defines the outputs of the activity. */
export interface GetActionsOutputs {
    /**
     * @description The action audit log entries.
     */
    result: any;
}

/**
 * @category 1Spatial - 1Integrate
 * @description Returns a list of action resources in the Actions folder.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class GetActions implements IActivityHandler {
    async execute(inputs: GetActionsInputs): Promise<GetActionsOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }

        const response = await traverseResources(inputs.service, "actions");

        return {
            result: response,
        };
    }
}
