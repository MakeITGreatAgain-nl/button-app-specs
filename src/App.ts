import { NoopBleRadar, NoopButtonApp } from "./noop";
import { stateMemory } from "./noop/memory";
import { PrintDeviceType } from "./spec";

const radar = new NoopBleRadar(stateMemory);
const app = new NoopButtonApp([radar])
radar.onBlip("BonusCup", (item) => {
    item.forEach(service => service.print(console.log, PrintDeviceType.YAML))
})

app.activate().then(ok => {
    console.info("activated")
    console.info("Simulating a blip")
    radar.simulateAblip()
})