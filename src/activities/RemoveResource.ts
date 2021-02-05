import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { remove } from "../request";
/** An interface that defines the inputs of the activity. */
export interface RemoveResourceInputs {
    /**
     * @description The 1Integrate API Service.
     * @required
     */
    service: ApiService;

    /**
     * @description The folder of resource.
     * @required
     */
    folder: "actions" |
            "actionmaps" |
            "datastores" |
            "rules" |
            "sessions";

    /**
    * @description The path to a resource is the folder structure from 1Integrate for the particular
resource folder.
    * @required
    */
    path: string;

}

/** An interface that defines the outputs of the activity. */
export interface RemoveResourceOutputs {
    /**
     * @description The action audit log entries.
     */
    result: any;
}

/**
 * @category 1Spatial - 1Integrate
 * @description Returns the activity log entries for a given locate.
 */
export class RemoveResource implements IActivityHandler {
    /** Perform the execution logic of the activity. */
    async execute(inputs: RemoveResourceInputs): Promise<RemoveResourceOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (!inputs.folder) {
            throw new Error("folder is required");
        }
        if (!inputs.path) {
            throw new Error("path is required");
        }

        const response = await remove(inputs.service, `${inputs.folder}/${inputs.path}`);

        return {
            result: response,
        };
    }
}

