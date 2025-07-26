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
    console.info("Changing a holder name and simulating a second blip")
    stateMemory.BonusCup.spec.holder= "Edward"
    radar.simulateAblip()
    console.info("Adding new message and simulating a second blip")
    stateMemory.BonusCup.spec.messages[2] = {
        message: "Wonderfull",
        on: new Date().getTime() - 24 * 60 * 1000 * 1000,
        from: "Denis"
    }
    radar.simulateAblip()
})