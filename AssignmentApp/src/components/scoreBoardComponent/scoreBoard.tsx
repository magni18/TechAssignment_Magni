import type { Team } from "../../interfaces/teams";
import MatchResults from "../matchResultsComponent/matchResults";

interface ScoreBoardProps {
    currentVisualScore: Team[][]
}

function ScoreBoard ({ currentVisualScore } : ScoreBoardProps){
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