import React, { Component } from 'react';
import axios from 'axios';

// import { Container } from './styles';

export default class CourseForm extends Component {
    objModel = Object.freeze({
        name: '',
        category: '',
        img: '',
        link: '',
        price: '',
        description: ''
    });

    state = {
        newCourse: { ...this.objModel },
        idEditing: false
    }

    postCourseHandler = event => {
        let objId = '';

        if (this.state.newCourse.id) {
            axios.put('/courses/' + this.state.newCourse.id, this.state.newCourse)
                .then(response => {
                    this.props.editedHandler(this.state.newCourse.id, this.state.newCourse);
                    this.setState({ newCourse: { ...this.objModel } });
                })
                .catch(error => {
                    alert('Server error');
                    console.error(error);
                });
        } else {
            axios.post('/courses/', this.state.newCourse)
                .then(response => {
                    objId = response.data;
                    this.props.addItemList({ id: objId, ...this.state.newCourse });
                    this.setState({ newCourse: { ...this.objModel } });
                    console.log(response.data);
                })
                .catch(error => {
                    alert('Server error');
                    console.error(error);
                });
        }
        event.preventDefault();
    }

    componentDidUpdate() {

        console.log('did update - id: ' + this.props.editCourseId);
        if (this.props.editCourseId && !this.state.isEditing) {
            axios.get('/courses/' + this.props.editCourseId)
                .then(response => {
                    this.setState({ newCourse: response.data, isEditing: true });
                })
                .catch(error => {
                    alert('Server error');
                    console.error(error);
                });
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        let hasChanged = false;
        if (this.props.editCourseId !== nextProps.editCourseId) {
            hasChanged = true;
        }
        Object.keys(nextState.newCourse).forEach(key => {
            if (this.state.newCourse[key] !== nextState.newCourse[key]) {
                hasChanged = true;
            }
        });

        return hasChanged;
    }

    onValueChangeHandler = (attrName, pValue) => {
        let currentCourse = { ...this.state.newCourse };
        currentCourse[attrName] = pValue;
        this.setState({ newCourse: currentCourse });
    }

    clearFormHandler = () => {
        this.setState({ newCourse: { ...this.objModel }, isEditing: false }); //limpar form
        this.props.clearSelectedId();
    }

    render() {
        return (
            <form className="row mb-0" onSubmit={this.postCourseHandler}>
                <div className="form-group col-12">
                    <label for="name">Name*</label>
                    <input type="text" className="form-control" id="name"
                        value={this.state.newCourse.name} required
                        onChange={(event) => this.onValueChangeHandler('name', event.target.value)} />
                </div>
                <div className="form-group col-12">
                    <label for="description">Description *</label>
                    <textarea className="form-control" id="descricao" rows="3" required
                        value={this.state.newCourse.description} name="description"
                        onChange={(event) => this.onValueChangeHandler(event.target.name, event.target.value)}></textarea>
                </div>
                <div className="form-group col-sm-12 col-md-6">
                    <label for="img">Image</label>
                    <textarea className="form-control" id="img" rows="3"
                        value={this.state.newCourse.img}
                        onChange={(event) => this.onValueChangeHandler('img', event.target.value)}></textarea>
                </div>
                <div className="form-group col-sm-12 col-md-6">
                    <label for="link">Link</label>
                    <textarea className="form-control" id="link" rows="3"
                        value={this.state.newCourse.link}
                        onChange={(event) => this.onValueChangeHandler('link', event.target.value)}></textarea>
                </div>
                <div className="form-group col-sm-12 col-md-6">
                    <label for="price">Price*</label>
                    <input type="text" className="form-control" id="price"
                        value={this.state.newCourse.price} required
                        onChange={(event) => this.onValueChangeHandler('price', event.target.value)} />
                </div>
                <div className="form-group col-sm-12 col-md-6">
                    <label for="category">Category*</label>
                    <select className="form-control" id="category"
                        value={this.state.newCourse.category} required
                        onChange={(event) => this.onValueChangeHandler('category', event.target.value)}>
                        <option value=''>Select...</option>
                        <option value='dev'>Development</option>
                        <option value='design'>UX/UI</option>
                        <option value='test'>Test</option>
                    </select>
                </div>
                <div className="form-group col-12 text-right mb-0">
                    <button onClick={this.clearFormHandler} className="btn btn-light mr-1" data-toggle="collapse" data-target={'#' + this.props.panelId}>Cancel</button>
                    <button type="submit" className="btn btn-success" data-toggle="collapse" data-target={'#' + this.props.panelId}>Save</button>
                </div>

            </form>
        )
    }

}
