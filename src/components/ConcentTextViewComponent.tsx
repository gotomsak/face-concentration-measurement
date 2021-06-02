import React, { useState, useEffect } from "react";

const ConcentTextViewComponent: React.FC<{
    viewC3: any;
    viewC2: any;
    viewC1: any;
    viewW: any;
}> = ({ viewC3, viewC2, viewC1, viewW }) => {
    return (
        <div>
            <h5>c3: {viewC3}</h5>
            <h5>c2: {viewC2}</h5>
            <h5>c1: {viewC1}</h5>
            <h5>w: {viewW}</h5>
        </div>
    );
};

export default React.memo(ConcentTextViewComponent);
