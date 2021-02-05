import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
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
 */
export class QuerySession implements IActivityHandler {
    /** Perform the execution logic of the activity. */
    async execute(inputs: QuerySessionInputs): Promise<QuerySessionOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (!inputs.path) {
            throw new Error("path is required");
        }
        

        let params = JSON.parse(JSON.stringify(inputs));
        delete params["service"];
        delete params["path"];
        if(Object.keys(params).length === 0 ){
            params = undefined;
        }


        const response = await get(inputs.service, `results/${inputs.path}`, params);
        return {
            result: response,
        };
    }
}

