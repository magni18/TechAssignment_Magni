import { useEffect, useState } from "react";
import type { Team } from "../../interfaces/teams";
import MatchResults from "../matchResultsComponent/matchResults";

interface ScoreBoardProps {
    currentScore: Team[]
}

function ScoreBoard ({ currentScore } : ScoreBoardProps){

    const [currentVisualScore, setCurrentVisualScore] = useState<Team[][]>([]);

    const handleSetUpMatches = () : Team[][] => {
        const returnList : Team[][] = [];
        let tempList : Team[] = [];

        let firstResettableIndex = 0;
        let secondResettableIndex = 0;
        
        try{
            for(let item of currentScore){
                console.log("one", item);

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

    useEffect(() => {
        console.log("before", currentScore);
        const score = handleSetUpMatches();
        console.log("final", score);

       setCurrentVisualScore(score);
    }, [currentScore]);

    return (
        <div>
            {
            currentVisualScore.map((item, index) => {
                return (
                    <MatchResults teamScores={item} key={index}/>
                )
            })
            }
        </div>
    );
}

export default ScoreBoard;