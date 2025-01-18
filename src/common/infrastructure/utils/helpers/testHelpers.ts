export const getMockFile = (name: string, size: number, type: string) => {
    const blob = new Blob(['a'.repeat(size)], { type });
    return new File([blob], name, { type });
};
