import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { traverseResources } from "./TraverseResources";

/** An interface that defines the inputs of the activity. */
export interface GetRulesInputs {
    /**
     * @description The 1Integrate API Service.
     * @required
     */
    service: ApiService;
}

/** An interface that defines the outputs of the activity. */
export interface GetRulesOutputs {
    /**
     * @description The action audit log entries.
     */
    result: any;
}

/**
 * @category 1Spatial - 1Integrate
 * @description Returns the activity log entries for a given locate.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class GetRules implements IActivityHandler {
    async execute(inputs: GetRulesInputs): Promise<GetRulesOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }

        const response = await traverseResources(inputs.service, "rules");

        return {
            result: response,
        };
    }
}
