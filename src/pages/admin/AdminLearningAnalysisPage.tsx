import React, { useState, useEffect } from "react";
import { getQuestionIds } from "../../apis/backendAPI/learning/getQuestionIds";
import { GetQuestionIdQuery } from "../../apis/backendAPI/learning/interfaces";
import SelectQuestionViewComponent from "../../components/learning/SelectQuestionViewComponent";
import { AdminLearningAnalysisPageStyle } from "../../Styles";
import { adminGetSelectQuestion } from "../../apis/backendAPI/admin/getSelectQuestion";
import { adminGetSelectAnswerResultSection } from "../../apis/backendAPI/admin/getSelectAnswerResultSection";
import SelectQuestionAnalysisComponent from "../../components/analysis/SelectQuestionAnalysisComponent";

const AdminLearningAnalysisPage: React.FC = () => {
    const [selectedQuestion, setSelectedQuestion] =
        useState<GetQuestionIdQuery>({ select_question_id: "none" });
    const [selectQuestionData, setSelectQuestionData] = useState({
        select_question: null,
    });

    // const [, setrender] = useState()
    const classes = AdminLearningAnalysisPageStyle();
    useEffect(() => {
        adminGetSelectQuestion().then((res: any) => {
            console.log(res);

            setSelectQuestionData(res.data);
        });
        // adminGetQuestionAll().then((res:any)=>{
        //     console.log(res)
        // })
    }, []);

    // useEffect(()=>{
    //     setrender(undefined)
    //     console.log("yonda")
    // },[selectedQuestion])

    const renderChange = (): JSX.Element => {
        if (selectedQuestion.select_question_id !== "none") {
            // interface resType {data:any}
            // const agsarsRes:resType = {data:null}

            return (
                <div>
                    <SelectQuestionAnalysisComponent
                        select_question_id={selectedQuestion.select_question_id}
                    ></SelectQuestionAnalysisComponent>
                </div>
            );
        }
        return (
            <div className={classes.root}>
                <SelectQuestionViewComponent
                    selectQuestionData={selectQuestionData}
                    setSelectedQuestion={setSelectedQuestion}
                ></SelectQuestionViewComponent>
            </div>
        );
    };
    return renderChange();
};

export default AdminLearningAnalysisPage;
