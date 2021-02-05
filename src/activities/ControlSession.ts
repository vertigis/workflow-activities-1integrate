import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { post } from "../request";
/** An interface that defines the inputs of the activity. */
export interface ControlSessionInputs {
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

    /**
     * @required
     */
    action: "play" | "pause" | "stop" | "rewind";

    taskIndex?: number;
}

/** An interface that defines the outputs of the activity. */
export interface ControlSessionOutputs {
    /**
     * @description The action audit log entries.
     */
    result: any;
}

/**
 * @category 1Spatial - 1Integrate
 * @description Executes actions against a given session.
 */
export class ControlSession implements IActivityHandler {
    /** Perform the execution logic of the activity. */
    async execute(
        inputs: ControlSessionInputs
    ): Promise<ControlSessionOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }

        if (!inputs.path) {
            throw new Error("path is required");
        }
        if (!inputs.action) {
            throw new Error("action is required");
        }
        const queryString = { action: inputs.action };
        if (inputs.taskIndex != undefined) {
            queryString["taskIndex"] = inputs.taskIndex;
        }

        const response = await post(
            inputs.service,
            `sessions/${inputs.path}`,
            queryString
        );

        return {
            result: response,
        };
    }
}
