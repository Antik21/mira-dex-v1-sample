
export async function retry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 1000
): Promise<T> {
    let attempt = 0;

    while (attempt < retries) {
        try {
            return await fn();
        } catch (error) {
            attempt++;
            if (attempt >= retries) {
                throw error;
            }
            console.log(`Retrying... Attempt ${attempt}/${retries}`);
            await new Promise((resolve) => setTimeout(resolve, delay * attempt));
        }
    }

    throw new Error("Retry failed after max attempts");
}