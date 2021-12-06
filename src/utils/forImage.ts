



export function retry<R>(fn: () => Promise<R>, retriesLeft = Number.MAX_SAFE_INTEGER, interval = 500) {
    const BACKOFF_COEFFICIENT = 1.2;
    return new Promise<R>((resolve, reject) => {
    fn()
    .then(resolve)
    .catch((error: any) => {
    setTimeout(() => {
    const left = retriesLeft - 1;
    if (retriesLeft === 1) {
    return;
    }
    
    retry(fn, left, interval * BACKOFF_COEFFICIENT).then(resolve, reject);
    }, interval);
    });
    });
    }

function captureException(error: any) {
    throw new Error("Function not implemented.");
}
    