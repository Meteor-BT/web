export function parseError(err: any): string {
    if (!err) return err;
    if (typeof err === "string") return err;
    if (typeof err !== "object") return err;
    if (err.response) {
        if (err.response.data) {
            if (err.response.data.error && err.response.data.error.message) {
                return err.response.data.error.message;
            }
            if (err.response.data.message) return err.response.data.message;
            if (err.response.data.error) return err.response.data.error;
        }
    }
    return err.message;
}
