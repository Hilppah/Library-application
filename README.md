# Library-application
Basic application for ment to be used by library workers without library cards.

## Description
This is a 4th year school project at OAMK. A website made using JavaScript and React for the application, and Java and Spring Boot for the backend. For the database I used NoSQL. 

In the application books can be borrowed using email and the tittle of the book. The borrowed books will be shown on the frontpage in a list. It will also display the due date and who rented it. Books and customers have their own pages where info of them is displayed. You can add a new customer from the "save a new customer" page. The customer needs an unique email. New books can be added on a similar page. You can add the tittle, author, genres and publication year to the books information. Books can be returned on the frontpage by the books tittle. It'll display who borrowed it above the return button.

## Installation

### Run frontend
* Clone the project
* Build gradle ./gradlew build
  
```
cd ./Frontend/create
```
```
npm install
```
```
npm start
```
### Database 
* Make sure MongoDB is runnin locally or update configuration
* The MongoDB URI in application.properties  for example:
 ```
spring.data.mongodb.uri=mongodb://localhost:27017/libraryDatabase
 ```
* Open MongoDB Compass and connect to your instance
*The database will initialize itself when the backend starts

### Run backend
* Open the project in IntelliJ and run dirrectly from IDE
 #### Or
 ```
./gradlew bootRun
 ```

## Pictures and demo video
* [video demo of the project]( https://youtu.be/_JCcKMIWkzI)

* Pictures

![home](https://github.com/user-attachments/assets/fe214684-0246-49d6-856a-e7d7fd3f3073)

 ### Home page
 
![can](https://github.com/user-attachments/assets/c0385760-edfa-466d-a881-abbc92ca0783)

### The book was borrowed

![cant](https://github.com/user-attachments/assets/64823f88-e223-4d95-8df2-0f6946b83811)

### The book couldn't be borrowed because someone already had it

![rented by](https://github.com/user-attachments/assets/925c1aa4-b028-4bc4-b956-1700ca49c9c5)

### Before returning, you can see who rented it

![books](https://github.com/user-attachments/assets/fac74474-798d-4db2-bf1f-96abe5263ded)

### Book page

![search](https://github.com/user-attachments/assets/6843211c-5d98-4420-95b5-2948d60b66e7)

### Suggestive searchbar

![newbook](https://github.com/user-attachments/assets/c1506dfc-4aeb-4143-b879-797533071b30)

### Add a new book page

![savedbook](https://github.com/user-attachments/assets/ef77e31e-529c-4b95-ba3e-bb326c2f8772)

### New book was saved

![user page](https://github.com/user-attachments/assets/9c70c7a6-a55e-4cca-a3af-098b1562a21f)

### User page

![save new user](https://github.com/user-attachments/assets/1d223492-97d9-4584-9b77-630cdc66cda1)

### Save a new user page

![tallennettu kayttaja](https://github.com/user-attachments/assets/c4b659c1-4e59-471d-a3bb-027b06903091)

### New user was saved

-------------------------------

#### Thank you :)
