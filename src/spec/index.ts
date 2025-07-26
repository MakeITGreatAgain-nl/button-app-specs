import EventEmitter from "events";


export type PrintDevice = (message?: any, ...optionalParams: any[]) => void;
export enum PrintDeviceType {
    CONSOLE = 1,
    JSON,
    YAML,
    KEYVALUE
  }

export interface Printable {
    print(device: PrintDevice, type: PrintDeviceType ): Promise<void>
}

export interface RadarService extends Printable{

}

export interface BleService extends RadarService {

}

export interface BleBonusCup extends BleService{

}

export interface Activatable {
     activate(): Promise<void>
     deactivate(): Promise<void>
}

export interface ButtonRadar {
    search(): void
    stopSearching(): Promise<void>
    onBlip(kind: "*" | string, handler: (items: RadarService[]) => void): void
}

export interface ButtonApp extends Activatable {
}