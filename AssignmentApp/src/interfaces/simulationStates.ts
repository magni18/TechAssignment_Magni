export class PossibleSimulaitonStates {
    static readonly ON = "on";
    static readonly OFF = "off";
    static readonly DONE = "done";
}

export type PossibleSimulaitonStatesType = typeof PossibleSimulaitonStates.ON 
| typeof PossibleSimulaitonStates.OFF 
| typeof PossibleSimulaitonStates.DONE;

export interface SimulationStates {
    currentState: PossibleSimulaitonStatesType
}