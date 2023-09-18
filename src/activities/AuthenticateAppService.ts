import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";

/** An interface that defines the inputs of the activity. */
export interface AuthenticateAppServiceInputs {
    /**
     * @displayName Base URL
     * @description The URL of the 1Integrate REST API.
     * @required
     */
    baseUrl: string;
    /**
     * @displayName Access Token URL
     * @description The URL of the 1Integrate Token Service.
     * @required
     */
    accessTokenURL: string;
    /**
     * @required
     */
    username: string;
    /**
     * @required
     */
    password: string;
    /**
     * @description Set to true if you require a 2-week token.
     * @required
     */
    longLivedToken: boolean;
}

/** An interface that defines the outputs of the activity. */
export interface AuthenticateAppServiceOutputs {
    /**
     * @description The 1Integrate service that can be supplied to other 1Integrate activities.
     */
    service: ApiService;
}

/**
 * @category 1Spatial - 1Integrate
 * @description Authenticates an application with the 1Integrate REST API.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class AuthenticateAppService implements IActivityHandler {
    async execute(
        inputs: AuthenticateAppServiceInputs
    ): Promise<AuthenticateAppServiceOutputs> {
        if (!inputs.baseUrl) {
            throw new Error("baseUrl is required");
        }
        if (!inputs.accessTokenURL) {
            throw new Error("accessTokenURL is required");
        }
        if (!inputs.username) {
            throw new Error("username is required");
        }
        if (!inputs.password) {
            throw new Error("password is required");
        }
        const data = { username: inputs.username, password: inputs.password };

        return fetch(inputs.accessTokenURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                const header = response.headers.get("Authorization");
                const timestamp = new Date();
                if (inputs.longLivedToken) {
                    timestamp.setDate(timestamp.getDate() + 14);
                } else {
                    timestamp.setHours(timestamp.getHours() + 2);
                }
                return {
                    service: {
                        url: inputs.baseUrl,
                        access_token: header,
                        expires_in: timestamp.toISOString(),
                        token_type: "Bearer",
                    },
                } as any;
            })
            .catch((reason) => {
                return { reason: reason };
            });
    }
}
