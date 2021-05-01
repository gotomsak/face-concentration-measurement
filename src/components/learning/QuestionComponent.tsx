import React from "react";
import "./QuestionComponent.css";

const QuestionComponent: React.FC<{
    questionText: string | null;
    questionImg?: string[] | null;
}> = ({ questionText, questionImg }) => {
    return (
        <div className="QuestionContainer">
            <div className="QuestionText">
                <h4>問題</h4>
                <h3>{questionText}</h3>
                <div className="QuestionImg">
                    {questionImg?.map((d) => {
                        return <img src={d} key={d}></img>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuestionComponent;
