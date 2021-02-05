import { ApiService } from "./ApiService";

export async function get<T = any>(
    service: ApiService,
    path: string,
    params?: Record<string, string | number | boolean | null | undefined>,
    expect?: string
): Promise<T> {
    if (!service.url) {
        throw new Error("url is required");
    }
    const qs = objectToQueryString(params);
    const url = `${service.url}/1Integrate/rest/${path}${qs ? "?" + qs : ""}`;
    const authHeader = `Bearer ${service.access_token}`;
    const request = await fetch(url, {
        headers: {
            Authorization: authHeader,
        },
    });

    switch (expect) {
        case "blob":
            return (await request.blob()) as any;
        default:
            return await request.json();
    }
}

export async function post<T = any>(
    service: ApiService,
    path: string,
    params?: Record<string, string | number | boolean | null | undefined>,
    inData?: Record<string, any>
): Promise<T> {
    if (!service.url) {
        throw new Error("url is required");
    }

    const qs = objectToQueryString(params);
    const data = inData != undefined ? inData : {};

    const url = `${service.url}/1Integrate/rest/${path}${qs ? "?" + qs : ""}`;
    const authHeader = `Bearer ${service.access_token}`;

    return fetch(url, {
        method: "POST",
        headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        const status = response.status;
        const statusText = response.statusText;
        return { status: status, statusCode: statusText } as any;
    });
}

export async function put<T = any>(
    service: ApiService,
    path: string,
    params?: Record<string, string | number | boolean | null | undefined>,
    inData?: Record<string, any>
): Promise<T> {
    if (!service.url) {
        throw new Error("url is required");
    }

    const qs = objectToQueryString(params);
    const data = inData != undefined ? inData : {};

    const url = `${service.url}/1Integrate/rest/${path}${qs ? "?" + qs : ""}`;
    const authHeader = `Bearer ${service.access_token}`;
    return fetch(url, {
        method: "PUT",
        headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        const status = response.status;
        const statusText = response.statusText;
        if (status == 409) {
            return {
                status: status,
                statusCode: statusText,
                message:
                    "There is a conflict with this resource. Run a 'Get Resource' activity to refresh the resource before attempting an update.",
            } as any;
        }
        const result = await response.json();
        return {
            status: status,
            statusCode: statusText,
            result: result,
        } as any;
    });
}

export async function remove<T = any>(
    service: ApiService,
    path: string
): Promise<T> {
    if (!service.url) {
        throw new Error("url is required");
    }
    if (!path) {
        throw new Error("path is required");
    }

    const url = `${service.url}/1Integrate/rest/${path}`;
    const authHeader = `Bearer ${service.access_token}`;
    return fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
        },
    }).then((response) => {
        const status = response.status;
        const statusText = response.statusText;
        return { status: status, statusCode: statusText } as any;
    });
}
function objectToQueryString(
    data?: Record<string, string | number | boolean | null | undefined>
): string {
    if (!data) {
        return "";
    }
    return Object.keys(data)
        .map((k) => {
            const value = data[k];
            const valueToEncode =
                value === undefined || value === null ? "" : value;
            return `${encodeURIComponent(k)}=${encodeURIComponent(
                valueToEncode
            )}`;
        })
        .join("&");
}
