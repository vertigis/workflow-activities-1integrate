import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";
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
 */
export class GetActions implements IActivityHandler {
    /** Perform the execution logic of the activity. */
    async execute(inputs: GetActionsInputs): Promise<GetActionsOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }

        const response = await get(inputs.service, "actions");

        return {
            result: response,
        };
    }
}
