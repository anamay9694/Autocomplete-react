This project is done as a part of Take-Home Coding Assignment from Eightfold for the Front-End Position.

1.	Implemented multi-select autocomplete.

2.	The API used for fetching movie data was OMDB Api. 
Note - The api from OMDB was returing a single movie with all the details if I use their "t" paramter. I used the "s" paramter to get a list of movie suggestions,with type=movie. This does not return Director's name, so I am displaying "Year" with the movie "Title".
 
3.	The user is able to type and see the autocomplete list of movies.
 
4.	A user can select a movie title and that will be added to the field as a pill.
 
5. If a user clicks outside the suggestion box, the suggestion box disappears. I have used ref to achieve this.

6. User is able to delete the selected movies from the pill.

7. User is not able to add more than 5 movies, it gives a red warning message at the bottom.
 
8. The component renders under 200ms.

9. If you type, few characters, the API returns an error message. I am modifying the message and displaying it.
 
10. If no movie, match, I am showing an error message.
 
11. To ensure the same movie is not selected again, I am filtering it before showing it in the recommendations.

12. Used proper css to match the requirements.

13. I have used module.css to ensure that the class names of the component do not conflict with the same class names of other components.
