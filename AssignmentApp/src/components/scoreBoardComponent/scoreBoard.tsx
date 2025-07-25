import type { Team } from "../../interfaces/teams";
import "./scoreBoard.css";

interface ScoreBoardProps {
    currentVisualScore: Team[][]
}

function ScoreBoard ({ currentVisualScore } : ScoreBoardProps){
    return (
        <div className="scoreBoardMainContainer">
            <div className="teamNamesVsContainer">
            {
            currentVisualScore.map((item, index) => {
                return (
                    <div className="individualTeamNamesVsContainer" key={`name-${index}`}>
                        { `${item[0].name} vs ${item[1].name}` }
                    </div>
                )
            })
            }
            </div>
            <div>
            {
                currentVisualScore.map((item, index) => {
                return (
                    <div key={`score-${index}`}>
                        { `${item[0].currentScore} : ${item[1].currentScore}` }
                    </div>
                )
            })
            }
            </div>
        </div>
    );
}

export default ScoreBoard;