import React from 'react';
import Card from 'yoga1290-ui-pool/react/card-with-icon'

const doAlert = ()=>(window.alert('Sorry; WIP!'));

export default () => (
    <div className="contact animate__animated animate__fadeInUp col-12 col-md-6 offset-md-3 ">
        <Card
            title="Work In Progress..."
            icon='sync_problem'
            click={doAlert} />
    </div>
)