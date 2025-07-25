import type { Team } from "../../interfaces/teams";
import ActionButton from "../../components/actionButtonComponent/actionButton";
import { PossibleSimulaitonStates } from "../../interfaces/simulationStates";
import ScoreBoard from "../../components/scoreBoardComponent/scoreBoard";
import { useEffect, useRef, useState } from "react";
import handleRandomizationOfTeamScores from "../../logic/teamScoringLogic";
import { TotalScoreAllowed } from "../../data/totalScoreAllowed";
import Teams from "../../data/allTeams.json";
import TotalScoreIndicator from "../../components/totalScoreIndicatorComponent/totalScoreIndicator";
import "./mainPage.css";
import { MaxSimulationLoopTime } from "../../data/maxLoopTime";

function MainPage() {
    const [preSetScore, setPreSetScore] = useState<Team[]>([]);
    const [simulationState, setSimulationState] = useState<PossibleSimulaitonStates>(PossibleSimulaitonStates.OFF);
    const [currentSimulationVisualScore, setCurrentSimulationVisualScore] = useState<Team[][]>([]);

    const currentSimulationScore = useRef<Team[]>(structuredClone(Teams.teams) as Team[]);
    const simulationLoopId = useRef<number>(0);
    const totalGoalsScored = useRef<number>(0);

    const handleSetVisualScore = (score : Team[]) => {
        const tempVisualScore = handleSetUpMatches(score);
        setCurrentSimulationVisualScore(tempVisualScore);
    }

    const onStartSimulation = () => {
        totalGoalsScored.current = 0;

        const score = handleRandomizationOfTeamScores(TotalScoreAllowed, Teams.teams.length);
        setPreSetScore(score);

        currentSimulationScore.current = structuredClone(Teams.teams);

        handleSetVisualScore(currentSimulationScore.current);
  
        setSimulationState(PossibleSimulaitonStates.ON);
    }

    const onFinishSimulation = () => {
        clearInterval(simulationLoopId.current);

        setSimulationState(PossibleSimulaitonStates.DONE);

        currentSimulationScore.current = [...preSetScore];
        handleSetVisualScore(currentSimulationScore.current);

        totalGoalsScored.current = TotalScoreAllowed;
    }

    const onRestartSimulation = () => {
        onStartSimulation();
    }

    const handleUpdateCurrentScore = () => {

        const teamsWithNotAllScores = currentSimulationScore.current.filter((current) => {
            for (const preset of preSetScore) {
                if(preset.name === current.name && current.currentScore < preset.currentScore){
                    return true;
                }
            }

            return false;
        });

        const randomIndex = Math.round(Math.random() * (teamsWithNotAllScores.length - 1));
        const teamToUpdateScore = teamsWithNotAllScores[randomIndex];

        const updatedCurrentScores = currentSimulationScore.current.map((item) => {
            if (item.name === teamToUpdateScore.name) {
                item.currentScore++;
            }

            return item;
        });

        currentSimulationScore.current = updatedCurrentScores;

        totalGoalsScored.current++;
        if (totalGoalsScored.current >= TotalScoreAllowed){
            onFinishSimulation();
        }
    }

    const handleSetUpMatches = (score : Team[]) : Team[][] => {
        const returnList : Team[][] = [];
        let tempList : Team[] = [];

        let firstResettableIndex = 0;
        let secondResettableIndex = 0;
        
        try{
            for(let item of score){

                if(firstResettableIndex > 1){
                    firstResettableIndex = 0;
                    secondResettableIndex++;

                    returnList.push(tempList);

                    tempList = [];
                }

                firstResettableIndex++;

                tempList.push(item);
            }
        }
        finally{
            if(tempList.length > 0)
                returnList.push(tempList);
        }

        return returnList;
    }

    const handleStartUpdateLoop = () => {
        const updateLoopId = setInterval(() => {
            handleUpdateCurrentScore();
            handleSetVisualScore(currentSimulationScore.current);
        }, 1000 * (MaxSimulationLoopTime / TotalScoreAllowed));

        simulationLoopId.current = updateLoopId;
    }

    useEffect(() => {
        if(simulationState === PossibleSimulaitonStates.ON){
            handleStartUpdateLoop();
        }
    }, [simulationState]);

    useEffect(() => {
        currentSimulationScore.current = structuredClone(Teams.teams);
        handleSetVisualScore(currentSimulationScore.current);
    }, []);

    return (
        <div className="mainContainer">
            <ActionButton onStartSimulation={() => onStartSimulation()}
                          onFinishSimulation={() => onFinishSimulation()} 
                          onRestartSimulation={() => onRestartSimulation()}
                          appState={simulationState}/>
            <ScoreBoard currentVisualScore={currentSimulationVisualScore}/>
            <TotalScoreIndicator TotalScore={totalGoalsScored.current}/>
        </div>
    );
}

export default MainPage;