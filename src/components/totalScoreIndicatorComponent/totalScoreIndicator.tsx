import './totalScoreIndicator.css';

interface TotalScoreIndicatorProps {
  TotalScore: number;
}

function TotalScoreIndicator({ TotalScore }: TotalScoreIndicatorProps) {
  return (
    <div className="totalScoreIndicatorMainContainer">
      <div className="textContainer"> Total Goals: {TotalScore} </div>
    </div>
  );
}

export default TotalScoreIndicator;
