import React from 'react';
import axios from 'axios';

import CourseCard from './CourseCard/CourseCard';
import CourseForm from '../CourseForm/CourseForm';
import Collapse from '../Navigation/Colllapse/Collapse';
import Loading from '../Navigation/Loading/Loading';

export default class CourseManagement extends React.Component {
    state = {
        courses: [],
        hasError: false,
        selectedId: ''
    }

    componentWillUnmount() {
        console.log("WILL UNMOUNT");
    }

    componentDidMount() {
        axios.get('/courses')
            .then(response => this.setState({ courses: response.data }))
            .catch(error => console.error(error));
    }
    courseCreateHandler = (paramNewCourse) => {
        axios.post('/courses')
            .then(response => {
                //this.setState({ courses: response.data })
                let newList = response.data;
                newList.push(paramNewCourse);
                this.setState({ courses: newList });
            })
            .catch(error => console.error(error));

    }

    courseEditedHandler = (paramId, newCourseData) => {
        const index = this.state.courses.findIndex(course => course.id == paramId);
        let courseList = this.state.courses;
        courseList[index] = newCourseData;
        this.setState({ courses: courseList });
    }

    courseEditHandler = (paramId) => {
        console.log(paramId);
        this.setState({ selectedId: paramId });
    }

    courseRemoveHandler = (paramId, paramName) => {
        if (window.confirm(`Remove course? "${paramName}"?`)) {

            axios.delete(`/courses/${paramId}`)
                .then(_ => {
                    const index = this.state.courses.findIndex(course => course.id === paramId);

                    let newList = this.state.courses;
                    newList.splice(index, 1);
                    this.setState({ courses: newList });

                    window.alert('Removed succesfully!');
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    clearSelectedId = () => {
        this.setState({ selectedId: '' });
    }

    render() {
        const renderCourses = this.state.courses.map(course => {
            return <CourseCard
                key={course.id}
                id={course.id}
                name={course.name}
                price={course.price}
                description={course.description}
                panelId="newCourseForm"
            />
        });

        const listHTML = (
            <div>
                <Collapse buttonText="Add Course" btnClass='btn-secondary'
                    collapseId="newCourseForm">
                    <CourseForm addItemList={this.courseCreateHandler}
                        editJobId={this.state.selectedId} panelId="newCourseForm"
                        clearSelectedId={this.clearSelectedId}
                        editedHandler={this.courseEditedHandler} />
                </Collapse>

                <div className="row">
                    {renderCourses}
                </div>
            </div>
        )
        if (this.state.courses && this.state.courses.length > 0) {
            return listHTML;
        }

        return <Loading />;
    }
}