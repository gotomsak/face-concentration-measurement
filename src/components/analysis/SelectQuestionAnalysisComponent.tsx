import { ListItemSecondaryAction } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { adminGetSelectAnswerResultSection } from "../../apis/backendAPI/admin/getSelectAnswerResultSection";
import { AdminGetSelectAnswerResultSectionRes } from "../../apis/backendAPI/admin/interfaces";
import ConcToCorrectViewComponent from "./ConcToCorrectViewComponent";
import { concToCorrectDataType } from "./interfaces";

const SelectQuestionAnalysisComponent: React.FC<{ select_question_id: any }> = (
    props
) => {
    const [gSARS, setgSARS] = useState<AdminGetSelectAnswerResultSectionRes>({
        select_answer_result_section: [],
    });
    const [viewData, setviewData] = useState<concToCorrectDataType[]>([]);

    useEffect(() => {
        console.log(props.select_question_id);

        adminGetSelectAnswerResultSection(props.select_question_id).then(
            (res: any) => {
                console.log(res.data);
                setgSARS({
                    select_answer_result_section:
                        res.data.select_answer_result_section,
                });
            }
        );
        viewData.forEach((value) => {});
    }, []);

    useEffect(() => {
        console.log(gSARS.select_answer_result_section);
    }, [gSARS]);

    return (
        <div>
            <ConcToCorrectViewComponent
                ConcToCorrectData={viewData}
            ></ConcToCorrectViewComponent>
        </div>
    );
};

export default SelectQuestionAnalysisComponent;
