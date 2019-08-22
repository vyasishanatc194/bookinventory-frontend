import React, { Component } from 'react';
import './DashBoard.css';
import Modal from 'react-bootstrap4-modal';
import { Button, Form, Select } from "semantic-ui-react";
import Spinner from '../Spinner/Spinner';

class DashBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.initialFormData = {
            title: "",
            author: "",
            isbn: "",
            publisher: "",
            publish_date: "",
            category: "",
            no_of_stock: "",
        };
      
        this.initalErrors = {
            title: false,
            author: false,
            isbn: false,
            publisher: false,
            publish_date: false,
            category: false,
            no_of_stock: false,
          
        };


        this.state = {
            showModal: false,
            renderDeleteModal: false,
            editMode: false,
            bookId: '',
            title: "",
            author: "",
            isbn: "",
            publisher: "",
            publish_date: "",
            category: "",
            no_of_stock: "",
            image: {},
           
            formData: {...this.initialFormData},
            errors: {...this.initalErrors},
            categoryData: [],
        }        
    }

    componentDidMount() {
        this.props.getBooksData();
        this.props.getCategory().then(() => {
            let dataForCategory = [];
            this.props.dashboard && this.props.dashboard.category.map((data) => {
                dataForCategory.push({
                    key: data.id,
                    value: data.id,
                    text: data.name
                });
            });
            this.setState({ categoryData: dataForCategory} , () => {
              
            })
         });
       
    }

    modalBackdropClicked = () => {

    }

    fetchOutOfStockBook = () => {
        this.props.getOutOfStockBooksData();
    }

    handleAddBook = () => {
        this.setState({ showModal: true, editMode: false, formData: {...this.initialFormData} });
    }

    handleCloseAddBook = () => {
        this.setState({ showModal: false });
    }

    handleFieldChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: '' });
    };

    validateInput = (name, value) => {
        const trimmedValue = value.trim();
        if (name === "title" && value.length !== 0) {
            return true;
        } else if (name === "author" && value.length !== 0) {
            return true;
        }
      return true;
    }


    handleInputChange = (e, {name, value}) => {
      //  this.props.setErrors({});

        const isError = !this.validateInput(name, value);
    
        this.setState((prevState) => {
          let formData = {...prevState.formData};
          formData[name] = value;
    
          const errors = {...prevState.errors};
          errors[name] = isError;
    
          return {formData: formData, errors: errors};
        });
    }

    isFormValid = () => {
      
        for (let key in this.state.formData) {
            if (this.state.errors.hasOwnProperty(key) && this.state.errors[key]) {
                return false;
            }
            if (this.state.formData.hasOwnProperty(key) && (this.state.formData[key] === "")) {
                return false;
            }
        }
        return true;
    }

    
    handlSubmitBook = () => {
        const {title, author, isbn, publisher, publish_date, category, no_of_stock, id } = this.state.formData;
        const { image } = this.state;
        if (this.state.editMode === false) {
        this.props.addBooksData(title, author, isbn, publisher, publish_date, category, no_of_stock, image).then(() => {
            this.setState({ showModal: false, image: '' });
        });
        } else {
            this.props.EditBooksData(title, author, isbn, publisher, publish_date, category, no_of_stock, image, id).then(() => {
                this.setState({ showModal: false })
            })
        }
    }

    handleCategory = (e, {name, value}) =>  {
        // this.setState({ [name]: value });
        this.setState((prevState) => {
            let formData = {...prevState.formData};
            formData[name] = value;
      
            return {formData: formData};
          });
    }

    handleFileUpload = (e) => {
        const { files} = e.target;
        this.setState({ image: files[0]}, () => {
            console.log('data==>>',this.state.image)
        });
    }

    handleDelete(id) {
       
        this.setState({ renderDeleteModal: true, bookId: id });
    } 

    handleCloseDeleteModal = () => {
        this.setState({ renderDeleteModal: false });
    }

    DeleteBook = () => {
        const { bookId } = this.state;
        this.props.deleteBooksData(bookId).then(() => {
            this.setState({ renderDeleteModal: false })
        });
    }

    handleEdit = (id) => {
        this.setState({ showModal: true, editMode: true, bookId: id }, () => {
            if (this.state.editMode === true) {
                this.props.dashboard.bookList.map((data, index) => {
                  if(data.id === this.state.bookId) {
                    const item = {
                          title: data.title,
                          author: data.author,
                          isbn: data.isbn,
                          publisher: data.publisher,
                          publish_date: data.publish_date,
                          category: data.category.id,
                          no_of_stock: data.no_of_stock,
                          id: this.state.bookId,
                    }
                    this.setState({ 
                        image: '', formData: {...item}
                     })
                }  
                })
            }
        });
    }

    render() { 
        let loadData = <Spinner />;
        if (!this.props.dashboard.loading) {
            loadData = (
                this.props.dashboard.bookList.length ?
                this.props.dashboard.bookList.map(res => {
                    return (
                        <div className="col-md-4 m-b20" key={res.id}>
                            <div className="card">
                                <img src={ res.image_url ? res.image_url : 'default-thesis-abstract.png'} className="h-250" alt="Los Angeles" />
                                <div className="card-body card-font-size">
                                    <div className="row m-b5">
                                        <div className="col-md-12">
                                            <h5 className="card-title">Book Title</h5>
                                            <p className="card-text">{res.title}</p>
                                        </div>
                                    </div>
                                    <div className="row m-b5">
                                        <div className="col-md-6">
                                            <h5 className="card-title">Book Author</h5>
                                            <p className="card-text">{res.author}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="card-title">Book ISBN</h5>
                                            <p className="card-text">{res.isbn}</p>
                                        </div>
                                    </div>
                                    <div className="row m-b5">
                                        <div className="col-md-6">
                                            <h5 className="card-title">Book Publisher</h5>
                                            <p className="card-text">{res.publisher}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="card-title">Book Publish Date</h5>
                                            <p className="card-text">{res.publish_date}</p>
                                        </div>
                                    </div>
                                    <div className="row m-b5">
                                        <div className="col-md-6">
                                            <h5 className="card-title">Book Category</h5>
                                            <p className="card-text">{res.category.name}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="card-title">Book Price</h5>
                                            <p className="card-text">${res.price ? res.price : 0}</p>
                                        </div>
                                    </div>
                                    <div className="row m-b5">
                                        <div className="col-md-6">
                                            <h5 className={`card-title ${ res.no_of_stock > 0 ? 'text-green' : 'text-red'}`}>
                                                 { res.no_of_stock > 0 ? `In Stock (${res.no_of_stock})` : 'Out Of Stock' }</h5>
                                        </div>
                                    </div>
                                    <div className="float-right clearfix">
                                    <button className="btn btn-primary m-r15" onClick={() => this.handleEdit(res.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => this.handleDelete(res.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <div className="col-md-12 m-b20">
                    <div className="alert alert-primary" role="alert">
                        No Data Available!
                    </div>
                </div>
            )
        }

        let bookAddEditModal = <Spinner />;
        if (!this.props.dashboard.loading) {

            bookAddEditModal = (
                <Modal visible={this.state.showModal} onClickBackdrop={this.handleCloseAddBook}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Book</h5>
                        </div>
                        <div className="modal-body">
                        <Form onSubmit={this.handlSubmitBook}>
                            <Form.Input label="Title"
                                            placeholder="Title"
                                            onChange={this.handleInputChange}
                                            name="title"
                                            value={this.state.formData.title}
                                            error={this.state.errors.title}
                                            type="text"/>
                            <Form.Input label="Author"
                                            placeholder="author"
                                            onChange={this.handleInputChange}
                                            name="author"
                                            value={this.state.formData.author}
                                            error={this.state.errors.author}
                                            type="text"/>
                            <Form.Input label="Isbn"
                                            placeholder="Isbn"
                                            onChange={this.handleInputChange}
                                            name="isbn"
                                            value={this.state.formData.isbn}
                                            error={this.state.errors.isbn}
                                            type="number"/>
                            <Form.Input label="Publisher"
                                            placeholder="Publisher"
                                            onChange={this.handleInputChange}
                                            name="publisher"
                                            value={this.state.formData.publisher}
                                            error={this.state.errors.publisher}
                                            type="text"/>
                            <Form.Input label="Publish Date"
                                            placeholder="Publish Date"
                                            onChange={this.handleInputChange}
                                            name="publish_date"
                                            value={this.state.formData.publish_date}
                                            error={this.state.errors.publish_date}
                                            type="date"/>
                            <Form.Select label="Category"
                                            placeholder="Category"
                                            onChange={this.handleCategory}
                                            name="category"
                                            value={this.state.formData.category}
                                            error={this.state.errors.category}
                                            options={this.state.categoryData}
                                            />
                            <Form.Input label="Number of Stock"
                                            placeholder="Number of Stock"
                                            onChange={this.handleInputChange}
                                            name="no_of_stock"
                                            value={this.state.formData.no_of_stock}
                                            error={this.state.errors.no_of_stock}
                                            type="number"/>
                            
                                            <input  
                                            className="clearfix"
                                            style={{marginBottom: "15px"}}
                                            type="file"   
                                            placeholder="Image"
                                            onChange={this.handleFileUpload}
                                            />
    
                             {/* <Form.Input label="Image"
                                            placeholder="Image"
                                            onChange={this.handleFileUpload}
                                            name="image"
                                            value={this.state.formData.image}
                                            error={this.state.errors.image}
                                            type="file"/> */}
                            
    
    
                                <div className="clearfix">
                                   {this.state.editMode === false?
                                    <Button type="submit" primary className="btnSubmit"
                                        disabled={!this.isFormValid()}>
                                        Add New Book
                                    </Button>
                                    : 
                                    <Button type="submit" primary className="btnSubmit"
                                        disabled={!this.isFormValid()}>
                                        Edit Book
                                    </Button>
                                  
                                  }
    
                                </div>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.handleCloseAddBook} type="button" className="btn btn-primary">
                                Close
                            </button>
                        </div>
                    </Modal>
            )
        }

        let bookDeleteModal = <Spinner />;
        if (!this.props.dashboard.loading) {

            bookDeleteModal = (

            <Modal visible={this.state.renderDeleteModal} onClickBackdrop={this.handleCloseDeleteModal} >
                <div className="modal-header">
                    <h5 className="modal-title">Delete Your Book</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to Delete?</p>
                    <div className="float-right clearfix">
                    <button onClick={this.handleCloseDeleteModal} type="button" className="btn btn-primary m-r15">
                        Close
                    </button>
                    <button onClick={this.DeleteBook} type="button" className="btn btn-danger">
                        Delete
                    </button>
                    </div>
                </div>
            </Modal>
            )
        }


       
        return (
            <div className="m-t10">
                <div className="m-b20 text-right">
                    <div className="row">  
                        <div className="col-md-12 m-l-32">
                            <button type="button" className="btn btn-primary m-r15" onClick={this.fetchOutOfStockBook}>
                                Out Of Stock Books
                            </button>
                            <button type="button" className="btn btn-primary m-r15" onClick={() => this.props.getBooksData()}>
                                Reset
                            </button>
                            <button type="button" className="btn btn-primary m-r15" onClick={this.handleAddBook}>
                                Add Book
                            </button>
                        </div>
                    </div>
                </div>
                { bookAddEditModal }
                { bookDeleteModal }
                <div className="card-group">
                    <div className="row" style={{width: "100%"}}>
                        { loadData }
                    </div>
                </div>
            </div>
        )
    }
}

export default DashBoardComponent;