import EventEmitter from "events";
import { BleBonusCup, ButtonApp, ButtonRadar, PrintDevice, PrintDeviceType, RadarService } from "../spec";
import YAML from 'yaml'
import { stateMemory } from "./memory";

export class NoopBonusCup implements BleBonusCup {
    constructor(private memory = stateMemory.BonusCup){

    }
    async print(out: PrintDevice, type: PrintDeviceType ){
        switch(type){
            case PrintDeviceType.KEYVALUE:
                Object.entries(this.memory).forEach((key, value) => out(key, value))
                break;
            case PrintDeviceType.JSON:
                    out(JSON.stringify(this.memory, undefined, 2))
                    break;
            case PrintDeviceType.YAML:
                        out(YAML.stringify(this.memory, undefined, 2))
                        break;
            default:
                out("Bonus cup holder: ", this.memory.spec.holder)
                Object.values(this.memory.spec.messages).forEach(item => {
                    out("From: ", item.from)
                    out("on: ", new Date(item.on))
                    out("Message", item.message)
                })
        }

    }
}

export class NoopBleRadar implements ButtonRadar {
    private emitter = new EventEmitter();
    constructor(private state = stateMemory){}
    async search() {
        return Promise.resolve()
    }
    stopSearching(): Promise<void> {
        return Promise.resolve()
    }

    simulateAblip(){
        this.emitter.emit("radarblip", [new NoopBonusCup(this.state.BonusCup)])
    }
    onBlip(_kind: "*" | string, handler: (items: RadarService[]) => void): void {
        this.emitter.on("radarblip", handler)
    }
    
}

export class NoopButtonApp implements ButtonApp{
    constructor(private radars: ButtonRadar[] = []){
    }
    activate(): Promise<void> {
        console.log("Botton app deactivated")
        this.radars.forEach(radar => radar.search())
        return Promise.resolve()
    }
    async deactivate(): Promise<void> {
        const stopAll = this.radars.map(radar => radar.stopSearching())
        await Promise.all(stopAll);
    }
    
}

