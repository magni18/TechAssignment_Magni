import './matchResults.css'
import type { Team } from '../../interfaces/teams';

interface MatchResultsProps {
    teamScores: Team[]
}

function MatchResults({ teamScores } : MatchResultsProps) {
    return (
        <div className={"rootContainer"}>
            <div className={"teamVersusContainer"}>
                { `${teamScores[0].name} vs ${teamScores[1].name}` }
            </div>
            <div>
                { `${teamScores[0].currentScore} : ${teamScores[1].currentScore}` }
            </div>
        </div>
    );
}

export default MatchResults;