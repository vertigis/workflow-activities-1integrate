import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";
/** An interface that defines the inputs of the activity. */
export interface GetActionMapsInputs {
    /**
     * @description The 1Integrate API Service.
     * @required
     */
    service: ApiService;    

}

/** An interface that defines the outputs of the activity. */
export interface GetActionMapsOutputs {
    /**
     * @description The action audit log entries.
     */
    result: any;
}

/**
 * @category 1Spatial - 1Integrate
 * @description Returns a list of action map resources in the Action Maps folder.
 */
export class GetActionMaps implements IActivityHandler {
    /** Perform the execution logic of the activity. */
    async execute(inputs: GetActionMapsInputs): Promise<GetActionMapsOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        

        const response = await get(inputs.service, "actionmaps");

        return {
            result: response,
        };
    }
}

