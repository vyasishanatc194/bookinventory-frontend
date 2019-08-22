import axios from '../../axiosUrl';
import * as actionTypes from './actionTypes';

export const loaderStart = () => {
    return {
        type: actionTypes.LOADER_START
    }
}

export const loaderStop = () => {
    return {
        type: actionTypes.LOADER_STOP
    }
}

export const setBooksData = (book) => {
    return {
        type: actionTypes.SET_BOOKS_DATA,
        book: book
    }
}

export const setCategory = (category) => {
    return {
        type: actionTypes.SET_CATEGORY_DATA,
        category: category
    }
}

export const getBooksData = () => {
    return dispatch => {
        dispatch(loaderStart());
        return axios.get('api/v1/inventory', {headers: {'Content-Type': 'application/json', 'authorization': localStorage.getItem('token')}}).then(res => {
                dispatch(loaderStop());
                dispatch(setBooksData(res.data));
                return res.data;
            }).catch(err => {
                dispatch(loaderStop());
                console.log(err);
                return [];
            });
    }
}

export const getCategory = () => {
    return dispatch => {
        dispatch(loaderStart());
        return axios.get('api/v1/category-list', {headers: {'Content-Type': 'application/json', 'authorization': localStorage.getItem('token')}}).then(res => {
                dispatch(setCategory(res.data));
                dispatch(loaderStop());
                return res.data;
            }).catch(err => {
                dispatch(loaderStop());
                console.log(err);
                return [];
            });
    } 
}

export const getOutOfStockBooksData = () => {
    return dispatch => {
        dispatch(loaderStart());
        return axios.get('api/v1/fetch-out-of-stock-books', {headers: {'Content-Type': 'application/json', 'authorization': localStorage.getItem('token')}}).then(res => {
                dispatch(setBooksData(res.data));
                dispatch(loaderStop());
                return res.data;
            }).catch(err => {
                console.log(err);
                dispatch(loaderStop());
                return [];
            });
    }
}

export const addBooksData = (title, author, isbn, publisher, publish_date, category, no_of_stock, image) => {
    return dispatch => {
        dispatch(loaderStart());
        // const param = {"title": title, "author": author, "isbn": isbn, "publisher": publisher, "publish_date": publish_date, "category": category, "no_of_stock": no_of_stock,"images": images };
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('publisher', publisher);
        formData.append('publish_date', publish_date);
        formData.append('category', category);
        formData.append('no_of_stock', no_of_stock);
        formData.append('image', image);
        return axios.post('api/v1/inventory', formData, {headers: {'Content-Type': 'multipart/form-data', 'authorization': localStorage.getItem('token')}}).then(res => {
            dispatch(getBooksData());
            dispatch(loaderStop());
            return res.data;
        }).catch(err => {
            console.log(err);
            dispatch(loaderStop());
            return {};
        });
    }
}

export const EditBooksData = (title, author, isbn, publisher, publish_date, category, no_of_stock, image, id) => {
    return dispatch => {
        dispatch(loaderStart());
        // const param = {"title": title, "author": author, "isbn": isbn, "publisher": publisher, "publish_date": publish_date, "category": category, "no_of_stock": no_of_stock,"images": images };
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('publisher', publisher);
        formData.append('publish_date', publish_date);
        formData.append('category', category);
        formData.append('no_of_stock', no_of_stock);
        formData.append('image', image);
        formData.append('id', id);
        return axios.put('api/v1/inventory', formData, {headers: {'Content-Type': 'multipart/form-data', 'authorization': localStorage.getItem('token')}}).then(res => {
            dispatch(getBooksData());
            dispatch(loaderStop());
            return res.data;
        }).catch(err => {
            console.log(err);
            dispatch(loaderStop());
            return {};
        });
    }
}

export const deleteBooksData = (id) => {
    return dispatch => {
        dispatch(loaderStart());
        const param = {"id": id};
        return axios.delete('api/v1/inventory', {headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            data:param}).then(res => {
               dispatch(getBooksData());
               dispatch(loaderStop());
                return res.data;
            }).catch(err => {
                console.log(err);
                dispatch(loaderStop());
                return [];
            });
    }
}



