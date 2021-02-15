import { ApiService } from "../ApiService";
import { get } from "../request";

export async function traverseResources(
    service: ApiService,
    root: string
): Promise<any> {
    const response = await get(service, root);
    const contents = response.contents.filter((x) => x.name != "Recycle Bin");
    const node = { type: "folder", name: root, contents: contents };
    let r = null;
    if (response.contents != undefined && response.contents.length > 0) {
        r = await buildTree(service, root, node);
    }
    return r;
}

export async function buildTree(
    service: ApiService,
    path: string,
    node: Node
): Promise<any> {
    const folders = node.contents.filter(
        (x) => x.type === "folder" && x.name != "Recycle Bin"
    );

    for (let i = 0; i < folders.length; i++) {
        const fPath = `${path}/${folders[i].name as string}`;
        const f = await get(service, fPath);
        if (
            f != undefined &&
            f.contents != undefined &&
            f.contents.length > 0
        ) {
            folders[i]["isEmpty"] = false;
            folders[i]["contents"] = f.contents;
            void buildTree(service, fPath, folders[i]);
        } else {
            folders[i]["isEmpty"] = true;
        }
    }
    return node;
}

export interface Node {
    name: string;
    contents: any[];
}
