import './RateRatioBar.css'; // you can create a CSS file to style the component

interface RateRatioBar {
  rate: number;
}

const RateRatioBar: React.FC<RateRatioBar> = ({ rate }) => {
  const fillPercentage = (rate / 5) * 100;

  return (
    <div className="rate-bar-container">
      <div className="rate-bar">
        <div
          className="rate-bar-fill"
          style={{ width: `${fillPercentage}%` }}
        />
      </div>
      <div className="rate-text">{rate}</div>
    </div>
  );
};

export default RateRatioBar;
