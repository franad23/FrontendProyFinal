import { useState } from "react";
import "./chartjssection.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ChartJSSection(props) {
  const [dataAnswers] = useState(props.handleDataResp);

  const answerCounts = {};

  dataAnswers.forEach((response) => {
    if (response.userAnswers) {
      response.userAnswers.forEach((answer) => {
        const { questionTitle, answers } = answer;

        if (!answerCounts[questionTitle]) {
          answerCounts[questionTitle] = {};
        }

        answers.forEach((choice) => {
          if (Array.isArray(choice)) {
            choice.forEach((c) => {
              if (!answerCounts[questionTitle][c]) {
                answerCounts[questionTitle][c] = 1;
              } else {
                answerCounts[questionTitle][c]++;
              }
            });
          } else {
            if (!answerCounts[questionTitle][choice]) {
              answerCounts[questionTitle][choice] = 1;
            } else {
              answerCounts[questionTitle][choice]++;
            }
          }
        });
      });
    }
  });


  return (
    <div className="chartjsMainSection">
      {Object.keys(answerCounts).map((questionTitle) => (
        <div key={questionTitle} className="chartInfoContainer">
          <h1 className="titleCardResponse">{questionTitle}</h1>
          <div className="chartGraph">
            <Line
              data={{
                labels: Object.keys(answerCounts[questionTitle]),
                datasets: [
                  {
                    label: questionTitle,
                    data: Object.values(answerCounts[questionTitle]),
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    stepSize: 1,
                  },
                },
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChartJSSection;
