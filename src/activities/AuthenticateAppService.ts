import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
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
     */
    accessTokenURL?: string;

    username?: string;

    password?: string;
    /**
     * @description Set to true if you require a 2-week token.
     * @required
     */
    longLivedToken: boolean;
    /**
     * @description Optional API key to be used for authentication.
     */
    apiKey?: string;
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

        const timestamp = new Date();

        if (
            inputs.accessTokenURL != undefined &&
            inputs.accessTokenURL != null &&
            inputs.accessTokenURL != "" &&
            inputs.username != undefined &&
            inputs.username != null &&
            inputs.username != "" &&
            inputs.password != undefined &&
            inputs.password != null &&
            inputs.password != ""
        ) {
            const data = {
                username: inputs.username,
                password: inputs.password,
            };
            return fetch(inputs.accessTokenURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    const header = response.headers.get("Authorization");
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
        } else if (
            inputs.apiKey != undefined &&
            inputs.apiKey != null &&
            inputs.apiKey != ""
        ) {
            return {
                service: {
                    url: inputs.baseUrl,
                    expires_in: timestamp.toISOString(),
                    token_type: "apiKey",
                    api_key: inputs.apiKey,
                },
            } as any;
        } else {
            throw new Error("Either accessTokenURL or apiKey must be provided");
        }
    }
}
