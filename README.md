# Flight Booking System for Airlines (Java Web Application) ✈️

<a href="https://github.com/krishnavish9329"><img alt="views" title="Github views" src="https://komarev.com/ghpvc/?username=harismuneer&style=flat-square" width="125"/></a>
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](#)
[![GitHub Forks](https://img.shields.io/github/forks/harismuneer/Flight-Booking-System-JavaServlets_App.svg?style=social&label=Fork&maxAge=2592000)](https://github.com/krishnavish9329/Flight-Booking-System/fork)
[![GitHub Issues](https://img.shields.io/github/issues/harismuneer/Flight-Booking-System-JavaServlets_App.svg?style=flat&label=Issues&maxAge=2592000)](https://github.com/krishnavish9329/Flight-Booking-System/issues)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat&label=Contributions&colorA=red&colorB=black	)](#)


A Flight Booking System is an online application designed to handle the end-to-end process of booking flights. It allows users to search for flights, view available options, select desired flights, and complete the booking process,


## Technologies Used

* **Frontend:** HTML, CSS, JavaScript.
* **Backend:** Node Js, Express Js, Mysql (Database).

## Roles
Following roles are implemented:
* Airline Admin
* Customer


## How to Run


1- Install these:
    * [ Node Js](https://nodejs.org/en/download/source-code)
    * [ Vs Code ](https://code.visualstudio.com/download)
    * [ mysql ](https://dev.mysql.com/downloads/workbench/)
    * [ Git ](https://git-scm.com/downloads)

2- setup of database 
    copy this sql query<br>
    {


        CREATE DATABASE flight_database;
        use flight_database;
        drop table customer;

        CREATE TABLE customer
        (
        id int Not NUll auto_increment,
        FNumber int,
        FName VARCHAR(50), 
        Departure VARCHAR(50), 
        destination VARCHAR(50), 
        date DATETIME,
        class VARCHAR(2),
        NumberOfParson int,
        Names VARCHAR(100),
        Gmail VARCHAR(50),
        Password VARCHAR(50),
        primary key(id)
        );


        select * from customer;

        delete from customer where user='krishna kumar';

        CREATE TABLE Admain
        (
        user VARCHAR(50), 
        gender VARCHAR(10),
        email VARCHAR(30),
        password VARCHAR(50),
        PRIMARY KEY (user,email)
        );
        INSERT INTO Admain
        values("krishna","m","krishna@gmail.com",12345);

        select * from Admain;

        CREATE TABLE Flight
        (
        FNumber int primary key,
        FName VARCHAR(50),
        Departure VARCHAR(50), 
        destination VARCHAR(10),
        date DATETIME,
        class VARCHAR(5)
        );

        drop table Flight;

        insert into Flight
        values (1,'krishna flight','jabalpur','indore','2003-02-03 18:00','A');

        select * from Flight;
    }

3- Open Vs Code<br>
    * make the clone of the project (git clone https://github.com/krishnavish9329/Flight-Booking-System.git) <br>
    * run ( npm install ) <br>
    * After instalation dependencies run ( npm run str ) <br>
    * open your browser and goto this URL (http://localhost:5000/Home) <br>
    
## Interface


#### Home Pages

<p align="middle">
   <img src="../main/Image/Home.png" width="400"/>
   <img src="../main/Image/Home2.png" width="400"/>
   <img src="../main/Image/Home3.png" width="400"/>
</p>


#### Booking Page And User Login Pages

<p align="middle">
   <img src="../main/Image/fChack.png" width="400"/>
   <img src="../main/Image/Fshow.png" width="400"/>
   <img src="../main/Image/Fbooking.png" width="400"/>
   <img src="../main/Image/Fbooking2.png" width="400"/>
   <img src="../main/Image/UserC.png" width="400"/>
</p>


#### Admain Page And Admain Login Pages

<p align="middle">
   <img src="../main/Image/Alogin.png" width="400"/>
   <img src="../main/Image/Aregis.png" width="400"/>
   <img src="../main/Image/ASF.png" width="400"/>
   <img src="../main/Image/AviewF.png" width="400"/>
</p>







## Contributions Welcome
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](#)

If you find any bug in the code or have any improvements in mind then feel free to generate a pull request.



## Issues
[![GitHub Issues](https://img.shields.io/github/issues/harismuneer/Flight-Booking-System-JavaServlets_App.svg?style=flat&label=Issues&maxAge=2592000)](https://github.com/krishnavish9329/Flight-Booking-System/issues)

If you face any issue, you can create a new issue in the Issues Tab and I will be glad to help you out.



Copyright (c) 2024-present, krishnavish9329    