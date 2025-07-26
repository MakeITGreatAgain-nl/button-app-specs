
export const stateMemory = {
    BonusCup: {
        apiVersion: "v1",
        kind: "BonusCup",
        metadata: {
            name: "BonusCup"
        },
        spec: {
            holder: "John Doe",
            messages: [
                {
                    message: "Good luck!",
                    on: new Date().getTime() - 24 * 60 * 1000 * 10,
                    from: "anonymous"
                },
                {
                    message: "Yaay!",
                    on: new Date().getTime() - 24 * 60 * 1000 * 100,
                    from: "Igor"
                }
            ]
        }
    }
};
