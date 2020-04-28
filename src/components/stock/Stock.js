import * as React from "react";
import {useParams} from "react-router-dom";

export default function Stock() {

    let {id} = useParams();

    return (
        <div>
            TEST STOCK {id}
        </div>
    )

}