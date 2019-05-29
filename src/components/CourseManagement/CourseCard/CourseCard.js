import React from 'react';
import { Link } from 'react-router-dom';

import img from '../../../assets/background.jpg'

const courseCard = (props) => {

    let buttons = <div></div>

    buttons = (
        <div>
            <button onClick={props.editHandler} data-toggle="collapse" data-target={'#' + props.panelId} className="btn btn-warning mr-1">
                <i className="far fa-edit"></i>
            </button>
            <button onClick={props.removeHandler} className="btn btn-danger">
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    )

    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div className="card">
                <img className="card-img-top" src={img} alt="Card cap" />
                <div className="card-body">
                    <Link to={"/courses/" + props.id}><h5 className="card-title">{props.name}</h5></Link>
                    <div>
                        <b>Description:</b>
                        <p>{props.description}</p>

                        <b>Price:</b>
                        <p>R$  {props.price}</p>

                    </div>
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default courseCard;