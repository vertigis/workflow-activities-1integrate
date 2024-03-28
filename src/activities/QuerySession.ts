import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface QuerySessionInputs {
    /**
     * @description The 1Integrate API Service.
     * @required
     */
    service: ApiService;

    /**
     * @description The path is the folder structure from 1Integrate for the session.
     * @required
     */
    path: string;

    detail?: string;

    taskIdentifier?: string;

    start?: number;

    count?: number;
}

/** An interface that defines the outputs of the activity. */
export interface QuerySessionOutputs {
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
export class QuerySession implements IActivityHandler {
    async execute(inputs: QuerySessionInputs): Promise<QuerySessionOutputs> {
        const { path, service, ...other } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!path) {
            throw new Error("path is required");
        }

        const response = await get(service, `results/${path}`, other);
        return {
            result: response,
        };
    }
}
