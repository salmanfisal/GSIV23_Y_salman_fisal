# GSIV23_Y_salman_fisal

this is a movie project with functionality and fully responsive with multiple route pages

## Table of Contents

- [Features](#how-i-build)

 - [Prerequisites](#prerequisites)

 - [Installation](#installation)

 - [Dependencies](##dependencies)

- [Usage](#usage)


## Base of this project

- in this project i have written clean code with component reusability along with the contextApi for state managment

- i have user react-router-dom to navigate between the paths along with some extra dom modules

- where i have taken the useParmas to get the exact params passing in the path and to capture the movie id using the params

## Movie Search App

This is a Movie Search App that allows users to browse and search for movies using The Movie Database (TMDb) API. Users can view movie details and navigate through the movie collection using pagination.

## Features

- Browse a collection of movies
- Search for movies by title
- View movie details including title, overview, and rating
- Navigate through movie collection using pagination
- Responsive design for various screen sizes


### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.

### Installation

1. Clone the repository:

2. Navigate to the project directory:

3. Install dependencies:

## Dependencies

1. useState

2. useEffect

3. useContext

4. createContext

5. useRef

6. {BrowserRouter BrowserRouter, Routes, Route, useNavigate, useParams}

7. customContext - (contextApi)

## usage 

- In the parent component all the child elements will we accessing by using the routes along with the custom context Provider

- In the card component i have fetched the data asynchronously and converted the response  into the json fromat.

- After converting the response in json format then i have stored the response in state hook by using useState hook

- The data which i have recieved from the response is then access through the useState hook variable

- Now i want to get all the data from the variable and i want to loop every image,title and description of the recieved data

- By using the map function i have loop the state variable and extracted the data with respective formats in title, rating, description etc.

- But the data which is coming in image is in an encoded id format and we need to concat the id with the common url

   ex :-   let base_url = "https://image.tmdb.org/t/p/w200";
 this is the common url and now i want to concat this url with the image id i have concat the id of image with common image url
  
  ex:-                   <img src={`${base_url}${e.poster_path}`} alt={e.title} />

- After getting the data and displayed on the screen now the other task is to show the details of that particular movie that we have   clicked.

- For getting the details of the particular movie along with details

            - first i have stored that movie id by using the "useParams" hook in new component known as details component

            - After getting the id using "useParams" destructure {} the id from the useParams

            - After getting the id i compared the id of the movie which i have passed in the details component through customContext

            - where after getting the data from context the i have filtered the id of actual movie id and the id comming through params
              ex :- let { id } = useParams();
                    let { query } = GlobalContext();
                     let selected = query.find((e) => e.id.toString() === id);

            - so that i can get the particular movie when click of the image by wrapping "Link" router to the image tag in the card component

- I have implemented the search option where if we type the name of the movie it will suggest the movie accordingly

- I fetch the data which have come through the fetching of Api after getting the data i have passed the data into the navigation component.

- By using the custom context i have passed the data from card component to the nav component where i can fetch the data on input handler

- First i get the input data from the onchange event where i get the input data by using (e.target.value) and storing the value in the state hook.

- I have compared the data which came through the context api with the input data by using the "includes" method

        ex:-setNav(e.target.value);
             result = query.filter((e) =>
             e.title.toLowerCase().includes(nav.toLowerCase()));
            setFilterResult(result);

- After getting the result stored in another state hook and passed that hook to map with the jsx tags like img title description etc..

- Added the pagination to navigate between the pages where i need to modify the url by passing the pages list dynamically..

--------------------------------------------- thankYou -------------------------------------------------------------------