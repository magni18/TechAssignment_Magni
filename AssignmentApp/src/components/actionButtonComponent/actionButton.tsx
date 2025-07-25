import { PossibleSimulaitonStates } from "../../interfaces/simulationStates";
import "./actionButton.css";

interface ActionButtonProps {
    onStartSimulation: () => void;
    onFinishSimulation: () => void;
    onRestartSimulation: () => void;
    appState: PossibleSimulaitonStates;
}

function ActionButton({onStartSimulation, onFinishSimulation, onRestartSimulation, appState} : ActionButtonProps) {

    const handleButtonText = () : string => {
        let buttonText = "Start";

        switch (appState) {
            case PossibleSimulaitonStates.OFF:
                buttonText = "Start"
                break;
            case PossibleSimulaitonStates.ON:
                buttonText = "Finish";
                break;
            case PossibleSimulaitonStates.DONE:
                buttonText = "Restart";
                break;
            default:
                break;
        }

        return buttonText;
    }

    const handleButtonFunction = (functionToRun : () => void) : () => void => {
        switch (appState) {
            case PossibleSimulaitonStates.OFF:
                functionToRun = onStartSimulation;
                break;
            case PossibleSimulaitonStates.ON:
                functionToRun = onFinishSimulation;
                break;
            case PossibleSimulaitonStates.DONE:
                functionToRun = onRestartSimulation;
                break;
            default:
                break;
        }

        return functionToRun;
    }

    return (
        <div className="actionButtonMainContainer">
            <button className="buttonContainer" onClick={handleButtonFunction(onStartSimulation)}>
                {handleButtonText()}
            </button>
        </div>
    );
}

export default ActionButton;