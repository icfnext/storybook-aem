class WebpackLifecyclePlugin {
    constructor(cycles) {
        this.cycles = cycles;
    }

    apply(compiler) {
        for (let cycle in this.cycles) {
            const cb = this.cycles[cycle];

            compiler.hooks[cycle].tap("Webpack Complete", () => {
                console.log(`WEBPACK IS AT LIFECYCLE METHOD: ${cycle}`);
                cb();
            });
        }
    }
}

module.exports = WebpackLifecyclePlugin;
