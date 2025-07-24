import type { Team } from "../interfaces/teams";
import ActionButton from "../components/actionButtonComponent/actionButton";
import { PossibleSimulaitonStates } from "../interfaces/simulationStates";
import ScoreBoard from "../components/scoreBoardComponent/scoreBoard";
import { useEffect, useState } from "react";
import handleRandomizationOfTeamScores from "../logic/teamScoringLogic";
import { TotalScoreAllowed } from "../data/totalScoreAllowed";
import AllTeams from "../data/teamScores";

function MainPage() {
    const [preSetScore, setPreSetScore] = useState<Team[]>([]);
    const [currentSimulationScore, setCurrentSimulationScore] = useState<Team[]>([]);
    const [simulationLoop, setSimulationLoop] = useState<number>(0);
    const [simulationState, setSimulationState] = useState<PossibleSimulaitonStates>(PossibleSimulaitonStates.OFF);

    const onStartSimulation = () => {
        const score = handleRandomizationOfTeamScores(TotalScoreAllowed, AllTeams.length);
        setPreSetScore(score);
        setCurrentSimulationScore([...AllTeams]);
  
        setSimulationState(PossibleSimulaitonStates.ON);
    }

    const onFinishSimulation = () => {
        clearInterval(simulationLoop);

        setSimulationState(PossibleSimulaitonStates.DONE);

        setCurrentSimulationScore([...preSetScore]);
    }

    const onRestartSimulation = () => {
        onStartSimulation();
    }

    const handleUpdateCurrentScore = () => {

        const teamsWithNotAllScores = currentSimulationScore.filter((item) => {
            for (const element of preSetScore) {
                if(item.currentScore >= element.currentScore){
                    return true;
                }
            }

            return false;
        });

        const randomIndex = Math.round(Math.random() * (teamsWithNotAllScores.length - 1));
        const teamToUpdateScore = teamsWithNotAllScores[randomIndex];

        const updatedCurrentScores = currentSimulationScore.map((item) => {
            if (item.name === teamToUpdateScore.name) {
                item.currentScore++;
            }

            return item;
        });

        setCurrentSimulationScore(updatedCurrentScores);
    }

    const handleStartUpdateLoop = () => {
        const updateLoopId = setInterval(() => {
            handleUpdateCurrentScore();
        }, 10000);

        setSimulationLoop(updateLoopId);
    }

    useEffect(() => {
        if(simulationState === PossibleSimulaitonStates.ON){
            handleStartUpdateLoop();
        }
    }, [simulationState]);

    return (
        <div>
            <ActionButton onStartSimulation={() => onStartSimulation()}
                          onFinishSimulation={() => onFinishSimulation()} 
                          onRestartSimulation={() => onRestartSimulation()}
                          appState={simulationState}/>
            <ScoreBoard currentScore={currentSimulationScore}/>
        </div>
    );
}

export default MainPage;