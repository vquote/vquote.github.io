import React, { useState } from "react";

import './style.scss';

export default () => {

    const [visible, _setVisible] = useState(true);

    
    return (<>
        <div className='modal-window'>

            <div className="modal-window__content" style={ {display: (visible? 'block':'none')} }>
Hello
            </div>

        </div>
    </>)
}