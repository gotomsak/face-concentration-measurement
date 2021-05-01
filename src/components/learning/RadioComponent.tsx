import React, { useState, useEffect } from "react";

const RadioComponent: React.FC<{
    radioData: [{ text: string; value: string }];
    name: string;
    setValue: any;
}> = ({ radioData, name, setValue }) => {
    return (
        <div>
            {radioData.map((data) => {
                return (
                    <label>
                        {data.text}
                        <input
                            value={data.value}
                            name={name}
                            type="radio"
                            onChange={(e) => setValue(e.target.value)}
                        ></input>
                    </label>
                );
            })}
        </div>
    );
};

export default RadioComponent;
