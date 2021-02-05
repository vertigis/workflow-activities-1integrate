import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { put } from "../request";
/** An interface that defines the inputs of the activity. */
export interface ManageResourceInputs {
    /**
     * @description The 1Integrate API Service.
     * @required
     */
    service: ApiService;

    /**
     * @description The folder of resource.
     * @required
     */
    folder: "actions" | "actionmaps" | "datastores" | "rules" | "sessions";

    /**
     * @description The folder structure for the resource.
     * @required
     */
    path: string;

    /**
     * @description The properties of the resource to update.
     */
    resourceProperties?: any;

    isFolder: true | false;
}

/** An interface that defines the outputs of the activity. */
export interface ManageResourceOutputs {
    /**
     * @description The action audit log entries.
     */
    result: any;
}

/**
 * @category 1Spatial - 1Integrate
 * @description Returns the activity log entries for a given locate.
 */
export class ManageResource implements IActivityHandler {
    /** Perform the execution logic of the activity. */
    async execute(
        inputs: ManageResourceInputs
    ): Promise<ManageResourceOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (!inputs.folder) {
            throw new Error("folder is required");
        }
        if (!inputs.path) {
            throw new Error("path is required");
        }

        const queryString = { folder: inputs.isFolder };

        const response = await put(
            inputs.service,
            `${inputs.folder}/${inputs.path}`,
            queryString,
            inputs.resourceProperties
        );

        return {
            result: response,
        };
    }
}
