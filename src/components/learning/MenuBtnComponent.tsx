import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

const MenuBtnComponent: React.FC<{
    btnText: string;
    event?: any;
}> = ({ btnText, event }) => {
    const history = useHistory();

    return (
        <div className="MenuBtnContainer">
            <p>
                <Button onClick={event} color="secondary">
                    {btnText}
                </Button>
            </p>
        </div>
    );
};

export default MenuBtnComponent;
