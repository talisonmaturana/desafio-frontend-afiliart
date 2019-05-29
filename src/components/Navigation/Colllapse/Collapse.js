import React from 'react';

const Collapse = (props) => (
    <div>
        <p>
            <a className={'btn ' + props.btnClass} data-toggle="collapse"
                href={'#' + props.collapseId} role="button">
                {props.buttonText}
            </a>
            <div className="collapse mb-3" id={props.collapseId}>
                <div className="card card-body mb-3">
                    {props.children}
                </div>
            </div>
        </p>
    </div>
)

export default Collapse;