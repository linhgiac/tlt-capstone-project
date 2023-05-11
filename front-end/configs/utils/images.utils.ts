export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const type = dataUrl.match(/^data:(.+);base64/)?.[1]
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: type });
}
